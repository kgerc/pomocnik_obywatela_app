import express from 'express';
import Stripe from 'stripe';
import Subscription from '../models/Subscription.js';
import PromoCode from '../models/PromoCode.js';
import PurchasedDocument from '../models/PurchasedDocument.js';
import { authenticateUser } from '../middleware/auth.js';
import { deliverPremiumNotificationsToUser } from '../controllers/notificationsController.js';

const router = express.Router();

// Inicjalizuj Stripe z kluczem sekretnym
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint do tworzenia Checkout Session
router.post('/create-checkout-session', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const { useBlik, promoCode } = req.body; // Czy użytkownik chce płacić BLIK i kod promocyjny

    console.log('Create checkout session - userId:', userId, 'useBlik:', useBlik, 'promoCode:', JSON.stringify(promoCode, null, 2));

    // Sprawdź czy użytkownik już ma subskrypcję
    const existingSub = await Subscription.findByUserId(userId);
    if (existingSub && existingSub.isActive()) {
      return res.status(400).json({
        error: 'Masz już aktywną subskrypcję'
      });
    }

    // Utwórz lub pobierz Stripe Customer
    let customerId = existingSub?.stripeCustomerId;

    if (!customerId || customerId.startsWith('promo_')) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId: userId
        }
      });
      customerId = customer.id;
    }

    // Calculate price with promo code if provided
    // Cena bazowa: 9.99 zł (999 groszy) - już uwzględnia domyślny 50% rabat od 19.99 zł
    let finalPrice = 499; // Default: 4.99 zł w groszach (po 50% rabacie)
    let promoCodeData = null;

    if (promoCode) {
      const promoCodeObj = await PromoCode.findByCode(promoCode.code);
      if (promoCodeObj) {
        const validation = await promoCodeObj.validate(userId);
        if (validation.valid) {
          const discount = promoCodeObj.discountPercent;
          // Stosuj dodatkowy rabat z kodu promocyjnego na cenę po 50% rabacie (499 groszy)
          finalPrice = Math.round(499 * (1 - discount / 100));
          promoCodeData = promoCodeObj;
          console.log(`Promo code ${promoCode.code} applied: ${discount}% discount, final price: ${finalPrice} groszy`);
        } else {
          console.log(`Promo code ${promoCode.code} validation failed:`, validation.error);
        }
      } else {
        console.log(`Promo code ${promoCode.code} not found in database`);
      }
    }

    let session;

    if (useBlik) {
      // BLIK - płatność jednorazowa za miesiąc (mode: payment)
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['blik', 'card'],
        line_items: [
          {
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'Premium - Miesięczny dostęp',
                description: promoCodeData
                  ? `Pełen dostęp do funkcji Premium przez 1 miesiąc (kod: ${promoCodeData.code}, -${promoCodeData.discountPercent}%)`
                  : 'Pełen dostęp do funkcji Premium przez 1 miesiąc'
              },
              unit_amount: finalPrice // Uses calculated price with discount
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/app?success=true&payment=blik`,
        cancel_url: `${process.env.FRONTEND_URL}/app?canceled=true`,
        metadata: {
          userId: userId,
          paymentType: 'blik_monthly',
          promoCode: promoCodeData?.code || ''
        }
      });

      console.log(`BLIK monthly payment session created for user ${userId}`);
    } else {
      // Karta - subskrypcja miesięczna (mode: subscription)
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'Premium - Miesięczny dostęp',
                description: promoCodeData
                  ? `Pełen dostęp do funkcji Premium - subskrypcja miesięczna (kod: ${promoCodeData.code}, -${promoCodeData.discountPercent}%)`
                  : 'Pełen dostęp do funkcji Premium - subskrypcja miesięczna'
              },
              unit_amount: finalPrice,
              recurring: {
                interval: 'month',
                interval_count: 1
              }
            },
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.FRONTEND_URL}/app?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/app?canceled=true`,
        metadata: {
          userId: userId,
          promoCode: promoCodeData?.code || ''
        }
      });

      console.log(`Card subscription session created for user ${userId}`);
    }

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint do tworzenia Customer Portal Session (zarządzanie subskrypcją)
router.post('/create-portal-session', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findByUserId(userId);
    if (!subscription) {
      return res.status(404).json({ error: 'Nie znaleziono subskrypcji' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.FRONTEND_URL}/app`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint do tworzenia płatności za pojedynczy dokument (2 PLN)
router.post('/create-document-payment', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;
    const { documentId } = req.body;

    console.log('Create document payment - userId:', userId, 'documentId:', documentId);

    if (!documentId) {
      return res.status(400).json({
        error: 'Document ID is required'
      });
    }

    // Check if user already purchased this document
    const existingPurchase = await PurchasedDocument.findByUserAndDocumentId(userId, documentId);
    if (existingPurchase && existingPurchase.isPaid()) {
      return res.status(400).json({
        error: 'Ten dokument został już zakupiony'
      });
    }

    // Get or create Stripe Customer (same pattern as BLIK payment)
    const existingSub = await Subscription.findByUserId(userId);
    let customerId = existingSub?.stripeCustomerId;

    if (!customerId || customerId.startsWith('promo_')) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId: userId
        }
      });
      customerId = customer.id;
    }

    // Create payment session (2 PLN) - using STRIPE_DOCUMENT_PRICE_ID or fallback to price_data
    const lineItem = process.env.STRIPE_DOCUMENT_PRICE_ID
      ? {
          price: process.env.STRIPE_DOCUMENT_PRICE_ID,
          quantity: 1,
        }
      : {
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'Dokument z Generatora Pism',
              description: 'Jednorazowy dostęp do wygenerowanego dokumentu'
            },
            unit_amount: 200 // 2 PLN in grosze
          },
          quantity: 1,
        };

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['blik', 'card'],
      line_items: [lineItem],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/app?success=true&payment=document&documentId=${documentId}&returnToGenerator=true`,
      cancel_url: `${process.env.FRONTEND_URL}/app?canceled=true&returnToGenerator=true`,
      metadata: {
        userId: userId,
        paymentType: 'single_document',
        documentId: documentId
      }
    });

    // Don't create pending purchase here - payment_intent is null at this point
    // It will be created in the webhook when payment_intent.succeeded event fires

    console.log(`Document payment session created for user ${userId}, document ${documentId}`);

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating document payment session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint do tworzenia płatności za pojedynczy dokument dla gości (bez autoryzacji)
router.post('/create-guest-document-payment', async (req, res) => {
  try {
    const { documentId, email } = req.body;

    console.log('Create guest document payment - documentId:', documentId, 'email:', email);

    if (!documentId) {
      return res.status(400).json({
        error: 'Document ID is required'
      });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({
        error: 'Valid email is required'
      });
    }

    // Create or get Stripe Customer for guest
    const customer = await stripe.customers.create({
      email: email,
      metadata: {
        documentId: documentId,
        guest: 'true'
      }
    });

    // Create payment session (2 PLN) using STRIPE_DOCUMENT_PRICE_ID or fallback to price_data
    const guestLineItem = process.env.STRIPE_DOCUMENT_PRICE_ID
      ? {
          price: process.env.STRIPE_DOCUMENT_PRICE_ID,
          quantity: 1,
        }
      : {
          price_data: {
            currency: 'pln',
            product_data: {
              name: 'Dokument z Generatora Pism',
              description: 'Jednorazowy dostęp do wygenerowanego dokumentu'
            },
            unit_amount: 200 // 2 PLN in grosze
          },
          quantity: 1,
        };

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      customer_email: email,
      payment_method_types: ['blik', 'card'],
      line_items: [guestLineItem],
      mode: 'payment',
      success_url: `${process.env.PISMA_APP_URL || 'https://pisma.pomocnikobywatela.pl'}?success=true&payment=document&documentId=${documentId}&email=${encodeURIComponent(email)}`,
      cancel_url: `${process.env.PISMA_APP_URL || 'https://pisma.pomocnikobywatela.pl'}?canceled=true`,
      metadata: {
        email: email,
        paymentType: 'guest_document',
        documentId: documentId,
        guest: 'true'
      }
    });

    console.log(`Guest document payment session created for email ${email}, document ${documentId}`);

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating guest document payment session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Check if user has purchased a document
router.get('/check-document-purchase/:documentId', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { documentId } = req.params;

    const purchase = await PurchasedDocument.findByUserAndDocumentId(userId, documentId);

    res.json({
      purchased: purchase !== null && purchase.isPaid(),
      purchase: purchase ? purchase.toJSON() : null
    });
  } catch (error) {
    console.error('Error checking document purchase:', error);
    res.status(500).json({ error: error.message });
  }
});

// Pobierz status subskrypcji użytkownika
router.get('/subscription-status', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findByUserId(userId);

    if (!subscription) {
      return res.json({
        hasSubscription: false,
        isActive: false,
        isPremium: false
      });
    }

    const isActive = subscription.isActive();

    res.json({
      hasSubscription: true,
      isActive: isActive,
      isPremium: isActive,
      subscription: subscription.toJSON()
    });
  } catch (error) {
    console.error('Error getting subscription status:', error);
    res.status(500).json({ error: error.message });
  }
});

// Webhook endpoint dla Stripe (bez autoryzacji)
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const customerId = session.customer;

        console.log('Processing checkout.session.completed for user:', userId);
        console.log('Session subscription ID:', session.subscription);

        // Pobierz subskrypcję z Stripe z dodatkowymi parametrami
        const stripeSubscription = await stripe.subscriptions.retrieve(
          session.subscription,
          { expand: ['latest_invoice', 'customer'] }
        );

        // Oblicz daty okresu na podstawie dostępnych pól
        // Stripe API w wersji subscription zwraca current_period_start/end bezpośrednio
        // Ale czasami mogą być w items lub trzeba je wyliczyć
        let currentPeriodStart = stripeSubscription.current_period_start;
        let currentPeriodEnd = stripeSubscription.current_period_end;

        // Jeśli brak bezpośrednich pól, użyj start_date i oblicz end
        if (!currentPeriodStart || !currentPeriodEnd) {
          currentPeriodStart = stripeSubscription.start_date || stripeSubscription.created;

          // Oblicz end date na podstawie intervallu (month = +30 dni)
          const interval = stripeSubscription.plan?.interval || 'month';
          const intervalCount = stripeSubscription.plan?.interval_count || 1;

          if (interval === 'month') {
            // Dodaj miesiące
            const startDate = new Date(currentPeriodStart * 1000);
            startDate.setMonth(startDate.getMonth() + intervalCount);
            currentPeriodEnd = Math.floor(startDate.getTime() / 1000);
          } else if (interval === 'year') {
            // Dodaj lata
            const startDate = new Date(currentPeriodStart * 1000);
            startDate.setFullYear(startDate.getFullYear() + intervalCount);
            currentPeriodEnd = Math.floor(startDate.getTime() / 1000);
          } else {
            // Domyślnie +30 dni
            currentPeriodEnd = currentPeriodStart + (30 * 24 * 60 * 60);
          }
        }

        console.log('Retrieved subscription:', {
          id: stripeSubscription.id,
          status: stripeSubscription.status,
          current_period_start: currentPeriodStart,
          current_period_end: currentPeriodEnd,
          plan_interval: stripeSubscription.plan?.interval
        });

        // Walidacja danych
        if (!currentPeriodStart || !currentPeriodEnd) {
          console.error('Missing period dates in subscription:', stripeSubscription);
          throw new Error('Subscription missing required period dates');
        }

        // Sprawdź czy subskrypcja już istnieje
        const existingSub = await Subscription.findByUserId(userId);

        const subscriptionData = {
          userId: userId,
          stripeCustomerId: customerId,
          stripeSubscriptionId: stripeSubscription.id,
          stripePriceId: stripeSubscription.items.data[0].price.id,
          status: stripeSubscription.status,
          currentPeriodStart: new Date(currentPeriodStart * 1000),
          currentPeriodEnd: new Date(currentPeriodEnd * 1000),
          cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end || false
        };

        // Check if this is first time becoming premium (was not active before)
        const wasNotActiveBefore = !existingSub || !existingSub.isActive();

        if (existingSub) {
          // Zaktualizuj istniejącą
          await Subscription.update(userId, {
            status: subscriptionData.status,
            currentPeriodStart: subscriptionData.currentPeriodStart,
            currentPeriodEnd: subscriptionData.currentPeriodEnd,
            cancelAtPeriodEnd: subscriptionData.cancelAtPeriodEnd
          });
          console.log('Subscription updated for user:', userId);
        } else {
          // Utwórz nową
          await Subscription.create(subscriptionData);
          console.log('Subscription created for user:', userId);
        }

        // Dostarczenie powiadomień premium dla użytkownika który staje się premium po raz pierwszy
        if (wasNotActiveBefore && ['active', 'trialing'].includes(subscriptionData.status)) {
          await deliverPremiumNotificationsToUser(userId);
        }

        // Jeśli użyto kodu promocyjnego, oznacz go jako wykorzystany
        if (session.metadata.promoCode) {
          try {
            const promoCode = await PromoCode.findByCode(session.metadata.promoCode);
            if (promoCode) {
              await promoCode.redeem(userId);
              console.log(`Promo code ${session.metadata.promoCode} redeemed for user ${userId} after successful payment`);
            }
          } catch (promoErr) {
            console.error('Error redeeming promo code after payment:', promoErr);
            // Nie przerywaj procesu - subskrypcja została już utworzona
          }
        }

        break;
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        console.log('Processing customer.subscription.created:', subscription.id);

        // Pobierz userId z customer metadata
        const customer = await stripe.customers.retrieve(customerId);
        const userId = customer.metadata.userId;

        if (!userId) {
          console.error('No userId in customer metadata');
          break;
        }

        // Oblicz daty okresu
        let currentPeriodStart = subscription.current_period_start;
        let currentPeriodEnd = subscription.current_period_end;

        if (!currentPeriodStart || !currentPeriodEnd) {
          currentPeriodStart = subscription.start_date || subscription.created;

          const interval = subscription.plan?.interval || 'month';
          const intervalCount = subscription.plan?.interval_count || 1;

          if (interval === 'month') {
            const startDate = new Date(currentPeriodStart * 1000);
            startDate.setMonth(startDate.getMonth() + intervalCount);
            currentPeriodEnd = Math.floor(startDate.getTime() / 1000);
          } else if (interval === 'year') {
            const startDate = new Date(currentPeriodStart * 1000);
            startDate.setFullYear(startDate.getFullYear() + intervalCount);
            currentPeriodEnd = Math.floor(startDate.getTime() / 1000);
          } else {
            currentPeriodEnd = currentPeriodStart + (30 * 24 * 60 * 60);
          }
        }

        console.log('Calculated period:', {
          start: currentPeriodStart,
          end: currentPeriodEnd,
          interval: subscription.plan?.interval
        });

        // Sprawdź czy subskrypcja już istnieje
        const existingSub = await Subscription.findByUserId(userId);

        const subscriptionData = {
          userId: userId,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscription.id,
          stripePriceId: subscription.items.data[0].price.id,
          status: subscription.status,
          currentPeriodStart: new Date(currentPeriodStart * 1000),
          currentPeriodEnd: new Date(currentPeriodEnd * 1000),
          cancelAtPeriodEnd: subscription.cancel_at_period_end || false
        };

        if (!existingSub) {
          await Subscription.create(subscriptionData);
          console.log('Subscription created via customer.subscription.created for user:', userId);

          // Dostarczenie powiadomień premium dla nowego użytkownika premium (tylko jeśli aktywna lub trialing)
          if (['active', 'trialing'].includes(subscriptionData.status)) {
            await deliverPremiumNotificationsToUser(userId);
          }
        }
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;

        const existingSub = await Subscription.findByStripeSubscriptionId(subscription.id);
        if (existingSub) {
          // Oblicz daty okresu jeśli brak
          let currentPeriodStart = subscription.current_period_start;
          let currentPeriodEnd = subscription.current_period_end;

          if (!currentPeriodStart || !currentPeriodEnd) {
            currentPeriodStart = subscription.start_date || subscription.created;
            const interval = subscription.plan?.interval || 'month';
            const intervalCount = subscription.plan?.interval_count || 1;

            if (interval === 'month') {
              const startDate = new Date(currentPeriodStart * 1000);
              startDate.setMonth(startDate.getMonth() + intervalCount);
              currentPeriodEnd = Math.floor(startDate.getTime() / 1000);
            } else if (interval === 'year') {
              const startDate = new Date(currentPeriodStart * 1000);
              startDate.setFullYear(startDate.getFullYear() + intervalCount);
              currentPeriodEnd = Math.floor(startDate.getTime() / 1000);
            } else {
              currentPeriodEnd = currentPeriodStart + (30 * 24 * 60 * 60);
            }
          }

          await Subscription.update(existingSub.userId, {
            status: subscription.status,
            currentPeriodStart: new Date(currentPeriodStart * 1000),
            currentPeriodEnd: new Date(currentPeriodEnd * 1000),
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            stripePriceId: subscription.items.data[0].price.id
          });
          console.log('Subscription updated:', subscription.id);
        }
        break;
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object;

        const existingSub = await Subscription.findByStripeSubscriptionId(subscription.id);
        if (existingSub) {
          await Subscription.update(existingSub.userId, {
            status: 'canceled'
          });
          console.log('Subscription canceled:', subscription.id);
        }
        break;
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (subscriptionId) {
          const existingSub = await Subscription.findByStripeSubscriptionId(subscriptionId);
          if (existingSub) {
            await Subscription.update(existingSub.userId, {
              status: 'active'
            });
            console.log('Payment succeeded for subscription:', subscriptionId);
          }
        }
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object;
        const subscriptionId = invoice.subscription;

        if (subscriptionId) {
          const existingSub = await Subscription.findByStripeSubscriptionId(subscriptionId);
          if (existingSub) {
            await Subscription.update(existingSub.userId, {
              status: 'past_due'
            });
            console.log('Payment failed for subscription:', subscriptionId);
          }
        }
        break;
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;

        // Znajdź checkout session po payment_intent
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
          limit: 1
        });

        if (sessions.data.length > 0) {
          const session = sessions.data[0];

          // Sprawdź czy to płatność za pojedynczy dokument
          if (session.metadata.paymentType === 'single_document') {
            const userId = session.metadata.userId;
            const documentId = session.metadata.documentId;
            const customerId = session.customer;

            console.log('Processing single document payment for user:', userId, 'document:', documentId);

            // Check if record exists
            const existingPurchase = await PurchasedDocument.findByPaymentIntentId(paymentIntent.id);

            if (existingPurchase) {
              // Update existing
              await PurchasedDocument.updateStatus(paymentIntent.id, 'paid');
              console.log('✔ Updated existing purchase record');
            } else {
              // Create new purchase record (since we don't create pending anymore)
              await PurchasedDocument.create({
                userId: userId,
                documentId: documentId,
                documentType: 'generator_pism',
                stripePaymentIntentId: paymentIntent.id,
                stripeCustomerId: customerId,
                amountPaid: 200,
                status: 'paid',
                documentData: null
              });
              console.log('✔ Created new purchase record');
            }

            console.log('✔ Document purchase confirmed for user:', userId, 'document:', documentId);
          }
          // Sprawdź czy to płatność za dokument dla gościa (bez konta)
          else if (session.metadata.paymentType === 'guest_document') {
            const email = session.metadata.email;
            const documentId = session.metadata.documentId;

            console.log('Processing guest document payment for email:', email, 'document:', documentId);

            // Można tutaj zapisać płatność gościa w bazie, jeśli chcesz trackować
            // Na razie po prostu logujemy - dokument będzie odblokowany po powrocie z checkout

            console.log('✔ Guest document purchase confirmed for email:', email, 'document:', documentId);
          }
          // Sprawdź czy to płatność BLIK monthly
          else if (session.metadata.paymentType === 'blik_monthly') {
            const userId = session.metadata.userId;
            const customerId = session.customer;

            console.log('Processing BLIK monthly payment for user:', userId);

            // Utwórz subskrypcję na miesiąc
            const now = new Date();
            const oneMonthLater = new Date();
            oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

            const existingSub = await Subscription.findByUserId(userId);

            const subscriptionData = {
              userId: userId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: `blik_${paymentIntent.id}`,
              stripePriceId: 'blik_monthly',
              status: 'active',
              currentPeriodStart: now,
              currentPeriodEnd: oneMonthLater,
              cancelAtPeriodEnd: false
            };

            // Check if this is first time becoming premium
            const wasNotActiveBefore = !existingSub || !existingSub.isActive();

            if (existingSub) {
              await Subscription.update(userId, {
                status: subscriptionData.status,
                currentPeriodStart: subscriptionData.currentPeriodStart,
                currentPeriodEnd: subscriptionData.currentPeriodEnd,
                cancelAtPeriodEnd: subscriptionData.cancelAtPeriodEnd,
                stripeSubscriptionId: subscriptionData.stripeSubscriptionId,
                stripeCustomerId: subscriptionData.stripeCustomerId
              });
            } else {
              await Subscription.create(subscriptionData);
            }

            console.log('BLIK monthly subscription created for user:', userId);

            // Dostarczenie powiadomień premium dla użytkownika który staje się premium po raz pierwszy
            if (wasNotActiveBefore) {
              await deliverPremiumNotificationsToUser(userId);
            }

            // Jeśli użyto kodu promocyjnego, oznacz go jako wykorzystany
            if (session.metadata.promoCode) {
              try {
                const promoCode = await PromoCode.findByCode(session.metadata.promoCode);
                if (promoCode) {
                  await promoCode.redeem(userId);
                  console.log(`Promo code ${session.metadata.promoCode} redeemed for user ${userId} after BLIK payment`);
                }
              } catch (promoErr) {
                console.error('Error redeeming promo code after BLIK payment:', promoErr);
              }
            }
          }
        }
        break;
      }

      case 'charge.succeeded': {
        const charge = event.data.object;

        // Jeśli to BLIK
        if (charge.payment_method_details?.blik) {

          // pobierz PaymentIntent
          const paymentIntentId = charge.payment_intent;

          const sessions = await stripe.checkout.sessions.list({
            payment_intent: paymentIntentId,
            limit: 1
          });

          if (sessions.data.length > 0) {
            const session = sessions.data[0];

            if (session.metadata.paymentType === 'blik_monthly') {
              const userId = session.metadata.userId;
              const customerId = session.customer;

              console.log('Processing BLIK monthly payment (charge.succeeded) for user:', userId);

              const now = new Date();
              const oneMonthLater = new Date();
              oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

              const existingSub = await Subscription.findByUserId(userId);

              const subscriptionData = {
                userId: userId,
                stripeCustomerId: customerId,
                stripeSubscriptionId: `blik_${paymentIntentId}`,
                stripePriceId: 'blik_monthly',
                status: 'active',
                currentPeriodStart: now,
                currentPeriodEnd: oneMonthLater,
                cancelAtPeriodEnd: false
              };

              // Check if this is first time becoming premium
              const wasNotActiveBefore = !existingSub || !existingSub.isActive();

              if (existingSub) {
                await Subscription.update(userId, subscriptionData);
              } else {
                await Subscription.create(subscriptionData);
              }

              console.log('✔ BLIK monthly subscription saved for user:', userId);

              // Dostarczenie powiadomień premium dla użytkownika który staje się premium po raz pierwszy
              if (wasNotActiveBefore) {
                await deliverPremiumNotificationsToUser(userId);
              }

              // Jeśli użyto kodu promocyjnego, oznacz go jako wykorzystany
              if (session.metadata.promoCode) {
                try {
                  const promoCode = await PromoCode.findByCode(session.metadata.promoCode);
                  if (promoCode) {
                    await promoCode.redeem(userId);
                    console.log(`Promo code ${session.metadata.promoCode} redeemed for user ${userId} after BLIK charge`);
                  }
                } catch (promoErr) {
                  console.error('Error redeeming promo code after BLIK charge:', promoErr);
                }
              }
            }
          }
        }
        break;
      }

      case 'checkout.session.expired': {
        // Użytkownik anulował checkout lub sesja wygasła - usuń redemption kodu promocyjnego
        const session = event.data.object;
        const userId = session.metadata.userId;

        console.log('Checkout session expired/cancelled for user:', userId);

        if (session.metadata.promoCode) {
          try {
            const promoCode = await PromoCode.findByCode(session.metadata.promoCode);
            if (promoCode) {
              await PromoCode.unredeemForUser(promoCode.id, userId);
              console.log(`Promo code ${session.metadata.promoCode} rolled back for user ${userId} - checkout cancelled`);
            }
          } catch (promoErr) {
            console.error('Error rolling back promo code after checkout cancellation:', promoErr);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error handling webhook:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

export default router;
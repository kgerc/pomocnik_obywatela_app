import express from 'express';
import Stripe from 'stripe';
import Subscription from '../models/Subscription.js';
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
    const { useBlik } = req.body; // Czy użytkownik chce płacić BLIK

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

    let session;

    if (useBlik) {
      // BLIK - płatność jednorazowa za rok (mode: payment)
      // Cena: 39.99 zł/mies * 12 = 479.88 zł
      // Zniżka 10% dla płatności rocznej: 479.88 * 0.90 = 431.89 zł
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['blik', 'card'],
        line_items: [
          {
            price_data: {
              currency: 'pln',
              product_data: {
                name: 'Premium - Roczny dostęp',
                description: 'Pełen dostęp do funkcji Premium przez 12 miesięcy (10% zniżki w porównaniu do płatności miesięcznej)'
              },
              unit_amount: 43189 // 431.89 zł w groszach (10% zniżki)
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/app?success=true&payment=blik`,
        cancel_url: `${process.env.FRONTEND_URL}/app?canceled=true`,
        metadata: {
          userId: userId,
          paymentType: 'blik_yearly'
        }
      });

      console.log(`BLIK yearly payment session created for user ${userId}`);
    } else {
      // Karta - subskrypcja miesięczna (mode: subscription)
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        payment_method_types: ['card'],
        line_items: [
          {
            price: process.env.STRIPE_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: `${process.env.FRONTEND_URL}/app?success=true`,
        cancel_url: `${process.env.FRONTEND_URL}/app?canceled=true`,
        metadata: {
          userId: userId
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

          // Dostarczenie powiadomień premium dla nowego użytkownika premium
          await deliverPremiumNotificationsToUser(userId);
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

          // Dostarczenie powiadomień premium dla nowego użytkownika premium
          await deliverPremiumNotificationsToUser(userId);
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

          // Sprawdź czy to płatność BLIK yearly
          if (session.metadata.paymentType === 'blik_yearly') {
            const userId = session.metadata.userId;
            const customerId = session.customer;

            console.log('Processing BLIK yearly payment for user:', userId);

            // Utwórz subskrypcję na rok
            const now = new Date();
            const oneYearLater = new Date();
            oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

            const existingSub = await Subscription.findByUserId(userId);

            const subscriptionData = {
              userId: userId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: `blik_${paymentIntent.id}`,
              stripePriceId: 'blik_yearly',
              status: 'active',
              currentPeriodStart: now,
              currentPeriodEnd: oneYearLater,
              cancelAtPeriodEnd: false
            };

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

              // Dostarczenie powiadomień premium dla nowego użytkownika premium
              await deliverPremiumNotificationsToUser(userId);
            }

            console.log('BLIK yearly subscription created for user:', userId);
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

            if (session.metadata.paymentType === 'blik_yearly') {
              const userId = session.metadata.userId;
              const customerId = session.customer;

              console.log('Processing BLIK yearly payment (charge.succeeded) for user:', userId);

              const now = new Date();
              const oneYearLater = new Date();
              oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

              const existingSub = await Subscription.findByUserId(userId);

              const subscriptionData = {
                userId: userId,
                stripeCustomerId: customerId,
                stripeSubscriptionId: `blik_${paymentIntentId}`,
                stripePriceId: 'blik_yearly',
                status: 'active',
                currentPeriodStart: now,
                currentPeriodEnd: oneYearLater,
                cancelAtPeriodEnd: false
              };

              if (existingSub) {
                await Subscription.update(userId, subscriptionData);
              } else {
                await Subscription.create(subscriptionData);

                // Dostarczenie powiadomień premium dla nowego użytkownika premium
                await deliverPremiumNotificationsToUser(userId);
              }

              console.log('✔ BLIK yearly subscription saved for user:', userId);
            }
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
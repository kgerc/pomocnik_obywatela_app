import express from 'express';
import Stripe from 'stripe';
import Subscription from '../models/Subscription.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Inicjalizuj Stripe z kluczem sekretnym
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Endpoint do tworzenia Checkout Session
router.post('/create-checkout-session', optionalAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userEmail = req.user.email;

    // Sprawdź czy użytkownik już ma subskrypcję
    const existingSub = await Subscription.findByUserId(userId);
    if (existingSub && existingSub.isActive()) {
      return res.status(400).json({
        error: 'Masz już aktywną subskrypcję'
      });
    }

    // Utwórz lub pobierz Stripe Customer
    let customerId = existingSub?.stripeCustomerId;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: userEmail,
        metadata: {
          userId: userId
        }
      });
      customerId = customer.id;
    }

    // Utwórz Checkout Session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID, // ID ceny z Stripe Dashboard
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.CLIENT_URL}/app?success=true`,
      cancel_url: `${process.env.CLIENT_URL}/app?canceled=true`,
      metadata: {
        userId: userId
      }
    });

    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Endpoint do tworzenia Customer Portal Session (zarządzanie subskrypcją)
router.post('/create-portal-session', optionalAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    const subscription = await Subscription.findByUserId(userId);
    if (!subscription) {
      return res.status(404).json({ error: 'Nie znaleziono subskrypcji' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.CLIENT_URL}/app`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Pobierz status subskrypcji użytkownika
router.get('/subscription-status', optionalAuth, async (req, res) => {
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

        // Pobierz subskrypcję z Stripe
        const stripeSubscription = await stripe.subscriptions.retrieve(session.subscription);

        // Sprawdź czy subskrypcja już istnieje
        const existingSub = await Subscription.findByUserId(userId);

        if (existingSub) {
          // Zaktualizuj istniejącą
          await Subscription.update(userId, {
            status: stripeSubscription.status,
            currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
            currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
          });
        } else {
          // Utwórz nową
          await Subscription.create({
            userId: userId,
            stripeCustomerId: customerId,
            stripeSubscriptionId: stripeSubscription.id,
            stripePriceId: stripeSubscription.items.data[0].price.id,
            status: stripeSubscription.status,
            currentPeriodStart: new Date(stripeSubscription.current_period_start * 1000),
            currentPeriodEnd: new Date(stripeSubscription.current_period_end * 1000),
            cancelAtPeriodEnd: stripeSubscription.cancel_at_period_end
          });
        }

        console.log('Subscription created/updated for user:', userId);
        break;
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object;

        const existingSub = await Subscription.findByStripeSubscriptionId(subscription.id);
        if (existingSub) {
          await Subscription.update(existingSub.userId, {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
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

import express from 'express';
import Stripe from 'stripe';
import PromoCode from '../models/PromoCode.js';
import Subscription from '../models/Subscription.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Validate promo code
router.post('/validate', authenticateUser, async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;

    if (!code) {
      return res.status(400).json({ error: 'Kod promocyjny jest wymagany' });
    }

    // Check if user already has active subscription
    const existingSub = await Subscription.findByUserId(userId);
    if (existingSub && existingSub.isActive()) {
      return res.status(400).json({
        error: 'Masz już aktywną subskrypcję Premium'
      });
    }

    // Find promo code
    const promoCode = await PromoCode.findByCode(code);
    if (!promoCode) {
      return res.status(404).json({ error: 'Nieprawidłowy kod promocyjny' });
    }

    // Validate code
    const validation = await promoCode.validate(userId);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.reason });
    }

    res.json({
      valid: true,
      code: promoCode.code,
      description: promoCode.description,
      discountPercent: promoCode.discountPercent,
      isFree: promoCode.isFree()
    });
  } catch (error) {
    console.error('Error validating promo code:', error);
    res.status(500).json({ error: error.message });
  }
});

// Redeem promo code (activate premium)
router.post('/redeem', authenticateUser, async (req, res) => {
  try {
    const { code, useBlik } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;

    if (!code) {
      return res.status(400).json({ error: 'Kod promocyjny jest wymagany' });
    }

    // Check if user already has active subscription
    const existingSub = await Subscription.findByUserId(userId);
    if (existingSub && existingSub.isActive()) {
      return res.status(400).json({
        error: 'Masz już aktywną subskrypcję Premium'
      });
    }

    // Find promo code
    const promoCode = await PromoCode.findByCode(code);
    if (!promoCode) {
      return res.status(404).json({ error: 'Nieprawidłowy kod promocyjny' });
    }

    // Validate code
    const validation = await promoCode.validate(userId);
    if (!validation.valid) {
      return res.status(400).json({ error: validation.reason });
    }

    // Handle based on discount percentage
    if (promoCode.isFree()) {
      // Free code - redeem immediately (no payment required)
      await promoCode.redeem(userId);
      // 100% discount - create free subscription (existing logic)
      const now = new Date();
      const oneYearLater = new Date();
      oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

      const subscriptionData = {
        userId: userId,
        stripeCustomerId: `promo_${userId}`,
        stripeSubscriptionId: `promo_${code}_${Date.now()}`,
        stripePriceId: 'promo_code',
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
          stripeSubscriptionId: subscriptionData.stripeSubscriptionId
        });
      } else {
        await Subscription.create(subscriptionData);
      }

      console.log(`Free promo code ${code} (100%) redeemed by user ${userId}`);

      res.json({
        success: true,
        message: 'Kod promocyjny został aktywowany! Premium dostępne przez rok.',
        expiresAt: oneYearLater
      });
    } else {
      // Percentage discount - create Stripe Coupon and Checkout Session

      // Get or create Stripe customer
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

      // Create Stripe Coupon
      const coupon = await stripe.coupons.create({
        percent_off: promoCode.discountPercent,
        duration: useBlik ? 'once' : 'repeating',
        duration_in_months: useBlik ? undefined : 12,
        name: `${promoCode.code} - ${promoCode.discountPercent}% off`,
        metadata: {
          promoCodeId: promoCode.id,
          userId: userId
        }
      });

      console.log(`Created Stripe coupon ${coupon.id} for ${promoCode.discountPercent}% discount (${useBlik ? 'BLIK yearly' : 'monthly subscription'})`);

      // Create Checkout Session with discount
      let session;

      if (useBlik) {
        // BLIK - one-time yearly payment with discount
        session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ['blik', 'card'],
          line_items: [
            {
              price_data: {
                currency: 'pln',
                product_data: {
                  name: 'Premium - Roczny dostęp',
                  description: `Kod promocyjny ${promoCode.code} zastosowany (${promoCode.discountPercent}% zniżki)`
                },
                unit_amount: 47988 // 479.88 PLN (will be discounted by coupon)
              },
              quantity: 1
            }
          ],
          discounts: [{
            coupon: coupon.id
          }],
          mode: 'payment',
          success_url: `${process.env.FRONTEND_URL}/app?success=true&promo=${code}`,
          cancel_url: `${process.env.FRONTEND_URL}/app?canceled=true`,
          metadata: {
            userId: userId,
            paymentType: 'blik_yearly',
            promoCode: code,
            promoCodeId: promoCode.id,
            discountPercent: promoCode.discountPercent
          }
        });
      } else {
        // Card - monthly subscription with discount
        session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ['card'],
          line_items: [
            {
              price: process.env.STRIPE_PRICE_ID,
              quantity: 1,
            },
          ],
          discounts: [{
            coupon: coupon.id
          }],
          mode: 'subscription',
          success_url: `${process.env.FRONTEND_URL}/app?success=true&promo=${code}`,
          cancel_url: `${process.env.FRONTEND_URL}/app?canceled=true`,
          metadata: {
            userId: userId,
            promoCode: code,
            promoCodeId: promoCode.id
          }
        });
      }

      console.log(`Promo code ${code} (${promoCode.discountPercent}% off) redirecting user ${userId} to checkout`);

      res.json({
        success: true,
        requiresPayment: true,
        discountPercent: promoCode.discountPercent,
        checkoutUrl: session.url,
        message: `Kod rabatowy ${promoCode.discountPercent}% aktywowany! Przejdź do płatności.`
      });
    }
  } catch (error) {
    console.error('Error redeeming promo code:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

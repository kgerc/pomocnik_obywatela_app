import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Remove trailing slash to prevent double slashes in URLs
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

export const useSubscription = () => {
  const { user, session } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  const fetchSubscriptionStatus = async () => {
    if (!user || !session) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = session.access_token;

      const response = await fetch(`${API_URL}/api/stripe/subscription-status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch subscription status');

      const data = await response.json();
      setSubscription(data.subscription || null);
      setIsPremium(data.isPremium || false);
      setError(null);
    } catch (err) {
      console.error('Error fetching subscription:', err);
      setError(err.message);
      setIsPremium(false);
    } finally {
      setLoading(false);
    }
  };

  const createCheckoutSession = async (useBlik = false, promoCode = null) => {
    if (!session) {
      throw new Error('Brak sesji użytkownika');
    }

    try {
      setLoading(true);
      const token = session.access_token;

      // If promo code is provided, redeem it first
      if (promoCode && promoCode.code) {
        const redeemResponse = await fetch(`${API_URL}/api/promo-codes/redeem`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: promoCode.code,
            useBlik
          })
        });

        if (!redeemResponse.ok) {
          const errorData = await redeemResponse.json();
          throw new Error(errorData.error || 'Nie udało się aktywować kodu');
        }

        const redeemData = await redeemResponse.json();

        // If it's a free code or requires payment, handle accordingly
        if (redeemData.requiresPayment && redeemData.checkoutUrl) {
          // Redirect to Stripe Checkout with discount
          window.location.href = redeemData.checkoutUrl;
          return redeemData;
        } else if (redeemData.success && !redeemData.requiresPayment) {
          // Free code - refresh subscription status and return
          await fetchSubscriptionStatus();
          return redeemData;
        }
      }

      // No promo code - regular checkout
      const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ useBlik })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }

      const data = await response.json();

      // Przekieruj do Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }

      return data;
    } catch (err) {
      console.error('Error creating checkout session:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createPortalSession = async () => {
    if (!session) {
      throw new Error('Brak sesji użytkownika');
    }

    try {
      setLoading(true);
      const token = session.access_token;

      const response = await fetch(`${API_URL}/api/stripe/create-portal-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create portal session');
      }

      const data = await response.json();

      // Przekieruj do Stripe Customer Portal
      if (data.url) {
        window.location.href = data.url;
      }

      return data;
    } catch (err) {
      console.error('Error creating portal session:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
  }, [user]);

  return {
    subscription,
    loading,
    error,
    isPremium,
    refetch: fetchSubscriptionStatus,
    fetchSubscriptionStatus,
    createCheckoutSession,
    createPortalSession
  };
};

export default useSubscription;

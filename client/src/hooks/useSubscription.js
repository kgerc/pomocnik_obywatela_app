import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const useSubscription = () => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPremium, setIsPremium] = useState(false);

  const fetchSubscriptionStatus = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

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

  const createCheckoutSession = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`${API_URL}/api/stripe/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
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
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

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
    createCheckoutSession,
    createPortalSession
  };
};

export default useSubscription;

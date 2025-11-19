import { supabase } from '../config/supabase.js';

class Subscription {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id || data.userId;
    this.stripeCustomerId = data.stripe_customer_id || data.stripeCustomerId;
    this.stripeSubscriptionId = data.stripe_subscription_id || data.stripeSubscriptionId;
    this.stripePriceId = data.stripe_price_id || data.stripePriceId;
    this.status = data.status; // 'active', 'canceled', 'past_due', 'trialing'
    this.currentPeriodStart = data.current_period_start || data.currentPeriodStart;
    this.currentPeriodEnd = data.current_period_end || data.currentPeriodEnd;
    this.cancelAtPeriodEnd = data.cancel_at_period_end || data.cancelAtPeriodEnd;
    this.createdAt = data.created_at || data.createdAt;
    this.updatedAt = data.updated_at || data.updatedAt;
  }

  // Znajdź subskrypcję użytkownika
  static async findByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }

      return data ? new Subscription(data) : null;
    } catch (error) {
      console.error('Error finding subscription by user ID:', error);
      throw error;
    }
  }

  // Znajdź subskrypcję po Stripe Subscription ID
  static async findByStripeSubscriptionId(stripeSubscriptionId) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('stripe_subscription_id', stripeSubscriptionId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new Subscription(data) : null;
    } catch (error) {
      console.error('Error finding subscription by Stripe ID:', error);
      throw error;
    }
  }

  // Znajdź subskrypcję po Stripe Customer ID
  static async findByStripeCustomerId(stripeCustomerId) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('stripe_customer_id', stripeCustomerId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new Subscription(data) : null;
    } catch (error) {
      console.error('Error finding subscription by customer ID:', error);
      throw error;
    }
  }

  // Utwórz nową subskrypcję
  static async create(subscriptionData) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert({
          user_id: subscriptionData.userId,
          stripe_customer_id: subscriptionData.stripeCustomerId,
          stripe_subscription_id: subscriptionData.stripeSubscriptionId,
          stripe_price_id: subscriptionData.stripePriceId,
          status: subscriptionData.status,
          current_period_start: subscriptionData.currentPeriodStart,
          current_period_end: subscriptionData.currentPeriodEnd,
          cancel_at_period_end: subscriptionData.cancelAtPeriodEnd || false
        })
        .select()
        .single();

      if (error) throw error;

      return new Subscription(data);
    } catch (error) {
      console.error('Error creating subscription:', error);
      throw error;
    }
  }

  // Zaktualizuj subskrypcję
  static async update(userId, updates) {
    try {
      const updateData = {
        updated_at: new Date()
      };

      if (updates.status !== undefined) updateData.status = updates.status;
      if (updates.currentPeriodStart !== undefined) updateData.current_period_start = updates.currentPeriodStart;
      if (updates.currentPeriodEnd !== undefined) updateData.current_period_end = updates.currentPeriodEnd;
      if (updates.cancelAtPeriodEnd !== undefined) updateData.cancel_at_period_end = updates.cancelAtPeriodEnd;
      if (updates.stripePriceId !== undefined) updateData.stripe_price_id = updates.stripePriceId;

      const { data, error } = await supabase
        .from('subscriptions')
        .update(updateData)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return new Subscription(data);
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  // Sprawdź czy użytkownik ma aktywną subskrypcję
  static async hasActiveSubscription(userId) {
    try {
      const subscription = await Subscription.findByUserId(userId);

      if (!subscription) return false;

      // Sprawdź czy status jest aktywny i okres nie wygasł
      const isActive = ['active', 'trialing'].includes(subscription.status);
      const notExpired = new Date(subscription.currentPeriodEnd) > new Date();

      return isActive && notExpired;
    } catch (error) {
      console.error('Error checking active subscription:', error);
      return false;
    }
  }

  // Usuń subskrypcję (soft delete - zmień status)
  static async cancel(userId) {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          status: 'canceled',
          updated_at: new Date()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return new Subscription(data);
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  // Instance methods
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      stripeCustomerId: this.stripeCustomerId,
      stripeSubscriptionId: this.stripeSubscriptionId,
      stripePriceId: this.stripePriceId,
      status: this.status,
      currentPeriodStart: this.currentPeriodStart,
      currentPeriodEnd: this.currentPeriodEnd,
      cancelAtPeriodEnd: this.cancelAtPeriodEnd,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  isActive() {
    const isActiveStatus = ['active', 'trialing'].includes(this.status);
    const notExpired = new Date(this.currentPeriodEnd) > new Date();
    return isActiveStatus && notExpired;
  }
}

export default Subscription;

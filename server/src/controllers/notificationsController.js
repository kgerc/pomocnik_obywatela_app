// controllers/notificationsController.js
import Notification from '../models/Notification.js';
import { supabase } from '../config/supabase.js';

/**
 * Deliver notification to all users subscribed to its category
 * Creates entries in delivered_notifications for subscribers.
 */
export const deliverNotificationToSubscribers = async (notification) => {
  if (!notification.category) return;

  // pobierz subskrybentów danej kategorii
  const { data: subs, error: subsErr } = await supabase
    .from('user_subscriptions')
    .select('user_id')
    .eq('category', notification.category);

  if (subsErr) {
    console.error('Error fetching subscribers:', subsErr);
    return;
  }

  if (!subs || subs.length === 0) return;

  // przygotuj batch insert delivered_notifications
  const rows = subs.map(s => ({
    user_id: s.user_id,
    notification_id: notification.id
  }));

  const { error: insertErr } = await supabase
    .from('delivered_notifications')
    .insert(rows);

  if (insertErr) console.error('Error creating delivered notifications:', insertErr);
};

/**
 * Deliver all existing premium notifications to a new premium user
 * Called when user purchases Premium subscription
 */
export const deliverPremiumNotificationsToUser = async (userId) => {
  try {
    console.log(`Delivering premium notifications to user ${userId}`);

    // Pobierz wszystkie aktywne powiadomienia z kategorii premium
    const { data: premiumNotifications, error: notifError } = await supabase
      .from('notifications')
      .select('id, category, created_at')
      .eq('category', 'premium')
      .order('created_at', { ascending: false });

    if (notifError) {
      console.error('Error fetching premium notifications:', notifError);
      return;
    }

    if (!premiumNotifications || premiumNotifications.length === 0) {
      console.log('No premium notifications found');
      return;
    }

    // Sprawdź które powiadomienia użytkownik już ma
    const { data: existingDelivered, error: existingError } = await supabase
      .from('delivered_notifications')
      .select('notification_id')
      .eq('user_id', userId);

    if (existingError) {
      console.error('Error fetching existing delivered notifications:', existingError);
    }

    const existingNotificationIds = new Set(
      (existingDelivered || []).map(d => d.notification_id)
    );

    // Filtruj tylko te powiadomienia, których użytkownik jeszcze nie ma
    const notificationsToDeliver = premiumNotifications.filter(
      n => !existingNotificationIds.has(n.id)
    );

    if (notificationsToDeliver.length === 0) {
      console.log('User already has all premium notifications');
      return;
    }

    // Przygotuj batch insert delivered_notifications
    const rows = notificationsToDeliver.map(n => ({
      user_id: userId,
      notification_id: n.id
    }));

    const { error: insertErr } = await supabase
      .from('delivered_notifications')
      .insert(rows);

    if (insertErr) {
      console.error('Error creating delivered notifications for new premium user:', insertErr);
    } else {
      console.log(`Successfully delivered ${rows.length} premium notifications to user ${userId}`);
    }
  } catch (error) {
    console.error('Error in deliverPremiumNotificationsToUser:', error);
  }
};

/* ============ CONTROLLERS ============ */

// GET /api/notifications?category=&limit=&offset=
export const getNotifications = async (req, res) => {
  try {
    const userId = req.userId;
    const { category = null } = req.query;

    const { data, error } = await supabase
      .from('delivered_notifications')
      .select(`
        id,
        user_id,
        seen,
        delivered_at,
        notification:notifications(*)
      `)
      .eq('user_id', userId)
      .order('delivered_at', { ascending: false });

    if (error) throw error;

    // filtr kategorii po stronie JS
    const filtered = category
      ? data.filter(n => n.notification?.category === category)
      : data;

    res.json({ success: true, data: filtered });
  } catch (err) {
    console.error('Error getNotifications:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/notifications/unread-count
export const getUnreadCount = async (req, res) => {
  try {
    const userId = req.userId;
    const { data, error, count } = await supabase
      .from('delivered_notifications')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .eq('seen', false);

    if (error) throw error;
    res.json({ success: true, unread: count || 0 });
  } catch (err) {
    console.error('Error getUnreadCount:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/notifications/mark-read  { deliveredIds: [id1,id2] }
export const markAsRead = async (req, res) => {
  try {
    const userId = req.userId;
    const { deliveredIds } = req.body;
    if (!Array.isArray(deliveredIds) || deliveredIds.length === 0) {
      return res.status(400).json({ success: false, message: 'deliveredIds is required' });
    }

    const { error } = await supabase
      .from('delivered_notifications')
      .update({ seen: true, seen_at: new Date() })
      .in('id', deliveredIds)
      .eq('user_id', userId);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Error markAsRead:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/notifications/subscribe { category }
export const subscribeCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const { category } = req.body;
    if (!category) return res.status(400).json({ success: false, message: 'category required' });

    const { error } = await supabase
      .from('user_subscriptions')
      .insert({ user_id: userId, category })
      .select();

    if (error) {
      // duplicate key handled silently
      if (error.code === '23505') {
        return res.json({ success: true }); // already subscribed
      }
      throw error;
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Error subscribeCategory:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/notifications/unsubscribe { category }
export const unsubscribeCategory = async (req, res) => {
  try {
    const userId = req.userId;
    const { category } = req.body;
    if (!category) return res.status(400).json({ success: false, message: 'category required' });

    const { error } = await supabase
      .from('user_subscriptions')
      .delete()
      .eq('user_id', userId)
      .eq('category', category);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Error unsubscribeCategory:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/notifications/create  (admin/create)
export const createNotification = async (req, res) => {
  try {
    // opcjonalnie sprawdź czy req.user is admin
    const { title, message, category, link, is_urgent = false, meta = null } = req.body;
    const notification = await Notification.create({ title, message, category, link, is_urgent, meta });

    // deliver to subscribers
    await deliverNotificationToSubscribers(notification);

    res.json({ success: true, data: notification });
  } catch (err) {
    console.error('Error createNotification:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/notifications/subscriptions
export const getUserSubscriptions = async (req, res) => {
  try {
    const userId = req.userId;
    const { data, error } = await supabase
      .from('user_subscriptions')
      .select('category')
      .eq('user_id', userId);

    if (error) throw error;
    res.json({ success: true, data: (data || []).map(r => r.category) });
  } catch (err) {
    console.error('Error getUserSubscriptions:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

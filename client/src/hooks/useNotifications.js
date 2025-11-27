// hooks/useNotifications.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { notificationsAPI } from '../services/api';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const mounted = useRef(true);

  const fetchAll = useCallback(async (opts = {}) => {
    setLoading(true);
    try {
      const resp = await notificationsAPI.getAll(opts);
      if (!mounted.current) return;
      const flattened = (resp.data || []).map(item => ({
        id: item.id,
        delivered_at: item.delivered_at,
        seen: item.seen,
        user_id: item.user_id,
        // propski z notification "wyciągnięte na zewnątrz"
        category: item.notification.category,
        created_at: item.notification.created_at,
        notification_id: item.notification.id, // żeby nie zgubić oryginalnego id notification
        is_urgent: item.notification.is_urgent,
        link: item.notification.link,
        message: item.notification.message,
        meta: item.notification.meta,
        title: item.notification.title
      }));
      setNotifications(flattened || []);
    } catch (err) {
      console.error('fetchAll notifications error', err);
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const resp = await notificationsAPI.getUnreadCount();
      if (!mounted.current) return;
      setUnreadCount(resp.unread || 0);
    } catch (err) {
      console.error('fetchUnreadCount error', err);
    }
  }, []);

  const fetchSubscriptions = useCallback(async () => {
    try {
      const resp = await notificationsAPI.getSubscriptions();
      if (!mounted.current) return;
      setSubscriptions(resp.data || []);
    } catch (err) {
      console.error('fetchSubscriptions error', err);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    fetchAll();
    fetchUnreadCount();
    fetchSubscriptions();

    // Odświeżaj powiadomienia gdy użytkownik wraca do zakładki
    const handler = () => {
      if (document.visibilityState === 'visible') {
        fetchAll();
        fetchUnreadCount();
      }
    };
    document.addEventListener('visibilitychange', handler);

    return () => {
      mounted.current = false;
      document.removeEventListener('visibilitychange', handler);
    };
  }, [fetchAll, fetchUnreadCount, fetchSubscriptions]);

  const markAsRead = async (deliveredIds = []) => {
    try {
      await notificationsAPI.markRead(deliveredIds);
      // optimistic update
      setNotifications(prev => prev.map(it => deliveredIds.includes(it.id) ? { ...it, seen: true } : it));
      setUnreadCount(c => Math.max(0, c - deliveredIds.length));
    } catch (err) {
      console.error('markAsRead error', err);
    }
  };

  const subscribe = async (category) => {
    try {
      await notificationsAPI.subscribe(category);
      await fetchSubscriptions();
    } catch (err) {
      console.error('subscribe error', err);
    }
  };

  const unsubscribe = async (category) => {
    try {
      await notificationsAPI.unsubscribe(category);
      await fetchSubscriptions();
    } catch (err) {
      console.error('unsubscribe error', err);
    }
  };

  return {
    notifications,
    unreadCount,
    loading,
    subscriptions,
    fetchAll,
    markAsRead,
    subscribe,
    unsubscribe
  };
};

export default useNotifications;

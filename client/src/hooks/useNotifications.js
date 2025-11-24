// hooks/useNotifications.js
import { useState, useEffect, useRef, useCallback } from 'react';
import { notificationsAPI } from '../services/api';

export const useNotifications = ({ pollInterval = 600000 } = {}) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);
  const mounted = useRef(true);
  const visibilityRef = useRef(document.visibilityState);

  const fetchAll = useCallback(async (opts = {}) => {
    setLoading(true);
    try {
      const resp = await notificationsAPI.getAll(opts);
      if (!mounted.current) return;
      setNotifications(resp.data || []);
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
      setUnreadCount(resp.data.unread || 0);
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

    // polling
    const id = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchAll();
        fetchUnreadCount();
      }
    }, pollInterval);

    // visibility change: fetch when tab becomes visible
    const handler = () => {
      if (document.visibilityState === 'visible') {
        fetchAll();
        fetchUnreadCount();
      }
    };
    document.addEventListener('visibilitychange', handler);

    return () => {
      mounted.current = false;
      clearInterval(id);
      document.removeEventListener('visibilitychange', handler);
    };
  }, [fetchAll, fetchUnreadCount, fetchSubscriptions, pollInterval]);

  const markAsRead = async (deliveredIds = []) => {
    try {
      await notificationsAPI.markRead(deliveredIds);
      // optimistic update
      setNotifications(prev => prev.map(it => deliveredIds.includes(it.delivered_id) ? { ...it, seen: true } : it));
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

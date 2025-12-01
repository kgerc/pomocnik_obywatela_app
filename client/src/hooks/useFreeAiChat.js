import { useState, useEffect, useCallback } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { useAuth } from '../contexts/AuthContext';

// Remove trailing slash to prevent double slashes in URLs
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000').replace(/\/$/, '');

export const useFreeAiChat = () => {
  const { isPremium } = useAppData();
  const { user, session } = useAuth();
  const [freeChatsInfo, setFreeChatsInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [canUseChat, setCanUseChat] = useState(true);

  // Pobierz status czatu AI
  const fetchChatStatus = useCallback(async () => {
    if (!user || !session) {
      setCanUseChat(false);
      setFreeChatsInfo(null);
      return;
    }

    try {
      setLoading(true);
      const token = session.access_token;

      const response = await fetch(`${API_URL}/api/ai/chat-status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Błąd podczas sprawdzania statusu czatu');
      }

      const data = await response.json();

      setCanUseChat(data.canUseChat);
      setFreeChatsInfo(data.freeChatsInfo);
    } catch (error) {
      console.error('Error fetching chat status:', error);
      setCanUseChat(false);
      setFreeChatsInfo(null);
    } finally {
      setLoading(false);
    }
  }, [user, session]);

  // Użyj darmowego czatu (inkrementuj licznik)
  const useFreeChat = useCallback(async () => {
    if (!user || !session) {
      throw new Error('Musisz być zalogowany');
    }

    try {
      const token = session.access_token;

      const response = await fetch(`${API_URL}/api/ai/use-free-chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.code === 'FREE_CHATS_EXHAUSTED') {
          // Wyczerpano darmowe czaty
          setFreeChatsInfo(data.freeChatsInfo);
          setCanUseChat(false);

          throw new Error('FREE_CHATS_EXHAUSTED');
        }

        throw new Error(data.error || 'Błąd podczas używania darmowego czatu');
      }

      if (data.success) {
        // Zaktualizuj info o darmowych czatach
        if (data.freeChatsInfo) {
          setFreeChatsInfo(data.freeChatsInfo);
          setCanUseChat(data.freeChatsInfo.canUse);
        }

        return {
          success: true,
          isPremium: data.isPremium,
          remaining: data.freeChatsInfo?.remaining
        };
      }

      return { success: false };
    } catch (error) {
      throw error;
    }
  }, [user, session]);

  // Pobierz status przy załadowaniu
  useEffect(() => {
    if (user) {
      fetchChatStatus();
    }
  }, [user, fetchChatStatus]);

  // Jeśli użytkownik ma premium, zawsze może używać czatu
  useEffect(() => {
    if (isPremium) {
      setCanUseChat(true);
      setFreeChatsInfo(null);
    }
  }, [isPremium]);

  return {
    canUseChat,
    freeChatsInfo,
    loading,
    useFreeChat,
    refreshStatus: fetchChatStatus,
    isPremium
  };
};

export default useFreeAiChat;

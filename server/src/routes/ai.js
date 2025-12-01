import express from 'express';
import { authenticateUser } from '../middleware/auth.js';
import User from '../models/User.js';
import Subscription from '../models/Subscription.js';

const router = express.Router();

// GET /api/ai/chat-status - sprawdź status dostępu do czatu AI
router.get('/chat-status', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Sprawdź czy użytkownik ma premium
    const hasPremium = await Subscription.hasActiveSubscription(userId);

    if (hasPremium) {
      return res.json({
        canUseChat: true,
        isPremium: true,
        freeChatsInfo: null
      });
    }

    // Jeśli nie ma premium, sprawdź darmowe użycia
    const freeChatsInfo = await User.getFreeAiChatInfo(userId);

    res.json({
      canUseChat: freeChatsInfo.canUse,
      isPremium: false,
      freeChatsInfo
    });
  } catch (error) {
    console.error('Error checking chat status:', error);
    res.status(500).json({ error: 'Błąd podczas sprawdzania statusu czatu' });
  }
});

// POST /api/ai/use-free-chat - użyj darmowego czatu (inkrementuj licznik)
router.post('/use-free-chat', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Sprawdź czy użytkownik ma premium
    const hasPremium = await Subscription.hasActiveSubscription(userId);

    if (hasPremium) {
      // Użytkownik premium może używać bez limitu
      return res.json({
        success: true,
        isPremium: true,
        message: 'Użytkownik premium - bez limitu'
      });
    }

    // Sprawdź czy może użyć darmowego czatu
    const canUse = await User.canUseFreeAiChat(userId);

    if (!canUse) {
      return res.status(403).json({
        error: 'Wykorzystałeś wszystkie darmowe czaty AI',
        code: 'FREE_CHATS_EXHAUSTED',
        freeChatsInfo: await User.getFreeAiChatInfo(userId)
      });
    }

    // Inkrementuj licznik
    await User.incrementFreeAiChatsUsed(userId);

    // Pobierz zaktualizowane info
    const freeChatsInfo = await User.getFreeAiChatInfo(userId);

    res.json({
      success: true,
      isPremium: false,
      freeChatsInfo,
      message: `Pozostało ${freeChatsInfo.remaining} darmowych czatów`
    });
  } catch (error) {
    console.error('Error using free chat:', error);
    res.status(500).json({ error: 'Błąd podczas używania darmowego czatu' });
  }
});

export default router;

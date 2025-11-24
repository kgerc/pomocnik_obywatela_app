// routes/notifications.js
import express from 'express';
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  subscribeCategory,
  unsubscribeCategory,
  createNotification,
  getUserSubscriptions
} from '../controllers/notificationsController.js';
import { authenticateUser } from '../middleware/auth.js'; // zakładam posiadasz

const router = express.Router();

router.use(authenticateUser);

router.get('/', getNotifications);
router.get('/unread-count', getUnreadCount);
router.post('/mark-read', markAsRead);
router.post('/subscribe', subscribeCategory);
router.post('/unsubscribe', unsubscribeCategory);
router.post('/create', createNotification); // chronić: tylko admin
router.get('/subscriptions', getUserSubscriptions);

export default router;

import express from 'express';
import {
  getAllHistory,
  addHistoryItem,
  getHistoryItem,
  deleteHistoryItem,
  clearHistory,
  searchHistory
} from '../controllers/historyController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// Wszystkie endpointy wymagają autentykacji
router.use(authenticateUser);

// GET /api/history - pobierz historię (z paginacją)
router.get('/', getAllHistory);

// GET /api/history/search?q=query - wyszukaj w historii
router.get('/search', searchHistory);

// GET /api/history/:id - pobierz element historii
router.get('/:id', getHistoryItem);

// POST /api/history - dodaj do historii
router.post('/', addHistoryItem);

// DELETE /api/history/:id - usuń element historii
router.delete('/:id', deleteHistoryItem);

// DELETE /api/history - wyczyść całą historię
router.delete('/', clearHistory);

export default router;
import express from 'express';
import {
  getAllSwiadczenia,
  getSwiadczenieById,
  searchSwiadczenia,
  getSwiadczeniaByCategory,
  getCategories
} from '../controllers/swiadczeniaController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Wszystkie endpointy są publiczne (z opcjonalną autentykacją)
router.use(optionalAuth);

// GET /api/swiadczenia - pobierz wszystkie świadczenia
router.get('/', getAllSwiadczenia);

// GET /api/swiadczenia/categories - pobierz kategorie
router.get('/categories', getCategories);

// GET /api/swiadczenia/search?q=query - wyszukaj świadczenia
router.get('/search', searchSwiadczenia);

// GET /api/swiadczenia/category/:category - pobierz świadczenia z kategorii
router.get('/category/:category', getSwiadczeniaByCategory);

// GET /api/swiadczenia/:id - pobierz świadczenie po ID
router.get('/:id', getSwiadczenieById);

export default router;
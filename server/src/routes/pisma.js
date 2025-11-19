import express from 'express';
import {
  getAllPisma,
  getPismoById,
  searchPisma,
  getPismaByCategory,
  getCategories
} from '../controllers/pismaController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Wszystkie endpointy są publiczne (z opcjonalną autentykacją)
router.use(optionalAuth);

// GET /api/pisma - pobierz wszystkie pisma
router.get('/', getAllPisma);

// GET /api/pisma/categories - pobierz kategorie
router.get('/categories', getCategories);

// GET /api/pisma/search?q=query - wyszukaj pisma
router.get('/search', searchPisma);

// GET /api/pisma/category/:category - pobierz pisma z kategorii
router.get('/category/:category', getPismaByCategory);

// GET /api/pisma/:id - pobierz pismo po ID
router.get('/:id', getPismoById);

export default router;
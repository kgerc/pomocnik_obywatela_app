import express from 'express';
import {
  getAllDotacje,
  getDotacjaById,
  searchDotacje,
  getDotacjeBySektor,
  getSektory,
  getActiveDotacje
} from '../controllers/dotacjeController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Wszystkie endpointy są publiczne (z opcjonalną autentykacją)
router.use(optionalAuth);

// GET /api/dotacje - pobierz wszystkie dotacje
router.get('/', getAllDotacje);

// GET /api/dotacje/active - pobierz aktywne dotacje
router.get('/active', getActiveDotacje);

// GET /api/dotacje/sektory - pobierz sektory
router.get('/sektory', getSektory);

// GET /api/dotacje/search?q=query - wyszukaj dotacje
router.get('/search', searchDotacje);

// GET /api/dotacje/sektor/:sektor - pobierz dotacje z sektora
router.get('/sektor/:sektor', getDotacjeBySektor);

// GET /api/dotacje/:id - pobierz dotację po ID
router.get('/:id', getDotacjaById);

export default router;
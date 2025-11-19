import express from 'express';
import {
  getPersonalization,
  updatePersonalization,
  getRecommendations,
  deletePersonalization
} from '../controllers/personalizationController.js';
import { authenticateUser } from '../middleware/auth.js';
import { personalizationValidation } from '../middleware/validators.js';

const router = express.Router();

// Wszystkie endpointy wymagają autentykacji
router.use(authenticateUser);

// GET /api/personalization - pobierz dane personalizacji
router.get('/', getPersonalization);

// GET /api/personalization/recommendations - pobierz rekomendacje
router.get('/recommendations', getRecommendations);

// PUT /api/personalization - aktualizuj dane personalizacji
router.put('/', personalizationValidation, updatePersonalization);

// DELETE /api/personalization - usuń dane personalizacji
router.delete('/', deletePersonalization);

export default router;
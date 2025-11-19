import express from 'express';
import {
  getAllFavorites,
  getFavoritesByType,
  addFavorite,
  removeFavorite,
  checkFavorite,
  clearAllFavorites
} from '../controllers/favoritesController.js';
import { authenticateUser } from '../middleware/auth.js';
import { favoriteValidation } from '../middleware/validators.js';

const router = express.Router();

// Wszystkie endpointy wymagają autentykacji
router.use(authenticateUser);

// GET /api/favorites - pobierz wszystkie ulubione
router.get('/', getAllFavorites);

// GET /api/favorites/check?itemType=X&itemId=Y - sprawdź czy element jest ulubiony
router.get('/check', checkFavorite);

// GET /api/favorites/type/:type - pobierz ulubione według typu
router.get('/type/:type', getFavoritesByType);

// POST /api/favorites - dodaj do ulubionych
router.post('/', favoriteValidation, addFavorite);

// DELETE /api/favorites - usuń z ulubionych
router.delete('/', favoriteValidation, removeFavorite);

// DELETE /api/favorites/clear - wyczyść wszystkie ulubione
router.delete('/clear', clearAllFavorites);

export default router;
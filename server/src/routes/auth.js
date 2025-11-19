import express from 'express';
import {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  resetPassword
} from '../controllers/authController.js';
import { authenticateUser } from '../middleware/auth.js';
import { registerValidation, loginValidation } from '../middleware/validators.js';

const router = express.Router();

// Public routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/reset-password', resetPassword);

// Protected routes
router.use(authenticateUser);
router.get('/me', getCurrentUser);
router.put('/profile', updateProfile);
router.post('/logout', logout);

export default router;
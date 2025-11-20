import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Database
import { initDatabase } from './config/database.js';

// Routes
import authRoutes from './routes/auth.js';
import swiadczeniaRoutes from './routes/swiadczenia.js';
import pismaRoutes from './routes/pisma.js';
import dotacjeRoutes from './routes/dotacje.js';
import favoritesRoutes from './routes/favorites.js';
import historyRoutes from './routes/history.js';
import personalizationRoutes from './routes/personalization.js';
import userDocumentsRouter from './routes/userDocuments.js';
import stripeRouter from './routes/stripe.js';
import userSettingsRouter from './routes/userSettings.js';
import promoCodesRouter from './routes/promoCodes.js';

// Middleware
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - CORS configuration for Vercel
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://pomocnik-obywatela-armiao144-krzysztof-gercs-projects.vercel.app',
  'https://pomocnik-obywatela-app.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.some(allowed => origin.startsWith(allowed.split('://')[0] + '://') && origin.includes(allowed.split('://')[1]))) {
      callback(null, true);
    } else {
      callback(null, true); // For development - in production you might want to restrict this
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 600 // Cache preflight for 10 minutes
}));

// IMPORTANT: Stripe webhook must be registered BEFORE express.json()
// to receive raw body for signature verification
app.use('/api/stripe/webhook', express.raw({ type: 'application/json' }), stripeRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/swiadczenia', swiadczeniaRoutes);
app.use('/api/pisma', pismaRoutes);
app.use('/api/dotacje', dotacjeRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/personalization', personalizationRoutes);
app.use('/api/documents', userDocumentsRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/settings', userSettingsRouter);
app.use('/api/promo-codes', promoCodesRouter);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API available at http://localhost:${PORT}`);
  console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  
  // Initialize database connection
  try {
    await initDatabase();
    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    console.error('   Please check your Supabase configuration in .env');
    process.exit(1);
  }
});

export default app;
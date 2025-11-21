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

// Middleware - CORS configuration for Vercel and custom domain
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
  'https://pomocnik-obywatela-app.vercel.app',
  'https://app.pomocnikobywatela.pl'
].filter(Boolean);

// Configure CORS properly for Vercel
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, or Postman)
    if (!origin) return callback(null, true);

    // Check if the origin is in the allowed list or is a Vercel preview URL
    if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all origins in development
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400, // Cache preflight for 24 hours
  preflightContinue: false,
  optionsSuccessStatus: 204
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

// Initialize database on startup (for Vercel, this happens on cold start)
initDatabase()
  .then(() => console.log('✅ Database initialized successfully'))
  .catch((error) => {
    console.error('❌ Database initialization failed:', error.message);
    console.error('   Please check your Supabase configuration');
  });

// Only listen on port in development (not in Vercel serverless)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📍 API available at http://localhost:${PORT}`);
    console.log(`🔍 Health check: http://localhost:${PORT}/health`);
  });
}

export default app;
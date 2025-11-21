# Vercel Deployment Guide

## Konfiguracja projektu dla Vercel

Projekt składa się z dwóch aplikacji:
- **Client** (Frontend React + Vite) - deployed to Vercel
- **Server** (Backend Express.js) - deployed to Vercel as serverless functions

## 1. Deployment Backend (Server)

### Struktura plików
```
server/
├── src/
│   ├── server.js          # Main entry point
│   ├── routes/            # API routes
│   ├── controllers/       # Business logic
│   ├── models/            # Data models
│   └── middleware/        # Auth, validators, etc.
├── vercel.json            # Vercel configuration
└── package.json
```

### Konfiguracja Vercel (server/vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/src/server.js"
    },
    {
      "src": "/health",
      "dest": "/src/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "/src/server.js"
    }
  ]
}
```

### Environment Variables (Vercel Dashboard)
W Vercel Dashboard dla projektu server dodaj następujące zmienne:

```env
NODE_ENV=production
PORT=3000
SUPABASE_URL=https://wxrbysggdngumldgqrsv.supabase.co
SUPABASE_SERVICE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
FRONTEND_URL=https://pomocnik-obywatela-app.vercel.app
CLIENT_URL=https://pomocnik-obywatela-app.vercel.app
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_PRICE_ID=price_your_stripe_price_id
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Deployment Commands
```bash
cd server
vercel --prod
```

## 2. Deployment Frontend (Client)

### Struktura plików
```
client/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   │   └── api.js        # API calls with URL handling
│   └── contexts/
├── vercel.json            # Vercel configuration
├── vite.config.js
└── package.json
```

### Konfiguracja Vercel (client/vercel.json)
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

### Environment Variables (Vercel Dashboard)
W Vercel Dashboard dla projektu client dodaj następujące zmienne:

```env
VITE_SUPABASE_URL=https://wxrbysggdngumldgqrsv.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_API_URL=https://pomocnik-obywatela-app-server.vercel.app
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
```

**WAŻNE:** `VITE_API_URL` NIE POWINIEN mieć trailing slash na końcu!
✅ Poprawnie: `https://pomocnik-obywatela-app-server.vercel.app`
❌ Źle: `https://pomocnik-obywatela-app-server.vercel.app/`

### Build Commands
```bash
cd client
npm run build
vercel --prod
```

## 3. Konfiguracja CORS

Backend (server/src/server.js) jest skonfigurowany aby akceptować requesty z:
- `http://localhost:5173` (development)
- `http://localhost:3000` (development)
- `https://pomocnik-obywatela-app.vercel.app` (production)
- Wszystkie domeny `*.vercel.app` (preview deployments)

CORS jest skonfigurowany z:
- `credentials: true` - dla cookies/auth headers
- `methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH']`
- `maxAge: 86400` - cache preflight requests for 24h

## 4. Obsługa API Calls w Client

Wszystkie miejsca gdzie używamy `VITE_API_URL` mają automatyczne usuwanie trailing slash:

```javascript
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');
```

To zapobiega problemom z double slash (`//api/...`) które powodują redirecty i błędy CORS.

## 5. Stripe Webhooks

### Konfiguracja w Stripe Dashboard

1. Przejdź do Stripe Dashboard → Developers → Webhooks
2. Dodaj endpoint: `https://pomocnik-obywatela-app-server.vercel.app/api/stripe/webhook`
3. Wybierz eventy:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Skopiuj Webhook Secret i dodaj do Vercel environment variables jako `STRIPE_WEBHOOK_SECRET`

### Test webhooków lokalnie
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test event
stripe trigger checkout.session.completed
```

## 6. Testing

### Test Backend Health
```bash
curl https://pomocnik-obywatela-app-server.vercel.app/health
```

Powinno zwrócić:
```json
{
  "status": "OK",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

### Test CORS
```bash
curl -H "Origin: https://pomocnik-obywatela-app.vercel.app" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Authorization" \
     -X OPTIONS \
     https://pomocnik-obywatela-app-server.vercel.app/api/stripe/subscription-status
```

## 7. Common Issues

### Problem: CORS Error - "Redirect is not allowed for a preflight request"
**Przyczyna:** Podwójny slash w URL (`//api/...`) powoduje redirect
**Rozwiązanie:** Sprawdź czy `VITE_API_URL` nie ma trailing slash

### Problem: 404 on API routes
**Przyczyna:** Niepoprawna konfiguracja routing w vercel.json
**Rozwiązanie:** Upewnij się że routes w vercel.json są poprawne

### Problem: Environment variables not working
**Przyczyna:** Vercel nie ma dostępu do zmiennych środowiskowych
**Rozwiązanie:**
1. Dodaj zmienne w Vercel Dashboard
2. Redeploy aplikację
3. Dla `VITE_*` variables - muszą być dostępne w build time

### Problem: Stripe webhook failing
**Przyczyna:** Niepoprawny webhook secret lub URL
**Rozwiązanie:**
1. Sprawdź URL webhooka w Stripe Dashboard
2. Upewnij się że `STRIPE_WEBHOOK_SECRET` jest poprawny
3. Sprawdź logi w Vercel Dashboard

## 8. Monitoring

### Vercel Dashboard
- Sprawdzaj logi deployment w Vercel Dashboard
- Monitoruj Function Logs dla błędów runtime
- Sprawdzaj Analytics dla performance

### Supabase Dashboard
- Monitoruj API usage
- Sprawdzaj Database logs
- Weryfikuj Auth events

### Stripe Dashboard
- Sprawdzaj Webhook delivery status
- Monitoruj Payment events
- Weryfikuj Customer subscriptions

## 9. Rollback

W przypadku problemów:
```bash
# Rollback do poprzedniej wersji
vercel rollback
```

Lub w Vercel Dashboard:
1. Przejdź do Deployments
2. Znajdź ostatni working deployment
3. Kliknij "Promote to Production"

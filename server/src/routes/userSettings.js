import express from 'express';
import UserSettings from '../models/UserSettings.js';
import User from '../models/User.js';
import { authenticateUser } from '../middleware/auth.js';
import { supabase } from '../config/supabase.js';

const router = express.Router();

// Pobierz ustawienia użytkownika
router.get('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const settings = await UserSettings.findByUserId(userId);

    res.json(settings.toJSON());
  } catch (error) {
    console.error('Error fetching settings:', error);
    res.status(500).json({ error: error.message });
  }
});

// Zaktualizuj ustawienia
router.put('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const settings = await UserSettings.update(userId, updates);

    res.json(settings.toJSON());
  } catch (error) {
    console.error('Error updating settings:', error);
    res.status(500).json({ error: error.message });
  }
});

// Zaktualizuj dane osobowe
router.put('/profile', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, phone, address } = req.body;

    // Zaktualizuj profil
    if (fullName !== undefined) {
      await User.update(userId, { fullName });
    }

    // Zaktualizuj ustawienia (telefon, adres)
    if (phone !== undefined || address !== undefined) {
      await UserSettings.update(userId, { phone, address });
    }

    // Pobierz zaktualizowane dane
    const user = await User.findById(userId);
    const settings = await UserSettings.findByUserId(userId);

    res.json({
      user: user.toJSON(),
      settings: settings.toJSON()
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ error: error.message });
  }
});

// Zmień hasło
router.post('/change-password', authenticateUser, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Wymagane oba hasła' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Nowe hasło musi mieć minimum 6 znaków' });
    }

    // Najpierw zweryfikuj obecne hasło przez próbę logowania
    const user = await supabase.auth.getUser(req.headers.authorization.split(' ')[1]);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.data.user.email,
      password: currentPassword
    });

    if (signInError) {
      return res.status(401).json({ error: 'Nieprawidłowe obecne hasło' });
    }

    // Zmień hasło
    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) throw error;

    res.json({ message: 'Hasło zostało zmienione' });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: error.message });
  }
});

// Włącz/wyłącz 2FA
router.post('/2fa/toggle', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { enabled, method } = req.body;

    const settings = await UserSettings.update(userId, {
      twoFactorEnabled: enabled,
      twoFactorMethod: enabled ? method : null
    });

    res.json({
      message: enabled ? '2FA zostało włączone' : '2FA zostało wyłączone',
      settings: settings.toJSON()
    });
  } catch (error) {
    console.error('Error toggling 2FA:', error);
    res.status(500).json({ error: error.message });
  }
});

// Eksportuj dane użytkownika (GDPR)
router.get('/export-data', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const format = req.query.format || 'json';

    const userData = await UserSettings.exportUserData(userId);

    if (format === 'json') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Content-Disposition', `attachment; filename="user-data-${userId}.json"`);
      res.json(userData);
    } else if (format === 'csv') {
      // Prosty CSV export (możesz rozszerzyć)
      const csv = convertToCSV(userData);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', `attachment; filename="user-data-${userId}.csv"`);
      res.send(csv);
    } else {
      res.status(400).json({ error: 'Nieobsługiwany format' });
    }
  } catch (error) {
    console.error('Error exporting data:', error);
    res.status(500).json({ error: error.message });
  }
});

// Usuń konto
router.delete('/delete-account', authenticateUser, async (req, res) => {
  try {
    const userId = req.user.id;
    const { confirmation } = req.body;

    if (confirmation !== 'DELETE_MY_ACCOUNT') {
      return res.status(400).json({ error: 'Nieprawidłowe potwierdzenie' });
    }

    await UserSettings.deleteAccount(userId);

    res.json({ message: 'Konto zostało usunięte' });
  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ error: error.message });
  }
});

// Wyloguj się ze wszystkich urządzeń
router.post('/logout-all-devices', authenticateUser, async (req, res) => {
  try {
    // Supabase nie ma bezpośredniego API do wylogowania ze wszystkich sesji
    // Można zaimplementować poprzez:
    // 1. Refresh token rotation
    // 2. Blacklist tokenów
    // 3. Zmiana hasła (wymusza wylogowanie)

    res.json({
      message: 'Funkcja w przygotowaniu. Możesz zmienić hasło, aby wymusić wylogowanie ze wszystkich urządzeń.'
    });
  } catch (error) {
    console.error('Error logging out all devices:', error);
    res.status(500).json({ error: error.message });
  }
});

// Helper function do konwersji na CSV
function convertToCSV(data) {
  const lines = [];

  // Profile
  if (data.profile) {
    lines.push('=== PROFIL ===');
    Object.entries(data.profile).forEach(([key, value]) => {
      lines.push(`${key},${value}`);
    });
  }

  // Settings
  if (data.settings) {
    lines.push('\n=== USTAWIENIA ===');
    Object.entries(data.settings).forEach(([key, value]) => {
      lines.push(`${key},${typeof value === 'object' ? JSON.stringify(value) : value}`);
    });
  }

  return lines.join('\n');
}

export default router;

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Remove trailing slash to prevent double slashes in URLs
const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

export const useSettings = () => {
  const { user, session } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSettings = async () => {
    if (!user || !session) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const token = session.access_token;

      const response = await fetch(`${API_URL}/api/settings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Nie udało się pobrać ustawień');

      const data = await response.json();
      setSettings(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching settings:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (updates) => {
    if (!session) {
      throw new Error('Brak sesji użytkownika');
    }

    try {
      setLoading(true);
      const token = session.access_token;

      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updates)
      });

      if (!response.ok) throw new Error('Nie udało się zaktualizować ustawień');

      const data = await response.json();
      setSettings(data);
      setError(null);
      return data;
    } catch (err) {
      console.error('Error updating settings:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    if (!session) {
      throw new Error('Brak sesji użytkownika');
    }

    try {
      setLoading(true);
      const { supabase } = await import('../services/supabaseClient');

      // Zaktualizuj profil w auth.users metadata używając client-side Supabase
      if (profileData.fullName !== undefined) {
        const { error } = await supabase.auth.updateUser({
          data: { full_name: profileData.fullName }
        });

        if (error) throw error;
      }

      setError(null);
      return { message: 'Profil został zaktualizowany' };
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changePassword = async (currentPassword, newPassword) => {
    if (!session || !user) {
      throw new Error('Brak sesji użytkownika');
    }

    try {
      setLoading(true);
      const { supabase } = await import('../services/supabaseClient');

      // Najpierw zweryfikuj obecne hasło przez próbę logowania
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword
      });

      if (signInError) {
        throw new Error('Nieprawidłowe obecne hasło');
      }

      // Zmień hasło używając Supabase client-side
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      setError(null);
      return { message: 'Hasło zostało zmienione' };
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const toggle2FA = async (enabled, method = 'email') => {
    if (!session) {
      throw new Error('Brak sesji użytkownika');
    }

    try {
      setLoading(true);
      const token = session.access_token;

      const response = await fetch(`${API_URL}/api/settings/2fa/toggle`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ enabled, method })
      });

      if (!response.ok) throw new Error('Nie udało się przełączyć 2FA');

      const data = await response.json();
      setSettings(data.settings);
      setError(null);
      return data;
    } catch (err) {
      console.error('Error toggling 2FA:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const exportData = async (format = 'json') => {
    if (!session) {
      throw new Error('Brak sesji użytkownika');
    }

    try {
      const token = session.access_token;

      const response = await fetch(`${API_URL}/api/settings/export-data?format=${format}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Nie udało się wyeksportować danych');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `user-data.${format}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error exporting data:', err);
      setError(err.message);
      throw err;
    }
  };

  const deleteAccount = async (confirmed) => {
    if (!session) {
      throw new Error('Brak sesji użytkownika');
    }

    try {
      setLoading(true);
      const token = session.access_token;

      const response = await fetch(`${API_URL}/api/settings/delete-account`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ confirmed })
      });

      if (!response.ok) throw new Error('Nie udało się usunąć konta');

      const data = await response.json();
      setError(null);
      return data;
    } catch (err) {
      console.error('Error deleting account:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [user]);

  return {
    settings,
    loading,
    error,
    refetch: fetchSettings,
    updateSettings,
    updateProfile,
    changePassword,
    toggle2FA,
    exportData,
    deleteAccount
  };
};

export default useSettings;

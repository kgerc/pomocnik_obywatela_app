import { useState, useEffect } from 'react';
import { favoritesAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export const useFavorites = () => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { showSuccess } = useToast();

  // Fetch favorites on mount
  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await favoritesAPI.getAll();
      setFavorites(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (itemType, itemId) => {
    if (!user) return false;
    
    try {
      await favoritesAPI.add(itemType, itemId);
      showSuccess('Dokument pomyślnie dodany do listy ulubionych');
      await fetchFavorites(); // Refresh list
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error adding favorite:', err);
      return false;
    }
  };

  const removeFavorite = async (itemType, itemId) => {
    if (!user) return false;
    
    try {
      await favoritesAPI.remove(itemType, itemId);
      showSuccess('Dokument pomyślnie usunięty z listy ulubionych');
      await fetchFavorites(); // Refresh list
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error removing favorite:', err);
      return false;
    }
  };

  const isFavorite = (itemId) => {
    return favorites.some(fav => fav.item_id === itemId);
  };

  const toggleFavorite = async (itemType, itemId) => {
    if (isFavorite(itemId)) {
      return await removeFavorite(itemType, itemId);
    } else {
      return await addFavorite(itemType, itemId);
    }
  };

  return {
    favorites,
    loading,
    error,
    fetchFavorites,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
};

export default useFavorites;
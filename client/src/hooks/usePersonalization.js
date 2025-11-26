import { useState, useEffect } from 'react';
import { personalizationAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export const usePersonalization = () => {
  const { user } = useAuth();
  const [personalizationData, setPersonalizationData] = useState({
    liczba_dzieci: 0,
    wiek_dzieci: [],
    dochod_na_osobe: 0,
    niepelnosprawnosc: false,
    status_zawodowy: 'zatrudniony',
    stan_cywilny: 'single',
    wlasnosc_mieszkania: 'wynajem'
  });
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch personalization data on mount
  useEffect(() => {
    if (user) {
      loadPersonalization();
    }
  }, [user]);

  const loadPersonalization = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);
    try {
      const response = await personalizationAPI.get();
      if (response.data) {
        setPersonalizationData(response.data);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error loading personalization:', err);
    } finally {
      setLoading(false);
    }
  };

  const savePersonalization = async () => {
    if (!user) return false;

    setRecommendationsLoading(true);
    setError(null);
    try {
      await personalizationAPI.update(personalizationData);
      // Fetch recommendations after update
      const recResponse = await personalizationAPI.getRecommendations();
      setRecommendations(recResponse.data || []);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error saving personalization:', err);
      return false;
    } finally {
      setRecommendationsLoading(false);
    }
  };

  const deletePersonalization = async () => {
    if (!user) return false;

    try {
      await personalizationAPI.delete();
      setPersonalizationData({
        liczba_dzieci: 0,
        wiek_dzieci: [],
        dochod_na_osobe: 0,
        niepelnosprawnosc: false,
        status_zawodowy: 'zatrudniony',
        stan_cywilny: 'single',
        wlasnosc_mieszkania: 'wynajem'
      });
      setRecommendations([]);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting personalization:', err);
      return false;
    }
  };

  return {
    personalizationData,
    setPersonalizationData,
    recommendations,
    loading,
    recommendationsLoading,
    error,
    loadPersonalization,
    savePersonalization,
    deletePersonalization
  };
};

export default usePersonalization;

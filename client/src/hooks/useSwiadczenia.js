import { useState, useEffect } from 'react';
import { swiadczeniaAPI } from '../services/api';

export const useSwiadczenia = () => {
  const [swiadczenia, setSwiadczenia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await swiadczeniaAPI.getAll();
      setSwiadczenia(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching swiadczenia:', err);
    } finally {
      setLoading(false);
    }
  };

  const search = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await swiadczeniaAPI.search(query);
      return response.data || [];
    } catch (err) {
      setError(err.message);
      console.error('Error searching swiadczenia:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await swiadczeniaAPI.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching swiadczenie:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    swiadczenia,
    loading,
    error,
    fetchAll,
    search,
    getById
  };
};

export default useSwiadczenia;
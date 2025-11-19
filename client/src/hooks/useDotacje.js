import { useState, useEffect } from 'react';
import { dotacjeAPI } from '../services/api';

export const useDotacje = () => {
  const [dotacje, setDotacje] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await dotacjeAPI.getAll();
      setDotacje(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dotacje:', err);
    } finally {
      setLoading(false);
    }
  };

  const search = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await dotacjeAPI.search(query);
      return response.data || [];
    } catch (err) {
      setError(err.message);
      console.error('Error searching dotacje:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await dotacjeAPI.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dotacja:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getBySektor = async (sektor) => {
    setLoading(true);
    setError(null);
    try {
      const response = await dotacjeAPI.getBySektor(sektor);
      return response.data || [];
    } catch (err) {
      setError(err.message);
      console.error('Error fetching dotacje by sektor:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getSektory = async () => {
    try {
      const response = await dotacjeAPI.getSektory();
      return response.data || [];
    } catch (err) {
      console.error('Error fetching sektory:', err);
      return [];
    }
  };

  return {
    dotacje,
    loading,
    error,
    fetchAll,
    search,
    getById,
    getBySektor,
    getSektory
  };
};

export default useDotacje;
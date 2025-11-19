import { useState, useEffect } from 'react';
import { pismaAPI } from '../services/api';

export const usePisma = () => {
  const [pisma, setPisma] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await pismaAPI.getAll();
      setPisma(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching pisma:', err);
    } finally {
      setLoading(false);
    }
  };

  const search = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pismaAPI.search(query);
      return response.data || [];
    } catch (err) {
      setError(err.message);
      console.error('Error searching pisma:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pismaAPI.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching pismo:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getByCategory = async (category) => {
    setLoading(true);
    setError(null);
    try {
      const response = await pismaAPI.getByCategory(category);
      return response.data || [];
    } catch (err) {
      setError(err.message);
      console.error('Error fetching pisma by category:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      const response = await pismaAPI.getCategories();
      return response.data || [];
    } catch (err) {
      console.error('Error fetching categories:', err);
      return [];
    }
  };

  return {
    pisma,
    loading,
    error,
    fetchAll,
    search,
    getById,
    getByCategory,
    getCategories
  };
};

export default usePisma;
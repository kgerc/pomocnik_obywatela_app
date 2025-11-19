import { useState, useEffect } from 'react';
import { userDocumentsAPI } from '../services/api';

export const useUserDocuments = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);

  const fetchAll = async (params = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userDocumentsAPI.getAll(params);
      setDocuments(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching documents:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await userDocumentsAPI.getStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const search = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userDocumentsAPI.search(query);
      return response.data || [];
    } catch (err) {
      setError(err.message);
      console.error('Error searching documents:', err);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const getById = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userDocumentsAPI.getById(id);
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching document:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const upload = async (file, metadata) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userDocumentsAPI.upload(file, metadata);
      // Dodaj nowy dokument do listy
      setDocuments(prev => [response.data, ...prev]);
      // Odśwież statystyki
      await fetchStats();
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error uploading document:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const saveFromApp = async (documentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userDocumentsAPI.saveFromApp(documentData);
      // Dodaj nowy dokument do listy
      setDocuments(prev => [response.data, ...prev]);
      // Odśwież statystyki
      await fetchStats();
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error saving document from app:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, updates) => {
    setLoading(true);
    setError(null);
    try {
      const response = await userDocumentsAPI.update(id, updates);
      // Zaktualizuj dokument w liście
      setDocuments(prev =>
        prev.map(doc => (doc.id === id ? response.data : doc))
      );
      return response.data;
    } catch (err) {
      setError(err.message);
      console.error('Error updating document:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteDocument = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await userDocumentsAPI.delete(id);
      // Usuń dokument z listy
      setDocuments(prev => prev.filter(doc => doc.id !== id));
      // Odśwież statystyki
      await fetchStats();
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Error deleting document:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    documents,
    loading,
    error,
    stats,
    fetchAll,
    fetchStats,
    search,
    getById,
    upload,
    saveFromApp,
    update,
    deleteDocument
  };
};

export default useUserDocuments;

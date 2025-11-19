import { supabase } from './supabaseClient.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Uniwersalna funkcja do wywołań API
const apiCall = async (endpoint, options = {}) => {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (session?.access_token) {
      headers['Authorization'] = `Bearer ${session.access_token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Wystąpił błąd');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// API dla świadczeń
export const swiadczeniaAPI = {
  getAll: () => apiCall('/api/swiadczenia'),
  getById: (id) => apiCall(`/api/swiadczenia/${id}`),
  search: (query) => apiCall(`/api/swiadczenia/search?q=${encodeURIComponent(query)}`),
  getByCategory: (category) => apiCall(`/api/swiadczenia/category/${encodeURIComponent(category)}`),
  getCategories: () => apiCall('/api/swiadczenia/categories'),
};

// API dla pism
export const pismaAPI = {
  getAll: () => apiCall('/api/pisma'),
  getById: (id) => apiCall(`/api/pisma/${id}`),
  search: (query) => apiCall(`/api/pisma/search?q=${encodeURIComponent(query)}`),
  getByCategory: (category) => apiCall(`/api/pisma/category/${encodeURIComponent(category)}`),
  getCategories: () => apiCall('/api/pisma/categories'),
};

// API dla dotacji
export const dotacjeAPI = {
  getAll: () => apiCall('/api/dotacje'),
  getById: (id) => apiCall(`/api/dotacje/${id}`),
  search: (query) => apiCall(`/api/dotacje/search?q=${encodeURIComponent(query)}`),
  getBySektor: (sektor) => apiCall(`/api/dotacje/sektor/${encodeURIComponent(sektor)}`),
  getSektory: () => apiCall('/api/dotacje/sektory'),
  getActive: () => apiCall('/api/dotacje/active'),
};

// API dla ulubionych
export const favoritesAPI = {
  getAll: () => apiCall('/api/favorites'),
  add: (itemType, itemId) => 
    apiCall('/api/favorites', {
      method: 'POST',
      body: JSON.stringify({ itemType, itemId }),
    }),
  remove: (itemType, itemId) => 
    apiCall('/api/favorites', {
      method: 'DELETE',
      body: JSON.stringify({ itemType, itemId }),
    }),
};

// API dla historii czatu
export const historyAPI = {
  getAll: () => apiCall('/api/history'),
  add: (message) => 
    apiCall('/api/history', {
      method: 'POST',
      body: JSON.stringify(message),
    }),
  clear: () => 
    apiCall('/api/history', {
      method: 'DELETE',
    }),
};

// API dla personalizacji
export const personalizationAPI = {
  get: () => apiCall('/api/personalization'),
  update: (data) => apiCall('/api/personalization', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  getRecommendations: () => apiCall('/api/personalization/recommendations'),
};

// API dla AI
export const aiAPI = {
  chat: (query, context) => 
    apiCall('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ query, context }),
    }),
};

export default {
  swiadczenia: swiadczeniaAPI,
  pisma: pismaAPI,
  dotacje: dotacjeAPI,
  favorites: favoritesAPI,
  history: historyAPI,
  personalization: personalizationAPI,
  ai: aiAPI,
};
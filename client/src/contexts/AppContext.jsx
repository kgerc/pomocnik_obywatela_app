import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AppContext = createContext({});

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp musi być użyty wewnątrz AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [personalizationData, setPersonalizationData] = useState({
    liczba_dzieci: 0,
    wiek_dzieci: [],
    dochod_na_osobe: 0,
    niepelnosprawnosc: false,
    status_zawodowy: 'zatrudniony',
    stan_cywilny: 'single',
    wlasnosc_mieszkania: 'wynajem'
  });

  // Load from localStorage on mount (fallback gdy nie ma połączenia z API)
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedHistory = localStorage.getItem('chatHistory');
    const savedPersonalization = localStorage.getItem('personalizationData');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setChatHistory(JSON.parse(savedHistory));
    if (savedPersonalization) setPersonalizationData(JSON.parse(savedPersonalization));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (favorites.length >= 0) {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, [favorites]);

  useEffect(() => {
    if (chatHistory.length >= 0) {
      localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
    }
  }, [chatHistory]);

  useEffect(() => {
    localStorage.setItem('personalizationData', JSON.stringify(personalizationData));
  }, [personalizationData]);

  const addToFavorites = (itemId) => {
    if (!favorites.includes(itemId)) {
      setFavorites([...favorites, itemId]);
    }
  };

  const removeFromFavorites = (itemId) => {
    setFavorites(favorites.filter(id => id !== itemId));
  };

  const toggleFavorite = (itemId) => {
    if (favorites.includes(itemId)) {
      removeFromFavorites(itemId);
    } else {
      addToFavorites(itemId);
    }
  };

  const isFavorite = (itemId) => {
    return favorites.includes(itemId);
  };

  const addToChatHistory = (message) => {
    setChatHistory([...chatHistory, message]);
  };

  const clearChatHistory = () => {
    setChatHistory([]);
    localStorage.removeItem('chatHistory');
  };

  const updatePersonalization = (updates) => {
    setPersonalizationData({ ...personalizationData, ...updates });
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    chatHistory,
    addToChatHistory,
    clearChatHistory,
    personalizationData,
    updatePersonalization,
    setPersonalizationData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
import React, { useState, useEffect } from 'react';
import Header from '../components/layout/Header';
import TabNavigation from '../components/layout/TabNavigation';
import ChatTab from '../components/tabs/ChatTab';
import PersonalizationTab from '../components/tabs/PersonalizationTab';
import FavoritesTab from '../components/tabs/FavoritesTab';
import NotificationsTab from '../components/tabs/NotificationsTab';
import DotacjeTab from '../components/tabs/DotacjeTab';
import PismaTab from '../components/tabs/PismaTab';
import HistoriaTab from '../components/tabs/HistoriaTab';
import SettingsTab from '../components/tabs/SettingsTab';
import PremiumGate from '../components/premium/PremiumGate';
import { useFavorites } from '../hooks/useFavorites';
import { useSwiadczenia } from '../hooks/useSwiadczenia';
import { useSubscription } from '../hooks/useSubscription';
import { personalizationAPI } from '../services/api';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [query, setQuery] = useState('');
  const { favorites, toggleFavorite: toggleFavAPI, isFavorite } = useFavorites();
  const { swiadczenia, fetchAll } = useSwiadczenia();
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

  // Fetch personalization data on mount
  useEffect(() => {
    loadPersonalization();
    fetchAll();
  }, []);

  const loadPersonalization = async () => {
    try {
      const response = await personalizationAPI.get();
      if (response.data) {
        setPersonalizationData(response.data);
      }
    } catch (error) {
      console.error('Error loading personalization:', error);
    }
  };

  const savePersonalization = async () => {
    try {
      await personalizationAPI.update(personalizationData);
      // Fetch recommendations after update
      const recResponse = await personalizationAPI.getRecommendations();
      setRecommendations(recResponse.data || []);
    } catch (error) {
      console.error('Error saving personalization:', error);
    }
  };

  const handleToggleFavorite = async (itemId) => {
    await toggleFavAPI('swiadczenie', itemId);
  };

  // Get favorite swiadczenia
  const favoriteSwiadczenia = swiadczenia.filter(sw => 
    favorites.some(fav => fav.item_id === sw.id)
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '1015px',
        margin: '0 auto'
      }}>
        <Header setActiveTab={setActiveTab} />

        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <TabNavigation
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            favoritesCount={favorites.length}
          />
        </div>

        {/* Chat Tab - PREMIUM */}
        {activeTab === 'chat' && (
          <PremiumGate feature="asystenta AI">
            <ChatTab
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          </PremiumGate>
        )}

        {/* Personalization Tab - PREMIUM */}
        {activeTab === 'personalization' && (
          <PremiumGate feature="personalizacji świadczeń">
            <PersonalizationTab
              personalizationData={personalizationData}
              setPersonalizationData={setPersonalizationData}
              savePersonalization={savePersonalization}
              recommendations={recommendations}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={isFavorite}
            />
          </PremiumGate>
        )}

        {/* Favorites Tab - FREE */}
        {activeTab === 'favorites' && (
          <FavoritesTab
            favoriteSwiadczenia={favoriteSwiadczenia}
            onToggleFavorite={handleToggleFavorite}
          />
        )}

        {/* Notifications Tab - PREMIUM */}
        {activeTab === 'notifications' && (
          <PremiumGate feature="powiadomień">
            <NotificationsTab
              setActiveTab={setActiveTab}
              setQuery={setQuery}
            />
          </PremiumGate>
        )}

        {/* Dotacje Tab - PREMIUM */}
        {activeTab === 'dotacje' && (
          <PremiumGate feature="przeglądu dotacji">
            <DotacjeTab />
          </PremiumGate>
        )}

        {/* Pisma Tab - FREE */}
        {activeTab === 'pisma' && (
          <PismaTab />
        )}

        {/* Historia Tab - FREE */}
        {activeTab === 'historia' && (
          <HistoriaTab />
        )}

        {/* Settings Tab - FREE */}
        {activeTab === 'settings' && (
          <SettingsTab />
        )}
      </div>
    </div>
  );
};

export default MainApp;
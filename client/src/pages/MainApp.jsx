import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import Header from '../components/layout/Header';
import TabNavigation from '../components/layout/TabNavigation';
import PersonalizationTab from '../components/tabs/PersonalizationTab';
import FavoritesTab from '../components/tabs/FavoritesTab';
import NotificationsTab from '../components/tabs/NotificationsTab';
import DotacjeTab from '../components/tabs/DotacjeTab';
import PismaTab from '../components/tabs/PismaTab';
import SwiadczeniaTab from '../components/tabs/SwiadczeniaTab';
import HistoriaTab from '../components/tabs/HistoriaTab';
import TwojeDokumentyTab from '../components/tabs/TwojeDokumentyTab';
import SettingsTab from '../components/tabs/SettingsTab';
import PremiumGate from '../components/premium/PremiumGate';
import { useFavorites } from '../hooks/useFavorites';
import { useSwiadczenia } from '../hooks/useSwiadczenia';
import { useSubscription } from '../hooks/useSubscription';
import { personalizationAPI } from '../services/api';

const MainApp = () => {
  const [activeTab, setActiveTab] = useState('swiadczenia');
  const { favorites, toggleFavorite: toggleFavAPI, isFavorite } = useFavorites();
  const { swiadczenia, fetchAll } = useSwiadczenia();
  const { isPremium, loading: subscriptionLoading } = useSubscription();
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

  // Show loader while subscription status is loading
  if (subscriptionLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '60px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <Loader size={48} className="spin" style={{ color: '#2c5aa0', marginBottom: '20px' }} />
          <p style={{ color: '#5a6c7d', fontSize: '16px' }}>Ładowanie...</p>
          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
            .spin {
              animation: spin 1s linear infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

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

        {/* Favorites Tab - PREMIUM */}
        {activeTab === 'favorites' && (
          <PremiumGate feature="ulubionych">
            <FavoritesTab
              favoriteSwiadczenia={favoriteSwiadczenia}
              onToggleFavorite={handleToggleFavorite}
            />
          </PremiumGate>
        )}

        {/* Notifications Tab - PREMIUM */}
        {activeTab === 'notifications' && (
          <PremiumGate feature="powiadomień">
            <NotificationsTab
              setActiveTab={setActiveTab}
              setQuery={() => {}}
            />
          </PremiumGate>
        )}

        {/* Swiadczenia Tab - FREE (but AI search inside is premium) */}
        {activeTab === 'swiadczenia' && (
          <SwiadczeniaTab
            preloadedIsPremium={isPremium}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {/* Pisma Tab - FREE (but AI search inside is premium) */}
        {activeTab === 'pisma' && (
          <PismaTab preloadedIsPremium={isPremium} />
        )}

        {/* Dotacje Tab - PREMIUM */}
        {activeTab === 'dotacje' && (
          <PremiumGate feature="dotacji i grantów">
            <DotacjeTab />
          </PremiumGate>
        )}

        {/* Twoje Dokumenty Tab - FREE (but upload is premium) */}
        {activeTab === 'dokumenty' && (
          <TwojeDokumentyTab />
        )}

        {/* Historia Tab - PREMIUM */}
        {activeTab === 'historia' && (
          <PremiumGate feature="historii rozmów z AI">
            <HistoriaTab />
          </PremiumGate>
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
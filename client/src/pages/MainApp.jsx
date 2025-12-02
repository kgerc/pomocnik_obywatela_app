import { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import Header from '../components/layout/Header';
import TabNavigation from '../components/layout/TabNavigation';
import PersonalizationTab from '../components/tabs/PersonalizationTab';
import FavoritesTab from '../components/tabs/FavoritesTab';
import NotificationsTab from '../components/tabs/NotificationsTab';
import DotacjeTab from '../components/tabs/DotacjeTab';
import PismaTab from '../components/tabs/PismaTab';
import GeneratorPismTab from '../components/tabs/GeneratorPismTab';
import SwiadczeniaTab from '../components/tabs/SwiadczeniaTab';
import HistoriaTab from '../components/tabs/HistoriaTab';
import TwojeDokumentyTab from '../components/tabs/TwojeDokumentyTab';
import SettingsTab from '../components/tabs/SettingsTab';
import PremiumGate from '../components/premium/PremiumGate';
import { AppDataProvider, useAppData } from '../contexts/AppDataContext';

const MainAppContent = () => {
  const [activeTab, setActiveTab] = useState('swiadczenia');
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const { isPremium } = useAppData();

  // Check if user returned from payment and should go to generator tab
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('returnToGenerator') === 'true') {
      setActiveTab('generator');
      // Clean up URL
      const newUrl = window.location.pathname + window.location.search.replace(/&?returnToGenerator=true/, '');
      window.history.replaceState({}, document.title, newUrl);
    }
  }, []);

  return (
    <>
      {/* Global Checkout Loading Overlay */}
      {loadingCheckout && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-in'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px 60px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.3s ease-out'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}>
              <Loader size={40} color="white" className="spin" />
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#2c3e50',
              margin: '0 0 12px 0'
            }}>
              Przekierowujemy do płatności
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#5a6c7d',
              margin: 0,
              maxWidth: '280px'
            }}>
              Przygotowujemy bezpieczną sesję płatności Stripe...
            </p>
          </div>
        </div>
      )}

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
            favoritesCount={0}
          />
        </div>

        {/* Personalization Tab - PREMIUM */}
        {activeTab === 'personalization' && (
          <PremiumGate feature="personalizacji świadczeń" setLoadingCheckout={setLoadingCheckout}>
            <PersonalizationTab />
          </PremiumGate>
        )}

        {/* Favorites Tab - PREMIUM */}
        {activeTab === 'favorites' && (
          <PremiumGate feature="ulubionych" setLoadingCheckout={setLoadingCheckout}>
            <FavoritesTab />
          </PremiumGate>
        )}

        {/* Notifications Tab - PREMIUM */}
        {activeTab === 'notifications' && (
          <PremiumGate feature="powiadomień" setLoadingCheckout={setLoadingCheckout}>
            <NotificationsTab
              setActiveTab={setActiveTab}
              setQuery={() => {}}
            />
          </PremiumGate>
        )}

        {/* Swiadczenia Tab - FREE (but AI search inside is premium) */}
        {activeTab === 'swiadczenia' && (
          <SwiadczeniaTab />
        )}

        {/* Pisma Tab - FREE (but AI search inside is premium) */}
        {activeTab === 'pisma' && (
          <PismaTab preloadedIsPremium={isPremium} />
        )}

        {/* Generator Pism Tab - FREE (with preview, pay per document or premium for unlimited) */}
        {activeTab === 'generator' && (
          <GeneratorPismTab />
        )}

        {/* Dotacje Tab - FREE (but AI search inside is premium) */}
        {activeTab === 'dotacje' && (
          <DotacjeTab preloadedIsPremium={isPremium}/>
        )}

        {/* Twoje Dokumenty Tab - FREE (but upload is premium) */}
        {activeTab === 'dokumenty' && (
          <PremiumGate feature="Dokumenty" setLoadingCheckout={setLoadingCheckout}>
            <TwojeDokumentyTab />
          </PremiumGate>
        )}

        {/* Historia Tab - PREMIUM */}
        {activeTab === 'historia' && (
          <PremiumGate feature="historii rozmów z AI" setLoadingCheckout={setLoadingCheckout}>
            <HistoriaTab />
          </PremiumGate>
        )}

        {/* Settings Tab - FREE */}
        {activeTab === 'settings' && (
          <SettingsTab />
        )}
      </div>
    </div>
    </>
  );
};

const MainApp = () => {
  return (
    <AppDataProvider>
      <MainAppContent />
    </AppDataProvider>
  );
};

export default MainApp;

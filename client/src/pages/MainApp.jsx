import { useState } from 'react';
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
import { AppDataProvider, useAppData } from '../contexts/AppDataContext';

const MainAppContent = () => {
  const [activeTab, setActiveTab] = useState('swiadczenia');
  const { isPremium } = useAppData();

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
            favoritesCount={0}
          />
        </div>

        {/* Personalization Tab - PREMIUM */}
        {activeTab === 'personalization' && (
          <PremiumGate feature="personalizacji świadczeń">
            <PersonalizationTab />
          </PremiumGate>
        )}

        {/* Favorites Tab - PREMIUM */}
        {activeTab === 'favorites' && (
          <PremiumGate feature="ulubionych">
            <FavoritesTab />
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
          <SwiadczeniaTab />
        )}

        {/* Pisma Tab - FREE (but AI search inside is premium) */}
        {activeTab === 'pisma' && (
          <PismaTab preloadedIsPremium={isPremium} />
        )}

        {/* Dotacje Tab - FREE (but AI search inside is premium) */}
        {activeTab === 'dotacje' && (
          <DotacjeTab preloadedIsPremium={isPremium}/>
        )}

        {/* Twoje Dokumenty Tab - FREE (but upload is premium) */}
        {activeTab === 'dokumenty' && (
          <PremiumGate feature="Dokumenty">
            <TwojeDokumentyTab />
          </PremiumGate>
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

const MainApp = () => {
  return (
    <AppDataProvider>
      <MainAppContent />
    </AppDataProvider>
  );
};

export default MainApp;

import React from 'react';
import { Heart, User, Bell, TrendingUp, Edit, History, Crown, Shield, FolderOpen } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab, favoritesCount }) => {
  const tabs = [
    { id: 'swiadczenia', icon: Shield, label: 'Świadczenia', premium: false },
    { id: 'pisma', icon: Edit, label: 'Pisma', premium: false },
    { id: 'dotacje', icon: TrendingUp, label: 'Dotacje', premium: false },
    { id: 'dokumenty', icon: FolderOpen, label: 'Dokumenty', premium: true },
    { id: 'historia', icon: History, label: 'Historia Rozmów', premium: true },
    { id: 'favorites', icon: Heart, label: `Ulubione ${favoritesCount > 0 ? `(${favoritesCount})` : ''}`, premium: true },
    { id: 'personalization', icon: User, label: 'Personalizacja', premium: true },
    { id: 'notifications', icon: Bell, label: 'Powiadomienia', premium: true }
  ];

  return (
    <div style={{
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginTop: '20px'
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            background: activeTab === tab.id ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
            color: activeTab === tab.id ? 'white' : '#2c5aa0',
            border: 'none',
            padding: '10px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s',
            position: 'relative'
          }}
          onMouseOver={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.background = '#e8f4f8';
            }
          }}
          onMouseOut={(e) => {
            if (activeTab !== tab.id) {
              e.currentTarget.style.background = '#f8f9fb';
            }
          }}
        >
          <tab.icon size={18} />
          {tab.label}
          {tab.premium && (
            <Crown
              size={14}
              color={activeTab === tab.id ? '#ffd700' : '#ffd700'}
              fill={activeTab === tab.id ? '#ffd700' : 'none'}
              style={{ marginLeft: '-2px' }}
            />
          )}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
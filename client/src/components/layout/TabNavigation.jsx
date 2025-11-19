import React from 'react';
import { MessageSquare, Heart, User, Bell, TrendingUp, Edit } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab, favoritesCount }) => {
  const tabs = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'personalization', icon: User, label: 'Personalizacja' },
    { id: 'favorites', icon: Heart, label: `Ulubione ${favoritesCount > 0 ? `(${favoritesCount})` : ''}` },
    { id: 'notifications', icon: Bell, label: 'Powiadomienia' },
    { id: 'dotacje', icon: TrendingUp, label: 'Dotacje' },
    { id: 'pisma', icon: Edit, label: 'Pisma i Wnioski' }
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
            transition: 'all 0.2s'
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
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
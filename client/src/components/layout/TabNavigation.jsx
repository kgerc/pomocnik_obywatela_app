import React, { useState, useEffect } from 'react';
import { Heart, User, Bell, TrendingUp, Edit, History, Crown, Shield, FolderOpen, Wand2, ChevronDown } from 'lucide-react';

const TabNavigation = ({ activeTab, setActiveTab }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDropdown, setShowDropdown] = useState(false);

  const tabs = [
    { id: 'swiadczenia', icon: Shield, label: 'Świadczenia', premium: false },
    { id: 'pisma', icon: Edit, label: 'Pisma', premium: false },
    { id: 'dotacje', icon: TrendingUp, label: 'Dotacje', premium: false },
    { id: 'generator', icon: Wand2, label: 'Generator Pism', premium: false },
    { id: 'dokumenty', icon: FolderOpen, label: 'Dokumenty', premium: true },
    { id: 'historia', icon: History, label: 'Historia Rozmów', premium: true },
    { id: 'favorites', icon: Heart, label: `Ulubione`, premium: true },
    { id: 'personalization', icon: User, label: 'Personalizacja', premium: true },
    { id: 'notifications', icon: Bell, label: 'Powiadomienia', premium: true }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  if (isMobile) {
    return (
      <div style={{ marginTop: '20px', position: 'relative' }}>
        {/* Mobile: Select-style dropdown */}
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            border: 'none',
            padding: '14px 16px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activeTabData && (
              <>
                <activeTabData.icon size={18} />
                {activeTabData.label}
                {activeTabData.premium && (
                  <Crown size={14} color="#ffd700" fill="#ffd700" />
                )}
              </>
            )}
          </div>
          <ChevronDown size={18} style={{
            transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }} />
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '8px',
            background: 'white',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            zIndex: 1000,
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowDropdown(false);
                }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: activeTab === tab.id ? '#f0f7ff' : 'transparent',
                  border: 'none',
                  padding: '14px 16px',
                  cursor: 'pointer',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  fontSize: '14px',
                  color: activeTab === tab.id ? '#2c5aa0' : '#2c3e50',
                  transition: 'background 0.2s',
                  borderBottom: '1px solid #f0f0f0'
                }}
                onMouseOver={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = '#f8f9fb';
                  }
                }}
                onMouseOut={(e) => {
                  if (activeTab !== tab.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <tab.icon size={18} />
                {tab.label}
                {tab.premium && (
                  <Crown
                    size={14}
                    color="#ffd700"
                    fill={activeTab === tab.id ? '#ffd700' : 'none'}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Desktop: original button layout
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
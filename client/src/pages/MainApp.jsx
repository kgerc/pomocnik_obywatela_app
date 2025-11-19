import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, History, User, Bell, Edit, TrendingUp, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import ChatInterface from '../components/chat/ChatInterface';
import SwiadczenieCard from '../components/swiadczenia/SwiadczenieCard';
import { useFavorites } from '../hooks/useFavorites';
import { useSwiadczenia } from '../hooks/useSwiadczenia';
import { personalizationAPI } from '../services/api';

const MainApp = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chat');
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

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
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
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '15px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px'
              }}>
                📋
              </div>
              <div>
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: '800',
                  color: '#2c3e50',
                  margin: 0
                }}>
                  Pomocnik Obywatela
                </h1>
                <p style={{
                  color: '#5a6c7d',
                  fontSize: '14px',
                  margin: 0
                }}>
                  Witaj, {user?.email}
                </p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fee',
                color: '#c33',
                border: '2px solid #c33',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              <LogOut size={18} />
              Wyloguj
            </button>
          </div>

          {/* Navigation */}
          <div style={{
            display: 'flex',
            gap: '10px',
            flexWrap: 'wrap',
            marginTop: '20px'
          }}>
            {[
              { id: 'chat', icon: MessageSquare, label: 'Chat' },
              { id: 'personalization', icon: User, label: 'Personalizacja' },
              { id: 'favorites', icon: Heart, label: `Ulubione ${favorites.length > 0 ? `(${favorites.length})` : ''}` },
            ].map(tab => (
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
                  fontSize: '14px'
                }}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Tab */}
        {activeTab === 'chat' && (
          <ChatInterface 
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite}
          />
        )}

        {/* Personalization Tab */}
        {activeTab === 'personalization' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            marginBottom: '20px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <User size={24} color="#2c5aa0" />
              Personalizacja - Powiedz nam o sobie
            </h2>
            <p style={{
              color: '#5a6c7d',
              marginBottom: '25px',
              lineHeight: '1.6'
            }}>
              Podaj podstawowe informacje o swojej sytuacji, a pokażemy Ci świadczenia, które mogą Ci przysługiwać.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              marginBottom: '25px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Liczba dzieci:
                </label>
                <input
                  type="number"
                  min="0"
                  value={personalizationData.liczba_dzieci}
                  onChange={(e) => setPersonalizationData({
                    ...personalizationData,
                    liczba_dzieci: parseInt(e.target.value) || 0
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Dochód na osobę (zł/miesiąc):
                </label>
                <input
                  type="number"
                  min="0"
                  value={personalizationData.dochod_na_osobe}
                  onChange={(e) => setPersonalizationData({
                    ...personalizationData,
                    dochod_na_osobe: parseInt(e.target.value) || 0
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontWeight: '600',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  Status zawodowy:
                </label>
                <select
                  value={personalizationData.status_zawodowy}
                  onChange={(e) => setPersonalizationData({
                    ...personalizationData,
                    status_zawodowy: e.target.value
                  })}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e1e8ed',
                    borderRadius: '8px',
                    fontSize: '16px',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="zatrudniony">Zatrudniony</option>
                  <option value="bezrobotny">Bezrobotny</option>
                  <option value="student">Student</option>
                  <option value="emeryt">Emeryt/Rencista</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                color: '#2c3e50'
              }}>
                <input
                  type="checkbox"
                  checked={personalizationData.niepelnosprawnosc}
                  onChange={(e) => setPersonalizationData({
                    ...personalizationData,
                    niepelnosprawnosc: e.target.checked
                  })}
                  style={{
                    width: '20px',
                    height: '20px',
                    cursor: 'pointer'
                  }}
                />
                Niepełnosprawność (Ty lub członek rodziny)
              </label>
            </div>

            <button
              onClick={savePersonalization}
              style={{
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '16px',
                marginBottom: '30px'
              }}
            >
              Zapisz i pokaż rekomendacje
            </button>

            {recommendations.length > 0 && (
              <div style={{
                background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
                padding: '25px',
                borderRadius: '12px',
                border: '2px solid #2c5aa0'
              }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '15px'
                }}>
                  Świadczenia dla Ciebie ({recommendations.length})
                </h3>
                {recommendations.map(sw => (
                  <SwiadczenieCard
                    key={sw.id}
                    swiadczenie={sw}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={isFavorite(sw.id)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
          }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <Heart size={24} color="#2c5aa0" />
              Ulubione świadczenia ({favorites.length})
            </h2>

            {favoriteSwiadczenia.length === 0 ? (
              <div style={{
                background: '#f8f9fb',
                padding: '40px',
                borderRadius: '12px',
                textAlign: 'center',
                color: '#5a6c7d'
              }}>
                <Heart size={48} color="#ccc" style={{ marginBottom: '15px' }} />
                <p style={{ fontSize: '18px', marginBottom: '10px' }}>
                  Nie masz jeszcze ulubionych świadczeń
                </p>
                <p>
                  Kliknij ikonę serca przy interesujących Cię świadczeniach, aby zapisać je tutaj.
                </p>
              </div>
            ) : (
              favoriteSwiadczenia.map(sw => (
                <SwiadczenieCard
                  key={sw.id}
                  swiadczenie={sw}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={true}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainApp;
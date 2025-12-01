import React, { useState } from 'react';
import { Sparkles, Search, Loader, Eraser } from 'lucide-react';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import ChatPremiumModal from '../premium/ChatPremiumModal';
import { useFreeAiChat } from '../../hooks/useFreeAiChat';

const ChatPreview = ({
  query,
  setQuery,
  onSearch,
  loading,
  result,
  placeholder = "Zapytaj AI o świadczenia...",
  title = "Zapytaj AI",
  onClear,
  renderCard
}) => {
  const { isPremium } = useAppData();
  const { user } = useAuth();
  const { canUseChat, freeChatsInfo, useFreeChat } = useFreeAiChat();
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const handleFocus = () => {
    if (!user) {
      return; // Nie rób nic jeśli użytkownik nie jest zalogowany
    }
    if (!isPremium && !canUseChat) {
      setShowPremiumModal(true);
    }
  };

  const handleSearch = async () => {
    if (!user) {
      alert('Musisz być zalogowany, aby korzystać z czatu AI');
      return;
    }

    if (isPremium) {
      // Premium użytkownicy mogą używać bez limitu
      if (onSearch) {
        await onSearch();
      }
      return;
    }

    if (onSearch) {
      await onSearch();
    }

    // Sprawdź czy może użyć darmowego czatu
    if (!canUseChat) {
      setShowPremiumModal(true);
      return;
    }

    // Inkrementuj licznik w tle (nie blokuj UI)
    useFreeChat().catch(error => {
      console.error('Error incrementing free chat counter:', error);
      // Jeśli błąd, nie przerywaj - użytkownik już dostał wynik
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleClearResult = () => {
    if (onClear) {
      onClear();
    }
  };

  return (
    <>
      <ChatPremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        freeChatsInfo={freeChatsInfo}
      />

      <div style={{
        background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '30px',
        border: '2px solid #2c5aa0',
        position: 'relative'
      }}>
        {/* Overlay dla użytkowników bez premium i bez darmowych czatów */}
        {!isPremium && !canUseChat && (
          <div
            onClick={() => setShowPremiumModal(true)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(2px)',
              borderRadius: '12px',
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <div style={{
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: '600',
              boxShadow: '0 4px 16px rgba(44, 90, 160, 0.3)',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              gap: '8px'
            }}>
              <Sparkles size={18} />
              Wykorzystałeś darmowe czaty - przejdź na Premium
            </div>
          </div>
        )}

        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Sparkles size={20} color="#2c5aa0" />
          {title}
          {!isPremium && freeChatsInfo && user && (
            <span style={{
              fontSize: '13px',
              fontWeight: '600',
              color: freeChatsInfo.remaining > 0 ? '#10b981' : '#e74c3c',
              background: freeChatsInfo.remaining > 0 ? '#d1fae5' : '#fee',
              padding: '4px 10px',
              borderRadius: '12px',
              marginLeft: 'auto'
            }}>
              {freeChatsInfo.remaining > 0
                ? freeChatsInfo.remaining === 1
                  ? 'Pozostał 1 darmowy czat'
                  : `Pozostały ${freeChatsInfo.remaining} darmowe czaty`
                : 'Brak darmowych czatów'}
            </span>
          )}
        </h3>

        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          disabled={loading}
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '15px',
            fontSize: '16px',
            border: '2px solid #2c5aa0',
            background: 'white',
            color: 'black',
            borderRadius: '8px',
            resize: 'vertical',
            fontFamily: 'inherit',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />

        {/* Kontener przycisków */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '10px'
        }}>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            style={{
              background: loading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 25px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (loading || !query.trim()) ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => !loading && query.trim() && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? (
              <>
                <Loader size={18} className="spin" />
                Szukam...
              </>
            ) : (
              <>
                <Search size={18} />
                Znajdź
              </>
            )}
          </button>

          {result && (
            <button
              onClick={handleClearResult}
              style={{
                background: '#d9534f',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <Eraser size={18} />
              Wyczyść
            </button>
          )}
        </div>
      </div>

      {/* AI Result */}
      {result && (
        <div style={{
          marginTop: '20px',
          background: 'white',
          padding: '20px',
          borderRadius: '12px',
          marginBottom: '30px'
        }}>
          <div style={{
            color: '#2c3e50',
            lineHeight: '1.6',
            marginBottom: '20px',
            whiteSpace: 'pre-wrap'
          }}>
            {result.content}
          </div>

          {result.matches && result.matches.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {result.matches.map((match, idx) =>
                renderCard ? renderCard(match, idx) : (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      background: '#f8f9fb',
                      borderRadius: '8px',
                      border: '1px solid #e1e8ed',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#e8f4f8';
                      e.currentTarget.style.borderColor = '#2c5aa0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = '#f8f9fb';
                      e.currentTarget.style.borderColor = '#e1e8ed';
                    }}
                  >
                    <div style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      marginBottom: '4px'
                    }}>
                      {match.nazwa}
                    </div>
                    <div style={{
                      fontSize: '13px',
                      color: '#5a6c7d',
                      lineHeight: '1.5'
                    }}>
                      {match.krotki_opis || match.opis}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatPreview;

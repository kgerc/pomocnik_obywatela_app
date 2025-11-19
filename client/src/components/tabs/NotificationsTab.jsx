import React from 'react';
import { Bell, AlertCircle, CheckCircle } from 'lucide-react';

const NotificationsTab = ({ setActiveTab, setQuery }) => {
  const categories = ['Świadczenia rodzinne', 'Pomoc społeczna', 'Energia', 'ZUS', 'Rehabilitacja'];

  return (
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
        <Bell size={24} color="#2c5aa0" />
        Powiadomienia o zmianach
      </h2>

      {/* Urgent Alert */}
      <div style={{
        background: 'linear-gradient(135deg, #fff4e6 0%, #ffe8cc 100%)',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid #ff9800',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '10px'
        }}>
          <AlertCircle size={24} color="#ff9800" />
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#2c3e50',
            margin: 0
          }}>
            Ostatni dzwonek na dotację gazową - nabór kończy się 17 listopada
          </h3>
        </div>
        <p style={{
          color: '#5a6c7d',
          lineHeight: '1.6',
          marginBottom: '10px'
        }}>
          <strong>Program Czyste Powietrze 2025</strong> - To już ostatnie dni, by złożyć wniosek o dofinansowanie na kocioł gazowy w ramach programu Czyste Powietrze. Termin przedłużonego naboru upływa w poniedziałek 17 listopada 2025 r.
        </p>
        <a
          href="https://www.gov.pl/web/nfosigw/czyste-powietrze"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: '#2c5aa0',
            fontWeight: '600',
            textDecoration: 'none',
            transition: 'opacity 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = '0.7'}
          onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
        >
          Sprawdź szczegóły →
        </a>
      </div>

      {/* New Benefit Alert */}
      <div style={{
        background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid #2c5aa0',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '10px'
        }}>
          <CheckCircle size={24} color="#10b981" />
          <h3 style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#2c3e50',
            margin: 0
          }}>
            Nowe świadczenie dostępne
          </h3>
        </div>
        <p style={{
          color: '#5a6c7d',
          lineHeight: '1.6',
          marginBottom: '10px'
        }}>
          <strong>Bon energetyczny 2025</strong> - nowy program wsparcia dla gospodarstw domowych o niższych dochodach. Sprawdź, czy się kwalifikujesz!
        </p>
        <button
          onClick={() => {
            setActiveTab('chat');
            setQuery('Bon energetyczny - kto może dostać?');
          }}
          style={{
            background: '#2c5aa0',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#4a7dc9';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#2c5aa0';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Sprawdź szczegóły
        </button>
      </div>

      {/* Subscription Section */}
      <div style={{
        background: '#f8f9fb',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid #e1e8ed'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '15px'
        }}>
          Subskrybuj powiadomienia
        </h3>
        <p style={{
          color: '#5a6c7d',
          lineHeight: '1.6',
          marginBottom: '15px'
        }}>
          Otrzymuj powiadomienia o zmianach w przepisach i nowych świadczeniach dla Twoich ulubionych kategorii.
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {categories.map(cat => (
            <label key={cat} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'white',
              padding: '10px 15px',
              borderRadius: '8px',
              color: '#2c3e50',
              border: '2px solid #e1e8ed',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = '#2c5aa0';
              e.currentTarget.style.background = '#f8f9fb';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#e1e8ed';
              e.currentTarget.style.background = 'white';
            }}
            >
              <input 
                type="checkbox" 
                style={{ 
                  cursor: 'pointer',
                  width: '18px',
                  height: '18px',
                  accentColor: '#2c5aa0'
                }} 
              />
              <span style={{ fontSize: '14px', fontWeight: '600' }}>{cat}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationsTab;
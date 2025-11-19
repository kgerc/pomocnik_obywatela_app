import React from 'react';
import { User } from 'lucide-react';
import SwiadczenieCard from '../../components/swiadczenia/SwiadczenieCard';

const PersonalizationTab = ({ 
  personalizationData, 
  setPersonalizationData, 
  savePersonalization,
  recommendations,
  onToggleFavorite,
  isFavorite 
}) => {
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
          marginBottom: '30px',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
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
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite(sw.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalizationTab;
import React from 'react';
import { CheckCircle, FileText, ExternalLink, Download, Heart } from 'lucide-react';

const SwiadczenieCard = ({ swiadczenie, onToggleFavorite, isFavorite, showFavoriteButton = true }) => {
  return (
    <div style={{
      background: '#f8f9fb',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '15px',
      border: '2px solid #e1e8ed',
      position: 'relative'
    }}>
      {showFavoriteButton && (
        <button
          onClick={() => onToggleFavorite(swiadczenie.id)}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '24px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.2)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      )}
      
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '10px'
      }}>
        <CheckCircle size={24} color="#10b981" />
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#2c3e50',
          margin: 0,
          paddingRight: '40px'
        }}>
          {swiadczenie.nazwa}
        </h3>
      </div>
      
      <div style={{
        display: 'inline-block',
        background: '#e8f4f8',
        color: '#2c5aa0',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '15px'
      }}>
        {swiadczenie.kategoria}
      </div>

      <p style={{
        color: '#5a6c7d',
        lineHeight: '1.6',
        marginBottom: '15px'
      }}>
        {swiadczenie.krotki_opis}
      </p>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={18} color="#2c5aa0" />
          Kto może skorzystać:
        </h4>
        <ul style={{
          paddingLeft: '20px',
          color: '#5a6c7d',
          lineHeight: '1.8'
        }}>
          {swiadczenie.kwalifikacja?.map((k, idx) => (
            <li key={idx}>{k}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <FileText size={18} color="#2c5aa0" />
          Potrzebne dokumenty:
        </h4>
        <ul style={{
          paddingLeft: '20px',
          color: '#5a6c7d',
          lineHeight: '1.8'
        }}>
          {swiadczenie.dokumenty?.map((d, idx) => (
            <li key={idx}>{d}</li>
          ))}
        </ul>
      </div>

      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap'
      }}>
        <a
          href={swiadczenie.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <ExternalLink size={16} />
          Oficjalna strona
        </a>
        
        {swiadczenie.pdf && (
          <a
            href={swiadczenie.pdf}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: '#f8f9fb',
              color: '#2c5aa0',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '14px',
              border: '2px solid #2c5aa0',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Download size={16} />
            Pobierz PDF
          </a>
        )}
      </div>
      
      {swiadczenie.ostatnia_aktualizacja && (
        <div style={{
          marginTop: '15px',
          fontSize: '12px',
          color: '#999',
          fontStyle: 'italic'
        }}>
          Ostatnia aktualizacja: {swiadczenie.ostatnia_aktualizacja}
        </div>
      )}
    </div>
  );
};

export default SwiadczenieCard;
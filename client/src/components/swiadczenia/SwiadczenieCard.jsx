import { useState } from 'react';
import { CheckCircle, Info, Heart } from 'lucide-react';
import SwiadczenieDetailsModal from './SwiadczenieDetailsModal';

const SwiadczenieCard = ({ swiadczenie, onToggleFavorite, isFavorite, showFavoriteButton = true }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={{
        background: '#f8f9fb',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '15px',
        border: '2px solid #e1e8ed',
        position: 'relative',
        transition: 'all 0.3s ease'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)';
        e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      >
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
          <Heart size={24} color="#2c5aa0" />
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#2c3e50',
            margin: 0,
            paddingRight: '40px',
            lineHeight: '1.3'
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

        {/* Kwalifikacja - preview */}
        {swiadczenie.kwalifikacja && swiadczenie.kwalifikacja.length > 0 && (
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px'
          }}>
            <h5 style={{
              fontSize: '14px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle size={16} color="#10b981" />
              Kwalifikacja:
            </h5>
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              color: '#5a6c7d',
              fontSize: '13px',
              lineHeight: '1.6'
            }}>
              {swiadczenie.kwalifikacja.slice(0, 3).map((kwal, idx) => (
                <li key={idx} style={{ marginBottom: '6px' }}>{kwal}</li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={() => setShowModal(true)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Info size={16} />
          Sprawdź szczegóły
        </button>

        {swiadczenie.ostatnia_aktualizacja && (
          <div style={{
            marginTop: '12px',
            fontSize: '12px',
            color: '#999',
            fontStyle: 'italic',
            textAlign: 'center'
          }}>
            Ostatnia aktualizacja: {swiadczenie.ostatnia_aktualizacja}
          </div>
        )}
      </div>

      {showModal && (
        <SwiadczenieDetailsModal
          swiadczenie={swiadczenie}
          onClose={() => setShowModal(false)}
          onToggleFavorite={onToggleFavorite}
          isFavorite={isFavorite}
          showFavoriteButton={showFavoriteButton}
        />
      )}
    </>
  );
};

export default SwiadczenieCard;

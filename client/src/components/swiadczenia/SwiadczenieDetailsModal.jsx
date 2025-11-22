import React from 'react';
import { X, CheckCircle, FileText, ExternalLink, Download, Clock, MapPin, AlertCircle } from 'lucide-react';

const SwiadczenieDetailsModal = ({ swiadczenie, onClose }) => {
  if (!swiadczenie) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
          color: 'white',
          padding: '25px 30px',
          borderRadius: '16px 16px 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          zIndex: 10
        }}>
          <div style={{ flex: 1, paddingRight: '20px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 10px 0',
              lineHeight: '1.3'
            }}>
              {swiadczenie.nazwa}
            </h2>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {swiadczenie.kategoria}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
              flexShrink: 0
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '30px' }}>
          {/* Opis */}
          <p style={{
            color: '#5a6c7d',
            lineHeight: '1.7',
            fontSize: '16px',
            marginBottom: '30px'
          }}>
            {swiadczenie.krotki_opis}
          </p>

          {/* Kogo dotyczy */}
          {swiadczenie.kogo_dotyczy && swiadczenie.kogo_dotyczy.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={20} color="#2c5aa0" />
                Kogo dotyczy
              </h4>
              <ul style={{
                paddingLeft: '20px',
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0
              }}>
                {swiadczenie.kogo_dotyczy.map((k, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{k}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Kwalifikacja */}
          {swiadczenie.kwalifikacja && swiadczenie.kwalifikacja.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={20} color="#10b981" />
                Kto może skorzystać
              </h4>
              <ul style={{
                paddingLeft: '20px',
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0
              }}>
                {swiadczenie.kwalifikacja.map((k, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{k}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Dokumenty */}
          {swiadczenie.dokumenty && swiadczenie.dokumenty.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FileText size={20} color="#2c5aa0" />
                Potrzebne dokumenty
              </h4>
              <ul style={{
                paddingLeft: '20px',
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0
              }}>
                {swiadczenie.dokumenty.map((d, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Kiedy złożyć */}
          {swiadczenie.kiedy_zlozyc && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Clock size={20} color="#2c5aa0" />
                Kiedy złożyć wniosek
              </h4>
              <p style={{
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0,
                paddingLeft: '28px'
              }}>
                {swiadczenie.kiedy_zlozyc}
              </p>
            </div>
          )}

          {/* Gdzie złożyć */}
          {swiadczenie.gdzie_zlozyc && swiadczenie.gdzie_zlozyc.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <MapPin size={20} color="#2c5aa0" />
                Gdzie złożyć wniosek
              </h4>
              <ul style={{
                paddingLeft: '20px',
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0
              }}>
                {swiadczenie.gdzie_zlozyc.map((g, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{g}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Uwagi */}
          {swiadczenie.uwagi && (
            <div style={{
              marginBottom: '25px',
              padding: '15px',
              background: '#f0f7ff',
              borderLeft: '4px solid #2c5aa0',
              borderRadius: '8px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#2c5aa0',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={18} />
                Uwagi
              </h4>
              <p style={{
                color: '#5a6c7d',
                lineHeight: '1.7',
                margin: 0,
                fontSize: '14px'
              }}>
                {swiadczenie.uwagi}
              </p>
            </div>
          )}

          {/* Ostatnia aktualizacja */}
          {swiadczenie.ostatnia_aktualizacja && (
            <div style={{
              fontSize: '13px',
              color: '#999',
              fontStyle: 'italic',
              marginBottom: '25px'
            }}>
              Ostatnia aktualizacja: {swiadczenie.ostatnia_aktualizacja}
            </div>
          )}

          {/* Przyciski akcji */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            paddingTop: '10px',
            borderTop: '1px solid #e1e8ed'
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
                padding: '14px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'transform 0.2s',
                flex: '1',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <ExternalLink size={18} />
              Źródło - Oficjalna strona
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
                  background: 'white',
                  color: '#2c5aa0',
                  padding: '14px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '15px',
                  border: '2px solid #2c5aa0',
                  transition: 'all 0.2s',
                  flex: '1',
                  justifyContent: 'center'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#2c5aa0';
                  e.currentTarget.style.color = 'white';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#2c5aa0';
                }}
              >
                <Download size={18} />
                Pobierz PDF
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiadczenieDetailsModal;

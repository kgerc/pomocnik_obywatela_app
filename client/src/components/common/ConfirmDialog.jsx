import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ message, onConfirm, onCancel, confirmText = 'Potwierdź', cancelText = 'Anuluj' }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      animation: 'fadeIn 0.2s ease-out'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        maxWidth: '450px',
        width: '90%',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        animation: 'slideUp 0.3s ease-out'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              background: '#fee',
              borderRadius: '50%',
              padding: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <AlertTriangle size={24} color="#c33" />
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#2c3e50',
              margin: 0
            }}>
              Potwierdzenie
            </h3>
          </div>
          <button
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.6,
              transition: 'opacity 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
            onMouseOut={(e) => e.currentTarget.style.opacity = '0.6'}
          >
            <X size={24} color="#5a6c7d" />
          </button>
        </div>

        <p style={{
          color: '#5a6c7d',
          fontSize: '16px',
          lineHeight: '1.6',
          marginBottom: '25px'
        }}>
          {message}
        </p>

        <div style={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'flex-end'
        }}>
          <button
            onClick={onCancel}
            style={{
              background: '#f8f9fb',
              color: '#5a6c7d',
              border: '2px solid #e1e8ed',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#e1e8ed';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#f8f9fb';
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            style={{
              background: 'linear-gradient(135deg, #c33 0%, #e55 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '15px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(204, 51, 51, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {confirmText}
          </button>
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ConfirmDialog;

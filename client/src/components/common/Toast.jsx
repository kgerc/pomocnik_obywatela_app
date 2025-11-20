import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        onClose();
      }, 300); // Match animation duration
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match animation duration
  };

  const styles = {
    success: {
      background: '#d1fae5',
      border: '2px solid #10b981',
      color: '#065f46',
      icon: CheckCircle
    },
    error: {
      background: '#fee',
      border: '2px solid #fcc',
      color: '#c33',
      icon: AlertCircle
    }
  };

  const style = styles[type] || styles.success;
  const Icon = style.icon;

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      minWidth: '300px',
      maxWidth: '500px',
      background: style.background,
      border: style.border,
      borderRadius: '8px',
      padding: '12px 16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: style.color,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
      animation: isExiting ? 'slideOut 0.3s ease-out forwards' : 'slideIn 0.3s ease-out'
    }}>
      <Icon size={20} />
      <span style={{ flex: 1, fontWeight: '500' }}>{message}</span>
      <button
        onClick={handleClose}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: style.color,
          opacity: 0.7,
          transition: 'opacity 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
        onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
      >
        <X size={18} />
      </button>

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(100%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;

import React, { useState } from 'react';
import { X, CreditCard, Lock } from 'lucide-react';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

const PaymentModal = ({ isOpen, onClose, documentId, userEmail, onPaymentSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(userEmail || '');

  if (!isOpen) return null;

  const handlePayForDocument = async () => {
    if (!email || !email.includes('@')) {
      setError('Podaj prawidłowy adres email');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/api/stripe/create-guest-document-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            documentId: documentId,
            email: email
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Nie udało się utworzyć płatności');
      }

      const data = await response.json();

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error('Error creating payment:', err);
      setError(err.message || 'Wystąpił błąd podczas tworzenia płatności');
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        padding: '20px'
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          position: 'relative',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '15px',
            right: '15px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '5px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <X size={24} color="#666" />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '25px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px'
          }}>
            <Lock size={30} color="white" />
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '10px'
          }}>
            Odblokuj pełny dokument
          </h2>
          <p style={{
            color: '#5a6c7d',
            fontSize: '15px',
            lineHeight: '1.6'
          }}>
            Zapłać jednorazowo 2 zł, aby pobrać pełny dokument w PDF
          </p>
        </div>

        {error && (
          <div style={{
            background: '#fee',
            border: '1px solid #fcc',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            color: '#c33',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        {/* Email Input */}
        <div style={{ marginBottom: '20px' }}>
          <label style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            Twój email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="np. jan.kowalski@example.com"
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              border: '2px solid #e1e8ed',
              borderRadius: '8px',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Payment Option */}
        <div style={{
          border: '2px solid #2c5aa0',
          borderRadius: '12px',
          padding: '20px',
          background: '#f8f9fb',
          marginBottom: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CreditCard size={24} color="#2c5aa0" />
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#2c3e50',
                margin: 0
              }}>
                Zapłać za dokument
              </h3>
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c5aa0'
            }}>
              2 zł
            </div>
          </div>
          <p style={{
            color: '#5a6c7d',
            fontSize: '14px',
            lineHeight: '1.5',
            marginBottom: '15px'
          }}>
            Jednorazowa płatność.
          </p>
          <button
            onClick={handlePayForDocument}
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {loading ? 'Przekierowywanie...' : 'Zapłać 2 zł'}
          </button>
        </div>

        {/* Info */}
        <div style={{
          background: '#e8f4f8',
          borderRadius: '8px',
          padding: '12px',
          fontSize: '13px',
          color: '#2c5aa0',
          lineHeight: '1.5',
          textAlign: 'center'
        }}>
          <strong>Bezpieczna płatność</strong> przez Stripe • Obsługa BLIK i kart płatniczych
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;

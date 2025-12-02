import React, { useState } from 'react';
import { X, CreditCard, Sparkles, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useSubscription } from '../../hooks/useSubscription';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

const DocumentPaymentModal = ({ isOpen, onClose, documentId, onPaymentSuccess }) => {
  const { session } = useAuth();
  const { createCheckoutSession } = useSubscription();
  const [loading, setLoading] = useState(false);
  const [premiumLoading, setPremiumLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handlePayForDocument = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!session) {
        throw new Error('Brak sesji użytkownika');
      }

      const token = session.access_token;
      const response = await fetch(
        `${API_URL}/api/stripe/create-document-payment`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            documentId: documentId
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

  const handleUpgradeToPremium = async () => {
    setPremiumLoading(true);
    setError(null);

    try {
      // Use the same payment flow as models premium (BLIK or card)
      await createCheckoutSession(false, null); // false = card subscription
    } catch (err) {
      console.error('Error creating premium checkout:', err);
      setError(err.message || 'Wystąpił błąd podczas tworzenia płatności premium');
      setPremiumLoading(false);
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
            Wybierz jedną z opcji, aby uzyskać dostęp do pełnej treści wygenerowanego dokumentu
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

        {/* Payment Options */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          marginBottom: '20px'
        }}>
          {/* Option 1: Pay 2 PLN */}
          <div style={{
            border: '2px solid #2c5aa0',
            borderRadius: '12px',
            padding: '20px',
            background: '#f8f9fb',
            transition: 'all 0.2s'
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
              Jednorazowa płatność za ten dokument. Dostęp na zawsze.
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

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            margin: '10px 0'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e1e8ed' }}></div>
            <span style={{ color: '#5a6c7d', fontSize: '14px', fontWeight: '600' }}>LUB</span>
            <div style={{ flex: 1, height: '1px', background: '#e1e8ed' }}></div>
          </div>

          {/* Option 2: Premium */}
          <div style={{
            border: '2px solid #ffd700',
            borderRadius: '12px',
            padding: '20px',
            background: 'linear-gradient(135deg, #fff9e6 0%, #fff5cc 100%)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: '-20px',
              right: '-20px',
              width: '100px',
              height: '100px',
              background: 'rgba(255, 215, 0, 0.1)',
              borderRadius: '50%'
            }}></div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '12px'
            }}>
              <Sparkles size={24} color="#d4af37" />
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#2c3e50',
                margin: 0
              }}>
                Przejdź na Premium
              </h3>
              <span style={{
                background: '#ffd700',
                color: '#2c3e50',
                fontSize: '11px',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '12px',
                marginLeft: 'auto'
              }}>
                OSZCZĘDZAJ
              </span>
            </div>
            <p style={{
              color: '#5a6c7d',
              fontSize: '14px',
              lineHeight: '1.5',
              marginBottom: '10px'
            }}>
              Nielimitowany dostęp do wszystkich dokumentów + pełen dostęp do funkcji AI
            </p>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '15px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                marginBottom: '5px'
              }}>
                <span style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#2c5aa0'
                }}>
                  4,99 zł
                </span>
                <span style={{
                  fontSize: '14px',
                  color: '#5a6c7d'
                }}>
                  / miesiąc
                </span>
              </div>
              <p style={{
                fontSize: '12px',
                color: '#10b981',
                fontWeight: '600',
                margin: 0
              }}>
                Tylko 0,16 zł dziennie!
              </p>
            </div>
            <button
              onClick={handleUpgradeToPremium}
              disabled={loading || premiumLoading}
              style={{
                width: '100%',
                background: (loading || premiumLoading) ? '#ccc' : 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
                color: '#2c3e50',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: (loading || premiumLoading) ? 'not-allowed' : 'pointer',
                transition: 'transform 0.2s',
                boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)'
              }}
              onMouseOver={(e) => !(loading || premiumLoading) && (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              {premiumLoading ? 'Przekierowywanie...' : 'Wybierz Premium'}
            </button>
          </div>
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

export default DocumentPaymentModal;

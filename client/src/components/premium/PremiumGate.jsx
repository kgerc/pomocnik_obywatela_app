import React from 'react';
import { Crown, Lock, Check, Sparkles } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

const PremiumGate = ({ children, feature = 'tej funkcji' }) => {
  const { isPremium, loading, createCheckoutSession } = useSubscription();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div style={{
          fontSize: '16px',
          color: '#5a6c7d'
        }}>
          Ładowanie...
        </div>
      </div>
    );
  }

  if (isPremium) {
    return <>{children}</>;
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '60px 40px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
      textAlign: 'center',
      maxWidth: '700px',
      margin: '0 auto'
    }}>
      {/* Premium Icon */}
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 30px',
        boxShadow: '0 8px 24px rgba(255, 215, 0, 0.4)'
      }}>
        <Crown size={50} color="#2c5aa0" strokeWidth={2.5} />
      </div>

      {/* Title */}
      <h2 style={{
        fontSize: '32px',
        fontWeight: '800',
        color: '#2c3e50',
        marginBottom: '15px'
      }}>
        Funkcja Premium
      </h2>

      <p style={{
        fontSize: '18px',
        color: '#5a6c7d',
        marginBottom: '40px',
        lineHeight: '1.6'
      }}>
        Aby korzystać z {feature}, potrzebujesz aktywnej subskrypcji Premium.
      </p>

      {/* Features List */}
      <div style={{
        background: '#f8f9fb',
        borderRadius: '12px',
        padding: '30px',
        marginBottom: '35px',
        textAlign: 'left'
      }}>
        <h3 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Sparkles size={24} color="#ffd700" />
          Co zyskujesz z Premium?
        </h3>

        {[
          'Dostęp do asystenta AI',
          'Personalizacja świadczeń',
          'Powiadomienia o nowych świadczeniach',
          'Przegląd dotacji',
          'Historia i dokumenty',
          'Priorytetowe wsparcie'
        ].map((feature, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 0',
            borderBottom: index < 5 ? '1px solid #e1e8ed' : 'none'
          }}>
            <div style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Check size={14} color="white" strokeWidth={3} />
            </div>
            <span style={{
              fontSize: '16px',
              color: '#2c3e50',
              fontWeight: '500'
            }}>
              {feature}
            </span>
          </div>
        ))}
      </div>

      {/* Price */}
      <div style={{
        marginBottom: '30px'
      }}>
        <div style={{
          fontSize: '48px',
          fontWeight: '800',
          color: '#2c5aa0',
          lineHeight: '1'
        }}>
          39,99 zł
        </div>
        <div style={{
          fontSize: '16px',
          color: '#5a6c7d',
          marginTop: '8px'
        }}>
          miesięcznie
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={createCheckoutSession}
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
          color: 'white',
          border: 'none',
          padding: '18px 40px',
          borderRadius: '12px',
          fontSize: '18px',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          margin: '0 auto',
          boxShadow: '0 6px 20px rgba(44, 90, 160, 0.4)',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 28px rgba(44, 90, 160, 0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(44, 90, 160, 0.4)';
        }}
      >
        <Crown size={22} />
        Przejdź na Premium
      </button>

      {/* Security Note */}
      <p style={{
        fontSize: '13px',
        color: '#5a6c7d',
        marginTop: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px'
      }}>
        <Lock size={14} />
        Bezpieczne płatności przez Stripe
      </p>
    </div>
  );
};

export default PremiumGate;

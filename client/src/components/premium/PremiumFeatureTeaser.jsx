import React, { useState } from 'react';
import { Crown, Lock, Loader } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import PromoCodeInput from './PromoCodeInput';

const MONTHLY_PRICE = 9.99;
const DISCOUNT_PERCENT = 50;
const DISCOUNTED_PRICE = "4.99"; // Cena po 50% rabacie

const PremiumFeatureTeaser = ({ children, feature = 'tej funkcji', title = 'Funkcja Premium', preloadedIsPremium = null }) => {
  const { isPremium: hookIsPremium, loading, createCheckoutSession } = useSubscription();
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [useBlik, setUseBlik] = useState(false);
  const [validatedPromoCode, setValidatedPromoCode] = useState(null);

  // Use preloaded value if available, otherwise fall back to hook
  const isPremium = preloadedIsPremium !== null ? preloadedIsPremium : hookIsPremium;

  if (loading && preloadedIsPremium === null) {
    return null;
  }

  if (isPremium) {
    return <>{children}</>;
  }

  const getFinalPrice = () => {
    // Zacznij od ceny po 50% rabacie (4.99 zł zamiast 5.00 zł)
    let price = 4.99;

    // Apply promo code if validated
    if (validatedPromoCode?.discountPercent) {
      price = price * (1 - validatedPromoCode.discountPercent / 100);
    }

    return price.toFixed(2);
  };

  const finalPrice = getFinalPrice();

  const handleUnlock = async () => {
    setLoadingCheckout(true);
    try {
      await createCheckoutSession(useBlik, validatedPromoCode);
      // Don't setLoadingCheckout(false) here - keep loader visible until redirect
    } catch (err) {
      console.error(err);
      setLoadingCheckout(false);
    }
  };

  return (
    <>
      {/* Full-screen Loading Overlay */}
      {loadingCheckout && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          animation: 'fadeIn 0.2s ease-in'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px 60px',
            textAlign: 'center',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.3s ease-out'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 24px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}>
              <Loader size={40} color="white" className="spin" />
            </div>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              color: '#2c3e50',
              margin: '0 0 12px 0'
            }}>
              Przekierowujemy do płatności
            </h3>
            <p style={{
              fontSize: '14px',
              color: '#5a6c7d',
              margin: 0,
              maxWidth: '280px'
            }}>
              Przygotowujemy bezpieczną sesję płatności Stripe...
            </p>
          </div>
        </div>
      )}

      {/* Kompaktowy, subtelny teaser - bez rozwijania */}
      <div style={{
        background: 'linear-gradient(135deg, #fff9f0 0%, #fff4e6 100%)',
        borderRadius: '10px',
        border: '1px solid #ffe4cc',
        padding: '16px 18px',
        marginBottom: '16px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        {/* Górna część - kompakt */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '14px'
        }}>
          {/* Mała ikonka Premium */}
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(255, 215, 0, 0.2)',
            flexShrink: 0
          }}>
            <Crown size={18} color="#2c5aa0" strokeWidth={2.5} />
          </div>

          {/* Tekst - krótki, konkretny */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
              margin: 0,
              fontSize: '14px',
              color: '#2c3e50',
              fontWeight: '600',
              lineHeight: '1.4'
            }}>
              {title}
            </p>
            <p style={{
              margin: '2px 0 0 0',
              fontSize: '13px',
              color: '#5a6c7d',
              lineHeight: '1.3'
            }}>
              Odblokuj {feature} • {validatedPromoCode ? finalPrice : DISCOUNTED_PRICE} zł/mies
            </p>
          </div>

          {/* Przycisk CTA - mały, ale wyraźny */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{
              background: showDetails
                ? '#2c5aa0'
                : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 18px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(44, 90, 160, 0.25)',
              transition: 'all 0.2s',
              flexShrink: 0,
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(44, 90, 160, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(44, 90, 160, 0.25)';
            }}
          >
            <Lock size={14} />
            {showDetails ? 'Zwiń' : 'Odblokuj'}
          </button>
        </div>

        {/* Rozwijana sekcja z opcjami płatności */}
        {showDetails && (
          <div style={{
            marginTop: '16px',
            paddingTop: '16px',
            borderTop: '1px solid #ffe4cc'
          }}>
            {/* Promo Code Input */}
            {/* <div style={{ marginBottom: '16px' }}>
              <PromoCodeInput onCodeValidated={setValidatedPromoCode} useBlik={useBlik} />
            </div> */}

            {/* BLIK Option */}
            <div style={{
              marginBottom: '16px',
              padding: '12px',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid #e1e8ed'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                color: '#2c3e50'
              }}>
                <input
                  type="checkbox"
                  checked={useBlik}
                  onChange={(e) => setUseBlik(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}
                />
                <div>
                  <div style={{ marginBottom: '4px', maxWidth: '180px' }}>Płacę BLIK (jednorazowo)</div>
                  <div style={{
                    fontSize: '13px',
                    color: '#5a6c7d',
                    lineHeight: '1.4',
                    maxWidth: '380px'
                  }}>
                    💳 Płatność jednorazowa - pełny dostęp przez 1 miesiąc
                  </div>
                </div>
              </label>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleUnlock}
              disabled={loadingCheckout}
              style={{
                width: '100%',
                background: loadingCheckout
                  ? '#a1a1a1'
                  : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: '600',
                cursor: loadingCheckout ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: loadingCheckout
                  ? 'none'
                  : '0 3px 12px rgba(44, 90, 160, 0.3)',
                transition: 'all 0.2s'
              }}
            >
              {loadingCheckout ? (
                <>
                  <Loader size={16} className="spin" />
                  Przekierowywanie...
                </>
              ) : (
                <>
                  <Crown size={16} />
                  {useBlik ? `Zapłać ${finalPrice} zł` : `Subskrybuj za ${finalPrice} zł/mies`}
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PremiumFeatureTeaser;

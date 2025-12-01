import React, { useState } from 'react';
import { Crown, Lock, Check, Loader } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import PromoCodeInput from './PromoCodeInput';

const MONTHLY_PRICE = 9.99;
const DISCOUNT_PERCENT = 50;
const DISCOUNTED_PRICE = "4.99"; // Cena po 50% rabacie

const PremiumGate = ({ children, feature = 'tej funkcji', setLoadingCheckout }) => {
  const { isPremium, loading, createCheckoutSession } = useSubscription();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [useBlik, setUseBlik] = useState(false);
  const [validatedPromoCode, setValidatedPromoCode] = useState(null);

  if (loading) {
    return <></>;
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

  const handleCheckout = async () => {
    if (setLoadingCheckout) setLoadingCheckout(true);
    setLoadingPayment(true);
    try {
      await createCheckoutSession(useBlik, validatedPromoCode);
      // Don't setLoadingCheckout(false) here - keep loader visible until redirect
    } catch (err) {
      console.error(err);
      if (setLoadingCheckout) setLoadingCheckout(false);
      setLoadingPayment(false);
    }
  };

  return (
    <>
      {/* Full-screen Loading Overlay */}
      {loadingPayment && (
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

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '48px 40px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        textAlign: 'center',
        maxWidth: '560px',
        margin: '0 auto'
      }}>
        {/* Premium Icon - mniejsza, subtelniejsza */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0 4px 16px rgba(255, 215, 0, 0.25)'
        }}>
          <Crown size={32} color="#2c5aa0" strokeWidth={2.5} />
        </div>

        {/* Nagłówek - krótki, konkretny */}
        <h2 style={{
          fontSize: '26px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '12px',
          lineHeight: '1.3'
        }}>
          Odblokuj pełne korzystanie z Pomocnika Obywatela
        </h2>

        <p style={{
          fontSize: '15px',
          color: '#5a6c7d',
          marginBottom: '32px',
          lineHeight: '1.5'
        }}>
          Wersja premium przyspiesza Ci załatwianie spraw.
        </p>

        {/* 3 najważniejsze korzyści - co TRACISZ bez Premium */}
        <div style={{
          textAlign: 'left',
          marginBottom: '32px'
        }}>
          {[
            'Nie przegapisz żadnego świadczenia, które Cię dotyczy',
            'Asystent odpowie Ci na pytania bez limitów',
            'Przeglądaj swoją historię rozmów i dokumenty',
            'Dostosuj pytania pod swoje potrzeby używając personalizacji'
          ].map((benefit, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '10px 0'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                <Check size={12} color="white" strokeWidth={3} />
              </div>
              <span style={{
                fontSize: '15px',
                color: '#2c3e50',
                fontWeight: '500',
                lineHeight: '1.5'
              }}>
                {benefit}
              </span>
            </div>
          ))}
        </div>

        {/* Cena - wyraźna, z promocją */}
        <div style={{
          marginBottom: '24px',
          padding: '20px',
          background: 'linear-gradient(135deg, #fff7e6 0%, #ffe8cc 100%)',
          borderRadius: '12px',
          border: '2px solid #ffb84d'
        }}>
          <div style={{
            fontSize: '15px',
            color: '#5a6c7d',
            marginBottom: '8px',
            fontWeight: '600'
          }}>
            Tylko
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '4px'
          }}>
            <span style={{
              textDecoration: 'line-through',
              color: '#a1a1a1',
              fontSize: '22px',
              fontWeight: '600'
            }}>
              {MONTHLY_PRICE.toFixed(2)} zł
            </span>
            <span style={{
              fontSize: '36px',
              fontWeight: '800',
              color: '#2c5aa0'
            }}>
              {validatedPromoCode ? finalPrice : DISCOUNTED_PRICE} zł
            </span>
          </div>
          <div style={{
            fontSize: '14px',
            color: '#5a6c7d'
          }}>
            {useBlik ? 'jednorazowa płatność (1 miesiąc)' : 'miesięcznie • rabat 50% (użyto kod: #POMOCNIK50)'}
            {validatedPromoCode && ` • kod: -${validatedPromoCode.discountPercent}%`}
          </div>
        </div>

        {/* Promo Code Input */}
        {/* <div style={{ marginBottom: '20px' }}>
          <PromoCodeInput onCodeValidated={setValidatedPromoCode} useBlik={useBlik} />
        </div> */}

        {/* BLIK Option */}
        <div style={{
          marginBottom: '24px',
          padding: '16px',
          background: '#f8f9fb',
          borderRadius: '12px',
          border: '2px solid #e1e8ed'
        }}>
          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '8px',
            cursor: 'pointer',
            fontSize: '15px',
            fontWeight: '500',
            color: '#2c3e50'
          }}>
            <input
              type="checkbox"
              checked={useBlik}
              onChange={(e) => setUseBlik(e.target.checked)}
              style={{
                width: '20px',
                height: '20px',
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

        {/* CTA Button - jeden, wyraźny */}
        <button
          onClick={handleCheckout}
          disabled={loadingPayment}
          style={{
            width: '100%',
            background: loadingPayment
              ? '#a1a1a1'
              : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            border: 'none',
            padding: '16px 32px',
            borderRadius: '12px',
            fontSize: '17px',
            fontWeight: '700',
            cursor: loadingPayment ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: loadingPayment
              ? 'none'
              : '0 4px 16px rgba(44, 90, 160, 0.3)',
            transition: 'all 0.2s',
            marginBottom: '16px'
          }}
          onMouseEnter={(e) => {
            if (!loadingPayment) {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(44, 90, 160, 0.4)';
            }
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = loadingPayment
              ? 'none'
              : '0 4px 16px rgba(44, 90, 160, 0.3)';
          }}
        >
          {loadingPayment ? (
            <>
              <Loader size={20} className="spin" />
              Przekierowywanie...
            </>
          ) : (
            <>
              <Crown size={20} />
              {useBlik ? `Zapłać ${finalPrice} zł` : `Subskrybuj za ${finalPrice} zł/mies`}
            </>
          )}
        </button>

        {/* Security Note - minimalistyczna */}
        <p style={{
          fontSize: '12px',
          color: '#5a6c7d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          margin: 0
        }}>
          <Lock size={12} />
          Bezpieczne płatności przez Stripe
        </p>
      </div>
    </>
  );
};

export default PremiumGate;

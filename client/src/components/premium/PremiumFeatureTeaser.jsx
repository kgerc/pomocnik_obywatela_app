import React, { useState } from 'react';
import { Crown, Lock, Check, Sparkles, ChevronDown, ChevronUp, Loader } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';
import PromoCodeInput from './PromoCodeInput';

const PremiumFeatureTeaser = ({ children, feature = 'tej funkcji', title = 'Funkcja Premium', preloadedIsPremium = null }) => {
  const { isPremium: hookIsPremium, loading, createCheckoutSession } = useSubscription();
  const [isExpanded, setIsExpanded] = useState(false);
  const [useBlik, setUseBlik] = useState(false);
  const [validatedPromoCode, setValidatedPromoCode] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  // Base prices
  const MONTHLY_PRICE = 39.99;

  // Calculated discounted price
  let discountedMonthly = MONTHLY_PRICE;

  // If promo code validated
  if (validatedPromoCode?.discountPercent) {
    const discount = validatedPromoCode.discountPercent;
    discountedMonthly = (MONTHLY_PRICE * (1 - discount / 100)).toFixed(2);
  }

  // Use preloaded value if available, otherwise fall back to hook
  const isPremium = preloadedIsPremium !== null ? preloadedIsPremium : hookIsPremium;

  if (loading && preloadedIsPremium === null) {
    return (
      <div style={{
        padding: '20px',
        textAlign: 'center',
        color: '#5a6c7d'
      }}>
        Ładowanie...
      </div>
    );
  }

  if (isPremium) {
    return <>{children}</>;
  }

  const handleClick = async () => {
    setLoadingCheckout(true);
    try {
      await createCheckoutSession(useBlik, validatedPromoCode);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCheckout(false);
    }
  };

  const getLabel = () => {
    if (useBlik) {
      return validatedPromoCode ? `Zapłać ${discountedMonthly} zł` : `Zapłać ${MONTHLY_PRICE.toFixed(2)} zł`;
    } else {
      return validatedPromoCode ? `Subskrybuj za ${discountedMonthly} zł/mies` : `Subskrybuj za ${MONTHLY_PRICE.toFixed(2)} zł/mies`;
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

      <div style={{
        background: 'linear-gradient(135deg, #fff7e6 0%, #ffe8cc 100%)',
        borderRadius: '12px',
        border: '2px solid #ffb84d',
        padding: '20px',
        marginBottom: '20px'
      }}>

      {/* Compact Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '10px'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(255, 215, 0, 0.3)',
          flexShrink: 0
        }}>
          <Crown size={22} color="#2c5aa0" strokeWidth={2.5} />
        </div>

        <div style={{ flex: 1 }}>
          <h3 style={{
            margin: 0,
            fontSize: '18px',
            fontWeight: '700',
            color: '#2c3e50'
          }}>
            {title}
          </h3>
          <p style={{
            margin: '4px 0 0 0',
            fontSize: '14px',
            color: '#5a6c7d',
            lineHeight: '1.4'
          }}>
            Aby korzystać z {feature}, potrzebujesz Premium
          </p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            background: isExpanded ? '#2c5aa0' : 'white',
            color: isExpanded ? 'white' : '#2c5aa0',
            border: '2px solid #2c5aa0',
            borderRadius: '8px',
            padding: '8px 16px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s',
            whiteSpace: 'nowrap'
          }}
        >
          {isExpanded ? 'Zwiń' : 'Szczegóły'}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '2px solid #ffb84d',
          maxWidth: '600px',
          margin: '20px auto 0'
        }}>

          {/* Features List */}
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '15px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles size={20} color="#ffd700" />
              Co zyskujesz z Premium?
            </h4>

            {[
              'Dostęp do asystenta AI',
              'Personalizacja świadczeń',
              'Powiadomienia o nowych świadczeniach',
              'Historia rozmów z AI',
              'Przesyłanie własnych dokumentów'
            ].map((feature, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 0',
                borderBottom: index < 5 ? '1px solid #e1e8ed' : 'none'
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={12} color="white" strokeWidth={3} />
                </div>
                <span style={{
                  fontSize: '14px',
                  color: '#2c3e50',
                  fontWeight: '500'
                }}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Price Display */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '20px'
            }}
          >
            <div
              style={{
                fontSize: '36px',
                fontWeight: '800',
                color: '#2c5aa0',
                lineHeight: '1'
              }}
            >
              {validatedPromoCode ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}
                >
                  <span
                    style={{
                      textDecoration: 'line-through',
                      color: '#a1a1a1',
                      fontSize: '20px'
                    }}
                  >
                    {MONTHLY_PRICE.toFixed(2)} zł
                  </span>

                  <span style={{ color: '#2c5aa0' }}>
                    {discountedMonthly} zł
                  </span>
                </div>
              ) : (
                `${MONTHLY_PRICE.toFixed(2)} zł`
              )}
            </div>

            <div
              style={{
                fontSize: '14px',
                color: '#5a6c7d',
                marginTop: '5px'
              }}
            >
              miesięcznie
            </div>
          </div>


          {/* Promo Code Input */}
          <PromoCodeInput onCodeValidated={setValidatedPromoCode} useBlik={useBlik} />

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '15px',
            margin: '20px 0'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e1e8ed' }} />
            <span style={{ fontSize: '13px', color: '#5a6c7d', fontWeight: '600' }}>LUB</span>
            <div style={{ flex: 1, height: '1px', background: '#e1e8ed' }} />
          </div>

          {/* BLIK Option */}
          <div style={{
            marginBottom: '20px',
            padding: '16px',
            background: 'white',
            borderRadius: '12px',
            border: '2px solid #e1e8ed'
          }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
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
                  cursor: 'pointer'
                }}
              />
              <span>
                Płacę BLIK
              </span>
            </label>
            <p style={{
              margin: '8px 0 0 30px',
              fontSize: '12px',
              color: '#5a6c7d',
              lineHeight: '1.5'
            }}>
              {'💳 Płatność jednorazowa BLIK - pełny dostęp przez 1 miesiąc' }
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleClick}
            disabled={loadingCheckout}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: loadingCheckout ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 6px 20px rgba(44, 90, 160, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            {loadingCheckout ? (
              <>
                <Loader size={20} className="spin" />
                Przechodzimy do płatności...
              </>
            ) : (
              <>
                <Crown size={20} />
                {getLabel()}
              </>
            )}
          </button>

          {/* Security Note */}
          <p style={{
            fontSize: '12px',
            color: '#5a6c7d',
            marginTop: '15px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}>
            <Lock size={12} />
            Bezpieczne płatności przez Stripe
          </p>

        </div>
      )}
      </div>
    </>
  );
};

export default PremiumFeatureTeaser;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Sparkles, Check, TrendingUp } from 'lucide-react';

/**
 * Komponent CTA Box - wyświetla Call-To-Action na podstawie strategii
 * @param {Object} strategy - Strategia CTA z blogConfig.js
 * @param {String} variant - 'primary' lub 'secondary'
 * @param {Object} relatedBenefits - Dodatkowe korzyści związane z kategorią
 */
const CTABox = ({ strategy, variant = 'primary', relatedBenefits = null, articleTitle }) => {
  const navigate = useNavigate();
  const cta = strategy[variant];

  if (!cta) return null;

  const isSubscription = cta.type === 'subscription';
  const isGenerator = cta.type === 'generator';

  const handleClick = () => {
    if (isSubscription) {
      // Przekierowanie do aplikacji Pomocnik Obywatela
      window.location.href = 'https://app.pomocnikobywatela.pl/register?source=blog&article=' + encodeURIComponent(articleTitle);
    } else if (isGenerator) {
      // Przekierowanie do generatora pism
      navigate('/?generator=true');
    }
  };

  return (
    <div style={{
      marginTop: variant === 'primary' ? '60px' : '30px',
      padding: '40px',
      background: variant === 'primary'
        ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)'
        : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '12px',
      color: 'white',
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
    }}>
      {/* Ikona */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {isSubscription ? (
          <Sparkles size={48} style={{ margin: '0 auto' }} />
        ) : (
          <Wand2 size={48} style={{ margin: '0 auto' }} />
        )}
      </div>

      {/* Tytuł */}
      <h3 style={{
        fontSize: '28px',
        fontWeight: '700',
        marginBottom: '15px',
        textAlign: 'center'
      }}>
        {cta.title}
      </h3>

      {/* Opis */}
      <p style={{
        fontSize: '16px',
        marginBottom: '25px',
        opacity: 0.95,
        textAlign: 'center',
        lineHeight: '1.6'
      }}>
        {cta.description}
      </p>

      {/* Cena (jeśli jest) */}
      {cta.price && (
        <div style={{
          textAlign: 'center',
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '20px'
        }}>
          {cta.price}
        </div>
      )}

      {/* Features (jeśli są) */}
      {cta.features && cta.features.length > 0 && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px'
        }}>
          {cta.features.map((feature, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: index < cta.features.length - 1 ? '12px' : '0',
              fontSize: '14px'
            }}>
              <Check size={20} style={{ flexShrink: 0 }} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      )}

      {/* Related Benefits (dodatkowe korzyści z kategorii) */}
      {relatedBenefits && relatedBenefits.length > 0 && variant === 'primary' && isSubscription && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '25px',
          border: '2px dashed rgba(255, 255, 255, 0.3)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '12px',
            fontWeight: '600'
          }}>
            <TrendingUp size={20} />
            <span>To nie wszystko - sprawdź też:</span>
          </div>
          {relatedBenefits.map((benefit, index) => (
            <div key={index} style={{
              fontSize: '14px',
              marginBottom: index < relatedBenefits.length - 1 ? '8px' : '0',
              paddingLeft: '28px',
              opacity: 0.9
            }}>
              • {benefit}
            </div>
          ))}
        </div>
      )}

      {/* Savings info */}
      {cta.savings && (
        <div style={{
          textAlign: 'center',
          fontSize: '14px',
          fontStyle: 'italic',
          marginBottom: '20px',
          opacity: 0.9
        }}>
          💡 {cta.savings}
        </div>
      )}

      {/* Przycisk */}
      <button
        onClick={handleClick}
        style={{
          width: '100%',
          padding: '18px 40px',
          background: 'white',
          color: variant === 'primary' ? '#2c5aa0' : '#667eea',
          border: 'none',
          borderRadius: '8px',
          fontSize: '18px',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
        }}
      >
        {cta.buttonText}
      </button>

      {/* Dodatkowa informacja dla subskrypcji */}
      {isSubscription && (
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          marginTop: '15px',
          opacity: 0.8
        }}>
          Możesz anulować w każdej chwili. Bez ukrytych opłat.
        </div>
      )}
    </div>
  );
};

export default CTABox;

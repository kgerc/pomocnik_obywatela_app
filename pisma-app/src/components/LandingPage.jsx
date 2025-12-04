import React, { useEffect, useRef, useState } from 'react';
import { Wand2, FileText, Clock, Shield, Check, Star, ArrowRight, Sparkles } from 'lucide-react';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

const LandingPage = ({ onStartGenerator }) => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const setSectionRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  const getAnimationStyle = (sectionId, delay = 0) => ({
    opacity: visibleSections[sectionId] ? 1 : 0,
    transform: visibleSections[sectionId] ? 'translateY(0)' : 'translateY(30px)',
    transition: `opacity 0.8s ease-out ${delay}s, transform 0.8s ease-out ${delay}s`
  });

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)'
    }}>
      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '2px solid #e1e8ed',
        padding: '20px 0',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        height: '74px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          height: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={32} color="#2c5aa0" strokeWidth={2.5} />
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              margin: 0,
              lineHeight: '1'
            }}>
              Pomocnik Obywatela
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '8px 16px',
            borderRadius: '20px',
            marginBottom: '20px',
            fontSize: '14px',
            fontWeight: '600'
          }}>
            <Sparkles size={16} />
            Powered by AI
          </div>

          <h1 style={{
            fontSize: '56px',
            fontWeight: '700',
            marginBottom: '20px',
            lineHeight: '1.2'
          }}>
            Generator Pism AI
          </h1>

          <p style={{
            fontSize: '24px',
            marginBottom: '40px',
            opacity: 0.95,
            lineHeight: '1.5',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            Wygeneruj profesjonalne pisma urzędowe w minutę. Wnioski, odwołania, reklamacje i więcej.
          </p>

          <button
            onClick={onStartGenerator}
            style={{
              background: 'white',
              color: '#2c5aa0',
              padding: '18px 48px',
              fontSize: '18px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'transform 0.2s, box-shadow 0.2s',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
            }}
          >
            <Wand2 size={24} />
            Wygeneruj dokument
            <ArrowRight size={24} />
          </button>

          <div style={{
            marginTop: '30px',
            fontSize: '14px',
            opacity: 0.9
          }}>
            <Check size={18} color="#10b981" style={{ verticalAlign: '-3px' }}/> Bez rejestracji   <Check size={18} color="#10b981" style={{ verticalAlign: '-3px' }}/> Płatność tylko 2 zł za dokument    <Check size={18} color="#10b981" style={{ verticalAlign: '-3px' }}/> Natychmiastowy dostęp
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        padding: '80px 20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          textAlign: 'center',
          color: '#2c3e50',
          marginBottom: '60px'
        }}>
          Dlaczego Generator Pism AI?
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {[
            {
              icon: <Clock size={40} />,
              title: 'Oszczędność czasu',
              description: 'Wygeneruj profesjonalne pismo w 3 minuty zamiast godzin pisania i szukania wzorów.'
            },
            {
              icon: <Shield size={40} />,
              title: 'Zgodność prawna',
              description: 'AI zna aktualne przepisy i generuje pisma zgodne z polskim prawem.'
            },
            {
              icon: <FileText size={40} />,
              title: 'Ponad 100 typów pism',
              description: 'Wnioski, odwołania, reklamacje, zgłoszenia – wszystko w jednym miejscu.'
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
              }}
            >
              <div style={{
                color: '#2c5aa0',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '12px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#5a6c7d',
                fontSize: '15px',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div
        id="categories"
        ref={setSectionRef('categories')}
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          padding: '80px 20px',
          ...getAnimationStyle('categories')
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            textAlign: 'center',
            color: '#2c3e50',
            marginBottom: '20px'
          }}>
            Ponad 100 typów dokumentów w 10 kategoriach
          </h2>
          <p style={{
            textAlign: 'center',
            color: '#5a6c7d',
            fontSize: '18px',
            marginBottom: '60px',
            maxWidth: '800px',
            margin: '0 auto 60px',
            lineHeight: '1.6'
          }}>
            Od spraw administracyjnych po telekomunikację - najszerszy wybór pism urzędowych w Polsce
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {[
              { name: 'Administracja', count: '10+', icon: '🏛️' },
              { name: 'Telekomunikacja', count: '4+', icon: '📱' },
              { name: 'Kurierzy', count: '4+', icon: '📦' },
              { name: 'Konsumenckie', count: '11+', icon: '🛒' },
              { name: 'Edukacja', count: '17+', icon: '🎓' },
              { name: 'Mieszkanie', count: '7+', icon: '🏠' },
              { name: 'Biznesowe', count: '18+', icon: '💼' },
              { name: 'Praca', count: '7+', icon: '👔' },
              { name: 'Budownictwo', count: '15+', icon: '🏗️' },
              { name: 'Motoryzacja', count: '10+', icon: '🚗' }
            ].map((category, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  textAlign: 'center',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  cursor: 'default'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                }}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '8px'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  color: '#2c5aa0',
                  fontSize: '16px',
                  fontWeight: '600'
                }}>
                  {category.count} pism
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div
        id="how-it-works"
        ref={setSectionRef('how-it-works')}
        style={{
          background: 'white',
          padding: '80px 20px',
          ...getAnimationStyle('how-it-works')
        }}
      >
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            textAlign: 'center',
            color: '#2c3e50',
            marginBottom: '60px'
          }}>
            Jak to działa?
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '40px'
          }}>
            {[
              {
                step: '1',
                title: 'Wybierz typ pisma',
                description: 'Z ponad 100 dostępnych szablonów wybierz ten, który potrzebujesz.'
              },
              {
                step: '2',
                title: 'Wypełnij formularz',
                description: 'Odpowiedz na kilka prostych pytań o Twoją sprawę.'
              },
              {
                step: '3',
                title: 'AI generuje dokument',
                description: 'Sztuczna inteligencja tworzy profesjonalne pismo w kilka sekund.'
              }
            ].map((step, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  fontWeight: '700',
                  margin: '0 auto 20px',
                  boxShadow: '0 8px 24px rgba(44, 90, 160, 0.3)'
                }}>
                  {step.step}
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '12px'
                }}>
                  {step.title}
                </h3>
                <p style={{
                  color: '#5a6c7d',
                  fontSize: '15px',
                  lineHeight: '1.6'
                }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div
        id="pricing"
        ref={setSectionRef('pricing')}
        style={{
          padding: '80px 20px',
          maxWidth: '1000px',
          margin: '0 auto',
          ...getAnimationStyle('pricing')
        }}
      >
        <h2 style={{
          fontSize: '40px',
          fontWeight: '700',
          textAlign: 'center',
          color: '#2c3e50',
          marginBottom: '20px'
        }}>
          Prosta i przejrzysta cena
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#5a6c7d',
          fontSize: '18px',
          marginBottom: '60px'
        }}>
          Bez subskrypcji, bez ukrytych opłat
        </p>

        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '50px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto',
          border: '3px solid #2c5aa0'
        }}>
          <div style={{
            textAlign: 'center',
            marginBottom: '30px'
          }}>
            <div style={{
              fontSize: '64px',
              fontWeight: '700',
              color: '#2c5aa0',
              marginBottom: '10px'
            }}>
              2 zł
            </div>
            <div style={{
              fontSize: '18px',
              color: '#5a6c7d'
            }}>
              za jeden dokument
            </div>
          </div>

          <div style={{
            borderTop: '2px solid #e1e8ed',
            paddingTop: '30px',
            marginBottom: '30px'
          }}>
            {[
              'Pełny dostęp do wygenerowanego dokumentu',
              'Format PDF, DOCX gotowy do druku',
              'Zgodność z polskim prawem',
              'Profesjonalne formatowanie',
              'Natychmiastowy dostęp po płatności',
              'Płatność BLIK lub kartą'
            ].map((feature, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '16px',
                  fontSize: '16px',
                  color: '#2c3e50'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  background: '#d1fae5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <Check size={16} color="#10b981" />
                </div>
                {feature}
              </div>
            ))}
          </div>

          <button
            onClick={onStartGenerator}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              padding: '18px',
              fontSize: '18px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'transform 0.2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Rozpocznij generowanie
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div
        id="cta"
        ref={setSectionRef('cta')}
        style={{
          background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
          color: 'white',
          padding: '80px 20px',
          textAlign: 'center',
          ...getAnimationStyle('cta')
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '20px'
          }}>
            Gotowy, aby wygenerować swoje pismo?
          </h2>
          <p style={{
            fontSize: '20px',
            marginBottom: '40px',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Dołącz do tysięcy zadowolonych użytkowników, którzy oszczędzają czas na generowaniu pism urzędowych.
          </p>
          <button
            onClick={onStartGenerator}
            style={{
              background: 'white',
              color: '#2c5aa0',
              padding: '18px 48px',
              fontSize: '18px',
              fontWeight: '700',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'transform 0.2s',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <Wand2 size={24} />
            Zacznij teraz!
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: '#2c3e50',
        color: 'white',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            fontSize: '24px',
            fontWeight: '700',
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}>
            <Wand2 size={28} />
            Generator Pism AI
          </div>
          <p style={{
            opacity: 0.7,
            fontSize: '14px',
            marginBottom: '20px'
          }}>
            Część ekosystemu Pomocnik Obywatela
          </p>

          {/* Legal Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '20px',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => setShowTerms(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                opacity: 0.7,
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
            >
              Regulamin
            </button>
            <span style={{ opacity: 0.5 }}>•</span>
            <button
              onClick={() => setShowPrivacy(true)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                opacity: 0.7,
                fontSize: '14px',
                cursor: 'pointer',
                textDecoration: 'underline',
                transition: 'opacity 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
              onMouseOut={(e) => e.currentTarget.style.opacity = '0.7'}
            >
              Polityka Prywatności
            </button>
          </div>

          <div style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '20px',
            fontSize: '14px',
            opacity: 0.7
          }}>
            © 2025 Pomocnik Obywatela. Wszystkie prawa zastrzeżone.
          </div>
        </div>
      </div>

      {/* Modals */}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </div>
  );
};

export default LandingPage;

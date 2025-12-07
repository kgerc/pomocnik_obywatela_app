import React, { useEffect, useRef, useState } from 'react';
import { Wand2, FileText, Clock, Shield, Check, ArrowRight, Sparkles, X } from 'lucide-react';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

const LandingPage = ({ onStartGenerator }) => {
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [openImage, setOpenImage] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setOpenImage(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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
        display: 'flex',
        justifyContent: 'center'
      }}>
        <div style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '60px'
        }}>
          {/* LEWA KOLUMNA - TEKST */}
          <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
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
              Automatyczny Generator
            </div>

            <h1 style={{
              fontSize: '56px',
              fontWeight: '700',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              Generator Pism
            </h1>

            <p style={{
              fontSize: '24px',
              marginBottom: '40px',
              opacity: 0.95,
              lineHeight: '1.5'
            }}>
              Wygeneruj profesjonalne pisma urzędowe w minutę. Wnioski, odwołania, reklamacje i więcej.
            </p>

            <button
              onClick={() => {
                // Track hero CTA click
                if (window.gtag) {
                  window.gtag('event', 'click_cta', {
                    event_category: 'engagement',
                    event_label: 'hero_button'
                  });
                }
                onStartGenerator();
              }}
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

          {/* PRAWA KOLUMNA - WIZUALIZACJA DOKUMENTU */}
          <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{
              position: 'relative',
              transform: 'rotate(3deg)',
              transition: 'transform 0.3s',
              cursor: 'pointer'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'rotate(0deg) scale(1.02)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'rotate(3deg)'}
            >
              {/* CSS Document Skeleton */}
              <div style={{
                width: '300px',
                height: '420px',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                position: 'relative',
                padding: '30px',
                overflow: 'hidden'
              }}>
                {/* Header line */}
                <div style={{width: '40%', height: '10px', background: '#2c5aa0', marginBottom: '20px', borderRadius: '2px'}}></div>
                <div style={{width: '100%', height: '2px', background: '#e2e8f0', marginBottom: '30px'}}></div>

                {/* Text lines group 1 */}
                <div style={{width: '90%', height: '8px', background: '#f1f5f9', marginBottom: '10px', borderRadius: '2px'}}></div>
                <div style={{width: '85%', height: '8px', background: '#f1f5f9', marginBottom: '10px', borderRadius: '2px'}}></div>
                <div style={{width: '90%', height: '8px', background: '#f1f5f9', marginBottom: '30px', borderRadius: '2px'}}></div>

                {/* Text lines group 2 */}
                <div style={{width: '70%', height: '8px', background: '#f1f5f9', marginBottom: '10px', borderRadius: '2px'}}></div>
                <div style={{width: '95%', height: '8px', background: '#f1f5f9', marginBottom: '10px', borderRadius: '2px'}}></div>
                <div style={{width: '80%', height: '8px', background: '#f1f5f9', marginBottom: '30px', borderRadius: '2px'}}></div>

                {/* Text lines group 3 */}
                <div style={{width: '85%', height: '8px', background: '#f1f5f9', marginBottom: '10px', borderRadius: '2px'}}></div>
                <div style={{width: '75%', height: '8px', background: '#f1f5f9', marginBottom: '10px', borderRadius: '2px'}}></div>

                {/* Badge "Gotowy do druku" */}
                <div style={{
                  position: 'absolute',
                  bottom: '20px',
                  right: '20px',
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '8px 12px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: '700',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Check size={14} color="#166534" />
                  Gotowy do druku
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        background: 'white',
        padding: '80px 20px'
      }}>
        <div style={{
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
            Dlaczego Generator Pism?
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
              title: 'Sprawdzone wzory',
              description: 'Pisma przygotowane w oparciu o aktualne wymogi polskich urzędów i sprawdzone szablony.'
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
              { name: 'Administracja', count: '10+', icon: '🏛️', dataCategory: 'Administracja' },
              { name: 'Telekomunikacja', count: '4+', icon: '📱', dataCategory: 'Telekomunikacja' },
              { name: 'Konsumenckie', count: '11+', icon: '🛒', dataCategory: 'Prawa konsumenta' },
              { name: 'Edukacja', count: '17+', icon: '🎓', dataCategory: 'Szkoła' },
              { name: 'Mieszkanie', count: '7+', icon: '🏠', dataCategory: 'Mieszkanie' },
              { name: 'Biznesowe', count: '18+', icon: '💼', dataCategory: 'Biznes' },
              { name: 'Praca', count: '7+', icon: '👔', dataCategory: 'Praca' },
              { name: 'Budownictwo', count: '15+', icon: '🏗️', dataCategory: 'Budownictwo' },
              { name: 'Motoryzacja', count: '10+', icon: '🚗', dataCategory: 'Motoryzacja' },
              { name: 'Pomoc społeczna', count: '16+', icon: '🤝', dataCategory: 'Pomoc społeczna' }
            ].map((category, idx) => (
              <div
                key={idx}
                onClick={() => {
                  // Track click event
                  if (window.gtag) {
                    window.gtag('event', 'click_category', {
                      event_category: 'engagement',
                      event_label: category.name
                    });
                  }
                  onStartGenerator(category.dataCategory);
                }}
                style={{
                  background: 'white',
                  padding: '24px',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                  textAlign: 'center',
                  transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.2s',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';
                  e.currentTarget.style.background = '#f8f9fa';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  e.currentTarget.style.background = 'white';
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
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

      {/* Zobacz Generator w Akcji Section */}
      <div
        id="demo-section"
        ref={setSectionRef('demo-section')}
        style={{
          background: 'white',
          padding: '80px 20px',
          ...getAnimationStyle('demo-section')
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
            Zobacz Generator w Akcji
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
            Zobacz dokładnie jak wygląda proces generowania dokumentu krok po kroku
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {[
              {
                step: '1',
                title: '1. Wybierz swoje pismo',
                description: 'Przeglądaj ponad 100 typów dokumentów podzielonych na kategorie',
                image: '/screenshots/step1-select.png',
                fallback: 'https://placehold.co/600x400/2c5aa0/white?text=Krok+1%3A+Wybierz+Pismo'
              },
              {
                step: '2',
                title: '2. Wypełnij proste pola',
                description: 'Podaj swoje dane i szczegóły sprawy w przejrzystym formularzu',
                image: '/screenshots/step2-form.png',
                fallback: 'https://placehold.co/600x400/4a7dc9/white?text=Krok+2%3A+Wype%C5%82nij+Formularz'
              },
              {
                step: '3',
                title: '3. Pobierz gotowy dokument',
                description: 'System wygeneruje profesjonalne pismo. Zapłać 2 zł i pobierz PDF/DOCX',
                image: '/screenshots/step3-preview.png',
                fallback: 'https://placehold.co/600x400/2c5aa0/white?text=Krok+3%3A+Pobierz+PDF'
              }
            ].map((step, idx) => (
              <div
                key={idx}
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)';
                }}
              >
                <div style={{
                  position: 'relative',
                  paddingTop: '66.67%',
                  background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
                  overflow: 'hidden'
                }}>
                  <img
                    src={step.image}
                    alt={step.title}
                    onError={(e) => {
                      e.target.src = step.fallback;
                    }}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      cursor: 'pointer'
                    }}
                    onClick={() => setOpenImage(step.image)}
                  />
                  <button
                    onClick={() => setOpenImage(step.image)}
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      background: 'rgba(0,0,0,0.6)',
                      border: 'none',
                      borderRadius: '50%',
                      padding: '10px',
                      cursor: 'pointer',
                      color: 'white',
                      fontSize: '18px',
                      transition: 'background 0.3s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                    title="Powiększ"
                  >
                    🔍
                  </button>
                </div>
                <div style={{ padding: '25px' }}>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#2c3e50',
                    marginBottom: '10px'
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
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: 'center' }}>
            <button
              onClick={() => {
                // Track demo CTA click
                if (window.gtag) {
                  window.gtag('event', 'click_cta', {
                    event_category: 'engagement',
                    event_label: 'demo_section_button'
                  });
                }
                onStartGenerator();
              }}
              style={{
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                padding: '16px 40px',
                fontSize: '18px',
                fontWeight: '700',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 8px 24px rgba(44, 90, 160, 0.3)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(44, 90, 160, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(44, 90, 160, 0.3)';
              }}
            >
              <Wand2 size={20} />
              Stwórz dokument teraz
              <ArrowRight size={20} />
            </button>
            <p style={{
              marginTop: '15px',
              color: '#5a6c7d',
              fontSize: '14px'
            }}>
              Płatność tylko za pobranie gotowego dokumentu
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div
        id="pricing"
        ref={setSectionRef('pricing')}
        style={{
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          padding: '80px 20px',
          ...getAnimationStyle('pricing')
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
            Generator Pism
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

      {/* Lightbox Modal for Screenshots */}
      {openImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            cursor: 'pointer',
            opacity: 1,
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={() => setOpenImage(null)}
        >
          <button
            onClick={() => setOpenImage(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: '50%',
              padding: '12px',
              cursor: 'pointer',
              color: 'white',
              fontSize: '20px',
              zIndex: 10001,
              transition: 'background 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
            title="Zamknij (ESC)"
          >
            <X size={24} />
          </button>

          <img
            src={openImage}
            alt="Powiększony zrzut ekranu"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default LandingPage;

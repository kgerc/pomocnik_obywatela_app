import React, { useState, useEffect } from 'react';
import { LogOut, Settings, Lightbulb, Menu, X, Crown, Calendar, CreditCard, ExternalLink, Loader } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SubscriptionButton from '../premium/SubscriptionButton';
import UserGuide from '../UserGuide';
import { useSubscription } from '../../hooks/useSubscription';

const ONBOARDING_KEY = 'pomocnik_onboarding_completed';

const Header = ({ setActiveTab }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { isPremium, subscription, createPortalSession } = useSubscription();
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);

  // Automatyczne wyświetlenie wskazówek przy pierwszym logowaniu
  useEffect(() => {
    if (user) {
      const hasSeenOnboarding = localStorage.getItem(ONBOARDING_KEY);

      if (!hasSeenOnboarding) {
        // Opóźnienie 500ms, żeby dać czas na załadowanie interfejsu
        const timer = setTimeout(() => {
          setShowUserGuide(true);
          // Oznacz że użytkownik widział onboarding
          localStorage.setItem(ONBOARDING_KEY, 'true');
        }, 500);

        return () => clearTimeout(timer);
      }
    }
  }, [user]);

  // Obsługa responsywności
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setShowMobileMenu(false); // Zamknij menu przy przejściu na desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  return (
    <>
      {showUserGuide && (
        <UserGuide onClose={() => setShowUserGuide(false)} />
      )}

      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        position: 'relative'
      }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          flex: 1
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            width: '50px',
            height: '50px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            📋
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              justifyContent: 'space-between'
            }}>
              <h1 style={{
                fontSize: '28px',
                fontWeight: '800',
                color: '#2c3e50',
                margin: 0
              }}>
                Pomocnik Obywatela
              </h1>
              {isMobile && (
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#2c5aa0',
                    color: 'white',
                    border: 'none',
                    padding: '10px',
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    position: 'relative',
                    marginTop: '20px'
                  }}
                  title="Menu"
                >
                  {showMobileMenu ? <X size={28} /> : <Menu size={28} />}
                </button>
              )}
            </div>
            <p style={{
              color: '#5a6c7d',
              fontSize: '14px',
              margin: 0
            }}>
              Witaj, {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>
        </div>

        {!isMobile && (
          // Desktop: wszystkie przyciski
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <SubscriptionButton />

            <button
              onClick={() => setShowUserGuide(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#fff8e1',
                color: '#ffc107',
                border: '2px solid #ffc107',
                padding: '5px 5px',
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#fff3cd';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#fff8e1';
              }}
              title="Wskazówki"
            >
              <Lightbulb size={18} />
            </button>

            <button
              onClick={() => setActiveTab && setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#e8f4f8',
                color: '#2c5aa0',
                border: '2px solid #2c5aa0',
                padding: '5px 5px',
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#d0e8f2';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#e8f4f8';
              }}
              title="Ustawienia"
            >
              <Settings size={18} />
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: '#fee',
                color: '#c33',
                border: '2px solid #c33',
                padding: '10px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.background = '#fdd';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = '#fee';
              }}
            >
              <LogOut size={18} />
              Wyloguj
            </button>
          </div>
        )}
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobile && showMobileMenu && (
        <div style={{
          position: 'absolute',
          top: '105px',
          right: '30px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          padding: '10px',
          zIndex: 1000,
          minWidth: '150px'
        }}>
          {isPremium && (
            <button
              onClick={() => {
                setShowSubscriptionModal(true);
                setShowMobileMenu(false);
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                background: 'transparent',
                border: 'none',
                padding: '12px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                color: '#2c3e50',
                transition: 'background 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = '#f8f9fb'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <Crown size={18} color="#ffd700" strokeWidth={2.5} />
              Subskrypcja
            </button>
          )}

          <button
            onClick={() => {
              setShowUserGuide(true);
              setShowMobileMenu(false);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#2c3e50',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f8f9fb'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Lightbulb size={18} color="#ffc107" />
            Wskazówki
          </button>

          <button
            onClick={() => {
              setActiveTab && setActiveTab('settings');
              setShowMobileMenu(false);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#2c3e50',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f8f9fb'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <Settings size={18} color="#2c5aa0" />
            Ustawienia
          </button>

          <div style={{
            height: '1px',
            background: '#e1e8ed',
            margin: '8px 0'
          }} />

          <button
            onClick={() => {
              handleLogout();
              setShowMobileMenu(false);
            }}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              color: '#c33',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#fee'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <LogOut size={18} />
            Wyloguj
          </button>
        </div>
      )}
      </div>

      {/* Subscription Modal */}
      {showSubscriptionModal && isPremium && subscription && (
        <>
          {/* Full-screen Loading Overlay */}
          {loadingPortal && (
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
                  Przekierowujemy do panelu zarządzania
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#5a6c7d',
                  margin: 0,
                  maxWidth: '280px'
                }}>
                  Przygotowujemy bezpieczną sesję w Stripe...
                </p>
              </div>
            </div>
          )}

          {/* Modal Overlay */}
          <div
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
              zIndex: 1000,
              padding: '20px'
            }}
            onClick={() => setShowSubscriptionModal(false)}
          >
            {/* Modal Content */}
            <div
              style={{
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                borderRadius: '20px',
                padding: '40px',
                maxWidth: '500px',
                width: '100%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                color: 'white',
                position: 'relative'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowSubscriptionModal(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  borderRadius: '8px',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '5px 5px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '30px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px'
                }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Crown size={32} color="#ffd700" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '26px',
                      fontWeight: '700',
                      margin: 0,
                      marginBottom: '4px'
                    }}>
                      Subskrypcja Premium
                    </h3>
                    <div style={{
                      background: subscription.status === 'active'
                        ? '#d1fae5'
                        : subscription.status === 'trialing'
                        ? '#dbeafe'
                        : subscription.status === 'past_due'
                        ? '#fef3cd'
                        : subscription.status === 'canceled'
                        ? '#fee'
                        : '#f3f4f6',
                      color: subscription.status === 'active'
                        ? '#059669'
                        : subscription.status === 'trialing'
                        ? '#2563eb'
                        : subscription.status === 'past_due'
                        ? '#856404'
                        : subscription.status === 'canceled'
                        ? '#c33'
                        : '#6b7280',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '600',
                      display: 'inline-block'
                    }}>
                      {subscription.status === 'active' ? 'Aktywna' :
                       subscription.status === 'trialing' ? 'Okres próbny' :
                       subscription.status === 'past_due' ? 'Zaległości' :
                       subscription.status === 'canceled' ? 'Anulowana' :
                       'Nieznany'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '16px',
                padding: '24px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '14px'
                }}>
                  <Calendar size={20} />
                  <span style={{ fontSize: '15px', opacity: 0.9 }}>
                    Następna płatność:
                  </span>
                </div>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  marginBottom: '8px'
                }}>
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString('pl-PL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div style={{
                  fontSize: '14px',
                  opacity: 0.8
                }}>
                  39,99 zł / miesiąc
                </div>

                {subscription.cancelAtPeriodEnd && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    background: 'rgba(255, 193, 7, 0.25)',
                    borderRadius: '10px',
                    fontSize: '13px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '18px' }}>⚠️</span>
                    Subskrypcja zostanie anulowana po zakończeniu obecnego okresu
                  </div>
                )}
              </div>

              {/* Benefits */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '24px'
              }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '12px',
                  opacity: 0.9
                }}>
                  Twoje korzyści Premium:
                </div>
                <div style={{
                  display: 'grid',
                  gap: '8px',
                  fontSize: '13px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>✓</span> Nielimitowany dostęp do asystenta AI
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>✓</span> Personalizacja świadczeń
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>✓</span> Powiadomienia o zmianach
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>✓</span> Przegląd historii rozmów z asystentem AI
                  </div>
                </div>
              </div>

              {/* Manage Button */}
              <button
                onClick={async () => {
                  setShowSubscriptionModal(false);
                  setLoadingPortal(true);
                  try {
                    await createPortalSession();
                  } finally {
                    setLoadingPortal(false);
                  }
                }}
                disabled={loadingPortal}
                style={{
                  width: '100%',
                  background: 'white',
                  color: '#2c5aa0',
                  border: 'none',
                  padding: '16px 28px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: loadingPortal ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  transition: 'all 0.2s',
                  opacity: loadingPortal ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!loadingPortal) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <CreditCard size={20} />
                Zarządzaj subskrypcją
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
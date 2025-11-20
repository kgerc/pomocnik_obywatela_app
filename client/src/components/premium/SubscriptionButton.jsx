import React, { useState } from 'react';
import { Crown, Calendar, CreditCard, ExternalLink, X } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

const SubscriptionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { subscription, isPremium, loading, createPortalSession } = useSubscription();

  if (loading || !isPremium || !subscription) {
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return { bg: '#d1fae5', text: '#059669', label: 'Aktywna' };
      case 'trialing':
        return { bg: '#dbeafe', text: '#2563eb', label: 'Okres próbny' };
      case 'past_due':
        return { bg: '#fef3cd', text: '#856404', label: 'Zaległości' };
      case 'canceled':
        return { bg: '#fee', text: '#c33', label: 'Anulowana' };
      default:
        return { bg: '#f3f4f6', text: '#6b7280', label: 'Nieznany' };
    }
  };

  const statusInfo = getStatusColor(subscription.status);

  return (
    <>
      {/* Crown Button */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '44px',
          height: '44px',
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
          border: '2px solid #e6c200',
          borderRadius: '12px',
          cursor: 'pointer',
          transition: 'all 0.2s',
          boxShadow: '0 2px 8px rgba(255, 215, 0, 0.4)',
          position: 'relative',
          padding: '5px 5px',
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 215, 0, 0.6)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #ffed4e 0%, #ffd700 100%)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(255, 215, 0, 0.4)';
          e.currentTarget.style.background = 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)';
        }}
        title="Szczegóły subskrypcji Premium"
      >
        <Crown size={18} color="#2c5aa0" strokeWidth={2.5} />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
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
          onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
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
                    background: statusInfo.bg,
                    color: statusInfo.text,
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    {statusInfo.label}
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
                {formatDate(subscription.currentPeriodEnd)}
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
                  <span>✓</span> Przegląd dotacji i ulg
                </div>
              </div>
            </div>

            {/* Manage Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                createPortalSession();
              }}
              style={{
                width: '100%',
                background: 'white',
                color: '#2c5aa0',
                border: 'none',
                padding: '16px 28px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
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
      )}
    </>
  );
};

export default SubscriptionButton;

import React from 'react';
import { Crown, Calendar, CreditCard, ExternalLink } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

const SubscriptionCard = () => {
  const { subscription, isPremium, loading, createPortalSession } = useSubscription();

  if (loading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
      }}>
        <p style={{ color: '#5a6c7d', textAlign: 'center' }}>Ładowanie...</p>
      </div>
    );
  }

  if (!isPremium || !subscription) {
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
    <div style={{
      background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 8px 24px rgba(44, 90, 160, 0.3)',
      color: 'white'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '25px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            background: 'rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Crown size={28} color="#ffd700" strokeWidth={2.5} />
          </div>
          <div>
            <h3 style={{
              fontSize: '22px',
              fontWeight: '700',
              margin: 0
            }}>
              Subskrypcja Premium
            </h3>
          </div>
        </div>

        <div style={{
          background: statusInfo.bg,
          color: statusInfo.text,
          padding: '6px 14px',
          borderRadius: '20px',
          fontSize: '13px',
          fontWeight: '600'
        }}>
          {statusInfo.label}
        </div>
      </div>

      {/* Info */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '12px',
        padding: '20px',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '12px'
        }}>
          <Calendar size={18} />
          <span style={{ fontSize: '14px', opacity: 0.9 }}>
            Następna płatność:
          </span>
        </div>
        <div style={{
          fontSize: '20px',
          fontWeight: '700'
        }}>
          {formatDate(subscription.currentPeriodEnd)}
        </div>

        {subscription.cancelAtPeriodEnd && (
          <div style={{
            marginTop: '15px',
            padding: '10px',
            background: 'rgba(255, 193, 7, 0.2)',
            borderRadius: '8px',
            fontSize: '13px'
          }}>
            ⚠️ Subskrypcja zostanie anulowana po zakończeniu obecnego okresu
          </div>
        )}
      </div>

      {/* Manage Button */}
      <button
        onClick={createPortalSession}
        style={{
          width: '100%',
          background: 'white',
          color: '#2c5aa0',
          border: 'none',
          padding: '14px 24px',
          borderRadius: '10px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <CreditCard size={18} />
        Zarządzaj subskrypcją
        <ExternalLink size={16} />
      </button>
    </div>
  );
};

export default SubscriptionCard;

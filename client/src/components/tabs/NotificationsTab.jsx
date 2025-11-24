import React, { useState } from 'react';
import { Bell, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import Pagination from '../common/Pagination';

const ITEMS_PER_PAGE = 4;

const NotificationsTab = ({ setActiveTab, setQuery }) => {
  const {
    notifications,
    unreadCount,
    loading,
    subscriptions,
    markAsRead,
    subscribe,
    unsubscribe
  } = useNotifications();

  const categories = [
    'Świadczenia rodzinne', 
    'Pomoc społeczna', 
    'Energia', 
    'ZUS', 
    'Rehabilitacja'
  ];

  const [currentPage, setCurrentPage] = useState(1);

  const handleMarkAsRead = (deliveredId) => {
    markAsRead([deliveredId]);
  };

  const handleToggleSubscription = async (category) => {
    if (subscriptions.includes(category)) {
      await unsubscribe(category);
    } else {
      await subscribe(category);
    }
  };

  // Separate urgent and regular notifications
  const urgentNotifications = notifications.filter(n => n.is_urgent && !n.seen);
  const regularNotifications = notifications.filter(n => !n.is_urgent);
  const allNotifications = [...urgentNotifications, ...regularNotifications];
    // Paginacja
  const totalPages = Math.ceil(allNotifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentNotifications = allNotifications.slice(startIndex, endIndex);

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      marginBottom: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Bell size={24} color="#2c5aa0" />
        Powiadomienia o zmianach
        {unreadCount > 0 && (
          <span style={{
            background: '#ff9800',
            color: 'white',
            fontSize: '14px',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '12px',
            marginLeft: '10px'
          }}>
            {unreadCount}
          </span>
        )}
      </h2>

      {/* {loading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          color: '#2c5aa0'
        }}>
          <Loader2 size={32} className="animate-spin" />
        </div>
      )} */}

      {!loading && currentNotifications.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#5a6c7d'
        }}>
          <Bell size={48} color="#e1e8ed" style={{ marginBottom: '15px' }} />
          <p style={{ fontSize: '16px', fontWeight: '600' }}>
            Brak powiadomień
          </p>
          <p style={{ fontSize: '14px', marginTop: '8px' }}>
            Zasubskrybuj kategorie poniżej, aby otrzymywać powiadomienia
          </p>
        </div>
      )}

      {currentNotifications.map(notification => {
          const isUrgent = notification.is_urgent;

          const containerStyle = isUrgent
            ? {
                background: 'linear-gradient(135deg, #fff4e6 0%, #ffe8cc 100%)',
                border: '2px solid #ff9800',
                minHeight: '140px',
                position: 'relative',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px'
              }
            : {
                background: notification.seen
                  ? 'linear-gradient(135deg, #f8f9fb 0%, #f0f3f7 100%)'
                  : 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
                border: `2px solid ${notification.seen ? '#e1e8ed' : '#2c5aa0'}`,
                minHeight: '140px',
                position: 'relative',
                padding: '20px',
                borderRadius: '12px',
                marginBottom: '20px',
                opacity: notification.seen ? 0.7 : 1
              };

          const icon = isUrgent ? <AlertCircle size={24} color="#ff9800" /> : <CheckCircle size={24} color={notification.seen ? '#94a3b8' : '#10b981'} />;

          const buttonStyle = isUrgent
            ? {
                background: 'white',
                border: '2px solid #ff9800',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#ff9800',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }
            : {
                background: 'white',
                border: '2px solid #2c5aa0',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#2c5aa0',
                cursor: 'pointer',
                transition: 'all 0.2s'
              };

          const handleMouseOver = e => {
            e.currentTarget.style.background = isUrgent ? '#ff9800' : '#2c5aa0';
            e.currentTarget.style.color = 'white';
          };

          const handleMouseOut = e => {
            e.currentTarget.style.background = 'white';
            e.currentTarget.style.color = isUrgent ? '#ff9800' : '#2c5aa0';
          };

          return (
            <div key={notification.delivered_id} style={containerStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                {icon}
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#2c3e50', margin: 0, flex: 1 }}>
                  {notification.title}
                </h3>
                {!notification.seen && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    style={buttonStyle}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                  >
                    Oznacz jako przeczytane
                  </button>
                )}
              </div>
              <p style={{ color: '#5a6c7d', lineHeight: '1.6', marginBottom: '10px' }}>
                {notification.message}
              </p>
              {notification.category && !isUrgent && (
                <span style={{
                  display: 'inline-block',
                  background: 'white',
                  color: '#2c5aa0',
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  marginRight: '10px',
                  marginBottom: '10px'
                }}>
                  {notification.category}
                </span>
              )}
              {notification.link && (
                <a
                  href={notification.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '20px',
                    color: '#2c5aa0',
                    fontWeight: '600',
                    textDecoration: 'none',
                    transition: 'opacity 0.2s'
                  }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.7'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                >
                  Sprawdź szczegóły →
                </a>
              )}
            </div>
          );
        })}

      {/* Subscription Section */}
      {/* <div style={{
        background: '#f8f9fb',
        padding: '20px',
        borderRadius: '12px',
        border: '2px solid #e1e8ed',
        marginTop: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '15px'
        }}>
          Subskrybuj powiadomienia
        </h3>
        <p style={{
          color: '#5a6c7d',
          lineHeight: '1.6',
          marginBottom: '15px'
        }}>
          Otrzymuj powiadomienia o zmianach w przepisach i nowych świadczeniach dla Twoich ulubionych kategorii.
        </p>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '10px'
        }}>
          {categories.map(cat => {
            const isSubscribed = subscriptions.includes(cat);
            return (
              <label 
                key={cat} 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: isSubscribed ? '#e8f4f8' : 'white',
                  padding: '10px 15px',
                  borderRadius: '8px',
                  color: '#2c3e50',
                  border: `2px solid ${isSubscribed ? '#2c5aa0' : '#e1e8ed'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#2c5aa0';
                  e.currentTarget.style.background = '#f8f9fb';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = isSubscribed ? '#2c5aa0' : '#e1e8ed';
                  e.currentTarget.style.background = isSubscribed ? '#e8f4f8' : 'white';
                }}
              >
                <input 
                  type="checkbox" 
                  checked={isSubscribed}
                  onChange={() => handleToggleSubscription(cat)}
                  style={{ 
                    cursor: 'pointer',
                    width: '18px',
                    height: '18px',
                    accentColor: '#2c5aa0'
                  }} 
                />
                <span style={{ fontSize: '14px', fontWeight: '600' }}>{cat}</span>
              </label>
            );
          })}
        </div>
      </div> */}
      {/* Paginacja */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          itemsPerPage={ITEMS_PER_PAGE}
          totalItems={allNotifications.length}
        />
      )}
    </div>
  );
};

export default NotificationsTab;


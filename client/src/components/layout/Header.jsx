import React from 'react';
import { LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import SubscriptionButton from '../premium/SubscriptionButton';

const Header = ({ setActiveTab }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      marginBottom: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
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
          gap: '15px'
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
          <div>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '800',
              color: '#2c3e50',
              margin: 0
            }}>
              Pomocnik Obywatela
            </h1>
            <p style={{
              color: '#5a6c7d',
              fontSize: '14px',
              margin: 0
            }}>
              Witaj, {user?.user_metadata?.full_name || user?.email}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {/* Crown Button for Premium Users */}
          <SubscriptionButton />

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
      </div>
    </div>
  );
};

export default Header;
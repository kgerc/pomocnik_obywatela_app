import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader, AlertCircle, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data, error: signInError } = await signIn(
      formData.email,
      formData.password
    );

    if (signInError) {
      setError(signInError);
      setLoading(false);
      return;
    }

    // Przekierowanie do aplikacji po zalogowaniu
    navigate('/app');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        maxWidth: '450px',
        width: '100%',
        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
      }}>
        {/* Logo */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            width: '70px',
            height: '70px',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '36px',
            margin: '0 auto 20px'
          }}>
            📋
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '800',
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            Pomocnik Obywatela
          </h1>
          <p style={{
            color: '#5a6c7d',
            fontSize: '15px'
          }}>
            Zaloguj się do swojego konta
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{
            background: '#fee',
            border: '2px solid #fcc',
            borderRadius: '8px',
            padding: '12px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <AlertCircle size={20} color="#c33" />
            <span style={{ color: '#c33', fontSize: '14px' }}>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} color="#5a6c7d" style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="twoj@email.pl"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 42px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Hasło
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} color="#5a6c7d" style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 42px',
                  border: '2px solid #e1e8ed',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '25px'
          }}>
            <Link to="/reset-password" style={{
              color: '#2c5aa0',
              fontSize: '14px',
              textDecoration: 'none',
              fontWeight: '600'
            }}>
              Zapomniałeś hasła?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: loading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              marginBottom: '20px'
            }}
          >
            {loading ? (
              <>
                <Loader size={20} className="spin" />
                Logowanie...
              </>
            ) : (
              <>
                <LogIn size={20} />
                Zaloguj się
              </>
            )}
          </button>

          <div style={{
            textAlign: 'center',
            color: '#5a6c7d',
            fontSize: '14px'
          }}>
            Nie masz konta?{' '}
            <Link to="/register" style={{
              color: '#2c5aa0',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              Zarejestruj się
            </Link>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
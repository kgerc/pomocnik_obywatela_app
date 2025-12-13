import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Loader, AlertCircle, User, UserPlus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import TermsOfService from '../TermsOfService';
import PrivacyPolicy from '../PrivacyPolicy';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

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

    // Validation
    if (!termsAccepted) {
      setError('Musisz zaakceptować Regulamin i Politykę Prywatności');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Hasła nie są identyczne');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Hasło musi mieć minimum 6 znaków');
      setLoading(false);
      return;
    }

    const { data, error: signUpError } = await signUp(
      formData.email,
      formData.password,
      formData.fullName
    );

    if (signUpError) {
      setError(signUpError);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  if (success) {
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
          maxWidth: '500px',
          width: '100%',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            fontSize: '36px'
          }}>
            ✓
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '10px'
          }}>
            Konto utworzone pomyślnie!
          </h2>
          <div style={{
            background: '#e8f4f8',
            border: '2px solid #2c5aa0',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            textAlign: 'left'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '8px'
              }}>
                <Mail size={20} color="#2c5aa0" />
                <h3 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#2c5aa0',
                  margin: 0
                }}>
                  Sprawdź swoją skrzynkę email
                </h3>
              </div>
              <p style={{
                color: '#2c3e50',
                fontSize: '14px',
                lineHeight: '1.6',
                margin: 0
              }}>
                Wysłaliśmy wiadomość z linkiem aktywacyjnym na adres <strong>{formData.email}</strong>
              </p>
            </div>
            <div style={{
              background: '#fff3cd',
              borderRadius: '8px',
              padding: '12px',
              fontSize: '13px',
              color: '#856404',
              lineHeight: '1.5'
            }}>
              <strong>⚠️ Ważne:</strong> Musisz kliknąć w link w emailu, aby aktywować konto i móc się zalogować.
            </div>
          </div>
          <button
            onClick={() => navigate('/login')}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            Przejdź do logowania
          </button>
          <p style={{
            color: '#999',
            fontSize: '12px',
            lineHeight: '1.5'
          }}>
            Nie widzisz emaila? Sprawdź folder SPAM lub skontaktuj się z nami.
          </p>
        </div>
      </div>
    );
  }

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
            Utwórz nowe konto
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
              Imię i nazwisko
            </label>
            <div style={{ position: 'relative' }}>
              <User size={20} color="#5a6c7d" style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)'
              }} />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Jan Kowalski"
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

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Potwierdź hasło
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
                name="confirmPassword"
                value={formData.confirmPassword}
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

          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              cursor: 'pointer',
              padding: '12px',
              background: '#f8f9fb',
              borderRadius: '8px',
              border: termsAccepted ? '2px solid #2c5aa0' : '2px solid #e1e8ed',
              transition: 'all 0.2s'
            }}>
              <input
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                style={{
                  marginTop: '4px',
                  cursor: 'pointer',
                  width: '16px',
                  height: '16px'
                }}
              />
              <span style={{ fontSize: '14px', color: '#2c3e50', lineHeight: '1.6' }}>
                Akceptuję{' '}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowTerms(true);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2c5aa0',
                    fontWeight: '600',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit'
                  }}
                >
                  Regulamin
                </button>
                {' '}oraz{' '}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowPrivacy(true);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2c5aa0',
                    fontWeight: '600',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    padding: 0,
                    font: 'inherit'
                  }}
                >
                  Politykę Prywatności
                </button>
                {' '}<span style={{ color: '#e74c3c' }}>*</span>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading || !termsAccepted}
            style={{
              width: '100%',
              background: (loading || !termsAccepted) ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              border: 'none',
              padding: '14px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: (loading || !termsAccepted) ? 'not-allowed' : 'pointer',
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
                Rejestracja...
              </>
            ) : (
              <>
                <UserPlus size={20} />
                Zarejestruj się
              </>
            )}
          </button>

          <div style={{
            textAlign: 'center',
            color: '#5a6c7d',
            fontSize: '14px'
          }}>
            Masz już konto?{' '}
            <Link to="/login" style={{
              color: '#2c5aa0',
              fontWeight: '600',
              textDecoration: 'none'
            }}>
              Zaloguj się
            </Link>
          </div>
        </form>
      </div>

      {/* Modals */}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </div>
  );
};

export default RegisterForm;
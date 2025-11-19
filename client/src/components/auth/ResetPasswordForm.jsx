import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const ResetPasswordForm = () => {
  const { resetPassword } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: resetError } = await resetPassword(email);

    if (resetError) {
      setError(resetError);
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
          maxWidth: '450px',
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
            margin: '0 auto 20px'
          }}>
            <CheckCircle size={36} color="white" />
          </div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '10px'
          }}>
            Sprawdź swoją skrzynkę email
          </h2>
          <p style={{
            color: '#5a6c7d',
            marginBottom: '30px',
            lineHeight: '1.6'
          }}>
            Wysłaliśmy link do resetowania hasła na adres <strong>{email}</strong>.
            Kliknij w link w emailu, aby ustawić nowe hasło.
          </p>
          <Link to="/login" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#2c5aa0',
            fontWeight: '600',
            textDecoration: 'none',
            fontSize: '15px'
          }}>
            <ArrowLeft size={18} />
            Powrót do logowania
          </Link>
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
            Zresetuj hasło
          </h1>
          <p style={{
            color: '#5a6c7d',
            fontSize: '15px'
          }}>
            Podaj adres email, a wyślemy Ci link do resetowania hasła
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
          <div style={{ marginBottom: '25px' }}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Wysyłanie...
              </>
            ) : (
              <>
                <Mail size={20} />
                Wyślij link resetujący
              </>
            )}
          </button>

          <div style={{
            textAlign: 'center',
            color: '#5a6c7d',
            fontSize: '14px'
          }}>
            Pamiętasz hasło?{' '}
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

export default ResetPasswordForm;

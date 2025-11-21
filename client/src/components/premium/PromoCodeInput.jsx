import React, { useState } from 'react';
import { Tag, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const PromoCodeInput = ({ onCodeValidated, useBlik = false }) => {
  const { session } = useAuth();
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [validatedCode, setValidatedCode] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setValidatedCode(null);

    if (!code.trim()) {
      setError('Wprowadź kod promocyjny');
      return;
    }

    setLoading(true);

    try {
      const token = session.access_token;
      const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
      const response = await fetch(`${API_URL}/api/promo-codes/validate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          code: code.trim().toUpperCase()
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Nie udało się zwalidować kodu');
      }

      // Store validated code info
      setValidatedCode(data);

      // Pass validated code to parent
      if (onCodeValidated) {
        onCodeValidated(data);
      }
    } catch (err) {
      setError(err.message);
      if (onCodeValidated) {
        onCodeValidated(null);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      marginBottom: '20px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '15px'
      }}>
        <Tag size={20} color="#2c5aa0" />
        <h3 style={{
          margin: 0,
          fontSize: '18px',
          fontWeight: '600',
          color: '#2c3e50'
        }}>
          Masz kod promocyjny?
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '12px'
        }}>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="WPROWADŹ KOD"
            disabled={loading || !!validatedCode}
            style={{
              flex: 1,
              padding: '12px 16px',
              border: '2px solid #e1e8ed',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              letterSpacing: '1px',
              outline: 'none',
              transition: 'border-color 0.2s',
              textTransform: 'uppercase'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#2c5aa0';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e1e8ed';
            }}
          />
          <button
            type="submit"
            disabled={loading || !!validatedCode || !code.trim()}
            style={{
              padding: '12px 24px',
              background: loading || !code.trim() ? '#cbd5e0' : '#2c5aa0',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap'
            }}
            onMouseOver={(e) => {
              if (!loading && code.trim() && !validatedCode) {
                e.currentTarget.style.background = '#234a85';
              }
            }}
            onMouseOut={(e) => {
              if (!loading && code.trim() && !validatedCode) {
                e.currentTarget.style.background = '#2c5aa0';
              }
            }}
          >
            {loading ? 'Sprawdzam...' : 'Aktywuj'}
          </button>
        </div>

        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            background: '#fee',
            borderRadius: '8px',
            color: '#c33',
            fontSize: '13px'
          }}>
            <XCircle size={16} />
            {error}
          </div>
        )}

        {validatedCode && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px',
            background: '#d1fae5',
            borderRadius: '8px',
            color: '#059669',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            <CheckCircle size={16} />
            {validatedCode.isFree
              ? `Kod ${validatedCode.code} aktywowany! Kliknij przycisk poniżej aby otrzymać Premium.`
              : `Kod ${validatedCode.code} zastosowany! Zniżka ${validatedCode.discountPercent}% zostanie naliczona przy płatności.`
            }
          </div>
        )}
      </form>

      <p style={{
        margin: 0,
        marginTop: '12px',
        fontSize: '12px',
        color: '#5a6c7d',
        lineHeight: '1.5'
      }}>
        {useBlik
          ? 'Kod promocyjny zastosuje zniżkę do płatności rocznej BLIK.'
          : 'Aktywacja kodu promocyjnego daje dostęp do Premium na 12 miesięcy bez płatności lub z rabatem.'
        }
      </p>
    </div>
  );
};

export default PromoCodeInput;

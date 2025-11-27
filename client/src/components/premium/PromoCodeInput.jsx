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
        body: JSON.stringify({ code: code.trim().toUpperCase() })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Nie udało się zwalidować kodu');
      }

      setValidatedCode(data);
      if (onCodeValidated) onCodeValidated(data);
    } catch (err) {
      setError(err.message);
      if (onCodeValidated) onCodeValidated(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCode = () => {
    setValidatedCode(null);
    setCode('');
    setError('');
    if (onCodeValidated) onCodeValidated(null);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      marginBottom: '20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
        <Tag size={20} color="#2c5aa0" />
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600', color: '#2c3e50' }}>
          Masz kod promocyjny?
        </h3>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
          <input
            type="text"
            value={code}
            onChange={(e) => {
              const newValue = e.target.value.toUpperCase();
              setCode(newValue);

              // Jeśli input wyczyszczony, anuluj kod
              if (validatedCode && newValue.trim() === '') {
                handleRemoveCode();
              }
            }}
            placeholder="WPROWADŹ KOD"
            disabled={loading} // tylko blokada przy ładowaniu
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
            onFocus={(e) => { e.target.style.borderColor = '#2c5aa0'; }}
            onBlur={(e) => { e.target.style.borderColor = '#e1e8ed'; }}
          />

          <button
            type="submit"
            disabled={loading || !code.trim()}
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
            onMouseOver={(e) => { if (!loading && code.trim()) e.currentTarget.style.background = '#234a85'; }}
            onMouseOut={(e) => { if (!loading && code.trim()) e.currentTarget.style.background = '#2c5aa0'; }}
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
            justifyContent: 'space-between',
            gap: '8px',
            padding: '12px',
            background: '#d1fae5',
            borderRadius: '8px',
            color: '#059669',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle size={16} />
              {validatedCode.isFree
                ? `Kod ${validatedCode.code} aktywowany! Kliknij przycisk poniżej aby otrzymać Premium.`
                : `Kod ${validatedCode.code} zastosowany! Zniżka ${validatedCode.discountPercent}% zostanie naliczona przy płatności.`
              }
            </div>

            <button
              type="button"
              onClick={handleRemoveCode}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#c33',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '14px'
              }}
            >
              Usuń
            </button>
          </div>
        )}
      </form>

      <p style={{ margin: '12px 0 0 0', fontSize: '12px', color: '#5a6c7d', lineHeight: '1.5' }}>
        {'Aktywacja kodu promocyjnego daje rabat na subskrypcję Premium' }
      </p>
    </div>
  );
};

export default PromoCodeInput;

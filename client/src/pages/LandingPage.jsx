import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Sparkles, Shield, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)'
    }}>
      {/* Hero Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
          color: 'white',
          width: '100px',
          height: '100px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '50px',
          margin: '0 auto 30px'
        }}>
          📋
        </div>

        <h1 style={{
          fontSize: '52px',
          fontWeight: '800',
          color: '#2c3e50',
          marginBottom: '20px',
          lineHeight: '1.2'
        }}>
          Pomocnik Obywatela
        </h1>

        <p style={{
          fontSize: '22px',
          color: '#5a6c7d',
          marginBottom: '40px',
          maxWidth: '700px',
          margin: '0 auto 40px',
          lineHeight: '1.6'
        }}>
          Twój cyfrowy asystent w nawigacji po świadczeniach społecznych, 
          dotacjach i dokumentach urzędowych.
        </p>

        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/register"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '18px',
              boxShadow: '0 4px 15px rgba(44, 90, 160, 0.3)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Rozpocznij za darmo
            <ArrowRight size={20} />
          </Link>

          <Link
            to="/login"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'white',
              color: '#2c5aa0',
              padding: '16px 32px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '700',
              fontSize: '18px',
              border: '2px solid #2c5aa0',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Zaloguj się
          </Link>
        </div>
      </div>

      {/* Features */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {[
            {
              icon: <Sparkles size={32} />,
              title: 'Asystent wyszukiwania',
              description: 'Inteligentny asystent pomoże Ci znaleźć świadczenia dopasowane do Twojej sytuacji'
            },
            {
              icon: <Shield size={32} />,
              title: 'Bezpieczne i Prywatne',
              description: 'Twoje dane są chronione. Pełna zgodność z RODO i najwyższe standardy bezpieczeństwa'
            },
            {
              icon: <Zap size={32} />,
              title: 'Szybkie Odpowiedzi',
              description: 'Natychmiastowe informacje o świadczeniach, dokumentach i dotacjach w jednym miejscu'
            }
          ].map((feature, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '30px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
            }}
            >
              <div style={{
                color: '#2c5aa0',
                marginBottom: '15px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '10px'
              }}>
                {feature.title}
              </h3>
              <p style={{
                color: '#5a6c7d',
                lineHeight: '1.6'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: 'white',
          marginBottom: '20px'
        }}>
          Gotowy aby zacząć?
        </h2>
        <p style={{
          fontSize: '18px',
          color: 'rgba(255,255,255,0.9)',
          marginBottom: '30px'
        }}>
          Dołącz do tysięcy Polaków korzystających z naszego asystenta
        </p>
        <Link
          to="/register"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: 'white',
            color: '#2c5aa0',
            padding: '16px 32px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '700',
            fontSize: '18px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Utwórz darmowe konto
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
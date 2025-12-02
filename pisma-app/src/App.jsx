import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import GeneratorPism from './components/GeneratorPism';
import './App.css';

function App() {
  const [showGenerator, setShowGenerator] = useState(false);

  // Check URL on mount to see if we should show generator directly
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('generator') === 'true' || urlParams.get('success') === 'true') {
      setShowGenerator(true);
    }
  }, []);

  const handleStartGenerator = () => {
    setShowGenerator(true);
    // Update URL without page reload
    window.history.pushState({}, '', '?generator=true');
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setShowGenerator(false);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {showGenerator ? (
        <div>
          {/* Back to landing button */}
          <div style={{
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
            padding: '20px',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            borderBottom: '1px solid #e1e8ed'
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <button
                onClick={handleBackToLanding}
                style={{
                  background: 'white',
                  color: '#2c5aa0',
                  border: '2px solid #e1e8ed',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = '#f8f9fb';
                  e.currentTarget.style.borderColor = '#2c5aa0';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.borderColor = '#e1e8ed';
                }}
              >
                ← Powrót do strony głównej
              </button>
            </div>
          </div>
          <GeneratorPism />
        </div>
      ) : (
        <LandingPage onStartGenerator={handleStartGenerator} />
      )}
    </div>
  );
}

export default App;

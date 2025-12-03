import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import GeneratorPism from './components/GeneratorPism';
import './App.css';

function App() {
  const [showGenerator, setShowGenerator] = useState(false);

  // Check URL on mount to see if we should show generator directly
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('generator') === 'true' || urlParams.get('success') === 'true' || urlParams.get('canceled') === 'true') {
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
        <GeneratorPism onBackToLanding={handleBackToLanding} />
      ) : (
        <LandingPage onStartGenerator={handleStartGenerator} />
      )}
    </div>
  );
}

export default App;

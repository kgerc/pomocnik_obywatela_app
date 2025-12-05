import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import GeneratorPism from './components/GeneratorPism';
import './App.css';

function App() {
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Check URL on mount to see if we should show generator directly
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('generator') === 'true' || urlParams.get('success') === 'true' || urlParams.get('canceled') === 'true') {
      setShowGenerator(true);
      // Check if there's a category in URL
      const category = urlParams.get('category');
      if (category) {
        setSelectedCategory(decodeURIComponent(category));
      }
    }
  }, []);

  const handleStartGenerator = (category = null) => {
    setShowGenerator(true);
    setSelectedCategory(category);
    // Update URL without page reload
    const url = category
      ? `?generator=true&category=${encodeURIComponent(category)}`
      : '?generator=true';
    window.history.pushState({}, '', url);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setShowGenerator(false);
    setSelectedCategory(null);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      {showGenerator ? (
        <GeneratorPism
          onBackToLanding={handleBackToLanding}
          initialCategory={selectedCategory}
        />
      ) : (
        <LandingPage onStartGenerator={handleStartGenerator} />
      )}
    </div>
  );
}

export default App;

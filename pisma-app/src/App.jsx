import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import GeneratorPism from './components/GeneratorPism';
import './App.css';

// Lazy load components for code splitting
const BlogList = lazy(() => import('./components/BlogList'));
const BlogArticle = lazy(() => import('./components/BlogArticle'));
const DocumentLandingPage = lazy(() => import('./components/DocumentLandingPage'));

// Loading component
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)'
  }}>
    <div style={{
      fontSize: '18px',
      color: '#2c5aa0',
      fontWeight: '600'
    }}>
      Ładowanie...
    </div>
  </div>
);

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Check URL on mount to see if we should show generator directly
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    if (location.pathname === '/' && (
      urlParams.get('generator') === 'true' ||
      urlParams.get('success') === 'true' ||
      urlParams.get('canceled') === 'true'
    )) {
      setShowGenerator(true);
      const category = urlParams.get('category');
      if (category) {
        setSelectedCategory(decodeURIComponent(category));
      }
    }
  }, [location]);

  const handleStartGenerator = (category = null) => {
    setShowGenerator(true);
    setSelectedCategory(category);
    const url = category
      ? `?generator=true&category=${encodeURIComponent(category)}`
      : '?generator=true';
    navigate(url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToLanding = () => {
    setShowGenerator(false);
    setSelectedCategory(null);
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="App">
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Homepage - Landing or Generator */}
          <Route path="/" element={
            showGenerator ? (
              <GeneratorPism
                onBackToLanding={handleBackToLanding}
                initialCategory={selectedCategory}
              />
            ) : (
              <LandingPage onStartGenerator={handleStartGenerator} />
            )
          } />

          {/* Blog Routes */}
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogArticle onGenerateClick={handleStartGenerator} />} />

          {/* Document Landing Pages */}
          <Route path="/pismo/:slug" element={<DocumentLandingPage />} />

          {/* 404 Not Found */}
          <Route path="*" element={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
              textAlign: 'center',
              padding: '20px'
            }}>
              <h1 style={{ fontSize: '72px', color: '#2c5aa0', marginBottom: '20px' }}>404</h1>
              <h2 style={{ fontSize: '24px', color: '#2c3e50', marginBottom: '30px' }}>
                Strona nie została znaleziona
              </h2>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '12px 30px',
                  background: '#2c5aa0',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Wróć do strony głównej
              </button>
            </div>
          } />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Search, Loader, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import SwiadczenieCard from '../swiadczenia/SwiadczenieCard';
import { useSwiadczenia } from '../../hooks/useSwiadczenia';

const ChatInterface = ({ onToggleFavorite, isFavorite }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const { search } = useSwiadczenia();

  const exampleQuestions = [
    "Czy mogę dostać 500+ na dziecko?",
    "Mam dwójkę dzieci i nie stać mnie na rachunki",
    "Jakie wsparcie dla osoby niepełnosprawnej?",
    "Dodatek na ogrzewanie - kto może dostać?"
  ];

  // Retriever - wyszukiwanie najlepszych dopasowań
  const findBestMatches = (swiadczenia, query, limit = 3) => {
    const queryLower = query.toLowerCase();
    
    const scored = swiadczenia.map(sw => {
      let score = 0;
      
      sw.slowa_kluczowe?.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 10;
        }
      });
      
      if (queryLower.includes(sw.nazwa.toLowerCase())) {
        score += 20;
      }
      
      if (queryLower.includes(sw.kategoria.toLowerCase())) {
        score += 5;
      }
      
      return { ...sw, score };
    });
    
    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  };

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    
    try {
      // Wyszukaj świadczenia przez API
      const allSwiadczenia = await search(query);
      
      if (allSwiadczenia.length === 0) {
        setResult({
          content: `Nie znalazłem dokładnego dopasowania do Twojego pytania. Sprawdź oficjalne źródła:\n\n• [Portal Gov.pl](https://www.gov.pl)\n• [ZUS](https://www.zus.pl)\n• [Biznes.gov.pl](https://www.biznes.gov.pl)\n\nMożesz też spróbować doprecyzować pytanie lub zapytać o konkretne świadczenie.`,
          matches: []
        });
        setLoading(false);
        return;
      }

      // Znajdź najlepsze dopasowania
      const matches = findBestMatches(allSwiadczenia, query, 3);

      // Przygotuj kontekst dla AI
      const contextForAI = matches.map(m => 
        `${m.nazwa}: ${m.krotki_opis}`
      ).join('\n');

      // Wywołaj Gemini AI
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const prompt = `Jesteś asystentem obywatela w Polsce. Odpowiadaj TYLKO po polsku. Użytkownik pyta: "${query}"\n\nDostępne świadczenia w bazie danych:\n${contextForAI}\n\nOdpowiedz krótko i konkretnie (max 3-4 zdania):
      1. Które świadczenie/a pasują do pytania użytkownika
      2. Podstawowe informacje o kwalifikacji
      3. Zachęć do sprawdzenia szczegółów poniżej. NIE podawaj linków ani nie wymyślaj świadczeń spoza podanej bazy.`;

      const aiResult = await model.generateContent(prompt);
      const aiResponse = aiResult.response.text();

      setResult({
        content: aiResponse,
        matches: matches
      });
      
    } catch (error) {
      console.error('Błąd:', error);
      setResult({
        content: 'Wystąpił błąd podczas przetwarzania zapytania. Spróbuj ponownie.',
        matches: []
      });
    }
    
    setLoading(false);
    setQuery('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      {/* Search Input */}
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        marginBottom: '20px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '15px'
        }}>
          <Search size={24} color="#2c5aa0" />
          <h2 style={{
            fontSize: '20px',
            fontWeight: '600',
            color: '#2c3e50',
            margin: 0
          }}>
            Zadaj pytanie
          </h2>
        </div>
        
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Np. 'Mam dwójkę dzieci i nie stać mnie na rachunki - jakie świadczenia mi przysługują?'"
          style={{
            width: '100%',
            minHeight: '100px',
            padding: '15px',
            fontSize: '16px',
            border: '2px solid #e1e8ed',
            background: 'white',
            color: 'black',
            borderRadius: '12px',
            resize: 'vertical',
            fontFamily: 'inherit',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />
        
        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          style={{
            background: loading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: loading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {loading ? (
            <>
              <Loader size={20} className="spin" />
              Analizuję...
            </>
          ) : (
            <>
              <Sparkles size={20} />
              Zapytaj AI
            </>
          )}
        </button>

        {!result && (
          <div style={{ marginTop: '25px' }}>
            <p style={{
              fontSize: '14px',
              color: '#5a6c7d',
              marginBottom: '12px',
              fontWeight: '600'
            }}>
              Przykładowe pytania:
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              {exampleQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => setQuery(q)}
                  style={{
                    background: '#f8f9fb',
                    border: '1px solid #e1e8ed',
                    borderRadius: '8px',
                    padding: '12px 15px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#2c5aa0',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = '#e8f4f8';
                    e.currentTarget.style.borderColor = '#2c5aa0';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = '#f8f9fb';
                    e.currentTarget.style.borderColor = '#e1e8ed';
                  }}
                >
                  💡 {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {result && (
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '2px solid #2c5aa0'
          }}>
            <div style={{
              color: '#2c3e50',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {result.content}
            </div>
          </div>

          {result.matches && result.matches.length > 0 && (
            <div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '15px'
              }}>
                Znalezione świadczenia:
              </h3>
              {result.matches.map((sw) => (
                <SwiadczenieCard
                  key={sw.id}
                  swiadczenie={sw}
                  onToggleFavorite={onToggleFavorite}
                  isFavorite={isFavorite(sw.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
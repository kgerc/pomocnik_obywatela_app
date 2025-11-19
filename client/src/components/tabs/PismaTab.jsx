import React, { useState, useEffect } from 'react';
import { Edit, Sparkles, Search, Loader, FileText, AlertCircle, ExternalLink, Download } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { usePisma } from '../../hooks/usePisma';

const PismaTab = () => {
  const [pismaQuery, setPismaQuery] = useState('');
  const [pismaLoading, setPismaLoading] = useState(false);
  const [pismaResult, setPismaResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [categories, setCategories] = useState(['wszystkie']);
  const [filteredPisma, setFilteredPisma] = useState([]);
  
  const { pisma, loading, error, fetchAll, search, getByCategory, getCategories } = usePisma();

  // Pobierz pisma i kategorie przy montowaniu komponentu
  useEffect(() => {
    const loadData = async () => {
      await fetchAll();
      const categoriesData = await getCategories();
      setCategories(['wszystkie', ...categoriesData]);
    };
    loadData();
  }, []);

  // Filtruj pisma gdy zmieni się kategoria
  useEffect(() => {
    const filterPisma = async () => {
      if (selectedCategory === 'wszystkie') {
        setFilteredPisma(pisma);
      } else {
        const filtered = await getByCategory(selectedCategory);
        setFilteredPisma(filtered);
      }
    };
    filterPisma();
  }, [selectedCategory, pisma]);

  const handlePismaSearch = async () => {
    if (!pismaQuery.trim()) return;

    setPismaLoading(true);
    
    try {
      const matches = await search(pismaQuery);
      
      if (matches.length === 0) {
        setPismaResult({
          content: `Nie znalazłem dokładnego dopasowania w bazie pism. Spróbuj bardziej ogólnego opisu, np:\n- "reklamacja produktu"\n- "wniosek o świadczenie"\n- "odwołanie od decyzji"\n\nLub sprawdź oficjalne źródła:\n• [Portal Gov.pl](https://www.gov.pl)\n• [Wzory pism](https://www.gov.pl/web/gov/wzory-pism)`,
          matches: []
        });
        setPismaLoading(false);
        return;
      }

      const contextForAI = matches.map(m => `${m.nazwa}: ${m.opis}`).join('\n');

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      const prompt = `Jesteś asystentem prawnym w Polsce. Odpowiadaj TYLKO po polsku.

      Użytkownik szuka pisma/wniosku: "${pismaQuery}"

      Dostępne pisma w bazie danych:
      ${contextForAI}

      Odpowiedz krótko (2-3 zdania):
      1. Które pismo/pisma pasują do potrzeby użytkownika
      2. Co użytkownik znajdzie w tych dokumentach
      3. Zachęć do pobrania/sprawdzenia szczegółów poniżej

      NIE podawaj linków ani nie wymyślaj pism spoza bazy.`;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      setPismaResult({
        content: aiResponse,
        matches: matches
      });
      
    } catch (error) {
      console.error('Błąd:', error);
      setPismaResult({
        content: 'Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.',
        matches: []
      });
    }
    
    setPismaLoading(false);
    setPismaQuery('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePismaSearch();
    }
  };

  if (loading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '60px',
        marginBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        <Loader size={48} className="spin" style={{ color: '#2c5aa0', marginBottom: '20px' }} />
        <p style={{ color: '#5a6c7d', fontSize: '16px' }}>Ładowanie pism...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        marginBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
      }}>
        <AlertCircle size={48} color="#c33" style={{ marginBottom: '20px' }} />
        <h3 style={{ color: '#c33', marginBottom: '10px' }}>Błąd ładowania pism</h3>
        <p style={{ color: '#5a6c7d' }}>{error}</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      marginBottom: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Edit size={24} color="#2c5aa0" />
        Pisma i wnioski do pobrania
      </h2>
      <p style={{
        color: '#5a6c7d',
        marginBottom: '25px',
        lineHeight: '1.6'
      }}>
        Znajdź potrzebny dokument - przeglądaj bazę lub zapytaj AI o konkretne pismo.
      </p>

      {/* AI Search */}
      <div style={{
        background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
        padding: '25px',
        borderRadius: '12px',
        marginBottom: '30px',
        border: '2px solid #2c5aa0'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '15px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Sparkles size={20} color="#2c5aa0" />
          Zapytaj AI o pismo
        </h3>
        
        <textarea
          value={pismaQuery}
          onChange={(e) => setPismaQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Np. 'Potrzebuję pisma reklamacyjnego do spółdzielni' lub 'Jak złożyć wniosek o emeryturę?'"
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '15px',
            fontSize: '16px',
            border: '2px solid #2c5aa0',
            borderRadius: '8px',
            resize: 'vertical',
            fontFamily: 'inherit',
            marginBottom: '15px',
            boxSizing: 'border-box'
          }}
        />
        
        <button
          onClick={handlePismaSearch}
          disabled={pismaLoading || !pismaQuery.trim()}
          style={{
            background: pismaLoading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: pismaLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => !pismaLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {pismaLoading ? (
            <>
              <Loader size={18} className="spin" />
              Szukam...
            </>
          ) : (
            <>
              <Search size={18} />
              Znajdź pismo
            </>
          )}
        </button>

        {/* AI Result */}
        {pismaResult && (
          <div style={{
            marginTop: '20px',
            background: 'white',
            padding: '20px',
            borderRadius: '12px'
          }}>
            <div style={{
              color: '#2c3e50',
              lineHeight: '1.6',
              marginBottom: '20px',
              whiteSpace: 'pre-wrap'
            }}>
              {pismaResult.content}
            </div>

            {pismaResult.matches && pismaResult.matches.length > 0 && (
              <div>
                {pismaResult.matches.map((pismo, idx) => (
                  <PismoCard key={idx} pismo={pismo} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div style={{
        marginBottom: '20px'
      }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '15px'
        }}>
          Przeglądaj po kategorii
        </h3>
        <div style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                background: selectedCategory === cat 
                  ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' 
                  : '#f8f9fb',
                color: selectedCategory === cat ? 'white' : '#2c5aa0',
                border: selectedCategory === cat ? 'none' : '2px solid #e1e8ed',
                padding: '10px 20px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                transition: 'all 0.2s',
                textTransform: 'capitalize'
              }}
            >
              {cat} ({cat === 'wszystkie' ? pisma.length : pisma.filter(p => p.kategoria === cat).length})
            </button>
          ))}
        </div>
      </div>

      {/* Documents Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        {filteredPisma.map(pismo => (
          <PismoCardSmall key={pismo.id} pismo={pismo} />
        ))}
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

// Duża karta pisma (w wynikach AI)
const PismoCard = ({ pismo }) => (
  <div style={{
    background: '#f8f9fb',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '15px',
    border: '2px solid #e1e8ed'
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px'
    }}>
      <FileText size={24} color="#2c5aa0" />
      <h4 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#2c3e50',
        margin: 0
      }}>
        {pismo.nazwa}
      </h4>
    </div>

    <div style={{
      display: 'inline-block',
      background: '#e8f4f8',
      color: '#2c5aa0',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '12px'
    }}>
      {pismo.kategoria}
    </div>

    <p style={{
      color: '#5a6c7d',
      lineHeight: '1.6',
      marginBottom: '15px'
    }}>
      {pismo.opis}
    </p>

    <div style={{
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    }}>
      {pismo.pdf ? (
        <a
          href={pismo.pdf}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Download size={16} />
          Pobierz PDF
        </a>
      ) : (
        <a
          href={pismo.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <ExternalLink size={16} />
          {pismo.szablon ? 'Zobacz szablon' : 'Więcej informacji'}
        </a>
      )}
    </div>
  </div>
);

// Mała karta pisma (w grid)
const PismoCardSmall = ({ pismo }) => (
  <div style={{
    background: '#f8f9fb',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #e1e8ed',
    transition: 'all 0.3s ease'
  }}
  onMouseOver={(e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
  }}
  onMouseOut={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = 'none';
  }}
  >
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px'
    }}>
      {pismo.pdf ? (
        <Download size={24} color="#10b981" />
      ) : (
        <FileText size={24} color="#2c5aa0" />
      )}
      <div style={{ flex: 1 }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: '700',
          color: '#2c3e50',
          margin: 0,
          lineHeight: '1.3'
        }}>
          {pismo.nazwa}
        </h4>
      </div>
    </div>

    <div style={{
      display: 'inline-block',
      background: '#e8f4f8',
      color: '#2c5aa0',
      padding: '3px 10px',
      borderRadius: '15px',
      fontSize: '12px',
      fontWeight: '600',
      marginBottom: '12px'
    }}>
      {pismo.kategoria}
    </div>

    <p style={{
      color: '#5a6c7d',
      fontSize: '14px',
      lineHeight: '1.5',
      marginBottom: '15px',
      minHeight: '60px'
    }}>
      {pismo.opis}
    </p>

    {pismo.pdf ? (
      <a
        href={pismo.pdf}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
          color: 'white',
          padding: '10px 15px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px',
          width: '100%'
        }}
      >
        <Download size={16} />
        Pobierz PDF
      </a>
    ) : (
      <a
        href={pismo.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: '#f8f9fb',
          color: '#2c5aa0',
          padding: '10px 15px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: '600',
          fontSize: '14px',
          border: '2px solid #2c5aa0',
          width: '100%'
        }}
      >
        <ExternalLink size={16} />
        Zobacz więcej
      </a>
    )}
  </div>
);

export default PismaTab;
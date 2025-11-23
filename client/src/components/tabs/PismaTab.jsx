import React, { useState, useEffect } from 'react';
import { Edit, Sparkles, Search, Loader, FileText, AlertCircle, Download, ExternalLink } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { usePisma } from '../../hooks/usePisma';
import SaveDocumentButton from '../common/SaveDocumentButton';
import Pagination from '../common/Pagination';
import PremiumFeatureTeaser from '../premium/PremiumFeatureTeaser';

const ITEMS_PER_PAGE = 12;

const PismaTab = ({ preloadedIsPremium = null }) => {
  const [pismaQuery, setPismaQuery] = useState('');
  const [pismaLoading, setPismaLoading] = useState(false);
  const [pismaResult, setPismaResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [categories, setCategories] = useState(['wszystkie']);
  const [filteredPisma, setFilteredPisma] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
      setCurrentPage(1); // Reset do pierwszej strony przy zmianie kategorii
    };
    filterPisma();
  }, [selectedCategory, pisma]);

  // Oblicz paginację
  const totalPages = Math.ceil(filteredPisma.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPisma = filteredPisma.slice(startIndex, endIndex);

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
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
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

      {/* AI Search - PREMIUM */}
      <PremiumFeatureTeaser
        feature="asystenta AI dla pism"
        title="Zapytaj AI o pismo"
        preloadedIsPremium={preloadedIsPremium}
      >
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
            background: 'white',
            color: 'black',
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
      </PremiumFeatureTeaser>

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
      {currentPisma.length > 0 ? (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {currentPisma.map(pismo => (
              <PismoCardSmall key={pismo.id} pismo={pismo} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={filteredPisma.length}
          />
        </>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#5a6c7d'
        }}>
          <FileText size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
          <p style={{ fontSize: '16px', fontWeight: '600' }}>
            Brak pism w tej kategorii
          </p>
        </div>
      )}
    </div>
  );
};

// Komponent przycisku do pobierania PDF
const PdfDownloadButton = ({ pismo, fullWidth = false }) => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const [downloading, setDownloading] = useState(false);

  // Jeśli jest PDF, generuj URL do bucketa
  const pdfUrl = pismo.pdf
    ? `${supabaseUrl}/storage/v1/object/public/documents/${pismo.pdf}`
    : pismo.link;

  // Jeśli nie ma ani PDF ani linku
  if (!pismo.pdf && !pismo.link) {
    return null;
  }

  // Funkcja do pobierania PDF
  const handleDownload = async (e) => {
    if (!pismo.pdf) {
      // Jeśli to tylko link (fallback), otwórz w nowej karcie
      window.open(pismo.link, '_blank');
      return;
    }

    e.preventDefault();
    setDownloading(true);

    try {
      const response = await fetch(pdfUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = pismo.pdf || `${pismo.nazwa}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Błąd pobierania PDF:', error);
      // Fallback - otwórz w nowej karcie
      window.open(pdfUrl, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        background: downloading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        fontWeight: '600',
        fontSize: '14px',
        cursor: downloading ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s',
        width: fullWidth ? '100%' : 'auto',
        boxSizing: 'border-box'
      }}
      onMouseOver={(e) => !downloading && (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {downloading ? (
        <>
          <Loader size={16} className="spin" />
          Pobieranie...
        </>
      ) : pismo.pdf ? (
        <>
          <Download size={16} />
          Pobierz PDF
        </>
      ) : (
        <>
          <ExternalLink size={16} />
          Otwórz źródło
        </>
      )}
    </button>
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
      <PdfDownloadButton pismo={pismo} />
      <SaveDocumentButton
        documentData={{
          title: pismo.nazwa,
          description: pismo.opis,
          fileUrl: pismo.pdf ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/documents/${pismo.pdf}` : pismo.link,
          fileName: `${pismo.nazwa}.pdf`,
          sourceType: 'pismo',
          sourceId: pismo.id
        }}
      />
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
    transition: 'all 0.3s ease',
    display: 'flex',
    flexDirection: 'column'
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

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: 'auto'
    }}>
      <PdfDownloadButton pismo={pismo} fullWidth />
      <SaveDocumentButton
        documentData={{
          title: pismo.nazwa,
          description: pismo.opis,
          fileUrl: pismo.pdf ? `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/documents/${pismo.pdf}` : pismo.link,
          fileName: `${pismo.nazwa}.pdf`,
          sourceType: 'pismo',
          sourceId: pismo.id
        }}
      />
    </div>
  </div>
);

export default PismaTab;
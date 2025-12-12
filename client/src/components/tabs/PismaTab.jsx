import React, { useState, useEffect } from 'react';
import { Edit, Sparkles, Search, Loader, FileText, AlertCircle, Download, ExternalLink, Eraser, ChevronDown } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { usePisma } from '../../hooks/usePisma';
import SaveDocumentButton from '../common/SaveDocumentButton';
import Pagination from '../common/Pagination';
import PremiumFeatureTeaser from '../premium/PremiumFeatureTeaser';
import { saveConversationToHistory } from '../../utils/saveToHistory';
import ChatPreview from '../chat/ChatPreview';
import { DOSTEPNE_PISMA } from '../../data/pisma/index'; // Import pism z generatora

const ITEMS_PER_PAGE = 12;

const PismaTab = ({ preloadedIsPremium = null }) => {
  const [pismaQuery, setPismaQuery] = useState('');
  const [pismaLoading, setPismaLoading] = useState(false);
  const [pismaResult, setPismaResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [categories, setCategories] = useState(['wszystkie']);
  const [filteredPisma, setFilteredPisma] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const { pisma, loading, error, fetchAll, getCategories } = usePisma();
  const [isVisible, setIsVisible] = useState(false);

  // Pobierz pisma i kategorie przy montowaniu komponentu
  useEffect(() => {
    const loadData = async () => {
      await fetchAll();
      const categoriesData = await getCategories();
      setCategories(['wszystkie', ...categoriesData]);
    };
    loadData();
  }, []);

  // Uruchom animację dopiero gdy dane się załadują
  useEffect(() => {
    if (!loading && pisma.length > 0) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading, pisma]);

  // Filtruj pisma lokalnie gdy zmieni się kategoria
  useEffect(() => {
    if (selectedCategory === 'wszystkie') {
      setFilteredPisma(pisma);
    } else {
      const filtered = pisma.filter(p => p.kategoria === selectedCategory);
      setFilteredPisma(filtered);
    }
    setCurrentPage(1); // Reset do pierwszej strony przy zmianie kategorii
  }, [selectedCategory, pisma]);

  // Oblicz paginację
  const totalPages = Math.ceil(filteredPisma.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPisma = filteredPisma.slice(startIndex, endIndex);

  const handlePismaSearch = async () => {
    if (!pismaQuery.trim()) return;

    setPismaLoading(true);
    const userQuery = pismaQuery.trim();

    try {
      const all = pisma; // cała baza pism

      if (!all || all.length === 0) {
        const emptyResponse = "Baza pism jest pusta. Spróbuj ponownie później.";
        setPismaResult({
          content: emptyResponse,
          matches: []
        });

        // Zapisz do historii
        await saveConversationToHistory(userQuery, emptyResponse, []);

        setPismaLoading(false);
        return;
      }

      // 1. Budujemy pełny kontekst RAG (pisma z bazy + pisma z generatora)
      const allPismaWithGenerator = [...all, ...DOSTEPNE_PISMA];

      const contextForAI = allPismaWithGenerator
        .map(m => {
          // Pisma z bazy mają slowa_kluczowe, pisma z generatora mają pytania
          const isFromGenerator = !m.slowa_kluczowe && m.pytania;
          const source = isFromGenerator ? '[GENERATOR]' : '[BAZA]';

          return `• ${source} Nazwa: ${m.nazwa}
            Opis: ${m.opis}
            Słowa kluczowe: ${m.slowa_kluczowe?.join(', ') || 'brak'}
            Kategoria: ${m.kategoria}`;
        })
        .join('\n\n');

      // 2. Konfiguracja Gemini
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // 3. RAG – model wybiera tylko z listy
      const prompt = `
        Jesteś precyzyjnym asystentem prawnym w Polsce. Odpowiadasz TYLKO po polsku.

        ## Zadanie
        Użytkownik wpisuje zapytanie: "${userQuery}"

        Twoim zadaniem jest:
        1. Dokładnie przeanalizować CAŁĄ poniższą listę pism.
        2. Wybrać wyłącznie te elementy, które **semantycznie pasują** do zapytania użytkownika.
          - Uwzględnij odmiany wyrazów, synonimy, powiązania tematyczne.
          - Nie wymyślaj pism spoza listy.
        3. Zwróć wynik w formie krótkiej odpowiedzi (2–4 zdania):
          - nazwy najlepiej pasujących pism,
          - co użytkownik znajdzie w tych dokumentach,
          - **WAŻNE**: jeśli pismo ma oznaczenie [GENERATOR], dodaj dokładną instrukcję nawigacji na podstawie kategorii pisma:
            → Przejdź do zakładki 'Generator Pism' → [Kategoria z pisma]

        ## LISTA PISM
        Każde pismo jest oznaczone:
        - [BAZA] = pismo informacyjne dostępne do odczytu
        - [GENERATOR] = wzór pisma dostępny w generatorze do automatycznego wypełnienia

        ${contextForAI}

        ## PRZYKŁAD ODPOWIEDZI dla pisma [GENERATOR]:
        "Znalazłem dla Ciebie **Wniosek o zawieszenie działalności gospodarczej**. To pismo pozwala zawiesić działalność w CEIDG.
        **Możesz je wygenerować:** Przejdź do zakładki 'Generator Pism' → Biznes"

        ## WAŻNE
        - Możesz korzystać z własnej wiedzy WYŁĄCZNIE do doprecyzowania lub wyjaśnień,
          ale NIE możesz dodawać pism spoza listy.
        - Odpowiadaj krótko, konkretnie i rzeczowo.
        - **ZAWSZE** podawaj dokładną ścieżkę nawigacji (Generator Pism → Kategoria) dla pism [GENERATOR].
        - **NIE wyświetlaj tagów [GENERATOR] ani [BAZA] w odpowiedzi dla użytkownika** - są one tylko dla Twojej orientacji.
      `;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      // 4. Wyciągamy faktyczne wyniki z listy (matchowanie nazw z odpowiedzi LLM)
      // WAŻNE: tylko pisma z BAZY (nie z generatora) - bo tylko te mają PDFy do pobrania
      const matched = all.filter(p =>
        aiResponse.toLowerCase().includes(p.nazwa.toLowerCase())
      );

      setPismaResult({
        content: aiResponse,
        matches: matched
      });

      // Zapisz do historii
      await saveConversationToHistory(userQuery, aiResponse, matched);

    } catch (error) {
      console.error('Błąd:', error);
      const errorResponse = 'Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.';
      setPismaResult({
        content: errorResponse,
        matches: []
      });

      // Zapisz błąd do historii
      await saveConversationToHistory(userQuery, errorResponse, []);
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
        textAlign: 'center',
        padding: '60px'
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
    }} className={`fade-in ${isVisible ? "visible" : ""}`}>
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

      {/* Chat AI Preview - widoczny dla wszystkich, ale tylko premium może używać */}
      <ChatPreview
        query={pismaQuery}
        setQuery={setPismaQuery}
        onSearch={handlePismaSearch}
        loading={pismaLoading}
        result={pismaResult}
        placeholder="Np. 'Potrzebuję wniosku o zasiłek' lub 'Pismo do ZUS o świadczenie'"
        title="Zapytaj AI o pismo"
        onClear={() => setPismaResult(null)}
        renderCard={(pismo, idx) => <PismoCard key={idx} pismo={pismo} preloadedIsPremium={preloadedIsPremium} />}
      />

      {/* Category Filter */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{
          fontSize: '18px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '15px'
        }}>
          Przeglądaj po kategorii
        </h3>

        {/* Dropdown menu dla desktop i mobile */}
        <div className="pismo-scroll" style={{ position: 'relative' }}>
          <button
            onClick={() => setShowCategoryMenu(!showCategoryMenu)}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              maxWidth: '280px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s',
              textTransform: 'capitalize'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={18} />
              <span>{selectedCategory}</span>
            </div>
            <ChevronDown size={18} style={{
              transform: showCategoryMenu ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s'
            }} />
          </button>

          {/* Dropdown lista */}
          {showCategoryMenu && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              marginTop: '8px',
              background: 'white',
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
              zIndex: 1000,
              maxWidth: '280px',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {categories.map(cat => {
                const count = cat === 'wszystkie'
                  ? pisma.length
                  : pisma.filter(p => p.kategoria === cat).length;

                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryMenu(false);
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: selectedCategory === cat ? '#f0f7ff' : 'transparent',
                      border: 'none',
                      padding: '14px 16px',
                      cursor: 'pointer',
                      fontWeight: selectedCategory === cat ? '600' : '500',
                      fontSize: '14px',
                      color: selectedCategory === cat ? '#2c5aa0' : '#2c3e50',
                      transition: 'background 0.2s',
                      borderBottom: '1px solid #f0f0f0',
                      textAlign: 'left',
                      textTransform: 'capitalize'
                    }}
                    onMouseOver={(e) => {
                      if (selectedCategory !== cat) {
                        e.currentTarget.style.background = '#f8f9fb';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (selectedCategory !== cat) {
                        e.currentTarget.style.background = 'transparent';
                      }
                    }}
                  >
                    <span>{cat}</span>
                    <span style={{
                      background: selectedCategory === cat ? '#2c5aa0' : '#e1e8ed',
                      color: selectedCategory === cat ? 'white' : '#5a6c7d',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
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
              <PismoCardSmall key={pismo.id} pismo={pismo} preloadedIsPremium={preloadedIsPremium} />
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
const PismoCard = ({ pismo, preloadedIsPremium }) => (
  <div style={{
    background: '#f8f9fb',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '15px',
    border: '2px solid #e1e8ed',
    display: 'flex',
    flexDirection: 'column',
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
      marginBottom: '12px',
      alignSelf: 'flex-start'
    }}>
      {pismo.kategoria}
    </div>

    <p style={{
      color: '#5a6c7d',
      lineHeight: '1.6',
      marginBottom: '15px',
      flex: 1
    }}>
      {pismo.opis}
    </p>

    <div style={{
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginTop: 'auto'
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
        isPremium={preloadedIsPremium}
      />
    </div>
  </div>
);

// Mała karta pisma (w grid)
const PismoCardSmall = ({ pismo, preloadedIsPremium }) => (
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
        isPremium={preloadedIsPremium}
      />
    </div>
  </div>
);

export default PismaTab;
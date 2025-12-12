import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Search, Loader, Shield, AlertCircle, Info, CheckCircle, Eraser, ChevronDown } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useSwiadczenia } from '../../hooks/useSwiadczenia';
import { useAppData } from '../../contexts/AppDataContext';
import Pagination from '../common/Pagination';
import PremiumFeatureTeaser from '../premium/PremiumFeatureTeaser';
import SwiadczenieDetailsModal from '../swiadczenia/SwiadczenieDetailsModal';
import { saveConversationToHistory } from '../../utils/saveToHistory';
import ChatPreview from '../chat/ChatPreview';

const ITEMS_PER_PAGE = 10;

const SwiadczeniaTab = () => {
  const { toggleFavorite, isFavorite, isPremium: preloadedIsPremium, loading: subscriptionLoading } = useAppData();

  const handleToggleFavorite = async (itemId) => {
    await toggleFavorite('swiadczenie', itemId);
  };
  const [swiadczeniaQuery, setSwiadczeniaQuery] = useState('');
  const [swiadczeniaLoading, setSwiadczeniaLoading] = useState(false);
  const [swiadczeniaResult, setSwiadczeniaResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [categories, setCategories] = useState(['wszystkie']);
  const [filteredSwiadczenia, setFilteredSwiadczenia] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSwiadczenie, setSelectedSwiadczenie] = useState(null);
  const [showCategoryMenu, setShowCategoryMenu] = useState(false);

  const { swiadczenia, loading, error, fetchAll, getCategories } = useSwiadczenia();
  const [isVisible, setIsVisible] = useState(false);

  // Pobierz świadczenia i kategorie przy montowaniu komponentu
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
    if (!loading && swiadczenia.length > 0) {
      // małe opóźnienie żeby animacja była bardziej naturalna
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading, swiadczenia]);

  // Filtruj świadczenia lokalnie gdy zmieni się kategoria
  useEffect(() => {
    if (selectedCategory === 'wszystkie') {
      setFilteredSwiadczenia(swiadczenia);
    } else {
      const filtered = swiadczenia.filter(s => s.kategoria === selectedCategory);
      setFilteredSwiadczenia(filtered);
    }
    setCurrentPage(1); // Reset do pierwszej strony przy zmianie kategorii
  }, [selectedCategory, swiadczenia]);

  // Oblicz paginację
  const totalPages = Math.ceil(filteredSwiadczenia.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentSwiadczenia = filteredSwiadczenia.slice(startIndex, endIndex);

  const handleSwiadczeniaSearch = async () => {
    if (!swiadczeniaQuery.trim()) return;

    setSwiadczeniaLoading(true);
    const userQuery = swiadczeniaQuery.trim();

    try {
      const all = swiadczenia;

      if (!all || all.length === 0) {
        const emptyResponse = "Baza świadczeń jest pusta. Spróbuj ponownie później.";
        setSwiadczeniaResult({
          content: emptyResponse,
          matches: []
        });

        // Zapisz do historii
        await saveConversationToHistory(userQuery, emptyResponse, []);

        setSwiadczeniaLoading(false);
        return;
      }

      // 2. Budujemy pełny kontekst RAG
      const contextForAI = all
        .map(m =>
          `• Nazwa: ${m.nazwa}
              Krótki opis: ${m.krotki_opis}
              Słowa kluczowe: ${m.slowa_kluczowe?.join(', ')}
              Kategoria: ${m.kategoria}`
        )
        .join('\n\n');

      // 3. Konfiguracja Gemini
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // 4. RAG – model wybiera TYLKO z listy
      const prompt = `
        Jesteś bardzo precyzyjnym asystentem obywatela w Polsce. Odpowiadasz TYLKO po polsku.

        ## Zadanie
        Użytkownik wpisuje zapytanie: "${userQuery}"

        Twoim zadaniem jest:
        1. Dokładnie przeanalizować CAŁĄ poniższą listę świadczeń.
        2. Wybrać wyłącznie te elementy, które **semantycznie pasują** do zapytania użytkownika.
          - Uwzględnij odmiany wyrazów, synonimy, powiązania tematyczne.
          - Nie wymyślaj świadczeń spoza listy.
        3. Zwróć wynik w formie krótkiej odpowiedzi (2–4 zdania):
          - nazwy najlepiej pasujących świadczeń,
          - dlaczego akurat te,
          - co użytkownik powinien zrobić dalej (tutaj daj znać użytkownikowi że szczegółowe informacje
            są w świadczeniach które już są w aplikacji ale jeśli nie ma żadnych pasujących świadczeń to
          poleć użytkownikowi odwiedzenie oficjalnych stron takich jak gov.pl i zus.pl).

        ## LISTA ŚWIADCZEŃ (baza danych)
        ${contextForAI}

        ## WAŻNE
        - Możesz korzystać z własnej wiedzy WYŁĄCZNIE do doprecyzowania lub wyjaśnień,
          ale NIE możesz dodawać świadczeń spoza listy.
        - Odpowiadasz krótko, konkretnie i rzeczowo.
        `;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      // 5. Wyciągamy faktyczne wyniki z listy (matchowanie nazw z odpowiedzi LLM)
      const matched = all.filter(sw =>
        aiResponse.toLowerCase().includes(sw.nazwa.toLowerCase())
      );

      setSwiadczeniaResult({
        content: aiResponse,
        matches: matched
      });

      // Zapisz do historii
      await saveConversationToHistory(userQuery, aiResponse, matched);

    } catch (error) {
      console.error('Błąd:', error);
      const errorResponse = 'Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.';
      setSwiadczeniaResult({
        content: errorResponse,
        matches: []
      });

      // Zapisz błąd do historii
      await saveConversationToHistory(userQuery, errorResponse, []);
    }

    setSwiadczeniaLoading(false);
    setSwiadczeniaQuery('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSwiadczeniaSearch();
    }
  };

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px'
      }}>
        <Loader size={48} className="spin" style={{ color: '#2c5aa0', marginBottom: '20px' }} />
        <p style={{ color: '#5a6c7d', fontSize: '16px' }}>Ładowanie świadczeń...</p>
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
        <h3 style={{ color: '#c33', marginBottom: '10px' }}>Błąd ładowania świadczeń</h3>
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
        <Shield size={24} color="#2c5aa0" />
        Przeglądaj świadczenia
      </h2>
      <p style={{
        color: '#5a6c7d',
        marginBottom: '25px',
        lineHeight: '1.6'
      }}>
        Sprawdź dostępne świadczenia społeczne - przeglądaj bazę lub zapytaj AI o konkretną pomoc.
      </p>

      {/* Chat AI Preview - widoczny dla wszystkich, ale tylko premium może używać */}
      <ChatPreview
        query={swiadczeniaQuery}
        setQuery={setSwiadczeniaQuery}
        onSearch={handleSwiadczeniaSearch}
        loading={swiadczeniaLoading}
        result={swiadczeniaResult}
        placeholder="Np. 'Mam dwójkę dzieci i nie stać mnie na rachunki' lub 'Pomoc dla osób niepełnosprawnych'"
        title="Zapytaj AI o świadczenie"
        onClear={() => setSwiadczeniaResult(null)}
        renderCard={(swiadczenie, idx) => (
          <SwiadczenieCard
            key={idx}
            swiadczenie={swiadczenie}
            onClick={() => setSelectedSwiadczenie(swiadczenie)}
          />
        )}
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
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              transition: 'all 0.2s',
              maxWidth: '280px',
              textTransform: 'capitalize'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={18} />
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
              maxHeight: '300px',
              maxWidth: '280px',
              overflowY: 'auto'
            }}>
              {categories.map(cat => {
                const count = cat === 'wszystkie'
                  ? swiadczenia.length
                  : swiadczenia.filter(s => s.kategoria === cat).length;

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

      {/* Swiadczenia Grid */}
      {currentSwiadczenia.length > 0 ? (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {currentSwiadczenia.map(swiadczenie => (
              <SwiadczenieCard
                key={swiadczenie.id}
                swiadczenie={swiadczenie}
                onClick={() => setSelectedSwiadczenie(swiadczenie)}
              />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={filteredSwiadczenia.length}
          />
        </>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#5a6c7d'
        }}>
          <Shield size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
          <p style={{ fontSize: '16px', fontWeight: '600' }}>
            Brak świadczeń w tej kategorii
          </p>
        </div>
      )}

      {/* Modal szczegółów */}
      {selectedSwiadczenie && (
        <SwiadczenieDetailsModal
          swiadczenie={selectedSwiadczenie}
          onClose={() => setSelectedSwiadczenie(null)}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={isFavorite(selectedSwiadczenie.id)}
          isPremium={preloadedIsPremium}
        />
      )}
    </div>
  );
};

// Karta świadczenia
const SwiadczenieCard = ({ swiadczenie, onClick }) => (
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
      <Shield size={24} color="#2c5aa0" />
      <h4 style={{
        fontSize: '18px',
        fontWeight: '700',
        color: '#2c3e50',
        margin: 0,
        lineHeight: '1.3',
        flex: 1
      }}>
        {swiadczenie.nazwa}
      </h4>
    </div>

    <div style={{
      display: 'inline-block',
      background: '#e8f4f8',
      color: '#2c5aa0',
      padding: '4px 12px',
      borderRadius: '20px',
      fontSize: '13px',
      fontWeight: '600',
      marginBottom: '15px',
      alignSelf: 'flex-start'
    }}>
      {swiadczenie.kategoria}
    </div>

    <p style={{
      color: '#5a6c7d',
      lineHeight: '1.6',
      marginBottom: '15px',
      fontSize: '14px',
      flex: 1
    }}>
      {swiadczenie.krotki_opis}
    </p>

    {/* Kwalifikacja */}
    {swiadczenie.kwalifikacja && swiadczenie.kwalifikacja.length > 0 && (
      <div style={{
        background: 'white',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '15px'
      }}>
        <h5 style={{
          fontSize: '14px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle size={16} color="#10b981" />
          Kwalifikacja:
        </h5>
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          color: '#5a6c7d',
          fontSize: '13px',
          lineHeight: '1.6'
        }}>
          {swiadczenie.kwalifikacja.slice(0, 3).map((kwal, idx) => (
            <li key={idx} style={{ marginBottom: '6px' }}>{kwal}</li>
          ))}
        </ul>
      </div>
    )}

    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginTop: 'auto'
    }}>
      <button
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
          color: 'white',
          padding: '12px 15px',
          borderRadius: '8px',
          border: 'none',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'pointer',
          transition: 'transform 0.2s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
      >
        <Info size={16} />
        Sprawdź szczegóły
      </button>
    </div>
  </div>
);

export default SwiadczeniaTab;

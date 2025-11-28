import React, { useState, useEffect } from 'react';
import { Heart, Sparkles, Search, Loader, Shield, AlertCircle, Info, CheckCircle, Eraser } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useSwiadczenia } from '../../hooks/useSwiadczenia';
import { useAppData } from '../../contexts/AppDataContext';
import Pagination from '../common/Pagination';
import PremiumFeatureTeaser from '../premium/PremiumFeatureTeaser';
import SwiadczenieDetailsModal from '../swiadczenia/SwiadczenieDetailsModal';
import { saveConversationToHistory } from '../../utils/saveToHistory';

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

      {subscriptionLoading && !preloadedIsPremium ? (
        <></>
      ): (
        <PremiumFeatureTeaser
          feature="asystenta AI dla świadczeń"
          title="Zapytaj AI o świadczenie"
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
              Zapytaj AI o świadczenie
            </h3>

            <textarea
              value={swiadczeniaQuery}
              onChange={(e) => setSwiadczeniaQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Np. 'Mam dwójkę dzieci i nie stać mnie na rachunki' lub 'Pomoc dla osób niepełnosprawnych'"
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

            {/* Kontener przycisków */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between', // Znajdź po lewej, Wyczyść po prawej
              gap: '10px'
            }}>
              <button
                onClick={handleSwiadczeniaSearch}
                disabled={swiadczeniaLoading || !swiadczeniaQuery.trim()}
                style={{
                  background: swiadczeniaLoading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 25px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: swiadczeniaLoading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => !swiadczeniaLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                {swiadczeniaLoading ? (
                  <>
                    <Loader size={18} className="spin" />
                    Szukam...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Znajdź świadczenie
                  </>
                )}
              </button>

              {swiadczeniaResult && (
                <button
                  onClick={() => setSwiadczeniaResult('')}
                  style={{
                    background: '#d9534f',
                    color: 'white',
                    border: 'none',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseOut={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <Eraser size={18} />
                  Wyczyść
                </button>
              )}
            </div>
          </div>

          {/* AI Result */}
          {swiadczeniaResult && (
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
                {swiadczeniaResult.content}
              </div>

              {swiadczeniaResult.matches && swiadczeniaResult.matches.length > 0 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: '20px'
                }}>
                  {swiadczeniaResult.matches.map((swiadczenie, idx) => (
                    <SwiadczenieCard
                      key={idx}
                      swiadczenie={swiadczenie}
                      onClick={() => setSelectedSwiadczenie(swiadczenie)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </PremiumFeatureTeaser>
      )}


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
              {cat} ({cat === 'wszystkie' ? swiadczenia.length : swiadczenia.filter(s => s.kategoria === cat).length})
            </button>
          ))}
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

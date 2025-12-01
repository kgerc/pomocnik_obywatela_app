import React, { useState, useEffect } from 'react';
import { TrendingUp, Sparkles, Search, Loader, Building2, AlertCircle, ExternalLink, Eraser, Clock, AlertTriangle, XCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useDotacje } from '../../hooks/useDotacje';
import { useAppData } from '../../contexts/AppDataContext';
import Pagination from '../common/Pagination';
import PremiumFeatureTeaser from '../premium/PremiumFeatureTeaser';
import { saveConversationToHistory } from '../../utils/saveToHistory';
import ChatPreview from '../chat/ChatPreview';

const ITEMS_PER_PAGE = 6;

const DotacjeTab = () => {
  const { isPremium: preloadedIsPremium, loading: subscriptionLoading } = useAppData();

  const [dotacjeQuery, setDotacjeQuery] = useState('');
  const [dotacjeLoading, setDotacjeLoading] = useState(false);
  const [dotacjeResult, setDotacjeResult] = useState(null);
  const [selectedSektor, setSelectedSektor] = useState('wszystkie');
  const [sektory, setSektory] = useState(['wszystkie']);
  const [filteredDotacje, setFilteredDotacje] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { dotacje, loading, error, fetchAll, getSektory } = useDotacje();
  const [isVisible, setIsVisible] = useState(false);

  // Pobierz dotacje i sektory przy montowaniu komponentu
  useEffect(() => {
    const loadData = async () => {
      await fetchAll();
      const sektoryData = await getSektory();
      setSektory(['wszystkie', ...sektoryData]);
    };
    loadData();
  }, []);

  // Uruchom animację dopiero gdy dane się załadują
  useEffect(() => {
    if (!loading && dotacje.length > 0) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading, dotacje]);

  // Filtruj dotacje lokalnie gdy zmieni się sektor
  useEffect(() => {
    if (selectedSektor === 'wszystkie') {
      setFilteredDotacje(dotacje);
    } else {
      const filtered = dotacje.filter(d => d.sektor === selectedSektor);
      setFilteredDotacje(filtered);
    }
    setCurrentPage(1); // Reset do pierwszej strony przy zmianie sektora
  }, [selectedSektor, dotacje]);

  // Oblicz paginację
  const totalPages = Math.ceil(filteredDotacje.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDotacje = filteredDotacje.slice(startIndex, endIndex);

  const handleDotacjeSearch = async () => {
    if (!dotacjeQuery.trim()) return;

    setDotacjeLoading(true);
    const userQuery = dotacjeQuery.trim();

    try {
      const all = dotacje; // cała baza dotacji

      if (!all || all.length === 0) {
        const emptyResponse = "Baza dotacji jest pusta. Spróbuj ponownie później.";
        setDotacjeResult({
          content: emptyResponse,
          matches: []
        });

        // Zapisz do historii
        await saveConversationToHistory(userQuery, emptyResponse, []);

        setDotacjeLoading(false);
        return;
      }

      // 1. Budujemy pełny kontekst RAG
      const contextForAI = all
        .map(d =>
          `• Nazwa: ${d.nazwa}
            Sektor: ${d.sektor}
            Beneficjenci: ${d.beneficjenci?.join(', ') || 'brak'}
            Kwota: ${d.kwota || 'brak'}
            Opis: ${d.opis}`
        )
        .join('\n\n');

      // 2. Konfiguracja Gemini
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // 3. RAG – model wybiera tylko z listy
      const prompt = `
        Jesteś doradcą ds. dotacji w Polsce. Odpowiadasz TYLKO po polsku.

        ## Zadanie
        Użytkownik wpisuje zapytanie: "${userQuery}"

        Twoim zadaniem jest:
        1. Dokładnie przeanalizować CAŁĄ poniższą listę dotacji.
        2. Wybrać wyłącznie te elementy, które **semantycznie pasują** do zapytania użytkownika.
          - Uwzględnij odmiany wyrazów, synonimy, powiązania tematyczne.
          - Nie wymyślaj dotacji spoza listy.
        3. Zwróć wynik w formie krótkiej odpowiedzi (2–4 zdania):
          - nazwy najlepiej pasujących dotacji,
          - kluczowe informacje o beneficjentach i terminach,
          - co użytkownik powinien zrobić dalej (sprawdzenie szczegółów w bazie).

        ## LISTA DOTACJI (baza danych)
        ${contextForAI}

        ## WAŻNE
        - Możesz korzystać z własnej wiedzy WYŁĄCZNIE do doprecyzowania lub wyjaśnień,
          ale NIE możesz dodawać dotacji spoza listy.
        - Odpowiadaj krótko, konkretnie i rzeczowo.
      `;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      // 4. Wyciągamy faktyczne wyniki z listy (matchowanie nazw z odpowiedzi LLM)
      const matched = all.filter(d =>
        aiResponse.toLowerCase().includes(d.nazwa.toLowerCase())
      );

      setDotacjeResult({
        content: aiResponse,
        matches: matched
      });

      // Zapisz do historii
      await saveConversationToHistory(userQuery, aiResponse, matched);

    } catch (error) {
      console.error('Błąd:', error);
      const errorResponse = 'Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.';
      setDotacjeResult({
        content: errorResponse,
        matches: []
      });

      // Zapisz błąd do historii
      await saveConversationToHistory(userQuery, errorResponse, []);
    }

    setDotacjeLoading(false);
    setDotacjeQuery('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleDotacjeSearch();
    }
  };

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '60px'
      }}>
        <Loader size={48} className="spin" style={{ color: '#2c5aa0', marginBottom: '20px' }} />
        <p style={{ color: '#5a6c7d', fontSize: '16px' }}>Ładowanie dotacji...</p>
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
        <h3 style={{ color: '#c33', marginBottom: '10px' }}>Błąd ładowania dotacji</h3>
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
        <TrendingUp size={24} color="#2c5aa0" />
        Dotacje i granty - aktywne programy 2025
      </h2>
      <p style={{
        color: '#5a6c7d',
        marginBottom: '25px',
        lineHeight: '1.6'
      }}>
        Przeglądaj aktualne programy dotacyjne lub zapytaj AI o najlepsze źródło finansowania dla Twojego projektu.
      </p>

      {/* Chat AI Preview - widoczny dla wszystkich, ale tylko premium można używać */}
      <ChatPreview
        query={dotacjeQuery}
        setQuery={setDotacjeQuery}
        onSearch={handleDotacjeSearch}
        loading={dotacjeLoading}
        result={dotacjeResult}
        placeholder="Np. 'Szukam dotacji na fotowoltaikę dla firmy' lub 'Granty na badania medyczne'"
        title="Zapytaj AI o dotację"
        onClear={() => setDotacjeResult(null)}
        renderCard={(dotacja, idx) => <DotacjaCard key={idx} dotacja={dotacja} />}
      />

      {/* Filter by Sektor */}
      <div style={{
        display: 'flex',
        gap: '10px',
        flexWrap: 'wrap',
        marginBottom: '25px'
      }}>
        {sektory.map(sektor => (
          <button
            key={sektor}
            onClick={() => setSelectedSektor(sektor)}
            style={{
              background: selectedSektor === sektor ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
              color: selectedSektor === sektor ? 'white' : '#2c5aa0',
              border: 'none',
              padding: '10px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s'
            }}
          >
            {sektor} ({sektor === 'wszystkie' ? dotacje.length : dotacje.filter(d => d.sektor === sektor).length})
          </button>
        ))}
      </div>

      {/* Dotacje Grid */}
      {currentDotacje.length > 0 ? (
        <>
          <div style={{
            display: 'grid',
            gap: '20px',
            marginBottom: '20px'
          }}>
            {currentDotacje.map(dotacja => (
              <DotacjaCard key={dotacja.id} dotacja={dotacja} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={ITEMS_PER_PAGE}
            totalItems={filteredDotacje.length}
          />
        </>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '40px',
          color: '#5a6c7d'
        }}>
          <Building2 size={48} style={{ marginBottom: '20px', opacity: 0.5 }} />
          <p style={{ fontSize: '16px', fontWeight: '600' }}>
            Brak dotacji w tym sektorze
          </p>
        </div>
      )}
    </div>
  );
};

const DotacjaCard = ({ dotacja }) => {
  // Funkcja obliczająca pozostałe dni do terminu
  const calculateDaysRemaining = (terminString) => {
    if (!terminString) return null;

    // Obsługa zakresu dat (np. "12.02.2024 - 31.08.2026")
    // Szukamy drugiej daty (data końcowa) po myślniku lub słowie "do"
    let dateToUse = terminString;

    // Jeśli jest zakres (zawiera różne typy myślników: -, –, —, lub słowo "do"), weź drugą datę
    // Regex dopasowuje: spacja + dowolny myślnik/dash + spacja
    const dashPattern = /\s+[-–—]\s+/;
    if (dashPattern.test(terminString)) {
      const parts = terminString.split(dashPattern);
      dateToUse = parts[1]?.trim() || parts[0];
    } else if (terminString.toLowerCase().includes(' do ')) {
      const parts = terminString.toLowerCase().split(' do ');
      dateToUse = parts[1]?.trim() || parts[0];
    }

    // Próbuj parsować różne formaty daty
    const dateMatch = dateToUse.match(/(\d{1,2})[.\-/](\d{1,2})[.\-/](\d{4})/);
    if (!dateMatch) return null;

    const [, day, month, year] = dateMatch;
    const deadlineDate = new Date(year, month - 1, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    deadlineDate.setHours(0, 0, 0, 0);

    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  const status = (dotacja.status || 'aktywna').toLowerCase();
  const daysRemaining = calculateDaysRemaining(dotacja.termin);
  const shouldShowDaysRemaining = status === 'aktywna' && daysRemaining !== null;

  return (
    <div style={{
      background: '#f8f9fb',
      padding: '20px',
      borderRadius: '12px',
      border: '2px solid #e1e8ed',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: '15px',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: 1, minWidth: '250px' }}>
          <h4 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '8px'
          }}>
            {dotacja.nazwa}
          </h4>
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginBottom: '10px'
          }}>
            <span style={{
              background: '#e8f4f8',
              color: '#2c5aa0',
              padding: '4px 12px',
              borderRadius: '15px',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              {dotacja.sektor}
            </span>
            <span style={{
              background: status === 'aktywna' ? '#d1fae5' : status === 'zamknięty' ? '#fee' : '#fef3c7',
              color: status === 'aktywna' ? '#059669' : status === 'zamknięty' ? '#c33' : '#d97706',
              padding: '4px 12px',
              borderRadius: '15px',
              fontSize: '13px',
              fontWeight: '600'
            }}>
              {dotacja.status || 'aktywna'}
            </span>
          </div>
        </div>
        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          padding: '12px 16px',
          borderRadius: '8px',
          textAlign: 'center',
          minWidth: '140px'
        }}>
          <div style={{
            fontSize: '12px',
            opacity: '0.9',
            marginBottom: '4px'
          }}>
            Max kwota
          </div>
          <div style={{
            fontSize: '18px',
            fontWeight: '700'
          }}>
            {dotacja.kwota_max ?? "Brak informacji"}
          </div>
        </div>
      </div>

      <p style={{
        color: '#5a6c7d',
        lineHeight: '1.6',
        marginBottom: '15px',
        flex: 1
      }}>
        {dotacja.opis}
      </p>

      <div style={{ marginTop: 'auto' }}>
        {dotacja.beneficjenci && dotacja.beneficjenci.length > 0 && (
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
              marginBottom: '8px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Building2 size={16} color="#2c5aa0" />
              Beneficjenci:
            </h5>
            <div style={{
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap'
            }}>
              {dotacja.beneficjenci.map((ben, benIdx) => (
                <span key={benIdx} style={{
                  background: '#f8f9fb',
                  color: '#5a6c7d',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  border: '1px solid #e1e8ed'
                }}>
                  {ben}
                </span>
              ))}
            </div>
          </div>
        )}

        {dotacja.termin && (
          <div style={{
            background: 'white',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '200px' }}>
              <AlertCircle size={20} color="#ff9800" />
              <div>
                <strong style={{ color: '#2c3e50' }}>Termin:</strong>{' '}
                <span style={{ color: '#5a6c7d' }}>{dotacja.termin}</span>
              </div>
            </div>

            {daysRemaining !== null && shouldShowDaysRemaining && (
              <div style={{
                background: daysRemaining < 7 ? '#fee2e2' : daysRemaining < 30 ? '#fef3c7' : '#d1fae5',
                color: daysRemaining < 7 ? '#c33' : daysRemaining < 30 ? '#d97706' : '#059669',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: '700',
                textAlign: 'center',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {daysRemaining > 0 ? (
                  <>
                    <Clock size={16} />
                    {daysRemaining >= 365
                      ? `Pozostało ${Math.floor(daysRemaining / 365)} ${Math.floor(daysRemaining / 365) === 1 ? 'rok' : Math.floor(daysRemaining / 365) < 5 ? 'lata' : 'lat'}`
                      : `Pozostało ${daysRemaining} ${daysRemaining === 1 ? 'dzień' : daysRemaining < 5 ? 'dni' : 'dni'}`
                    }
                  </>
                ) : daysRemaining === 0 ? (
                  <>
                    <AlertTriangle size={16} />
                    Ostatni dzień!
                  </>
                ) : (
                  <>
                    <XCircle size={16} />
                    Termin minął
                  </>
                )}
              </div>
            )}
          </div>
        )}

        <a
          href={dotacja.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            padding: '12px 20px',
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
          Sprawdź program
        </a>
      </div>
    </div>
  );
};

export default DotacjeTab;
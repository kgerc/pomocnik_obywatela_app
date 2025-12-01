import React, { useState, useEffect } from 'react';
import { Wand2, FileText, Loader, AlertCircle, Download, Sparkles, Check, ChevronRight } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAppData } from '../../contexts/AppDataContext';
import { useAuth } from '../../contexts/AuthContext';
import { useFreeAiChat } from '../../hooks/useFreeAiChat';
import ChatPremiumModal from '../premium/ChatPremiumModal';

// Wspólne pola osobowe dla wszystkich pism
const DANE_OSOBOWE = [
  { id: 'imie_nazwisko', label: 'Imię i nazwisko', placeholder: 'np. Jan Kowalski', type: 'text', required: true },
  { id: 'ulica_numer', label: 'Ulica i numer domu/mieszkania', placeholder: 'np. ul. Główna 15/3', type: 'text', required: true },
  { id: 'kod_miasto', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text', required: true },
  { id: 'telefon', label: 'Numer telefonu', placeholder: 'np. 123-456-789', type: 'text', required: false },
  { id: 'email', label: 'Adres email', placeholder: 'np. jan.kowalski@example.com', type: 'text', required: false }
];

// Dostępne typy pism do generowania
const DOSTEPNE_PISMA = [
  {
    id: 'wniosek_o_raty',
    nazwa: 'Wniosek o rozłożenie zadłużenia na raty',
    opis: 'Wygeneruj gotowy wniosek o rozłożenie należności na raty',
    kategoria: 'Finanse',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu', placeholder: 'np. Urząd Skarbowy w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Marszałkowska 1/3', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 00-624 Warszawa', type: 'text' },
      { id: 'kwota', label: 'Jaka jest kwota zadłużenia?', placeholder: 'np. 5000 zł', type: 'text' },
      { id: 'raty', label: 'Na ile rat chcesz rozłożyć zadłużenie?', placeholder: 'np. 12 miesięcy', type: 'text' },
      { id: 'powod', label: 'Jaki jest powód Twojej trudnej sytuacji?', placeholder: 'np. utrata pracy, choroba', type: 'textarea' }
    ]
  },
  {
    id: 'odwolanie_decyzja',
    nazwa: 'Odwołanie od decyzji administracyjnej',
    opis: 'Złóż odwołanie od niekorzystnej decyzji urzędu',
    kategoria: 'Administracja',
    pytania: [
      { id: 'nazwa_organu', label: 'Jaki organ wydał decyzję?', placeholder: 'np. Zakład Ubezpieczeń Społecznych Oddział w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Szamocka 3/5', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 01-748 Warszawa', type: 'text' },
      { id: 'data_decyzji', label: 'Data wydania decyzji', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'numer_decyzji', label: 'Numer decyzji (jeśli jest)', placeholder: 'np. ZUS/DEC/123/2025', type: 'text' },
      { id: 'powod_odwolania', label: 'Dlaczego nie zgadzasz się z decyzją?', placeholder: 'Opisz szczegółowo powody odwołania', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_zasilek',
    nazwa: 'Wniosek o zasiłek dla bezrobotnych',
    opis: 'Złóż wniosek o zasiłek dla osób bezrobotnych',
    kategoria: 'Świadczenia',
    pytania: [
      { id: 'nazwa_organu', label: 'Do którego Urzędu Pracy kierujesz wniosek?', placeholder: 'np. Powiatowy Urząd Pracy w Krakowie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Lipowa 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 30-702 Kraków', type: 'text' },
      { id: 'data_utraty', label: 'Kiedy straciłeś/aś pracę?', placeholder: 'np. 01.12.2024', type: 'text' },
      { id: 'ostatnie_miejsce', label: 'Gdzie ostatnio pracowałeś/aś?', placeholder: 'np. nazwa firmy i stanowisko', type: 'text' },
      { id: 'wyksztalcenie', label: 'Jakie masz wykształcenie?', placeholder: 'np. wyższe, średnie', type: 'text' }
    ]
  },
  {
    id: 'skarga_urząd',
    nazwa: 'Skarga na bezczynność urzędu',
    opis: 'Złóż skargę gdy urząd nie załatwia Twojej sprawy',
    kategoria: 'Administracja',
    pytania: [
      { id: 'nazwa_organu', label: 'Jaki urząd nie załatwia sprawy?', placeholder: 'np. Urząd Miasta Warszawa', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. pl. Bankowy 3/5', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 00-950 Warszawa', type: 'text' },
      { id: 'sprawa', label: 'Jakiej sprawy dotyczy?', placeholder: 'np. wniosek o świadczenie, pozwolenie', type: 'text' },
      { id: 'data_zlozenia', label: 'Kiedy złożyłeś/aś wniosek?', placeholder: 'np. 15.10.2024', type: 'text' },
      { id: 'numer_sprawy', label: 'Numer sprawy (jeśli znasz)', placeholder: 'np. WM/123/2024', type: 'text' }
    ]
  },
  {
    id: 'zwrot_podatku',
    nazwa: 'Wniosek o zwrot nadpłaconego podatku',
    opis: 'Odzyskaj nadpłacony podatek',
    kategoria: 'Finanse',
    pytania: [
      { id: 'nazwa_organu', label: 'Jaki Urząd Skarbowy?', placeholder: 'np. Urząd Skarbowy Warszawa-Śródmieście', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Marszałkowska 1/3', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 00-624 Warszawa', type: 'text' },
      { id: 'kwota', label: 'Kwota nadpłaty', placeholder: 'np. 1500 zł', type: 'text' },
      { id: 'okres', label: 'Którego okresu dotyczy?', placeholder: 'np. rok 2024', type: 'text' },
      { id: 'uzasadnienie', label: 'Dlaczego powstała nadpłata?', placeholder: 'Opisz przyczynę nadpłaty', type: 'textarea' }
    ]
  }
];

const GeneratorPismTab = () => {
  const { isPremium } = useAppData();
  const { user } = useAuth();
  const { canUseChat, freeChatsInfo, useFreeChat } = useFreeAiChat();
  const [selectedPismo, setSelectedPismo] = useState(null);
  const [currentStep, setCurrentStep] = useState(1); // 1 = wybór pisma, 2 = formularz, 3 = generowanie
  const [formData, setFormData] = useState({});
  const [generating, setGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [isVisible, setIsVisible] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);

  const categories = ['wszystkie', ...new Set(DOSTEPNE_PISMA.map(p => p.kategoria))];

  const filteredPisma = selectedCategory === 'wszystkie'
    ? DOSTEPNE_PISMA
    : DOSTEPNE_PISMA.filter(p => p.kategoria === selectedCategory);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handlePismoSelect = (pismo) => {
    if (!user) {
      alert('Musisz być zalogowany, aby generować dokumenty');
      return;
    }

    // Sprawdź czy może używać generatora
    if (!isPremium && !canUseChat) {
      setShowPremiumModal(true);
      return;
    }

    setSelectedPismo(pismo);
    setFormData({});
    setCurrentStep(2);
    setGeneratedDocument(null);
  };

  const handleInputChange = (questionId, value) => {
    setFormData({
      ...formData,
      [questionId]: value
    });
  };

  const handleGenerateDocument = async () => {
    if (!user) {
      alert('Musisz być zalogowany, aby generować dokumenty');
      return;
    }

    // Sprawdź czy użytkownik ma premium lub darmowe użycia
    if (!isPremium) {
      if (!canUseChat) {
        setShowPremiumModal(true);
        return;
      }
    }

    // Rozpocznij generowanie NATYCHMIAST (bez czekania)
    setGenerating(true);
    setCurrentStep(3);

    // Inkrementuj licznik w tle (tylko dla użytkowników bez premium)
    if (!isPremium) {
      useFreeChat().catch(error => {
        console.error('Error incrementing free chat counter:', error);
        // Jeśli błąd, nie przerywaj - użytkownik już dostał wynik
      });
    }

    try {
      // Przygotuj dane osobowe
      const daneOsobowe = {
        imie_nazwisko: formData.imie_nazwisko || '',
        ulica_numer: formData.ulica_numer || '',
        kod_miasto: formData.kod_miasto || '',
        telefon: formData.telefon || '',
        email: formData.email || ''
      };

      // Przygotuj dane adresata
      const daneAdresata = {
        nazwa_organu: formData.nazwa_organu || '',
        ulica_organu: formData.ulica_organu || '',
        kod_miasto_organu: formData.kod_miasto_organu || ''
      };

      // Przygotuj pozostałe dane
      const dodatkoweDane = selectedPismo.pytania
        .filter(q => !['nazwa_organu', 'ulica_organu', 'kod_miasto_organu'].includes(q.id))
        .map(q => `${q.label}: ${formData[q.id] || 'nie podano'}`)
        .join('\n');

      // Konfiguracja Gemini
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // Dzisiejsza data w formacie polskim
      const dzisiaj = new Date();
      const miesiac = dzisiaj.toLocaleDateString('pl-PL', { month: 'long' });
      const dataFormatted = `${daneOsobowe.kod_miasto.split(' ')[1] || '[MIASTO]'}, ${dzisiaj.getDate()} ${miesiac} ${dzisiaj.getFullYear()} r.`;

      const prompt = `
        Jesteś profesjonalnym asystentem prawnym w Polsce. Wygeneruj POPRAWNIE SFORMATOWANE pismo urzędowe.

        ## DANE NADAWCY
        ${daneOsobowe.imie_nazwisko}
        ${daneOsobowe.ulica_numer}
        ${daneOsobowe.kod_miasto}
        ${daneOsobowe.telefon ? 'Tel: ' + daneOsobowe.telefon : ''}
        ${daneOsobowe.email ? 'Email: ' + daneOsobowe.email : ''}

        ## DANE ADRESATA (WYRÓWNANE DO PRAWEJ STRONY!)
        ${daneAdresata.nazwa_organu}
        ${daneAdresata.ulica_organu}
        ${daneAdresata.kod_miasto_organu}

        ## TYP PISMA
        ${selectedPismo.nazwa}

        ## DODATKOWE INFORMACJE
        ${dodatkoweDane}

        ## INSTRUKCJE FORMATOWANIA - BARDZO WAŻNE!

        1. **NAGŁÓWEK** (po lewej stronie):
           ${dataFormatted}

           ${daneOsobowe.imie_nazwisko}
           ${daneOsobowe.ulica_numer}
           ${daneOsobowe.kod_miasto}
           ${daneOsobowe.telefon ? 'Tel: ' + daneOsobowe.telefon : ''}
           ${daneOsobowe.email ? 'Email: ' + daneOsobowe.email : ''}

        2. **ADRESAT** (wyrównany DO PRAWEJ STRONY - użyj odpowiedniej liczby spacji przed każdą linią!):
                                                                    ${daneAdresata.nazwa_organu}
                                                                    ${daneAdresata.ulica_organu}
                                                                    ${daneAdresata.kod_miasto_organu}

        3. **TYTUŁ PISMA** (wycentrowany, pogrubiony WIELKIMI LITERAMI)

        4. **TREŚĆ MERYTORYCZNA**:
           - Zwrot grzecznościowy
           - Uzasadnienie wniosku/skargi z odniesieniem do faktów
           - Powołanie się na podstawę prawną (jeśli dotyczy)
           - Prośba o rozpatrzenie sprawy

        5. **ZAKOŃCZENIE**:
           - Zwrot uprzejmości
           - Podpis:

           ....................................
           ${daneOsobowe.imie_nazwisko}

        ## WAŻNE WYMOGI:
        - Używaj formalnego języka urzędowego
        - Wyrównaj adresat DO PRAWEJ (dodaj spacje przed każdą linią adresata!)
        - NIE używaj Markdown (**, ##, itp.)
        - Użyj TYLKO czystego tekstu
        - Zachowaj poprawne odstępy między sekcjami
        - Tytuł pisma pisz WIELKIMI LITERAMI
        - Stosuj polskie przepisy prawne gdzie to właściwe

        Wygeneruj TYLKO treść pisma, bez żadnych komentarzy.
      `;

      const result = await model.generateContent(prompt);
      const documentText = result.response.text();

      setGeneratedDocument(documentText);

    } catch (error) {
      console.error('Błąd generowania dokumentu:', error);
      alert('Wystąpił błąd podczas generowania dokumentu. Spróbuj ponownie.');
      setCurrentStep(2);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPDF = () => {
    if (!generatedDocument) return;

    // Utwórz Blob z HTML
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${selectedPismo.nazwa}</title>
          <style>
            @page {
              size: A4;
              margin: 2.5cm;
            }
            body {
              font-family: 'Times New Roman', Times, serif;
              font-size: 12pt;
              line-height: 1.6;
              color: #000;
              max-width: 21cm;
              margin: 0 auto;
              padding: 2.5cm;
            }
            .document {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
            @media print {
              body {
                padding: 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="document">${generatedDocument.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                setTimeout(function() {
                  window.close();
                }, 100);
              }, 250);
            };
          </script>
        </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const printWindow = window.open(url, '_blank');

    // Zwolnij URL po otwarciu okna
    if (printWindow) {
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };

  const handleStartOver = () => {
    setSelectedPismo(null);
    setFormData({});
    setCurrentStep(1);
    setGeneratedDocument(null);
  };

  // Sprawdź czy wszystkie wymagane pola są wypełnione
  const allFieldsFilled = selectedPismo &&
    DANE_OSOBOWE.filter(f => f.required).every(f => formData[f.id]?.trim()) &&
    selectedPismo.pytania.every(q => formData[q.id]?.trim());

  return (
    <>
      <ChatPremiumModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        freeChatsInfo={freeChatsInfo}
      />

      <div
        className={`fade-in ${isVisible ? 'visible' : ''}`}
        style={{
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: '#2c3e50',
          marginBottom: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Wand2 size={24} color="#2c5aa0" />
          Generator Pism AI
          {isPremium ? (
            <span style={{
              background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)',
              color: '#2c3e50',
              fontSize: '12px',
              fontWeight: '700',
              padding: '4px 12px',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Sparkles size={14} />
              PREMIUM
            </span>
          ) : (
            freeChatsInfo && user && (
              <span style={{
                fontSize: '13px',
                fontWeight: '600',
                color: freeChatsInfo.remaining > 0 ? '#10b981' : '#e74c3c',
                background: freeChatsInfo.remaining > 0 ? '#d1fae5' : '#fee',
                padding: '4px 12px',
                borderRadius: '20px',
                marginLeft: 'auto'
              }}>
                {freeChatsInfo.remaining > 0
                  ? freeChatsInfo.remaining === 1
                    ? '1 darmowe użycie'
                    : `${freeChatsInfo.remaining} darmowe użycia`
                  : 'Brak darmowych użyć'}
              </span>
            )
          )}
        </h2>
        <p style={{
          color: '#5a6c7d',
          lineHeight: '1.6',
          fontSize: '15px'
        }}>
          Wybierz typ pisma, odpowiedz na kilka pytań, a AI wygeneruje gotowy dokument do podpisu i wysłania do urzędu.
        </p>
      </div>

      {/* Progress Steps */}
      {currentStep > 1 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
          marginBottom: '30px',
          padding: '20px',
          background: '#f8f9fb',
          borderRadius: '12px'
        }}>
          {[
            { num: 1, label: 'Wybór pisma' },
            { num: 2, label: 'Wypełnij dane' },
            { num: 3, label: 'Pobierz dokument' }
          ].map((step, idx) => (
            <React.Fragment key={step.num}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flex: 1
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: currentStep >= step.num
                    ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)'
                    : '#e1e8ed',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '14px'
                }}>
                  {currentStep > step.num ? <Check size={18} /> : step.num}
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: currentStep >= step.num ? '#2c3e50' : '#5a6c7d'
                }}>
                  {step.label}
                </span>
              </div>
              {idx < 2 && (
                <ChevronRight size={20} color="#5a6c7d" />
              )}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* KROK 1: Wybór pisma */}
      {currentStep === 1 && (
        <>
          {/* Category Filter */}
          <div style={{ marginBottom: '25px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '15px'
            }}>
              Wybierz kategorię
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
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Pisma Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {filteredPisma.map(pismo => {
              const canGenerate = isPremium || canUseChat;
              return (
                <div
                  key={pismo.id}
                  onClick={() => handlePismoSelect(pismo)}
                  style={{
                    background: '#f8f9fb',
                    padding: '20px',
                    borderRadius: '12px',
                    border: '2px solid #e1e8ed',
                    cursor: canGenerate ? 'pointer' : 'not-allowed',
                    transition: 'all 0.3s ease',
                    opacity: canGenerate ? 1 : 0.6
                  }}
                  onMouseOver={(e) => {
                    if (canGenerate) {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = '#2c5aa0';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (canGenerate) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e1e8ed';
                    }
                  }}
                >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '10px'
                }}>
                  <FileText size={24} color="#2c5aa0" />
                  <span style={{
                    background: '#e8f4f8',
                    color: '#2c5aa0',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {pismo.kategoria}
                  </span>
                </div>

                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '8px',
                  lineHeight: '1.3'
                }}>
                  {pismo.nazwa}
                </h4>

                <p style={{
                  color: '#5a6c7d',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  marginBottom: '15px'
                }}>
                  {pismo.opis}
                </p>

                {!canGenerate && (
                  <div style={{
                    background: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '8px',
                    padding: '10px',
                    fontSize: '12px',
                    color: '#856404',
                    fontWeight: '600'
                  }}>
                    {isPremium ? 'Wymaga Premium' : 'Brak darmowych użyć - przejdź na Premium'}
                  </div>
                )}
              </div>
            );
            })}
          </div>
        </>
      )}

      {/* KROK 2: Formularz */}
      {currentStep === 2 && selectedPismo && (
        <div>
          <div style={{
            background: '#f8f9fb',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '25px',
            border: '2px solid #e1e8ed'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '5px'
            }}>
              {selectedPismo.nazwa}
            </h3>
            <p style={{
              color: '#5a6c7d',
              fontSize: '14px'
            }}>
              {selectedPismo.opis}
            </p>
          </div>

          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '25px',
            marginBottom: '25px'
          }}>
            {/* Dane osobowe */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#2c5aa0',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '2px solid #e1e8ed'
              }}>
                1. Twoje dane osobowe
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {DANE_OSOBOWE.map(field => (
                  <div key={field.id}>
                    <label style={{
                      display: 'block',
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      marginBottom: '8px'
                    }}>
                      {field.label} {field.required && <span style={{ color: '#e74c3c' }}>*</span>}
                    </label>
                    <input
                      type={field.type}
                      value={formData[field.id] || ''}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '14px',
                        border: '2px solid #e1e8ed',
                        borderRadius: '8px',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dane pisma */}
            <div>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#2c5aa0',
                marginBottom: '15px',
                paddingBottom: '10px',
                borderBottom: '2px solid #e1e8ed'
              }}>
                2. Szczegóły pisma
              </h4>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px'
              }}>
                {selectedPismo.pytania.map(question => (
                  <div key={question.id}>
                    <label style={{
                      display: 'block',
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#2c3e50',
                      marginBottom: '8px'
                    }}>
                      {question.label} <span style={{ color: '#e74c3c' }}>*</span>
                    </label>
                    {question.type === 'textarea' ? (
                      <textarea
                        value={formData[question.id] || ''}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        placeholder={question.placeholder}
                        rows={4}
                        style={{
                          width: '100%',
                          padding: '12px',
                          fontSize: '14px',
                          border: '2px solid #e1e8ed',
                          borderRadius: '8px',
                          fontFamily: 'inherit',
                          resize: 'vertical',
                          boxSizing: 'border-box'
                        }}
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData[question.id] || ''}
                        onChange={(e) => handleInputChange(question.id, e.target.value)}
                        placeholder={question.placeholder}
                        style={{
                          width: '100%',
                          padding: '12px',
                          fontSize: '14px',
                          border: '2px solid #e1e8ed',
                          borderRadius: '8px',
                          boxSizing: 'border-box'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'space-between'
          }}>
            <button
              onClick={handleStartOver}
              style={{
                padding: '12px 24px',
                background: '#f8f9fb',
                color: '#2c5aa0',
                border: '2px solid #e1e8ed',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Wróć do wyboru
            </button>

            <button
              onClick={handleGenerateDocument}
              disabled={!allFieldsFilled}
              style={{
                padding: '12px 24px',
                background: allFieldsFilled
                  ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)'
                  : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '14px',
                cursor: allFieldsFilled ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Wand2 size={16} />
              Generuj dokument
            </button>
          </div>
        </div>
      )}

      {/* KROK 3: Generowanie i wynik */}
      {currentStep === 3 && (
        <div>
          {generating ? (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                margin: '0 auto 24px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}>
                <Loader size={40} color="white" className="spin" />
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2c3e50',
                marginBottom: '10px'
              }}>
                AI generuje Twój dokument...
              </h3>
              <p style={{
                color: '#5a6c7d',
                fontSize: '15px'
              }}>
                To może potrwać kilka sekund
              </p>
            </div>
          ) : generatedDocument ? (
            <div>
              <div style={{
                background: '#d1fae5',
                border: '2px solid #10b981',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '25px',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <Check size={32} color="#059669" />
                <div>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#065f46',
                    marginBottom: '5px'
                  }}>
                    Dokument został wygenerowany!
                  </h3>
                  <p style={{
                    color: '#047857',
                    fontSize: '14px',
                    margin: 0
                  }}>
                    Sprawdź treść poniżej, pobierz PDF, wydrukuj i podpisz.
                  </p>
                </div>
              </div>

              {/* Podgląd dokumentu */}
              <div style={{
                background: 'white',
                border: '2px solid #e1e8ed',
                borderRadius: '12px',
                padding: '40px',
                marginBottom: '25px',
                fontFamily: '"Times New Roman", Times, serif',
                fontSize: '12pt',
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                maxHeight: '600px',
                overflowY: 'auto',
                color: '#000'
              }}>
                {generatedDocument}
              </div>

              <div style={{
                display: 'flex',
                gap: '10px',
                justifyContent: 'space-between'
              }}>
                <button
                  onClick={handleStartOver}
                  style={{
                    padding: '12px 24px',
                    background: '#f8f9fb',
                    color: '#2c5aa0',
                    border: '2px solid #e1e8ed',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Generuj kolejne pismo
                </button>

                <button
                  onClick={handleDownloadPDF}
                  style={{
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '600',
                    fontSize: '14px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Download size={16} />
                  Drukuj / Zapisz PDF
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
      </div>
    </>
  );
};

export default GeneratorPismTab;

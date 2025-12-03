import React, { useState, useEffect, useRef } from 'react';
import { Wand2, FileText, Loader, Download, Check, ChevronRight, Lock, Search } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { DOSTEPNE_PISMA } from '../data/pisma';
import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";
import PaymentModal from './PaymentModal';
import { Document, Packer, Paragraph, TextRun, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

// Wspólne pola osobowe dla wszystkich pism
const DANE_OSOBOWE = [
  { id: 'imie_nazwisko', label: 'Imię i nazwisko', placeholder: 'np. Jan Kowalski', type: 'text', required: true },
  { id: 'ulica_numer', label: 'Ulica i numer domu/mieszkania', placeholder: 'np. ul. Główna 15/3', type: 'text', required: true },
  { id: 'kod_miasto', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text', required: true },
  { id: 'telefon', label: 'Numer telefonu', placeholder: 'np. 123-456-789', type: 'text', required: false },
  { id: 'email', label: 'Adres email', placeholder: 'np. jan.kowalski@example.com', type: 'text', required: false }
];

const GeneratorPism = ({ onBackToLanding }) => {
  const [selectedPismo, setSelectedPismo] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [generating, setGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const documentRef = useRef(null);
  const [documentId, setDocumentId] = useState(null);
  const [documentUnlocked, setDocumentUnlocked] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('wszystkie');
  const [isVisible, setIsVisible] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [verifyingPayment, setVerifyingPayment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const ITEMS_PER_PAGE = 9;

  const categories = ['wszystkie', ...new Set(DOSTEPNE_PISMA.map(p => p.kategoria))];

  // Filtrowanie po kategorii i wyszukiwaniu
  const filteredPisma = DOSTEPNE_PISMA
    .filter(p => selectedCategory === 'wszystkie' || p.kategoria === selectedCategory)
    .filter(p => {
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      return p.nazwa.toLowerCase().includes(query) ||
             p.opis.toLowerCase().includes(query) ||
             p.kategoria.toLowerCase().includes(query);
    });

  // Pagination
  const totalPages = Math.ceil(filteredPisma.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPisma = filteredPisma.slice(startIndex, endIndex);

  // Reset page when category or search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Check if user returned from successful payment and restore document state
  useEffect(() => {
    const checkPaymentSuccess = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const success = urlParams.get('success');
      const canceled = urlParams.get('canceled');
      const payment = urlParams.get('payment');
      const returnedDocId = urlParams.get('documentId');
      const email = urlParams.get('email');

      if (email) {
        setUserEmail(email);
      }

      // Przywróć stan dokumentu z localStorage
      try {
        const savedStateStr = localStorage.getItem('generatorPismState');
        if (savedStateStr) {
          const savedState = JSON.parse(savedStateStr);

          // Przywróć stan jeśli wracamy z płatności (sukces lub anulowanie) lub dokument był wygenerowany
          if ((success === 'true' && payment === 'document') || (canceled === 'true') || savedState.generatedDocument) {
            if (savedState.selectedPismo) setSelectedPismo(savedState.selectedPismo);
            if (savedState.formData) setFormData(savedState.formData);
            if (savedState.documentId) setDocumentId(savedState.documentId);
            if (savedState.userEmail) setUserEmail(savedState.userEmail);

            if (savedState.generatedDocument) {
              setGeneratedDocument(savedState.generatedDocument);
              setCurrentStep(3);

              // Restore document unlocked state if exists
              if (savedState.documentUnlocked) {
                setDocumentUnlocked(true);
              }
            }
          }
        }
      } catch (e) {
        // Silent fail - localStorage może być niedostępny
      }

      // Handle payment cancellation
      if (canceled === 'true') {
        window.history.replaceState({}, document.title, '?generator=true');
        return;
      }

      // Handle successful payment
      if (success === 'true' && payment === 'document' && returnedDocId) {
        const verifyPayment = async () => {
          try {
            setVerifyingPayment(true);
            await new Promise(resolve => setTimeout(resolve, 2000));

            setDocumentUnlocked(true);

            try {
              const savedState = JSON.parse(localStorage.getItem('generatorPismState') || '{}');
              localStorage.setItem('generatorPismState', JSON.stringify({
                ...savedState,
                documentUnlocked: true
              }));
            } catch (e) {
              // Silent fail
            }

            window.history.replaceState({}, document.title, '?generator=true');
          } catch (error) {
            // Silent fail
          } finally {
            setVerifyingPayment(false);
            setTimeout(() => {
              alert('✅ Płatność zakończona sukcesem! Dokument został odblokowany.');
            }, 100);
          }
        };

        verifyPayment();
      }
    };

    checkPaymentSuccess();
  }, []);

  const handlePismoSelect = (pismo) => {
    setSelectedPismo(pismo);
    setFormData({});
    setCurrentStep(2);
    setGeneratedDocument(null);
    setDocumentId(null);
    setDocumentUnlocked(false);
  };

  const handleInputChange = (questionId, value) => {
    setFormData({
      ...formData,
      [questionId]: value
    });
  };

  const handleGenerateDocument = async () => {
    // Rozpocznij generowanie NATYCHMIAST
    setGenerating(true);
    setCurrentStep(3);

    // Generuj unikalny ID dla dokumentu
    const newDocumentId = `doc_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    setDocumentId(newDocumentId);

    // Dokument zawsze zablokowany (brak premium)
    setDocumentUnlocked(false);

    // Pobierz email z formularza
    const emailFromForm = formData.email || '';
    setUserEmail(emailFromForm);

    // Zapisz stan formularza i dokumentu w localStorage (do przywrócenia po powrocie z checkout)
    try {
      const initialState = {
        selectedPismo: selectedPismo,
        formData: formData,
        documentId: newDocumentId,
        userEmail: emailFromForm,
        timestamp: Date.now()
      };
      localStorage.setItem('generatorPismState', JSON.stringify(initialState));
    } catch (e) {
      // Silent fail - localStorage może być niedostępny
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

      // Pobranie miasta z pola "kod_miasto", np. "00-950 Warszawa"
      const miasto = daneOsobowe.kod_miasto.split(' ').slice(1).join(' ') || '[MIASTO]';

      // Odmiana miesiąca — toLocaleDateString daje już poprawną odmianę (grudnia, stycznia itp.)
      const miesiac = dzisiaj.toLocaleDateString('pl-PL', { month: 'long' });

      // Finalny format: "Warszawa, 3 grudnia 2025 r."
      const dataFormatted = `${miasto}, ${dzisiaj.getDate()} ${miesiac} ${dzisiaj.getFullYear()} r.`;

      const prompt = `
        Jesteś profesjonalnym asystentem prawnym w Polsce. Wygeneruj POPRAWNIE SFORMATOWANE pismo urzędowe.

        ## DANE NADAWCY
        ${daneOsobowe.imie_nazwisko}
        ${daneOsobowe.ulica_numer}
        ${daneOsobowe.kod_miasto}
        ${daneOsobowe.telefon ? 'Tel: ' + daneOsobowe.telefon : ''}
        ${daneOsobowe.email ? 'Email: ' + daneOsobowe.email : ''}

        ## DANE ADRESATA
        ${daneAdresata.nazwa_organu}
        ${daneAdresata.ulica_organu}
        ${daneAdresata.kod_miasto_organu}

        ## TYP PISMA
        ${selectedPismo.nazwa}

        ## DODATKOWE INFORMACJE
        ${dodatkoweDane}

        ## INSTRUKCJE FORMATOWANIA - UŻYWAJ ZNACZNIKÓW!

        Wygeneruj pismo według DOKŁADNIE tej struktury:

        [HEADER]
          [LEFT]
          ${daneOsobowe.imie_nazwisko}
          ${daneOsobowe.ulica_numer}
          ${daneOsobowe.kod_miasto}
          ${daneOsobowe.telefon ? 'Tel: ' + daneOsobowe.telefon : ''}
          ${daneOsobowe.email ? 'Email: ' + daneOsobowe.email : ''}
          [/LEFT]
          [RIGHT]
          ${dataFormatted}
          [/RIGHT]
        [/HEADER]

        [RIGHT]
        ${daneAdresata.nazwa_organu}
        ${daneAdresata.ulica_organu}
        ${daneAdresata.kod_miasto_organu}
        [/RIGHT]

        [CENTER]
        TYTUŁ PISMA - WIELKIMI LITERAMI (SPRAWDŹ ORTOGRAFIĘ - np. "WNIOSEK" NIE "WNIENIOSEK")
        [/CENTER]

        Szanowni Państwo,

        [Treść merytoryczna pisma - formalna, z odwołaniem do przepisów jeśli dotyczy]

        [RIGHT]
        Z poważaniem,
        [/RIGHT]

        [RIGHT]
        ....................................
        ${daneOsobowe.imie_nazwisko}
        [/RIGHT]

        ## WAŻNE WYMOGI:
        - MUSISZ użyć znaczników [LEFT], [RIGHT], [CENTER], [HEADER] do formatowania
        - jeśli znaczniki są wewnątrz znacznika [HEADER] to muszą się zaczynać od tej samej linii
        - Tytuł pisma w [CENTER] wielkimi literami - ZWRÓĆ UWAGĘ NA ORTOGRAFIĘ (np. "WNIOSEK" a nie "WNIENIOSEK")
        - Podpis w [RIGHT] - wyrównany do prawej strony
        - Używaj formalnego języka urzędowego
        - NIE używaj Markdown (**, ##, itp.) - tylko znaczniki [LEFT], [RIGHT], [CENTER], [HEADER]
        - Stosuj polskie przepisy prawne gdzie to właściwe

        Wygeneruj TYLKO treść pisma ze znacznikami.
      `;

      const result = await model.generateContent(prompt);
      let documentText = result.response.text();

      // Przetwórz znaczniki formatowania na HTML
      documentText = documentText
        .replace(/\[LEFT\]\s*([\s\S]*?)\s*\[\/LEFT\]/g,
          (_, content) =>
            `<div style="text-align: left; display: block; width: 100%;">${
              content.split('\n').map(line => line.trim()).join('<br>')
            }</div>`
        )
        .replace(/\[RIGHT\][\s\r\n]*([\s\S]*?)[\s\r\n]*\[\/RIGHT\]/g,
          '<div style="text-align: right; display: block; width: 100%;">$1</div>'
        )
        .replace(/\[CENTER\][\s\r\n]*([\s\S]*?)[\s\r\n]*\[\/CENTER\]/g,
          '<div style="text-align: center; font-weight: bold; width: 100%;">$1</div>'
        )
        .replace(/\[HEADER\][\s\r\n]*([\s\S]*?)[\s\r\n]*\[\/HEADER\]/g,`<div style="width: 100%; display: flex; justify-content: space-between; align-items: flex-start;">$1</div>`);

      setGeneratedDocument(documentText);

      // Zapisz wygenerowany dokument w localStorage
      try {
        const savedState = JSON.parse(localStorage.getItem('generatorPismState') || '{}');
        const newState = {
          ...savedState,
          generatedDocument: documentText,
          documentUnlocked: false
        };
        localStorage.setItem('generatorPismState', JSON.stringify(newState));
      } catch (e) {
        // Silent fail - localStorage może być niedostępny
      }

    } catch (error) {
      console.error('Błąd generowania dokumentu:', error);
      alert('Wystąpił błąd podczas generowania dokumentu. Spróbuj ponownie.');
      setCurrentStep(2);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!generatedDocument) return;

    if (!documentUnlocked) {
      setShowPaymentModal(true);
      return;
    }

    const element = documentRef.current;
    if (!element) return;

    const scale = 2;
    const canvas = await html2canvas(element, {
      scale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff"
    });

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const pdfDoc = await PDFDocument.create();
    const pageWidth = 595.28;
    const pageHeight = 841.89;
    const pxPerPage = pageHeight * (imgWidth / pageWidth);

    let yOffset = 0;

    while (yOffset < imgHeight) {
      const sliceHeight = Math.min(pxPerPage, imgHeight - yOffset);

      if (sliceHeight <= 0) break;

      const sliceCanvas = document.createElement("canvas");
      sliceCanvas.width = imgWidth;
      sliceCanvas.height = sliceHeight;

      const sliceCtx = sliceCanvas.getContext("2d");
      sliceCtx.drawImage(canvas, 0, -yOffset);

      const png = sliceCanvas.toDataURL("image/png");
      if (!png.startsWith("data:image/png")) {
        console.error("Niepoprawny slice PNG, pomijam stronę", yOffset, sliceHeight);
        yOffset += pxPerPage;
        continue;
      }

      const pngImage = await pdfDoc.embedPng(png);
      const pngDims = pngImage.scale(pageWidth / imgWidth);

      const page = pdfDoc.addPage([pageWidth, pageHeight]);
      page.drawImage(pngImage, {
        x: 0,
        y: pageHeight - pngDims.height,
        width: pngDims.width,
        height: pngDims.height
      });

      yOffset += pxPerPage;
    }

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${selectedPismo.nazwa || "dokument"}.pdf`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleDownloadDOCX = async () => {
    if (!generatedDocument) return;

    if (!documentUnlocked) {
      setShowPaymentModal(true);
      return;
    }

    try {
      // Parse HTML and create DOCX paragraphs
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(generatedDocument, 'text/html');
      const paragraphs = [];

      // Get body content and process all child nodes
      const body = htmlDoc.body;

      const processNode = (node, skipTextNodes = false) => {
        if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'DIV') {
          const style = node.getAttribute('style') || '';
          const textAlign = style.match(/text-align:\s*([^;]+)/)?.[1]?.trim() || 'left';

          // Get direct text content (not nested divs)
          let text = '';
          node.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
              text += child.textContent;
            }
          });

          text = text.trim();

          if (text) {
            // Split by newlines to handle multiple lines in one div
            const lines = text.split('\n').filter(line => line.trim());

            lines.forEach(line => {
              let alignment = AlignmentType.LEFT;

              if (textAlign === 'center') {
                alignment = AlignmentType.CENTER;
              } else if (textAlign === 'right') {
                alignment = AlignmentType.RIGHT;
              }

              paragraphs.push(
                new Paragraph({
                  children: [new TextRun({
                    text: line.trim(),
                    font: "Times New Roman",
                    size: 24, // 12pt = 24 half-points
                  })],
                  alignment: alignment,
                  spacing: {
                    after: 200, // spacing after paragraph
                  }
                })
              );
            });
          }

          // Process children of this div, but skip text nodes (already processed above)
          node.childNodes.forEach(child => processNode(child, true));
        } else if (node.nodeType === Node.TEXT_NODE && !skipTextNodes) {
          // Only handle text nodes if not already processed by parent div
          const text = node.textContent.trim();
          if (text) {
            const lines = text.split('\n').filter(line => line.trim());
            lines.forEach(line => {
              paragraphs.push(
                new Paragraph({
                  children: [new TextRun({
                    text: line.trim(),
                    font: "Times New Roman",
                    size: 24,
                  })],
                  alignment: AlignmentType.LEFT,
                  spacing: {
                    after: 200,
                  }
                })
              );
            });
          }
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'DIV') {
          // Process other elements' children
          node.childNodes.forEach(child => processNode(child, skipTextNodes));
        }
      };

      processNode(body);

      const docx = new Document({
        sections: [{
          properties: {
            page: {
              margin: {
                top: 1440,    // 1 inch = 1440 twips
                right: 1440,
                bottom: 1440,
                left: 1440,
              },
            },
          },
          children: paragraphs,
        }],
      });

      const blob = await Packer.toBlob(docx);
      saveAs(blob, `${selectedPismo?.nazwa || "dokument"}.docx`);
    } catch (err) {
      console.error(err);
      alert("Błąd podczas generowania pliku DOCX");
    }
  };

  const handleStartOver = () => {
    setSelectedPismo(null);
    setFormData({});
    setCurrentStep(1);
    setGeneratedDocument(null);
    setDocumentId(null);
    setDocumentUnlocked(false);
    setShowPaymentModal(false);

    // Wyczyść zapisany stan z localStorage
    try {
      localStorage.removeItem('generatorPismState');
    } catch (e) {
      console.error('Failed to clear localStorage:', e);
    }
  };

  // Sprawdź czy wszystkie wymagane pola są wypełnione
  const allFieldsFilled = selectedPismo &&
    DANE_OSOBOWE.filter(f => f.required).every(f => formData[f.id]?.trim()) &&
    selectedPismo.pytania.every(q => formData[q.id]?.trim());

  return (
    <>
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        documentId={documentId}
        userEmail={userEmail}
        onPaymentSuccess={() => {
          setDocumentUnlocked(true);
          setShowPaymentModal(false);
        }}
      />

      {/* Header */}
      <div style={{
        background: 'white',
        borderBottom: '2px solid #e1e8ed',
        padding: '20px 0',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        height: '74px',
        boxSizing: 'border-box'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          height: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={32} color="#2c5aa0" strokeWidth={2.5} />
            <h1 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              margin: 0,
              lineHeight: '1'
            }}>
              Pomocnik Obywatela
            </h1>
          </div>

          <button
            onClick={onBackToLanding}
            style={{
              background: 'white',
              color: '#2c5aa0',
              border: '2px solid #e1e8ed',
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#f8f9fb';
              e.currentTarget.style.borderColor = '#2c5aa0';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.borderColor = '#e1e8ed';
            }}
          >
            ← Powrót do strony głównej
          </button>
        </div>
      </div>

      <div
        className={`fade-in ${isVisible ? 'visible' : ''}`}
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)',
          padding: '40px 20px'
        }}
      >
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'white',
          borderRadius: '16px',
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}>
          {/* Generator Header */}
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: '700',
              color: '#2c3e50',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}>
              <Wand2 size={32} color="#2c5aa0" />
              Generator Pism AI
            </h2>
            <p style={{
              color: '#5a6c7d',
              lineHeight: '1.6',
              fontSize: '16px'
            }}>
              Wybierz typ pisma, odpowiedz na kilka pytań, a AI wygeneruje gotowy dokument do podpisu i wysłania.
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
              {/* Search Bar */}
              <div style={{ marginBottom: '25px' }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#2c3e50',
                  marginBottom: '15px'
                }}>
                  Wyszukaj pismo
                </h3>
                <div style={{ position: 'relative' }}>
                  <Search
                    size={20}
                    color="#5a6c7d"
                    style={{
                      position: 'absolute',
                      left: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none'
                    }}
                  />
                  <input
                    type="text"
                    placeholder="Szukaj po nazwie, opisie lub kategorii..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 45px',
                      fontSize: '14px',
                      border: '2px solid #e1e8ed',
                      borderRadius: '8px',
                      boxSizing: 'border-box',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#2c5aa0'}
                    onBlur={(e) => e.currentTarget.style.borderColor = '#e1e8ed'}
                  />
                </div>
              </div>

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
                gap: '20px',
                marginBottom: '30px'
              }}>
                {currentPisma.map(pismo => (
                  <div
                    key={pismo.id}
                    onClick={() => handlePismoSelect(pismo)}
                    style={{
                      background: '#f8f9fb',
                      padding: '20px',
                      borderRadius: '12px',
                      border: '2px solid #e1e8ed',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
                      e.currentTarget.style.borderColor = '#2c5aa0';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                      e.currentTarget.style.borderColor = '#e1e8ed';
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
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '10px',
                  marginTop: '30px'
                }}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    style={{
                      padding: '10px 20px',
                      background: currentPage === 1 ? '#e1e8ed' : 'white',
                      color: currentPage === 1 ? '#a0a0a0' : '#2c5aa0',
                      border: '2px solid #e1e8ed',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    ← Poprzednia
                  </button>

                  <div style={{
                    display: 'flex',
                    gap: '5px'
                  }}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        style={{
                          padding: '10px 15px',
                          background: currentPage === page
                            ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)'
                            : 'white',
                          color: currentPage === page ? 'white' : '#2c5aa0',
                          border: currentPage === page ? 'none' : '2px solid #e1e8ed',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '14px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          minWidth: '40px'
                        }}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    style={{
                      padding: '10px 20px',
                      background: currentPage === totalPages ? '#e1e8ed' : 'white',
                      color: currentPage === totalPages ? '#a0a0a0' : '#2c5aa0',
                      border: '2px solid #e1e8ed',
                      borderRadius: '8px',
                      fontWeight: '600',
                      fontSize: '14px',
                      cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    Następna →
                  </button>
                </div>
              )}

              {/* Info o liczbie pism */}
              <div style={{
                textAlign: 'center',
                marginTop: '20px',
                color: '#5a6c7d',
                fontSize: '14px'
              }}>
                {filteredPisma.length > 0 ? (
                  <>Pokazuję {startIndex + 1}-{Math.min(endIndex, filteredPisma.length)} z {filteredPisma.length} pism</>
                ) : (
                  <div style={{ padding: '40px 20px' }}>
                    <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                      Nie znaleziono pism
                    </p>
                    <p style={{ fontSize: '14px' }}>
                      Spróbuj zmienić kategorię lub zapytanie wyszukiwania
                    </p>
                  </div>
                )}
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
                              background: 'white',
                              color: 'black',
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
              ) : verifyingPayment ? (
                <div style={{
                  textAlign: 'center',
                  padding: '60px 20px'
                }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    margin: '0 auto 24px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    animation: 'pulse 1.5s ease-in-out infinite'
                  }}>
                    <Loader size={40} color="white" className="spin"/>
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    fontWeight: '700',
                    color: '#2c3e50',
                    marginBottom: '10px'
                  }}>
                    Weryfikacja płatności...
                  </h3>
                  <p style={{
                    color: '#5a6c7d',
                    fontSize: '15px'
                  }}>
                    Sprawdzamy status Twojej płatności
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
                        Sprawdź treść poniżej, zapłać 2 zł, pobierz PDF, wydrukuj i podpisz.
                      </p>
                    </div>
                  </div>

                  <div style={{
                    position: 'relative',
                    marginBottom: '25px'
                  }}>
                    <div style={{
                      background: 'white',
                      border: '2px solid #e1e8ed',
                      borderRadius: '12px',
                      padding: '40px',
                      lineHeight: '1.6',
                      whiteSpace: 'pre-wrap',
                      wordWrap: 'break-word',
                      maxHeight: '600px',
                      overflow: documentUnlocked ? 'auto' : 'hidden',
                      color: '#000',
                      position: 'relative'
                    }}>

                      {/* Jeśli nie odblokowany – pokazujemy całość, ale ucinamy scroll i dodajemy maskę */}
                      {!documentUnlocked ? (
                        <>
                          <div
                            style={{
                              maxHeight: '50%',
                              overflow: 'hidden'
                            }}
                          >
                            <div
                              ref={documentRef}
                              id="document-preview"
                              style={{
                                width: "794px",
                                minHeight: "1123px",
                                margin: "0 auto",
                                overflow: "hidden",
                                padding: "40px",
                                boxSizing: "border-box",
                                background: "white",
                                fontFamily: "'Times New Roman', Times, serif",
                                fontSize: "12pt",
                                lineHeight: 1.5,
                                color: "#000000"
                              }}
                              dangerouslySetInnerHTML={{ __html: generatedDocument }} />
                          </div>

                          {/* Maska + przycisk */}
                          <div style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: '50%',
                            background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            pointerEvents: 'none'
                          }}>
                            <div style={{
                              background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                              color: 'white',
                              padding: '16px 32px',
                              borderRadius: '12px',
                              fontSize: '16px',
                              fontWeight: '700',
                              boxShadow: '0 8px 24px rgba(44, 90, 160, 0.3)',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              gap: '8px',
                              textAlign: 'center',
                              maxWidth: '400px',
                              pointerEvents: 'auto',
                              marginBottom: '15px'
                            }}>
                              <Lock size={32} />
                              <div>Odblokuj pełny dokument</div>
                              <div style={{ fontSize: '13px', fontWeight: '500', opacity: 0.9 }}>
                                Zapłać tylko 2 zł, aby pobrać pełny dokument w PDF
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <div
                        style={{
                          width: "794px",
                          minHeight: "1123px",
                          margin: "0 auto",
                          overflow: "hidden",
                          padding: "40px",
                          boxSizing: "border-box",
                          background: "white",
                          fontFamily: "'Times New Roman', Times, serif",
                          fontSize: "12pt",
                          lineHeight: 1.5,
                          color: "#000000"
                        }}
                        ref={documentRef} dangerouslySetInnerHTML={{ __html: generatedDocument }} />
                      )}

                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap'
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

                    <div style={{ display: 'flex', gap: '10px' }}>
                      {!documentUnlocked && (
                        <button
                          onClick={() => setShowPaymentModal(true)}
                          style={{
                            padding: '12px 24px',
                            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
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
                          <Lock size={16} />
                          Zapłać 2 zł i pobierz
                        </button>
                      )}

                      <button
                        onClick={handleDownloadPDF}
                        style={{
                          padding: '12px 24px',
                          background: documentUnlocked
                            ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                            : '#ccc',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '14px',
                          cursor: documentUnlocked ? 'pointer' : 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          opacity: documentUnlocked ? 1 : 0.6
                        }}
                      >
                        <Download size={16} />
                        Zapisz PDF
                      </button>

                      <button
                        onClick={handleDownloadDOCX}
                        style={{
                          padding: '12px 24px',
                          background: documentUnlocked
                            ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)'
                            : '#ccc',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: '600',
                          fontSize: '14px',
                          cursor: documentUnlocked ? 'pointer' : 'not-allowed',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          opacity: documentUnlocked ? 1 : 0.6
                        }}
                      >
                        <Download size={16} />
                        Zapisz DOCX
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
      {/* Footer */}
        <div style={{
          background: '#f8f9fb',
          borderTop: '2px solid #e1e8ed',
          padding: '30px 20px',
          width: '100%'
        }}>
          <div style={{
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              marginBottom: '15px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => setShowTerms(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2c5aa0',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  transition: 'color 0.2s',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#4a7dc9'}
                onMouseOut={(e) => e.currentTarget.style.color = '#2c5aa0'}
              >
                Regulamin
              </button>
              <span style={{ color: '#5a6c7d' }}>•</span>
              <button
                onClick={() => setShowPrivacy(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#2c5aa0',
                  fontSize: '14px',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  transition: 'color 0.2s',
                  fontWeight: '500'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#4a7dc9'}
                onMouseOut={(e) => e.currentTarget.style.color = '#2c5aa0'}
              >
                Polityka Prywatności
              </button>
            </div>
            <p style={{
              fontSize: '13px',
              color: '#5a6c7d',
              margin: 0
            }}>
              © 2024 Pomocnik Obywatela. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>

      {/* Modals */}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
    </>
  );
};

export default GeneratorPism;

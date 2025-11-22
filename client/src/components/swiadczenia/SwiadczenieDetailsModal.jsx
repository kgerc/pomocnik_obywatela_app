import React, { useState } from 'react';
import { X, CheckCircle, FileText, ExternalLink, Download, Clock, MapPin, AlertCircle, Loader } from 'lucide-react';

const SwiadczenieDetailsModal = ({ swiadczenie, onClose, onToggleFavorite, isFavorite, showFavoriteButton = true }) => {
  const [downloading, setDownloading] = useState(false);

  if (!swiadczenie) return null;

  // Funkcja do pobierania wielu PDFów
  const handleDownloadDocuments = async () => {
    if (!swiadczenie.pdf) return;

    setDownloading(true);
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

    // Podziel string na tablicę nazw plików (usuwając białe znaki)
    const pdfFiles = swiadczenie.pdf.split(',').map(file => file.trim()).filter(Boolean);

    try {
      // Pobierz wszystkie pliki
      for (const filename of pdfFiles) {
        const pdfUrl = `${supabaseUrl}/storage/v1/object/public/documents/${filename}`;

        try {
          const response = await fetch(pdfUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);

          // Małe opóźnienie między pobieraniami, żeby przeglądarka nie blokowała
          if (pdfFiles.length > 1) {
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        } catch (error) {
          console.error(`Błąd pobierania ${filename}:`, error);
        }
      }
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'white',
          borderRadius: '16px',
          maxWidth: '800px',
          width: '100%',
          maxHeight: '90vh',
          position: 'relative',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
          color: 'white',
          padding: '25px 30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          position: 'relative',
          flexShrink: 0
        }}>
          <div style={{ flex: 1, paddingRight: showFavoriteButton ? '60px' : '20px' }}>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              margin: '0 0 10px 0',
              lineHeight: '1.3'
            }}>
              {swiadczenie.nazwa}
            </h2>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              {swiadczenie.kategoria}
            </div>
          </div>

          {/* Favorite button */}
          {showFavoriteButton && onToggleFavorite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(swiadczenie.id);
              }}
              style={{
                position: 'absolute',
                top: '25px',
                right: '70px',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                transition: 'all 0.2s',
                flexShrink: 0,
                zIndex: 20
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
            >
              {isFavorite ? '❤️' : '🤍'}
            </button>
          )}
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
              flexShrink: 0,
              padding: '5px 5px'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: '30px',
          overflow: 'auto',
          flex: 1
        }}
        className="modal-content"
        >
          {/* Opis */}
          <p style={{
            color: '#5a6c7d',
            lineHeight: '1.7',
            fontSize: '16px',
            marginBottom: '30px'
          }}>
            {swiadczenie.krotki_opis}
          </p>

          {/* Kogo dotyczy */}
          {swiadczenie.kogo_dotyczy && swiadczenie.kogo_dotyczy.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={20} color="#2c5aa0" />
                Kogo dotyczy
              </h4>
              <ul style={{
                paddingLeft: '20px',
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0
              }}>
                {swiadczenie.kogo_dotyczy.map((k, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{k}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Kwalifikacja */}
          {swiadczenie.kwalifikacja && swiadczenie.kwalifikacja.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle size={20} color="#10b981" />
                Kto może skorzystać
              </h4>
              <ul style={{
                paddingLeft: '20px',
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0
              }}>
                {swiadczenie.kwalifikacja.map((k, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{k}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Dokumenty */}
          {swiadczenie.dokumenty && swiadczenie.dokumenty.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <FileText size={20} color="#2c5aa0" />
                Potrzebne dokumenty
              </h4>
              <ul style={{
                paddingLeft: '20px',
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0
              }}>
                {swiadczenie.dokumenty.map((d, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Kiedy złożyć */}
          {swiadczenie.kiedy_zlozyc && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <Clock size={20} color="#2c5aa0" />
                Kiedy złożyć wniosek
              </h4>
              <p style={{
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0,
                paddingLeft: '28px'
              }}>
                {swiadczenie.kiedy_zlozyc}
              </p>
            </div>
          )}

          {/* Gdzie złożyć */}
          {swiadczenie.gdzie_zlozyc && swiadczenie.gdzie_zlozyc.length > 0 && (
            <div style={{ marginBottom: '25px' }}>
              <h4 style={{
                fontSize: '18px',
                fontWeight: '600',
                color: '#2c3e50',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <MapPin size={20} color="#2c5aa0" />
                Gdzie złożyć wniosek
              </h4>
              <ul style={{
                paddingLeft: '20px',
                color: '#5a6c7d',
                lineHeight: '1.8',
                margin: 0
              }}>
                {swiadczenie.gdzie_zlozyc.map((g, idx) => (
                  <li key={idx} style={{ marginBottom: '8px' }}>{g}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Uwagi */}
          {swiadczenie.uwagi && (
            <div style={{
              marginBottom: '25px',
              padding: '15px',
              background: '#f0f7ff',
              borderLeft: '4px solid #2c5aa0',
              borderRadius: '8px'
            }}>
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#2c5aa0',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <AlertCircle size={18} />
                Uwagi
              </h4>
              <p style={{
                color: '#5a6c7d',
                lineHeight: '1.7',
                margin: 0,
                fontSize: '14px'
              }}>
                {swiadczenie.uwagi}
              </p>
            </div>
          )}

          {/* Ostatnia aktualizacja */}
          {swiadczenie.ostatnia_aktualizacja && (
            <div style={{
              fontSize: '13px',
              color: '#999',
              fontStyle: 'italic',
              marginBottom: '25px'
            }}>
              Ostatnia aktualizacja: {swiadczenie.ostatnia_aktualizacja}
            </div>
          )}

          {/* Przyciski akcji */}
          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            paddingTop: '10px',
            borderTop: '1px solid #e1e8ed'
          }}>
            <a
              href={swiadczenie.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
                color: 'white',
                padding: '14px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                fontSize: '15px',
                transition: 'transform 0.2s',
                flex: '1',
                justifyContent: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <ExternalLink size={18} />
              Źródło - Oficjalna strona
            </a>

            {swiadczenie.pdf && (
              <button
                onClick={handleDownloadDocuments}
                disabled={downloading}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'white',
                  color: '#2c5aa0',
                  padding: '14px 24px',
                  borderRadius: '8px',
                  border: '2px solid #2c5aa0',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: downloading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.2s',
                  flex: '1',
                  justifyContent: 'center',
                  opacity: downloading ? 0.7 : 1
                }}
                onMouseOver={(e) => {
                  if (!downloading) {
                    e.currentTarget.style.background = '#2c5aa0';
                    e.currentTarget.style.color = 'white';
                  }
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'white';
                  e.currentTarget.style.color = '#2c5aa0';
                }}
              >
                {downloading ? (
                  <>
                    <Loader size={18} className="spin" />
                    Pobieranie...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Pobierz dokumenty
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }

        /* Custom scrollbar for modal */
        .modal-content::-webkit-scrollbar {
          width: 8px;
        }
        .modal-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .modal-content::-webkit-scrollbar-thumb {
          background: #2c5aa0;
          border-radius: 10px;
        }
        .modal-content::-webkit-scrollbar-thumb:hover {
          background: #1e4080;
        }
      `}</style>
    </div>
  );
};

export default SwiadczenieDetailsModal;

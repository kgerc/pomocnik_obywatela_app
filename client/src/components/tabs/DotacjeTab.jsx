import React, { useState } from 'react';
import { TrendingUp, Sparkles, Search, Loader, Building2, AlertCircle, ExternalLink } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Przykładowa baza dotacji - w produkcji to byłoby z API
const dotacjeDB = [
  {
    id: 'dotacja-1',
    nazwa: 'Czyste Powietrze 2025',
    sektor: 'Energia i środowisko',
    status: 'Aktywny',
    kwota_max: 'do 90 tys. zł',
    opis: 'Program dofinansowania wymiany źródeł ciepła i termomodernizacji budynków jednorodzinnych.',
    beneficjenci: ['Osoby fizyczne', 'Właściciele domów'],
    termin: 'Ciągły nabór do wyczerpania środków',
    link: 'https://www.gov.pl/web/nfosigw/czyste-powietrze',
    slowa_kluczowe: ['energia', 'ogrzewanie', 'fotowoltaika', 'ekologia', 'dom', 'czyste powietrze']
  },
  {
    id: 'dotacja-2',
    nazwa: 'PARP - Wsparcie dla startupów',
    sektor: 'Przedsiębiorczość',
    status: 'Aktywny',
    kwota_max: 'do 500 tys. zł',
    opis: 'Dofinansowanie dla nowo powstałych firm innowacyjnych w początkowej fazie rozwoju.',
    beneficjenci: ['Startupy', 'Przedsiębiorcy', 'Innowatorzy'],
    termin: '31 grudnia 2025',
    link: 'https://www.parp.gov.pl',
    slowa_kluczowe: ['startup', 'firma', 'biznes', 'innowacje', 'przedsiębiorczość']
  },
  {
    id: 'dotacja-3',
    nazwa: 'NCN - Granty badawcze',
    sektor: 'Nauka',
    status: 'Nabór otwarty',
    kwota_max: 'do 2 mln zł',
    opis: 'Finansowanie projektów badawczych w dziedzinie nauk podstawowych i stosowanych.',
    beneficjenci: ['Uniwersytety', 'Instytuty badawcze', 'Naukowcy'],
    termin: '15 marca 2026',
    link: 'https://www.ncn.gov.pl',
    slowa_kluczowe: ['nauka', 'badania', 'uniwersytet', 'grant', 'projekt naukowy']
  }
];

const findBestDotacje = (query, limit = 3) => {
  const queryLower = query.toLowerCase();
  const scored = dotacjeDB.map(dotacja => {
    let score = 0;
    
    dotacja.slowa_kluczowe.forEach(keyword => {
      if (queryLower.includes(keyword.toLowerCase())) {
        score += 10;
      }
    });
    
    if (queryLower.includes(dotacja.nazwa.toLowerCase())) {
      score += 20;
    }
    
    if (queryLower.includes(dotacja.sektor.toLowerCase())) {
      score += 15;
    }
    
    return { ...dotacja, score };
  });
  
  return scored
    .filter(d => d.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

const DotacjeTab = () => {
  const [dotacjeQuery, setDotacjeQuery] = useState('');
  const [dotacjeLoading, setDotacjeLoading] = useState(false);
  const [dotacjeResult, setDotacjeResult] = useState(null);
  const [selectedSektor, setSelectedSektor] = useState('wszystkie');

  const sektory = ['wszystkie', 'Energia i środowisko', 'Przedsiębiorczość', 'Nauka', 'Kultura', 'Rolnictwo'];

  const handleDotacjeSearch = async () => {
    if (!dotacjeQuery.trim()) return;

    setDotacjeLoading(true);
    
    try {
      const matches = findBestDotacje(dotacjeQuery);
      
      if (matches.length === 0) {
        setDotacjeResult({
          content: `Nie znalazłem dokładnego dopasowania. Sprawdź inne źródła:\n\n• [PARP](https://www.parp.gov.pl)\n• [NFOŚiGW](https://www.gov.pl/web/nfosigw)\n• [NCBiR](https://www.ncbr.gov.pl)`,
          matches: []
        });
        setDotacjeLoading(false);
        return;
      }

      const contextForAI = matches.map(d => 
        `${d.nazwa} (${d.sektor}): ${d.opis}`
      ).join('\n');

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      
      const prompt = `Jesteś doradcą ds. dotacji w Polsce. Użytkownik szuka: "${dotacjeQuery}"\n\nDostępne programy:\n${contextForAI}\n\nOdpowiedz krótko (2-3 zdania):
      1. Które programy pasują do potrzeb użytkownika
      2. Kluczowe informacje o beneficjentach i terminach
      Nie dodawaj linków, nie wymyślaj programów spoza podanej bazy.`;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text();

      setDotacjeResult({
        content: aiResponse,
        matches: matches
      });
      
    } catch (error) {
      console.error('Błąd:', error);
      setDotacjeResult({
        content: 'Wystąpił błąd podczas wyszukiwania. Spróbuj ponownie.',
        matches: []
      });
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

  const displayedDotacje = selectedSektor === 'wszystkie' 
    ? dotacjeDB 
    : dotacjeDB.filter(d => d.sektor === selectedSektor);

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
        <TrendingUp size={24} color="#2c5aa0" />
        Dotacje i granty - aktywne programy 2024-2025
      </h2>
      <p style={{
        color: '#5a6c7d',
        marginBottom: '25px',
        lineHeight: '1.6'
      }}>
        Przeglądaj aktualne programy dotacyjne lub zapytaj AI o najlepsze źródło finansowania dla Twojego projektu.
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
          Zapytaj AI o dotację
        </h3>
        
        <textarea
          value={dotacjeQuery}
          onChange={(e) => setDotacjeQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Np. 'Szukam dotacji na fotowoltaikę dla firmy' lub 'Granty na badania medyczne'"
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
          onClick={handleDotacjeSearch}
          disabled={dotacjeLoading || !dotacjeQuery.trim()}
          style={{
            background: dotacjeLoading ? '#ccc' : 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 25px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: dotacjeLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => !dotacjeLoading && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          {dotacjeLoading ? (
            <>
              <Loader size={18} className="spin" />
              Szukam...
            </>
          ) : (
            <>
              <Search size={18} />
              Znajdź dotację
            </>
          )}
        </button>

        {/* AI Result */}
        {dotacjeResult && (
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
              {dotacjeResult.content}
            </div>

            {dotacjeResult.matches && dotacjeResult.matches.length > 0 && (
              <div>
                {dotacjeResult.matches.map((dotacja, idx) => (
                  <DotacjaCard key={idx} dotacja={dotacja} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

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
            {sektor}
          </button>
        ))}
      </div>

      {/* Dotacje Grid */}
      <div style={{
        display: 'grid',
        gap: '20px'
      }}>
        {displayedDotacje.map(dotacja => (
          <DotacjaCard key={dotacja.id} dotacja={dotacja} />
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

const DotacjaCard = ({ dotacja }) => (
  <div style={{
    background: '#f8f9fb',
    padding: '20px',
    borderRadius: '12px',
    border: '2px solid #e1e8ed'
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
            background: '#d1fae5',
            color: '#059669',
            padding: '4px 12px',
            borderRadius: '15px',
            fontSize: '13px',
            fontWeight: '600'
          }}>
            {dotacja.status}
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
          {dotacja.kwota_max}
        </div>
      </div>
    </div>

    <p style={{
      color: '#5a6c7d',
      lineHeight: '1.6',
      marginBottom: '15px'
    }}>
      {dotacja.opis}
    </p>

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

    <div style={{
      background: 'white',
      padding: '15px',
      borderRadius: '8px',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    }}>
      <AlertCircle size={20} color="#ff9800" />
      <div>
        <strong style={{ color: '#2c3e50' }}>Termin:</strong>{' '}
        <span style={{ color: '#5a6c7d' }}>{dotacja.termin}</span>
      </div>
    </div>

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
);

export default DotacjeTab;
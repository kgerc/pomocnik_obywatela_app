import React from 'react';
import { X, Lightbulb, Search, FileText, Bell, Download, Settings, MessageSquare, TrendingUp, File } from 'lucide-react';

const UserGuide = ({ onClose }) => {
  const content = (
    <div style={{
      fontSize: '15px',
      color: '#5a6c7d',
      lineHeight: '1.8',
    }}>
      <div style={{
        background: '#fff8e1',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '25px',
        border: '2px solid #ffc107'
      }}>
        <p style={{ margin: 0, color: '#2c3e50', fontWeight: '600' }}>
          <File size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Witaj w Pomocniku Obywatela! Ten przewodnik pomoże Ci w pełni wykorzystać możliwości aplikacji.
        </p>
      </div>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Search size={24} color="#2c5aa0" />
        1. Wyszukiwanie świadczeń
      </h3>
      <p style={{ marginBottom: '10px' }}>
        <strong>Jak wyszukiwać:</strong>
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li>Wpisz pytanie w naturalnym języku, np. "Jakie świadczenia dla rodzin z dziećmi?"</li>
        <li>AI automatycznie przeanalizuje Twoją sytuację i zaproponuje odpowiednie świadczenia</li>
        <li>Im bardziej szczegółowe pytanie tym lepsze wyniki</li>
        <li>Kliknij na kartę świadczenia, aby zobaczyć szczegóły, wymagania i linki do oficjalnych stron</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FileText size={24} color="#10b981" />
        2. Pobieranie dokumentów i pism
      </h3>
      <p style={{ marginBottom: '10px' }}>
        <strong>Korzystanie z bazy dokumentów:</strong>
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li>Przejdź do zakładki "Pisma" lub "Świadczenia", aby znaleźć wzory dokumentów</li>
        <li>Użyj wyszukiwarki AI, aby szybko znaleźć odpowiednie pisma</li>
        <li>Dokumenty można pobrać w formatach PDF a następnie wypełnić</li>
        <li>Niektóre świadczenia zawierają wiele dokumentów do pobrania</li>
      </ul>

      <div style={{
        background: '#fff3cd',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '15px',
        border: '1px solid #ffc107'
      }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#2c3e50' }}>
          <strong>⚠️ Ważne:</strong> Przy pierwszym pobraniu wielu dokumentów naraz, Twoja przeglądarka może poprosić o pozwolenie na pobieranie wielu plików.
          Kliknij "Zezwól" lub "Zawsze zezwalaj", aby móc pobierać wszystkie dokumenty związane ze świadczeniem jednocześnie.
        </p>
      </div>

      <p style={{ marginBottom: '15px', fontSize: '14px' }}>
        <strong>Jak włączyć automatyczne pobieranie w najpopularniejszych przeglądarkach:</strong>
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px', fontSize: '14px' }}>
        <li><strong>Chrome/Edge:</strong> Gdy pojawi się komunikat u góry ekranu, kliknij "Zezwól"</li>
        <li><strong>Firefox:</strong> Przejdź do Ustawienia → Prywatność i bezpieczeństwo → Uprawnienia → Odznacz „Ostrzegaj, gdy witryna próbuje pobrać wiele plików”</li>
        <li><strong>Safari:</strong> W menu Safari → Preferencje → Strony internetowe → Pobieranie, zaznacz "Zezwól" dla tej witryny</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <TrendingUp size={24} color="#f59e0b" />
        3. Wyszukiwanie dotacji
      </h3>
      <p style={{ marginBottom: '10px' }}>
        <strong>Jak znaleźć dotacje:</strong>
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li>Przejdź do zakładki "Dotacje"</li>
        <li>Użyj wyszukiwarki AI, aby znaleźć dotacje dopasowane do Twojej działalności</li>
        <li>Sprawdź terminy naboru, warunki kwalifikacji i wysokość dofinansowania</li>
        <li>Kliknij "Szczegóły", aby przejść do oficjalnej strony programu dotacyjnego</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Bell size={24} color="#2c5aa0" />
        4. Powiadomienia
      </h3>
      <p style={{ marginBottom: '10px' }}>
        <strong>Konfiguracja powiadomień:</strong>
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li>Przejdź do zakładki "Powiadomienia", aby zobaczyć alerty o nowych świadczeniach i dotacjach</li>
        <li>W Ustawieniach możesz włączyć powiadomienia e-mail o nowych programach</li>
        <li>Otrzymuj informacje o zmianach w przepisach i nowych możliwościach wsparcia</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <MessageSquare size={24} color="#10b981" />
        5. Rozmowa z AI
      </h3>
      <p style={{ marginBottom: '10px' }}>
        <strong>Jak rozmawiać z asystentem AI:</strong>
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li>Zadawaj pytania w naturalnym języku, tak jak rozmawiałbyś z konsultantem</li>
        <li>Możesz doprecyzować pytanie, dodając szczegóły swojej sytuacji</li>
        <li>AI pamięta kontekst rozmowy, więc możesz zadawać pytania uzupełniające</li>
        <li>Zawsze weryfikuj informacje na oficjalnych stronach instytucji</li>
      </ul>

      <div style={{
        background: '#e8f4f8',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '15px',
        border: '1px solid #2c5aa0'
      }}>
        <p style={{ margin: 0, fontSize: '14px', color: '#2c3e50' }}>
          <strong>💡 Przykłady pytań:</strong>
        </p>
        <ul style={{ margin: '8px 0 0 20px', fontSize: '14px', color: '#5a6c7d' }}>
          <li>"Jakie świadczenia przysługują rodzinom z dwójką dzieci?"</li>
          <li>"Jak złożyć wniosek o 800+?"</li>
          <li>"Czy mogę dostać dotację na rozpoczęcie działalności gospodarczej?"</li>
          <li>"Jakie ulgi podatkowe dla rodzin?"</li>
        </ul>
      </div>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Settings size={24} color="#2c5aa0" />
        6. Personalizacja i ustawienia
      </h3>
      <p style={{ marginBottom: '10px' }}>
        <strong>Dostosuj aplikację do swoich potrzeb:</strong>
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li><strong>Dane osobowe:</strong> Edytuj swoje dane (imię i nazwisko)</li>
        <li><strong>Prywatność:</strong> Zarządzaj zgodami RODO, marketingowymi i newsletter</li>
        <li><strong>Subskrypcja:</strong> Sprawdź status swojego planu i zarządzaj płatnościami</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
        8. Często zadawane pytania
      </h3>

      <div style={{
        background: '#f8f9fb',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '12px'
      }}>
        <p style={{ margin: 0, fontWeight: '600', color: '#2c3e50', marginBottom: '6px' }}>
          P: Czy informacje są aktualne?
        </p>
        <p style={{ margin: 0, fontSize: '14px' }}>
          O: Regularnie aktualizujemy bazę danych, śledząc zmiany w przepisach. Zawsze sprawdzaj datę aktualizacji przy każdym świadczeniu.
        </p>
      </div>

      <div style={{
        background: '#f8f9fb',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '12px'
      }}>
        <p style={{ margin: 0, fontWeight: '600', color: '#2c3e50', marginBottom: '6px' }}>
          P: Czy mogę zaufać odpowiedziom AI?
        </p>
        <p style={{ margin: 0, fontSize: '14px' }}>
          O: AI korzysta wyłącznie z oficjalnych źródeł (gov.pl, ZUS, PARP). Zawsze linkujemy do źródeł, abyś mógł zweryfikować informacje.
        </p>
      </div>

      <div style={{
        background: '#f8f9fb',
        padding: '15px',
        borderRadius: '8px',
        marginBottom: '12px'
      }}>
        <p style={{ margin: 0, fontWeight: '600', color: '#2c3e50', marginBottom: '6px' }}>
          P: Co zrobić, gdy nie mogę pobrać dokumentów?
        </p>
        <p style={{ margin: 0, fontSize: '14px' }}>
          O: Sprawdź ustawienia przeglądarki i zezwól na automatyczne pobieranie plików z naszej domeny. Jeśli problem się powtarza, skontaktuj się z nami.
        </p>
      </div>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
        9. Kontakt i pomoc
      </h3>
      <p style={{ marginBottom: '15px' }}>
        Masz pytania lub potrzebujesz pomocy? Skontaktuj się z nami:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px', listStyle: 'none' }}>
        <li><strong>E-mail:</strong> <a href="mailto:kontakt@pomocnikobywatela.pl" style={{ color: '#2c5aa0', fontWeight: '600' }}>kontakt@pomocnikobywatela.pl</a></li>
        <li><strong>FAQ:</strong> <a href="https://pomocnikobywatela.pl/#faq" target="_blank" rel="noopener noreferrer" style={{ color: '#2c5aa0', fontWeight: '600' }}>Centrum pomocy</a></li>
      </ul>

      <div style={{
        background: '#d1fae5',
        padding: '20px',
        borderRadius: '12px',
        marginTop: '30px',
        border: '2px solid #10b981'
      }}>
        <p style={{ margin: 0, color: '#2c3e50', fontWeight: '600', marginBottom: '8px' }}>
          🎉 Miłego korzystania z Pomocnika Obywatela!
        </p>
        <p style={{ margin: 0, color: '#2c3e50', fontSize: '14px' }}>
          Dziękujemy, że nam ufasz. Staramy się ułatwić Ci dostęp do świadczeń i dotacji, na które masz prawo.
        </p>
      </div>
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '20px',
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '16px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: '0',
            float: 'right',
            background: '#f8f9fb',
            border: '2px solid #e1e8ed',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#5a6c7d',
            transition: 'all 0.2s',
            zIndex: 10,
            padding: '5px 5px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = '#2c5aa0';
            e.currentTarget.style.borderColor = '#2c5aa0';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = '#f8f9fb';
            e.currentTarget.style.borderColor = '#e1e8ed';
            e.currentTarget.style.color = '#5a6c7d';
          }}
        >
          <X size={24} />
        </button>

        <h2 style={{
          fontSize: '32px',
          fontWeight: '900',
          color: '#2c3e50',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <Lightbulb size={36} color="#ffc107" />
          Przewodnik użytkownika
        </h2>

        {content}
      </div>
    </div>
  );
};

export default UserGuide;

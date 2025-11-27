import React from 'react';
import { X, Shield, Eye, Lock, Database, Bell, Cookie, Mail } from 'lucide-react';

const PrivacyPolicy = ({ onClose, inSettings = false }) => {
  const content = (
    <div style={{
      fontSize: '15px',
      color: '#5a6c7d',
      lineHeight: '1.8',
    }}>
      <p style={{ marginBottom: '15px' }}>
        <strong>Data ostatniej aktualizacji:</strong> {new Date().toLocaleDateString('pl-PL')}
      </p>

      <div style={{
        background: '#e8f4f8',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '25px',
        border: '2px solid #2c5aa0'
      }}>
        <p style={{ margin: 0, color: '#2c3e50', fontWeight: '600' }}>
          <Shield size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
          Twoja prywatność jest dla nas priorytetem. Zbieramy tylko niezbędne dane i przechowujemy je bezpiecznie.
        </p>
      </div>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Mail size={24} color="#2c5aa0" />
        1. Administrator Danych
      </h3>
      <p style={{ marginBottom: '15px' }}>
        Administratorem Twoich danych osobowych jest właściciel serwisu "Pomocnik Obywatela".
        Kontakt w sprawach związanych z ochroną danych osobowych: <a href="mailto:kontakt@pomocnikobywatela.pl" style={{ color: '#2c5aa0', fontWeight: '600' }}>kontakt@pomocnikobywatela.pl</a>
      </p>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Database size={24} color="#2c5aa0" />
        2. Jakie dane zbieramy?
      </h3>
      <p style={{ marginBottom: '10px' }}>
        W ramach korzystania z aplikacji "Pomocnik Obywatela" zbieramy następujące dane:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li><strong>Dane konta:</strong> adres e-mail (wymagany do założenia konta), imię i nazwisko (opcjonalnie)</li>
        <li><strong>Dane osobowe (opcjonalnie):</strong> data urodzenia, liczba dzieci, stan cywilny, status zatrudnienia, wysokość dochodów - podawane dobrowolnie w celu personalizacji rekomendacji świadczeń</li>
        <li><strong>Historia aktywności:</strong> zapisane wyszukiwania, przeglądane świadczenia i dokumenty, pobrane pisma i wnioski</li>
        <li><strong>Dane techniczne:</strong> adres IP, typ przeglądarki, system operacyjny, czas korzystania z aplikacji (w celach analitycznych i bezpieczeństwa)</li>
        <li><strong>Zgody marketingowe:</strong> informacja o zgodzie na otrzymywanie powiadomień e-mail i newsletter</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Eye size={24} color="#2c5aa0" />
        3. Cel przetwarzania danych
      </h3>
      <p style={{ marginBottom: '10px' }}>
        Twoje dane wykorzystujemy w następujących celach:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li><strong>Świadczenie usług:</strong> umożliwienie dostępu do aplikacji, wyszukiwania świadczeń, dokumentów i dotacji</li>
        <li><strong>Personalizacja:</strong> dopasowanie rekomendacji świadczeń i dotacji do Twojej sytuacji osobistej (tylko jeśli podasz dane osobowe)</li>
        <li><strong>Powiadomienia:</strong> wysyłanie alertów o nowych świadczeniach, dotacjach i zmianach w przepisach (za Twoją zgodą)</li>
        <li><strong>Komunikacja:</strong> odpowiadanie na pytania, zgłoszenia błędów i prośby o pomoc</li>
        <li><strong>Bezpieczeństwo:</strong> wykrywanie nadużyć, ochrona przed nieautoryzowanym dostępem</li>
        <li><strong>Analityka:</strong> ulepszanie funkcjonalności aplikacji, analiza sposobu korzystania z serwisu</li>
        <li><strong>Marketing:</strong> wysyłanie newslettera z nowościami (wyłącznie za Twoją zgodą)</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Lock size={24} color="#2c5aa0" />
        4. Podstawa prawna przetwarzania
      </h3>
      <p style={{ marginBottom: '10px' }}>
        Przetwarzamy Twoje dane na podstawie:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li><strong>Umowy:</strong> świadczenie usług aplikacji (art. 6 ust. 1 lit. b RODO)</li>
        <li><strong>Zgody:</strong> powiadomienia e-mail, newsletter, analityka (art. 6 ust. 1 lit. a RODO)</li>
        <li><strong>Prawnie uzasadnionego interesu:</strong> bezpieczeństwo systemu, zapobieganie nadużyciom (art. 6 ust. 1 lit. f RODO)</li>
        <li><strong>Obowiązku prawnego:</strong> przechowywanie danych do celów rozliczeń podatkowych (art. 6 ust. 1 lit. c RODO)</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Database size={24} color="#2c5aa0" />
        5. Jak długo przechowujemy dane?
      </h3>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li><strong>Dane konta:</strong> do momentu usunięcia konta lub wycofania zgody</li>
        <li><strong>Dane osobowe (opcjonalne):</strong> do momentu ich usunięcia przez Ciebie w ustawieniach</li>
        <li><strong>Historia aktywności:</strong> przez okres aktywności konta</li>
        <li><strong>Dane techniczne:</strong> maksymalnie 12 miesięcy</li>
        <li><strong>Dane rozliczeniowe (subskrypcja Premium):</strong> 5 lat (wymóg prawny)</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Shield size={24} color="#2c5aa0" />
        6. Bezpieczeństwo danych
      </h3>
      <p style={{ marginBottom: '10px' }}>
        Stosujemy zaawansowane środki bezpieczeństwa:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li>Szyfrowanie połączeń (SSL/TLS)</li>
        <li>Bezpieczne przechowywanie haseł (hashing + salt)</li>
        <li>Regularne kopie zapasowe danych</li>
        <li>Monitoring i ochrona przed atakami</li>
        <li>Ograniczony dostęp do danych (tylko upoważniony personel)</li>
        <li>Zgodność z najlepszymi praktykami OWASP</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Bell size={24} color="#2c5aa0" />
        7. Udostępnianie danych osobom trzecim
      </h3>
      <p style={{ marginBottom: '10px' }}>
        Nie sprzedajemy Twoich danych. Możemy je udostępnić tylko:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li><strong>Dostawcom usług IT:</strong> hosting (np. Supabase), wysyłka e-maili (np. SendGrid), analityka (Google Analytics)</li>
        <li><strong>Procesorom płatności:</strong> Stripe (tylko w przypadku subskrypcji Premium)</li>
        <li><strong>Organom państwowym:</strong> na żądanie sądu lub prokuratury</li>
      </ul>
      <p style={{ marginBottom: '15px' }}>
        Wszyscy partnerzy zobowiązani są do ochrony Twoich danych zgodnie z RODO.
      </p>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Cookie size={24} color="#2c5aa0" />
        8. Pliki cookies i technologie śledzące
      </h3>
      <p style={{ marginBottom: '10px' }}>
        Używamy plików cookies w celach:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li><strong>Niezbędnych:</strong> logowanie, sesja użytkownika, bezpieczeństwo</li>
        <li><strong>Funkcjonalnych:</strong> zapamiętywanie preferencji (motyw jasny/ciemny)</li>
        <li><strong>Analitycznych:</strong> Google Analytics (za zgodą) - zrozumienie sposobu korzystania z aplikacji</li>
      </ul>
      <p style={{ marginBottom: '15px' }}>
        Możesz zarządzać cookies w ustawieniach przeglądarki. Wyłączenie cookies może ograniczyć funkcjonalność aplikacji.
      </p>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Eye size={24} color="#2c5aa0" />
        9. Twoje prawa (RODO)
      </h3>
      <p style={{ marginBottom: '10px' }}>
        Masz prawo do:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li><strong>Dostępu:</strong> żądania informacji o przetwarzanych danych</li>
        <li><strong>Sprostowania:</strong> poprawiania nieprawidłowych danych (w ustawieniach konta)</li>
        <li><strong>Usunięcia:</strong> żądania usunięcia danych ("prawo do bycia zapomnianym")</li>
        <li><strong>Ograniczenia przetwarzania:</strong> wstrzymania niektórych operacji na danych</li>
        <li><strong>Przenoszenia danych:</strong> otrzymania danych w formacie JSON lub CSV</li>
        <li><strong>Sprzeciwu:</strong> wobec przetwarzania w celach marketingowych</li>
        <li><strong>Cofnięcia zgody:</strong> w dowolnym momencie (nie wpływa na zgodność z prawem wcześniejszego przetwarzania)</li>
        <li><strong>Wniesienia skargi:</strong> do Prezesa Urzędu Ochrony Danych Osobowych</li>
      </ul>
      <p style={{ marginBottom: '15px' }}>
        Aby skorzystać z tych praw, skontaktuj się z nami: <a href="mailto:kontakt@pomocnikobywatela.pl" style={{ color: '#2c5aa0', fontWeight: '600' }}>kontakt@pomocnikobywatela.pl</a>
      </p>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
        10. Usunięcie danych
      </h3>
      <p style={{ marginBottom: '15px' }}>
        W zakładce Ustawienia → Prywatność możesz:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px' }}>
        <li>Usunąć konto wraz ze wszystkimi danymi osobowymi</li>
        <li>Zarządzać zgodami RODO</li>
      </ul>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
        11. Zmiany w polityce prywatności
      </h3>
      <p style={{ marginBottom: '15px' }}>
        Zastrzegamy sobie prawo do aktualizacji niniejszej polityki. O istotnych zmianach powiadomimy Cię przez e-mail lub powiadomienie w aplikacji.
        Aktualna wersja polityki zawsze dostępna jest na stronie oraz w ustawieniach aplikacji.
      </p>

      <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginTop: '25px', marginBottom: '12px' }}>
        12. Kontakt
      </h3>
      <p style={{ marginBottom: '15px' }}>
        W razie pytań dotyczących przetwarzania danych osobowych, skontaktuj się z nami:
      </p>
      <ul style={{ marginBottom: '15px', paddingLeft: '25px', listStyle: 'none' }}>
        <li><strong>E-mail:</strong> <a href="mailto:kontakt@pomocnikobywatela.pl" style={{ color: '#2c5aa0', fontWeight: '600' }}>kontakt@pomocnikobywatela.pl</a></li>
        <li><strong>Strona:</strong> <a href="https://pomocnikobywatela.pl" target="_blank" rel="noopener noreferrer" style={{ color: '#2c5aa0', fontWeight: '600' }}>pomocnikobywatela.pl</a></li>
      </ul>

      <div style={{
        background: '#f8f9fb',
        padding: '20px',
        borderRadius: '12px',
        marginTop: '30px',
        border: '2px solid #e1e8ed'
      }}>
        <p style={{ margin: 0, color: '#2c3e50', fontSize: '14px' }}>
          <strong>Ważne:</strong> "Pomocnik Obywatela" to narzędzie informacyjne. Nie zastępuje profesjonalnej porady prawnej.
          Zawsze weryfikuj informacje na oficjalnych stronach instytucji publicznych (gov.pl, ZUS, NFZ, itd.).
        </p>
      </div>
    </div>
  );

  if (inSettings) {
    return (
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#2c3e50', marginBottom: '20px' }}>
          Polityka Prywatności
        </h3>
        {content}
      </div>
    );
  }

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
          <Shield size={36} color="#2c5aa0" />
          Polityka Prywatności
        </h2>

        {content}
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from 'react';
import { Shield, X } from 'lucide-react';

const PrivacyPolicy = ({ onClose }) => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000,
      padding: '20px',
      overflowY: 'auto'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        maxWidth: '900px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          borderBottom: '2px solid #e1e8ed',
          padding: '24px 30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield size={28} color="#2c5aa0" />
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              margin: 0
            }}>
              Polityka Prywatności
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = '#f8f9fb'}
            onMouseOut={(e) => e.currentTarget.style.background = 'none'}
          >
            <X size={24} color="#5a6c7d" />
          </button>
        </div>

        {/* Content */}
        <div style={{
          padding: '30px',
          color: '#2c3e50',
          lineHeight: '1.8'
        }}>
          <p style={{ marginBottom: '20px', color: '#5a6c7d' }}>
            Obowiązuje od: 3 grudnia 2025
          </p>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              1. Postanowienia ogólne
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Niniejsza Polityka Prywatności określa zasady przetwarzania i ochrony danych osobowych przekazanych przez Użytkowników w związku z korzystaniem z serwisu Generator Pism (dalej: "Serwis").
              </li>
              <li style={{ marginBottom: '8px' }}>
                Dane osobowe są przetwarzane zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 z dnia 27 kwietnia 2016 r. (RODO).
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              2. Jakie dane zbieramy?
            </h3>
            <p style={{ marginBottom: '12px' }}>Administrator może zbierać następujące kategorie danych:</p>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Dane podane w formularzach:</strong> imię i nazwisko, adres zamieszkania, PESEL, NIP, numer telefonu, adres e-mail oraz inne dane wprowadzone przez Użytkownika w celu wygenerowania dokumentu.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Dane dotyczące płatności:</strong> informacje niezbędne do realizacji transakcji (obsługiwane przez Stripe). Administrator nie przechowuje danych karty płatniczej.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Dane techniczne:</strong> adres IP, typ przeglądarki, system operacyjny, czas wizyty, odwiedzane podstrony (zbierane automatycznie).
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Pliki cookies:</strong> Serwis może używać plików cookies w celach technicznych, analitycznych i marketingowych.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              3. Cele i podstawy prawne przetwarzania danych
            </h3>
            <p style={{ marginBottom: '12px' }}>Dane osobowe są przetwarzane w następujących celach:</p>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Świadczenie usługi generowania dokumentów</strong> – podstawa prawna: art. 6 ust. 1 lit. b) RODO (wykonanie umowy).
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Realizacja płatności</strong> – podstawa prawna: art. 6 ust. 1 lit. b) RODO (wykonanie umowy).
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Odpowiadanie na zapytania i reklamacje</strong> – podstawa prawna: art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes Administratora).
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Prowadzenie księgowości i realizacja obowiązków podatkowych</strong> – podstawa prawna: art. 6 ust. 1 lit. c) RODO (obowiązek prawny).
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Marketing (opcjonalnie)</strong> – podstawa prawna: art. 6 ust. 1 lit. a) RODO (zgoda) lub art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes).
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Analiza statystyk i poprawa Serwisu</strong> – podstawa prawna: art. 6 ust. 1 lit. f) RODO (prawnie uzasadniony interes Administratora).
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              4. Okres przechowywania danych
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Dane wprowadzone w formularzach do generowania dokumentów są przetwarzane jedynie przez czas niezbędny do wygenerowania dokumentu i nie są przechowywane po zakończeniu sesji, chyba że Użytkownik wyrazi odrębną zgodę.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Dane dotyczące płatności są przechowywane przez okres wymagany przepisami prawa podatkowego i rachunkowego (zazwyczaj 5 lat).
              </li>
              <li style={{ marginBottom: '8px' }}>
                Dane dotyczące korespondencji (np. reklamacje) są przechowywane przez okres niezbędny do realizacji obowiązków wynikających z ustawy o prawach konsumenta.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Dane marketingowe są przetwarzane do momentu wycofania zgody przez Użytkownika.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              5. Udostępnianie danych osobowych
            </h3>
            <p style={{ marginBottom: '12px' }}>Administrator może przekazywać dane osobowe następującym podmiotom:</p>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Stripe</strong> – procesor płatności (dane niezbędne do realizacji transakcji).
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Google (Gemini AI)</strong> – system sztucznej inteligencji wykorzystywany do generowania treści dokumentów.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Dostawcy usług IT</strong> – podmioty świadczące usługi hostingowe, techniczne i analityczne.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Organy publiczne</strong> – w przypadkach przewidzianych prawem (np. urząd skarbowy).
              </li>
            </ol>
            <p style={{ marginBottom: '8px', marginTop: '12px' }}>
              Administrator nie sprzedaje ani nie udostępnia danych osobowych podmiotom trzecim w celach marketingowych bez zgody Użytkownika.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              6. Prawa Użytkownika
            </h3>
            <p style={{ marginBottom: '12px' }}>Użytkownik ma prawo do:</p>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Dostępu do danych</strong> – prawo do uzyskania informacji o przetwarzanych danych osobowych.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Sprostowania danych</strong> – prawo do poprawiania nieprawidłowych lub niekompletnych danych.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Usunięcia danych</strong> ("prawo do bycia zapomnianym") – w przypadkach przewidzianych w RODO.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Ograniczenia przetwarzania</strong> – prawo do żądania wstrzymania przetwarzania danych.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Przenoszenia danych</strong> – prawo do otrzymania danych w ustrukturyzowanym formacie.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Sprzeciwu wobec przetwarzania</strong> – w przypadku przetwarzania danych na podstawie prawnie uzasadnionego interesu.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Cofnięcia zgody</strong> – w każdej chwili, jeśli przetwarzanie opiera się na zgodzie.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Wniesienia skargi do organu nadzorczego</strong> – Prezesa Urzędu Ochrony Danych Osobowych (UODO).
              </li>
            </ol>
            <p style={{ marginBottom: '8px', marginTop: '12px' }}>
              Aby skorzystać z powyższych praw, należy skontaktować się z Administratorem pod adresem: kontakt@pomocnikobywatela.pl.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              7. Pliki cookies
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Serwis używa plików cookies (ciasteczka) w celu zapewnienia prawidłowego działania strony, analizy ruchu oraz dostosowania treści.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Rodzaje cookies:</strong>
                <ul style={{ paddingLeft: '20px', marginTop: '8px' }}>
                  <li>Cookies niezbędne – zapewniają podstawowe funkcje Serwisu.</li>
                  <li>Cookies analityczne – umożliwiają analizę ruchu (np. Google Analytics).</li>
                  <li>Cookies marketingowe – służą do wyświetlania spersonalizowanych reklam (opcjonalnie).</li>
                </ul>
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik może w każdej chwili zmienić ustawienia cookies w przeglądarce lub usunąć pliki cookies. Ograniczenie stosowania cookies może wpłynąć na funkcjonalność Serwisu.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              8. Bezpieczeństwo danych
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Administrator stosuje odpowiednie środki techniczne i organizacyjne w celu ochrony danych osobowych przed nieautoryzowanym dostępem, utratą, zniszczeniem lub modyfikacją.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Połączenie z Serwisem jest szyfrowane za pomocą protokołu HTTPS (SSL/TLS).
              </li>
              <li style={{ marginBottom: '8px' }}>
                Dane dotyczące płatności są przetwarzane przez Stripe zgodnie z najwyższymi standardami bezpieczeństwa (PCI DSS).
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              9. Zmiany w Polityce Prywatności
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Administrator zastrzega sobie prawo do wprowadzania zmian w Polityce Prywatności.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Aktualna wersja Polityki Prywatności jest zawsze dostępna w Serwisie.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Zalecamy regularne przeglądanie treści Polityki Prywatności w celu bycia na bieżąco z wszelkimi zmianami.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              10. Kontakt
            </h3>
            <p style={{ marginBottom: '8px' }}>
              W razie pytań dotyczących przetwarzania danych osobowych lub niniejszej Polityki Prywatności, prosimy o kontakt:
            </p>
            <ul style={{ paddingLeft: '20px', marginTop: '12px' }}>
              <li style={{ marginBottom: '8px' }}>E-mail: kontakt@pomocnikobywatela.pl</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

import React from 'react';
import { FileText, X } from 'lucide-react';

const TermsOfService = ({ onClose }) => {
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
            <FileText size={28} color="#2c5aa0" />
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              margin: 0
            }}>
              Regulamin Serwisu
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
            Obowiązuje od: 12 grudnia 2025
          </p>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 1. Postanowienia ogólne
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Niniejszy Regulamin określa zasady korzystania z serwisu Pomocnik Obywatela dostępnego pod adresem https://pomocnikobywatela.pl/ (dalej: "Serwis").
              </li>
              <li style={{ marginBottom: '8px' }}>
                Serwis świadczy usługi asystenta AI dla obywateli oraz generowania dokumentów urzędowych online.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 2. Definicje
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                <strong>Użytkownik</strong> – każda osoba korzystająca z Serwisu, zarejestrowana lub niezarejestrowana.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Konto</strong> – indywidualne konto Użytkownika utworzone w Serwisie.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Asystent AI</strong> – funkcja czatu z asystentem opartym na sztucznej inteligencji.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Generator Pism</strong> – narzędzie do automatycznego generowania dokumentów urzędowych.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 3. Rejestracja i konto użytkownika
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Rejestracja w Serwisie jest dobrowolna, ale niezbędna do korzystania z pełnej funkcjonalności Asystenta AI.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Do utworzenia konta wymagane jest podanie adresu e-mail i utworzenie hasła.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik zobowiązuje się podać prawdziwe dane podczas rejestracji.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik ponosi odpowiedzialność za zachowanie poufności danych logowania.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Po rejestracji Użytkownik otrzymuje na podany adres e-mail wiadomość aktywacyjną. Konto zostaje aktywowane po kliknięciu w link aktywacyjny.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 4. Zasady korzystania z Asystenta AI
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Asystent AI służy do udzielania informacji o procedurach urzędowych, prawach obywatelskich i dostępnych świadczeniach.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Odpowiedzi Asystenta AI mają charakter <strong>informacyjny i pomocniczy</strong>. Nie stanowią porady prawnej ani wiążącej interpretacji przepisów.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik powinien weryfikować otrzymane informacje z oficjalnymi źródłami (strony urzędów, gov.pl).
              </li>
              <li style={{ marginBottom: '8px' }}>
                Administrator nie ponosi odpowiedzialności za decyzje podjęte przez Użytkownika na podstawie informacji uzyskanych od Asystenta AI.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Zabronione jest wykorzystywanie Asystenta AI w celach niezgodnych z prawem lub naruszających prawa osób trzecich.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 5. Generator Pism
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Generator Pism dostępny jest pod adresem https://pisma.pomocnikobywatela.pl/ i podlega odrębnemu regulaminowi.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Wygenerowane dokumenty mają charakter pomocniczy i wymagają weryfikacji przed wysłaniem do urzędu.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 6. Płatności i subskrypcje
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Podstawowe funkcje Serwisu (darmowy limit wiadomości) są dostępne bezpłatnie.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik może wykupić dodatkowe pakiety wiadomości lub subskrypcję.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Płatności są obsługiwane przez zewnętrzny system płatności Stripe.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Subskrypcje mogą być anulowane w dowolnym momencie przez Użytkownika w ustawieniach konta.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 7. Odpowiedzialność
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Serwis ma charakter <strong>informacyjny i wspierający</strong>. Administrator nie ponosi odpowiedzialności za decyzje podejmowane przez Użytkownika.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Administrator nie gwarantuje ciągłości działania Serwisu i może wprowadzać przerwy techniczne.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Administrator nie ponosi odpowiedzialności za błędy w odpowiedziach generowanych przez sztuczną inteligencję.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik korzysta z Serwisu na własną odpowiedzialność.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 8. Ochrona danych osobowych
            </h3>
            <p style={{ marginBottom: '8px' }}>
              Szczegółowe zasady przetwarzania danych osobowych określa <strong>Polityka Prywatności</strong> dostępna w Serwisie.
            </p>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 9. Postanowienia końcowe
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Administrator zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodzą w życie z chwilą opublikowania w Serwisie.
              </li>
              <li style={{ marginBottom: '8px' }}>
                W sprawach nieuregulowanych w Regulaminie zastosowanie mają przepisy prawa polskiego.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Kontakt z Administratorem: kontakt@pomocnikobywatela.pl.
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

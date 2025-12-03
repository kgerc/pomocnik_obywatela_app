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
            Obowiązuje od: 3 grudnia 2024
          </p>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 1. Postanowienia ogólne
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Niniejszy Regulamin określa zasady korzystania z serwisu Generator Pism AI dostępnego pod adresem [adres strony] (dalej: "Serwis").
              </li>
              <li style={{ marginBottom: '8px' }}>
                Właścicielem i administratorem Serwisu jest [Nazwa firmy/osoby], adres: [adres], NIP: [NIP], e-mail: [e-mail].
              </li>
              <li style={{ marginBottom: '8px' }}>
                Serwis świadczy usługi generowania dokumentów urzędowych za pomocą technologii sztucznej inteligencji.
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
                <strong>Użytkownik</strong> – każda osoba korzystająca z Serwisu.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Dokument</strong> – wygenerowane przez Serwis pismo urzędowe w formacie PDF lub DOCX.
              </li>
              <li style={{ marginBottom: '8px' }}>
                <strong>Transakcja</strong> – płatność za odblokowanie i pobranie wygenerowanego Dokumentu.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 3. Zasady korzystania z Serwisu
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Serwis nie wymaga rejestracji. Użytkownik może generować dokumenty bez konieczności zakładania konta.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik wybiera typ pisma, uzupełnia formularz danymi, a Serwis generuje dokument przy użyciu sztucznej inteligencji.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Wygenerowany dokument jest wyświetlany w formie podglądu. Pełny dostęp do dokumentu (pobieranie w formacie PDF i DOCX) wymaga dokonania płatności.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik ponosi pełną odpowiedzialność za treści wprowadzane do formularzy oraz za wykorzystanie wygenerowanych dokumentów.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Zabronione jest używanie Serwisu w celach niezgodnych z prawem lub w sposób naruszający prawa osób trzecich.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 4. Płatności
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Cena za jeden dokument wynosi 2 zł brutto (słownie: dwa złote).
              </li>
              <li style={{ marginBottom: '8px' }}>
                Płatności są obsługiwane przez zewnętrzny system płatności Stripe. Administrator nie przechowuje danych karty płatniczej Użytkownika.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Po dokonaniu płatności Użytkownik otrzymuje natychmiastowy dostęp do pełnej wersji dokumentu.
              </li>
              <li style={{ marginBottom: '8px' }}>
                W przypadku problemów z płatnością należy skontaktować się z Administratorem pod adresem [e-mail kontaktowy].
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 5. Prawo odstąpienia od umowy i reklamacje
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Zgodnie z art. 38 pkt 13 ustawy o prawach konsumenta, prawo odstąpienia od umowy nie przysługuje w przypadku dostarczania treści cyfrowych, które nie są zapisane na nośniku materialnym, jeżeli spełnianie świadczenia rozpoczęło się za wyraźną zgodą konsumenta przed upływem terminu do odstąpienia od umowy.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Poprzez dokonanie płatności Użytkownik wyraża zgodę na natychmiastowe wykonanie usługi i traci prawo do odstąpienia od umowy.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik ma prawo złożyć reklamację dotyczącą świadczonych usług w terminie 14 dni od dnia zakupu dokumentu, przesyłając wiadomość e-mail na adres: [e-mail kontaktowy].
              </li>
              <li style={{ marginBottom: '8px' }}>
                Administrator rozpatrzy reklamację w terminie do 14 dni roboczych od jej otrzymania.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 6. Odpowiedzialność
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Dokumenty generowane przez Serwis mają charakter pomocniczy. Administrator nie ponosi odpowiedzialności za skutki prawne używania wygenerowanych dokumentów.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik powinien przed wykorzystaniem dokumentu skonsultować jego treść z profesjonalnym doradcą prawnym lub organem, do którego dokument jest kierowany.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Administrator nie gwarantuje, że wygenerowane dokumenty będą w pełni odpowiadać indywidualnej sytuacji Użytkownika lub będą akceptowane przez organy administracji publicznej.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Administrator nie ponosi odpowiedzialności za błędy wynikające z nieprawidłowego lub niekompletnego wypełnienia formularzy przez Użytkownika.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Administrator dokłada wszelkich starań, aby Serwis działał bez przerw, jednak nie gwarantuje ciągłości dostępu i nie ponosi odpowiedzialności za przerwy techniczne.
              </li>
            </ol>
          </section>

          <section style={{ marginBottom: '30px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: '#2c5aa0' }}>
              § 7. Własność intelektualna
            </h3>
            <ol style={{ paddingLeft: '20px', marginBottom: '10px' }}>
              <li style={{ marginBottom: '8px' }}>
                Wszystkie elementy Serwisu, w tym szablony dokumentów, układ graficzny, kod źródłowy, są chronione prawem autorskim i stanowią własność Administratora.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Użytkownik nabywa prawo do korzystania z wygenerowanego dokumentu wyłącznie na własny użytek.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Zabronione jest kopiowanie, modyfikowanie, rozpowszechnianie elementów Serwisu bez zgody Administratora.
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
                Administrator zastrzega sobie prawo do zmiany Regulaminu. Zmiany wchodzą w życie z chwilą opublikowania nowej wersji Regulaminu w Serwisie.
              </li>
              <li style={{ marginBottom: '8px' }}>
                W sprawach nieuregulowanych w niniejszym Regulaminie zastosowanie mają przepisy prawa polskiego, w szczególności Kodeksu Cywilnego oraz ustawy o prawach konsumenta.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Spory wynikające z korzystania z Serwisu będą rozstrzygane przez sąd właściwy dla siedziby Administratora.
              </li>
              <li style={{ marginBottom: '8px' }}>
                Kontakt z Administratorem: [e-mail kontaktowy], [numer telefonu].
              </li>
            </ol>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

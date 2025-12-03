// Pisma biznesowe i dla firm

export const pismaBiznesowe = [
  {
    id: 'odpowiedz_zapytanie_ofertowe',
    nazwa: 'Odpowiedź na zapytanie ofertowe',
    kategoria: 'Biznes',
    opis: 'Odpowiedź na zapytanie o ofertę dla klienta biznesowego',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'nazwa_klienta', label: 'Nazwa firmy klienta', placeholder: 'np. XYZ Corp.', type: 'text' },
      { id: 'produkt_usluga', label: 'Czego dotyczy oferta?', placeholder: 'np. wdrożenie systemu ERP, usługi marketingowe', type: 'text' },
      { id: 'zakres', label: 'Zakres oferty', placeholder: 'Opisz co zawiera oferta', type: 'textarea' },
      { id: 'cena', label: 'Cena (zł)', placeholder: 'np. 50000', type: 'text' },
      { id: 'termin_realizacji', label: 'Termin realizacji', placeholder: 'np. 3 miesiące od podpisania umowy', type: 'text' },
      { id: 'waznosc_oferty', label: 'Ważność oferty', placeholder: 'np. 30 dni', type: 'text' }
    ]
  },
  {
    id: 'wycena_uslug',
    nazwa: 'Wycena usług',
    kategoria: 'Biznes',
    opis: 'Wycena usług dla potencjalnego klienta',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'nazwa_klienta', label: 'Nazwa/imię klienta', placeholder: 'np. Jan Kowalski lub Firma XYZ', type: 'text' },
      { id: 'usluga', label: 'Rodzaj usługi', placeholder: 'np. strona internetowa, konsultacje IT, projekt graficzny', type: 'text' },
      { id: 'zakres_uslug', label: 'Szczegółowy zakres usług', placeholder: 'Opisz co będzie wykonane', type: 'textarea' },
      { id: 'cena_netto', label: 'Cena netto (zł)', placeholder: 'np. 10000', type: 'text' },
      { id: 'termin_platnosci', label: 'Termin płatności', placeholder: 'np. 14 dni od wystawienia faktury', type: 'text' }
    ]
  },
  {
    id: 'prosba_faktura_korygujaca',
    nazwa: 'Prośba o wystawienie faktury korygującej',
    kategoria: 'Biznes',
    opis: 'Żądanie korekty błędnej faktury',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'nazwa_wystawcy', label: 'Nazwa firmy wystawiającej fakturę', placeholder: 'np. Dostawca XYZ', type: 'text' },
      { id: 'numer_faktury', label: 'Numer faktury', placeholder: 'np. FV/2025/123', type: 'text' },
      { id: 'data_wystawienia', label: 'Data wystawienia faktury', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'opis_bledu', label: 'Opis błędu', placeholder: 'Opisz co jest błędne (kwota, NIP, nazwa produktu)', type: 'textarea' },
      { id: 'poprawne_dane', label: 'Poprawne dane', placeholder: 'Podaj prawidłowe informacje', type: 'textarea' }
    ]
  },
  {
    id: 'zgloszenie_bledu_faktura',
    nazwa: 'Zgłoszenie błędu w fakturze',
    kategoria: 'Biznes',
    opis: 'Zgłoszenie nieprawidłowości w otrzymanej fakturze',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'nazwa_wystawcy', label: 'Nazwa firmy wystawiającej fakturę', placeholder: 'np. Dostawca XYZ', type: 'text' },
      { id: 'numer_faktury', label: 'Numer faktury', placeholder: 'np. FV/2025/123', type: 'text' },
      { id: 'kwota_faktury', label: 'Kwota na fakturze (zł)', placeholder: 'np. 5000', type: 'text' },
      { id: 'rodzaj_bledu', label: 'Rodzaj błędu', placeholder: 'np. błędna kwota, błędne dane, podwójna faktura', type: 'text' },
      { id: 'opis_bledu', label: 'Szczegółowy opis', placeholder: 'Opisz dokładnie co jest nie tak', type: 'textarea' }
    ]
  },
  {
    id: 'wezwanie_zaplaty_soft',
    nazwa: 'Wezwanie do zapłaty (uprzejme)',
    kategoria: 'Biznes',
    opis: 'Uprzejme przypomnienie o zaległej płatności',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'nazwa_dluznika', label: 'Nazwa dłużnika', placeholder: 'np. Firma XYZ lub Jan Kowalski', type: 'text' },
      { id: 'numer_faktury', label: 'Numer faktury', placeholder: 'np. FV/2025/123', type: 'text' },
      { id: 'kwota', label: 'Kwota do zapłaty (zł)', placeholder: 'np. 5000', type: 'text' },
      { id: 'termin_platnosci', label: 'Termin płatności', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'dni_opoznienia', label: 'Ile dni opóźnienia?', placeholder: 'np. 14 dni', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do wpłaty', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  },
  {
    id: 'wezwanie_zaplaty_hard',
    nazwa: 'Wezwanie do zapłaty (stanowcze)',
    kategoria: 'Biznes',
    opis: 'Stanowcze wezwanie do zapłaty z ostrzeżeniem',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'nazwa_dluznika', label: 'Nazwa dłużnika', placeholder: 'np. Firma XYZ lub Jan Kowalski', type: 'text' },
      { id: 'numer_faktury', label: 'Numer faktury', placeholder: 'np. FV/2025/123', type: 'text' },
      { id: 'kwota', label: 'Kwota do zapłaty (zł)', placeholder: 'np. 5000', type: 'text' },
      { id: 'termin_platnosci', label: 'Pierwotny termin płatności', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'dni_opoznienia', label: 'Ile dni opóźnienia?', placeholder: 'np. 30 dni', type: 'text' },
      { id: 'odsetki', label: 'Odsetki do zapłaty (zł) - opcjonalnie', placeholder: 'np. 500', type: 'text' },
      { id: 'termin_ostateczny', label: 'Termin ostateczny do zapłaty', placeholder: 'np. 7 dni od otrzymania pisma', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do wpłaty', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  },
  {
    id: 'wezwanie_zaplaty_final',
    nazwa: 'Wezwanie do zapłaty (ostateczne)',
    kategoria: 'Biznes',
    opis: 'Ostateczne wezwanie przed działaniami prawnymi',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'nazwa_dluznika', label: 'Nazwa dłużnika', placeholder: 'np. Firma XYZ lub Jan Kowalski', type: 'text' },
      { id: 'numer_faktury', label: 'Numer faktury', placeholder: 'np. FV/2025/123', type: 'text' },
      { id: 'kwota_glowna', label: 'Kwota główna (zł)', placeholder: 'np. 5000', type: 'text' },
      { id: 'odsetki', label: 'Odsetki (zł)', placeholder: 'np. 800', type: 'text' },
      { id: 'koszty', label: 'Koszty dodatkowe (zł) - opcjonalnie', placeholder: 'np. 200', type: 'text' },
      { id: 'kwota_laczna', label: 'Kwota łączna do zapłaty (zł)', placeholder: 'np. 6000', type: 'text' },
      { id: 'termin_ostateczny', label: 'Termin ostateczny', placeholder: 'np. 3 dni od otrzymania pisma', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do wpłaty', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  },
  {
    id: 'potwierdzenie_wykonania_uslugi',
    nazwa: 'Potwierdzenie wykonania usługi',
    kategoria: 'Biznes',
    opis: 'Protokół odbioru lub potwierdzenie realizacji usługi',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy (wykonawca)', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'nazwa_klienta', label: 'Nazwa klienta (zamawiający)', placeholder: 'np. Firma XYZ', type: 'text' },
      { id: 'numer_umowy', label: 'Numer umowy (jeśli jest)', placeholder: 'np. UM/2025/123', type: 'text' },
      { id: 'rodzaj_uslugi', label: 'Rodzaj wykonanej usługi', placeholder: 'np. wdrożenie systemu, projekt strony, konsultacje', type: 'text' },
      { id: 'data_wykonania', label: 'Data zakończenia', placeholder: 'np. 20.01.2025', type: 'text' },
      { id: 'zakres_wykonania', label: 'Zakres wykonanych prac', placeholder: 'Opisz co zostało zrobione', type: 'textarea' }
    ]
  },
  {
    id: 'umowa_nda',
    nazwa: 'Umowa NDA (poufności)',
    kategoria: 'Biznes',
    opis: 'Umowa o zachowaniu poufności dopasowana do branży',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'nazwa_drugiej_strony', label: 'Nazwa drugiej strony', placeholder: 'np. Firma XYZ lub Jan Kowalski', type: 'text' },
      { id: 'branza', label: 'Branża/obszar współpracy', placeholder: 'np. IT, marketing, produkcja', type: 'text' },
      { id: 'zakres_informacji', label: 'Zakres informacji poufnych', placeholder: 'Opisz czego dotyczy NDA (know-how, dane klientów, strategia)', type: 'textarea' },
      { id: 'okres_obowiazywania', label: 'Okres obowiązywania (lata)', placeholder: 'np. 3 lata', type: 'text' }
    ]
  },
  {
    id: 'zgloszenie_rodo_klient',
    nazwa: 'Zgłoszenie RODO dla klienta',
    kategoria: 'Biznes',
    opis: 'Odpowiedź na żądanie RODO od klienta (dostęp do danych, usunięcie)',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'imie_nazwisko_klienta', label: 'Imię i nazwisko klienta', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'email_klienta', label: 'Email klienta', placeholder: 'np. jan.kowalski@example.com', type: 'text' },
      { id: 'rodzaj_zadania', label: 'Rodzaj żądania RODO', placeholder: 'np. dostęp do danych, usunięcie danych, sprostowanie', type: 'text' },
      { id: 'data_zadania', label: 'Data otrzymania żądania', placeholder: 'np. 15.01.2025', type: 'text' }
    ]
  },
  {
    id: 'wniosek_wykreslenie_ceidg',
    nazwa: 'Wniosek o wykreślenie z CEIDG',
    kategoria: 'Biznes',
    opis: 'Wniosek o wykreślenie działalności gospodarczej z CEIDG',
    pytania: [
      { id: 'nazwa_organu', label: 'Urząd Gminy/Miasta', placeholder: 'np. Urząd Miasta Warszawy', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Marszałkowska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto urzędu', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. Jan Kowalski prowadzący działalność gospodarczą', type: 'text' },
      { id: 'nip', label: 'NIP', placeholder: 'np. 1234567890', type: 'text' },
      { id: 'regon', label: 'REGON', placeholder: 'np. 123456789', type: 'text' },
      { id: 'data_rozpoczecia', label: 'Data rozpoczęcia działalności', placeholder: 'np. 01.01.2020', type: 'text' },
      { id: 'data_zakonczenia', label: 'Data zakończenia działalności', placeholder: 'np. 31.12.2024', type: 'text' },
      { id: 'powod_likwidacji', label: 'Powód likwidacji', placeholder: 'np. zakończenie działalności, przejście na umowę o pracę', type: 'textarea' }
    ]
  },
  {
    id: 'oswiadczenie_wykreslenie_vat',
    nazwa: 'Oświadczenie o wykreśleniu z VAT',
    kategoria: 'Biznes',
    opis: 'Oświadczenie o rezygnacji z VAT przy zamknięciu działalności',
    pytania: [
      { id: 'nazwa_organu', label: 'Urząd Skarbowy', placeholder: 'np. Urząd Skarbowy Warszawa-Śródmieście', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Marszałkowska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. Jan Kowalski prowadzący działalność gospodarczą', type: 'text' },
      { id: 'nip', label: 'NIP', placeholder: 'np. 1234567890', type: 'text' },
      { id: 'data_rejestracji_vat', label: 'Data rejestracji jako podatnik VAT', placeholder: 'np. 01.01.2020', type: 'text' },
      { id: 'data_wykreslenia', label: 'Data wykreślenia z działalności', placeholder: 'np. 31.12.2024', type: 'text' },
      { id: 'ostatnia_deklaracja', label: 'Czy złożono ostatnią deklarację VAT?', placeholder: 'tak/nie, podaj za jaki okres', type: 'text' }
    ]
  },
  {
    id: 'wniosek_zwrot_nadplaty_zus',
    nazwa: 'Wniosek o zwrot nadpłaty składek ZUS',
    kategoria: 'Biznes',
    opis: 'Wniosek o zwrot nadpłaconych składek po zakończeniu działalności',
    pytania: [
      { id: 'nazwa_organu', label: 'Oddział ZUS', placeholder: 'np. Zakład Ubezpieczeń Społecznych Oddział w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Czerniakowska 16', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-701 Warszawa', type: 'text' },
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. Jan Kowalski prowadzący działalność gospodarczą', type: 'text' },
      { id: 'nip', label: 'NIP', placeholder: 'np. 1234567890', type: 'text' },
      { id: 'numer_zus', label: 'Numer ZUS', placeholder: 'np. 12345678901', type: 'text' },
      { id: 'kwota_nadplaty', label: 'Kwota nadpłaty (zł)', placeholder: 'np. 2000', type: 'text' },
      { id: 'okres_nadplaty', label: 'Za jaki okres nadpłata?', placeholder: 'np. styczeń-grudzień 2024', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do zwrotu', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  },
  {
    id: 'zgloszenie_wyrejestrowanie_zus',
    nazwa: 'Zgłoszenie wyrejestrowania z ZUS',
    kategoria: 'Biznes',
    opis: 'Zgłoszenie zaprzestania opłacania składek ZUS po zamknięciu firmy',
    pytania: [
      { id: 'nazwa_organu', label: 'Oddział ZUS', placeholder: 'np. Zakład Ubezpieczeń Społecznych Oddział w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Czerniakowska 16', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-701 Warszawa', type: 'text' },
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. Jan Kowalski prowadzący działalność gospodarczą', type: 'text' },
      { id: 'nip', label: 'NIP', placeholder: 'np. 1234567890', type: 'text' },
      { id: 'numer_zus', label: 'Numer ZUS', placeholder: 'np. 12345678901', type: 'text' },
      { id: 'data_zakonczenia', label: 'Data zakończenia działalności', placeholder: 'np. 31.12.2024', type: 'text' },
      { id: 'ostatnie_skladki', label: 'Za jaki okres opłacono ostatnie składki?', placeholder: 'np. grudzień 2024', type: 'text' }
    ]
  },
  {
    id: 'powiadomienie_kontrahentow_likwidacja',
    nazwa: 'Powiadomienie kontrahentów o likwidacji',
    kategoria: 'Biznes',
    opis: 'Oficjalne pismo informujące klientów/dostawców o zamknięciu firmy',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Solutions Sp. z o.o.', type: 'text' },
      { id: 'data_zakonczenia', label: 'Data zakończenia działalności', placeholder: 'np. 31.12.2024', type: 'text' },
      { id: 'powod_ogolny', label: 'Powód zakończenia (opcjonalnie)', placeholder: 'np. emerytura, zmiana branży, restrukturyzacja', type: 'text' },
      { id: 'rozliczenia_info', label: 'Informacje o rozliczeniach', placeholder: 'np. wszystkie faktury zostaną rozliczone do 31.01.2025', type: 'textarea' },
      { id: 'kontakt_awaryjny', label: 'Kontakt po zakończeniu działalności', placeholder: 'np. email lub telefon do kontaktu w razie pilnych spraw', type: 'text' }
    ]
  },
  {
    id: 'oswiadczenie_rozliczenie_ostateczne',
    nazwa: 'Oświadczenie o ostatecznym rozliczeniu działalności',
    kategoria: 'Biznes',
    opis: 'Dokument potwierdzający rozliczenie wszystkich zobowiązań',
    pytania: [
      { id: 'nazwa_organu', label: 'Instytucja (urząd, bank, kontrahent)', placeholder: 'np. Urząd Skarbowy, Bank XYZ', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Marszałkowska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. Jan Kowalski prowadzący działalność gospodarczą', type: 'text' },
      { id: 'nip', label: 'NIP', placeholder: 'np. 1234567890', type: 'text' },
      { id: 'data_zakonczenia', label: 'Data zakończenia działalności', placeholder: 'np. 31.12.2024', type: 'text' },
      { id: 'potwierdzenie_oplat', label: 'Potwierdzenie zapłaty zobowiązań', placeholder: 'np. wszystkie faktury opłacone, brak zadłużeń', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_zamkniecie_rachunku_firmowego',
    nazwa: 'Wniosek o zamknięcie rachunku firmowego',
    kategoria: 'Biznes',
    opis: 'Wniosek do banku o zamknięcie konta firmowego',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa banku', placeholder: 'np. Bank PKO BP S.A.', type: 'text' },
      { id: 'ulica_organu', label: 'Adres oddziału', placeholder: 'np. ul. Marszałkowska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. Jan Kowalski prowadzący działalność gospodarczą', type: 'text' },
      { id: 'nip', label: 'NIP', placeholder: 'np. 1234567890', type: 'text' },
      { id: 'numer_rachunku', label: 'Numer rachunku do zamknięcia', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' },
      { id: 'data_zakonczenia', label: 'Data zakończenia działalności', placeholder: 'np. 31.12.2024', type: 'text' },
      { id: 'rachunek_prywatny', label: 'Numer rachunku prywatnego do przelewu salda', placeholder: 'np. 98 7654 3210 9876 5432 1098 7654', type: 'text' }
    ]
  },
  {
    id: 'pismo_do_urzedu_pracy_likwidacja',
    nazwa: 'Zgłoszenie likwidacji stanowiska do Urzędu Pracy',
    kategoria: 'Biznes',
    opis: 'Zgłoszenie zakończenia działalności do Powiatowego Urzędu Pracy',
    pytania: [
      { id: 'nazwa_organu', label: 'Powiatowy Urząd Pracy', placeholder: 'np. Powiatowy Urząd Pracy w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Młynarska 16', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 01-205 Warszawa', type: 'text' },
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. Jan Kowalski prowadzący działalność gospodarczą', type: 'text' },
      { id: 'nip', label: 'NIP', placeholder: 'np. 1234567890', type: 'text' },
      { id: 'regon', label: 'REGON', placeholder: 'np. 123456789', type: 'text' },
      { id: 'data_zakonczenia', label: 'Data zakończenia działalności', placeholder: 'np. 31.12.2024', type: 'text' },
      { id: 'czy_pracownicy', label: 'Czy były zatrudnione osoby?', placeholder: 'nie/tak - jeśli tak, podaj szczegóły zwolnień', type: 'textarea' }
    ]
  }
];

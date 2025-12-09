// Pisma związane z pracą i zatrudnieniem

export const pismaPraca = [
  {
    id: 'prosba_urlop',
    nazwa: 'Prośba o urlop',
    kategoria: 'Praca',
    opis: 'Wniosek urlopowy dla pracodawcy',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. ABC Sp. z o.o.', type: 'text' },
      { id: 'stanowisko', label: 'Twoje stanowisko', placeholder: 'np. Specjalista ds. IT', type: 'text' },
      { id: 'rodzaj_urlopu', label: 'Rodzaj urlopu', placeholder: 'np. wypoczynkowy, bezpłatny, okolicznościowy', type: 'text' },
      { id: 'data_od', label: 'Data rozpoczęcia urlopu', placeholder: 'np. 01.02.2025', type: 'text' },
      { id: 'data_do', label: 'Data zakończenia urlopu', placeholder: 'np. 14.02.2025', type: 'text' },
      { id: 'liczba_dni', label: 'Liczba dni urlopu', placeholder: 'np. 10 dni', type: 'text' }
    ]
  },
  {
    id: 'zgloszenie_opieka_dziecko',
    nazwa: 'Zgłoszenie opieki nad dzieckiem',
    kategoria: 'Praca',
    opis: 'Zgłoszenie konieczności opieki nad dzieckiem (zwolnienie)',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. ABC Sp. z o.o.', type: 'text' },
      { id: 'stanowisko', label: 'Twoje stanowisko', placeholder: 'np. Specjalista ds. IT', type: 'text' },
      { id: 'imie_dziecka', label: 'Imię dziecka', placeholder: 'np. Jan', type: 'text' },
      { id: 'wiek_dziecka', label: 'Wiek dziecka', placeholder: 'np. 8 lat', type: 'text' },
      { id: 'okres_opieki', label: 'Okres opieki', placeholder: 'np. 20-24.01.2025', type: 'text' },
      { id: 'powod', label: 'Powód (choroba, zamknięcie szkoły)', placeholder: 'np. choroba dziecka, zamknięcie przedszkola', type: 'text' }
    ]
  },
  {
    id: 'zgloszenie_pracy_zdalnej',
    nazwa: 'Zgłoszenie pracy zdalnej "na żądanie"',
    kategoria: 'Praca',
    opis: 'Wniosek o pracę zdalną (okazjonalnie lub stale)',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. ABC Sp. z o.o.', type: 'text' },
      { id: 'stanowisko', label: 'Twoje stanowisko', placeholder: 'np. Specjalista ds. IT', type: 'text' },
      { id: 'data_od', label: 'Od kiedy praca zdalna?', placeholder: 'np. 25.01.2025', type: 'text' },
      { id: 'data_do', label: 'Do kiedy? (jeśli okazjonalnie)', placeholder: 'np. 25.01.2025 lub "na stałe"', type: 'text' },
      { id: 'powod', label: 'Powód', placeholder: 'np. opieka nad dzieckiem, remont w domu, oszczędność czasu', type: 'textarea' }
    ]
  },
  {
    id: 'zgloszenie_nieobecnosci_praca',
    nazwa: 'Zgłoszenie nieobecności w pracy',
    kategoria: 'Praca',
    opis: 'Zawiadomienie o nieobecności (choroba, nagły wypadek)',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. ABC Sp. z o.o.', type: 'text' },
      { id: 'stanowisko', label: 'Twoje stanowisko', placeholder: 'np. Specjalista ds. IT', type: 'text' },
      { id: 'data_nieobecnosci', label: 'Data/okres nieobecności', placeholder: 'np. 20-22.01.2025', type: 'text' },
      { id: 'powod', label: 'Powód nieobecności', placeholder: 'np. choroba, pilna sprawa rodzinna', type: 'text' },
      { id: 'czy_zwolnienie', label: 'Czy załączono zwolnienie lekarskie?', placeholder: 'tak/nie', type: 'text' }
    ]
  },
  {
    id: 'prosba_zaswiadczenie_zarobki',
    nazwa: 'Prośba o zaświadczenie o zarobkach',
    kategoria: 'Praca',
    opis: 'Wniosek do pracodawcy o zaświadczenie o dochodach',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. ABC Sp. z o.o.', type: 'text' },
      { id: 'stanowisko', label: 'Twoje stanowisko', placeholder: 'np. Specjalista ds. IT', type: 'text' },
      { id: 'cel', label: 'Cel wystawienia zaświadczenia', placeholder: 'np. kredyt hipoteczny, wniosek o dofinansowanie', type: 'text' },
      { id: 'okres', label: 'Za jaki okres?', placeholder: 'np. ostatnie 12 miesięcy, rok 2024', type: 'text' }
    ]
  },
  {
    id: 'wypowiedzenie_umowy_pracownik',
    nazwa: 'Pismo w sprawie wypowiedzenia umowy (pracownik)',
    kategoria: 'Praca',
    opis: 'Wypowiedzenie umowy o pracę przez pracownika',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. ABC Sp. z o.o.', type: 'text' },
      { id: 'stanowisko', label: 'Twoje stanowisko', placeholder: 'np. Specjalista ds. IT', type: 'text' },
      { id: 'rodzaj_umowy', label: 'Rodzaj umowy', placeholder: 'np. umowa o pracę na czas nieokreślony', type: 'text' },
      { id: 'okres_wypowiedzenia', label: 'Okres wypowiedzenia', placeholder: 'np. 1 miesiąc, 3 miesiące', type: 'text' },
      { id: 'data_rozwiazania', label: 'Data rozwiązania umowy', placeholder: 'np. 28.02.2025', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie (opcjonalnie)', placeholder: 'Możesz podać powód lub zostawić puste', type: 'textarea' }
    ]
  },
  {
    id: 'prosba_podwyzka',
    nazwa: 'Pismo w sprawie podwyżki',
    kategoria: 'Praca',
    opis: 'Wniosek o podwyżkę wynagrodzenia',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. ABC Sp. z o.o.', type: 'text' },
      { id: 'stanowisko', label: 'Twoje stanowisko', placeholder: 'np. Specjalista ds. IT', type: 'text' },
      { id: 'obecne_wynagrodzenie', label: 'Obecne wynagrodzenie (brutto)', placeholder: 'np. 6000 zł', type: 'text' },
      { id: 'oczekiwane_wynagrodzenie', label: 'Oczekiwane wynagrodzenie (brutto)', placeholder: 'np. 7500 zł', type: 'text' },
      { id: 'od_kiedy', label: 'Od kiedy oczekujesz podwyżki?', placeholder: 'np. od 01.03.2025', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie', placeholder: 'Opisz swoje osiągnięcia, nowe obowiązki, wyniki', type: 'textarea' }
    ]
  },
  {
    id: 'wypowiedzenie_umowy_pracodawca',
    nazwa: 'Pismo o rozwiązanie umowy o pracę przez pracodawcę',
    kategoria: 'Praca',
    opis: 'Wypowiedzenie umowy o pracę przez pracodawcę (dla pracodawców)',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa Twojej firmy', placeholder: 'np. ABC Sp. z o.o.', type: 'text' },
      { id: 'imie_nazwisko_pracownika', label: 'Imię i nazwisko pracownika', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'stanowisko', label: 'Stanowisko pracownika', placeholder: 'np. Specjalista ds. sprzedaży', type: 'text' },
      { id: 'rodzaj_umowy', label: 'Rodzaj umowy', placeholder: 'np. umowa o pracę na czas nieokreślony', type: 'text' },
      { id: 'okres_wypowiedzenia', label: 'Okres wypowiedzenia', placeholder: 'np. 1 miesiąc, 3 miesiące', type: 'text' },
      { id: 'data_rozwiazania', label: 'Data rozwiązania umowy', placeholder: 'np. 31.03.2025', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie wypowiedzenia', placeholder: 'Podaj powody rozwiązania umowy', type: 'textarea' }
    ]
  },
  {
    id: 'urlop_na_zadanie',
    nazwa: 'Wniosek o urlop na żądanie',
    kategoria: 'Praca',
    opis: 'Szybki wniosek o urlop na żądanie (4 dni w roku)',
    pytania: [
      { id: 'nazwa_firmy', label: 'Nazwa firmy', placeholder: 'np. ABC Sp. z o.o.', type: 'text' },
      { id: 'stanowisko', label: 'Twoje stanowisko', placeholder: 'np. Specjalista ds. IT', type: 'text' },
      { id: 'data_urlopu', label: 'Data urlopu na żądanie', placeholder: 'np. 25.01.2025', type: 'text' },
      { id: 'liczba_dni', label: 'Liczba dni', placeholder: 'np. 1 dzień', type: 'text' }
    ]
  }
];

// Pisma związane z mieszkaniem i wspólnotą mieszkaniową

export const pismaMieszkanie = [
  {
    id: 'zgloszenie_usterki',
    nazwa: 'Zgłoszenie usterki w mieszkaniu',
    kategoria: 'Mieszkanie',
    opis: 'Zgłoszenie awarii lub usterki do właściciela/zarządcy',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15/3, Warszawa', type: 'text' },
      { id: 'zarzadca', label: 'Nazwa zarządcy/właściciela', placeholder: 'np. Wspólnota Mieszkaniowa, ABC Zarządzanie', type: 'text' },
      { id: 'rodzaj_usterki', label: 'Rodzaj usterki', placeholder: 'np. przeciek, awaria ogrzewania, uszkodzona instalacja', type: 'text' },
      { id: 'data_wystapienia', label: 'Data wystąpienia usterki', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'opis_usterki', label: 'Szczegółowy opis', placeholder: 'Opisz dokładnie co się dzieje', type: 'textarea' }
    ]
  },
  {
    id: 'zgloszenie_halasu',
    nazwa: 'Zgłoszenie hałasu od sąsiadów',
    kategoria: 'Mieszkanie',
    opis: 'Zgłoszenie uciążliwego hałasu do zarządcy lub wspólnoty',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15/3, Warszawa', type: 'text' },
      { id: 'zarzadca', label: 'Nazwa zarządcy/wspólnoty', placeholder: 'np. Wspólnota Mieszkaniowa', type: 'text' },
      { id: 'mieszkanie_sasiadow', label: 'Numer mieszkania sąsiadów (jeśli znany)', placeholder: 'np. 14', type: 'text' },
      { id: 'rodzaj_halasu', label: 'Rodzaj hałasu', placeholder: 'np. głośna muzyka, tupanie, głośne rozmowy', type: 'text' },
      { id: 'kiedy_wystepuje', label: 'Kiedy występuje hałas?', placeholder: 'np. codziennie po godz. 22:00, w weekendy', type: 'textarea' },
      { id: 'czas_trwania', label: 'Od kiedy trwa problem?', placeholder: 'np. od 3 miesięcy, od grudnia 2024', type: 'text' }
    ]
  },
  {
    id: 'obnizenie_czynszu',
    nazwa: 'Wniosek o obniżenie czynszu za niedogodności',
    kategoria: 'Mieszkanie',
    opis: 'Prośba o zmniejszenie czynszu z powodu usterek lub remontu',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15/3, Warszawa', type: 'text' },
      { id: 'zarzadca', label: 'Nazwa zarządcy/właściciela', placeholder: 'np. Wspólnota Mieszkaniowa, Jan Kowalski', type: 'text' },
      { id: 'obecny_czynsz', label: 'Obecna wysokość czynszu (zł)', placeholder: 'np. 1200', type: 'text' },
      { id: 'rodzaj_niedogodnosci', label: 'Rodzaj niedogodności', placeholder: 'np. brak ogrzewania, remont klatki schodowej, awaria windy', type: 'text' },
      { id: 'okres_trwania', label: 'Okres trwania niedogodności', placeholder: 'np. od 01.01.2025 do chwili obecnej', type: 'text' },
      { id: 'proponowana_kwota', label: 'Proponowane obniżenie (zł lub %)', placeholder: 'np. 300 zł lub 25%', type: 'text' }
    ]
  },
  {
    id: 'prosba_swiatlo_monitoring',
    nazwa: 'Prośba o instalację światła/monitoringu',
    kategoria: 'Mieszkanie',
    opis: 'Wniosek do wspólnoty o montaż oświetlenia lub kamer',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15, Warszawa', type: 'text' },
      { id: 'zarzadca', label: 'Nazwa zarządcy/wspólnoty', placeholder: 'np. Wspólnota Mieszkaniowa', type: 'text' },
      { id: 'co_zainstalowac', label: 'Co ma być zainstalowane?', placeholder: 'np. oświetlenie LED na klatce, monitoring, domofon', type: 'text' },
      { id: 'miejsce', label: 'Gdzie ma być zainstalowane?', placeholder: 'np. klatka schodowa, parking, wejście do budynku', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie', placeholder: 'Wyjaśnij dlaczego jest to potrzebne', type: 'textarea' }
    ]
  },
  {
    id: 'nieprawidlowosci_wspolnota',
    nazwa: 'Zgłoszenie nieprawidłowości we wspólnocie',
    kategoria: 'Mieszkanie',
    opis: 'Zgłoszenie nieprawidłowości w zarządzaniu wspólnotą',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15, Warszawa', type: 'text' },
      { id: 'zarzadca', label: 'Nazwa zarządcy/wspólnoty', placeholder: 'np. ABC Zarządzanie', type: 'text' },
      { id: 'rodzaj_nieprawidlowosci', label: 'Rodzaj nieprawidłowości', placeholder: 'np. brak rozliczenia, zawyżone rachunki, brak dokumentacji', type: 'text' },
      { id: 'opis_sytuacji', label: 'Szczegółowy opis sytuacji', placeholder: 'Opisz dokładnie czym problem', type: 'textarea' },
      { id: 'roszczenie', label: 'Czego oczekujesz?', placeholder: 'np. wyjaśnienia, rozliczenia, zmiany zarządcy', type: 'textarea' }
    ]
  },
  {
    id: 'zgloszenie_zalania',
    nazwa: 'Zgłoszenie zalania mieszkania',
    kategoria: 'Mieszkanie',
    opis: 'Zgłoszenie zalania od sąsiadów lub z instalacji budynku',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15/3, Warszawa', type: 'text' },
      { id: 'zarzadca', label: 'Nazwa zarządcy', placeholder: 'np. Wspólnota Mieszkaniowa', type: 'text' },
      { id: 'data_zalania', label: 'Data zalania', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'zrodlo_zalania', label: 'Źródło zalania', placeholder: 'np. mieszkanie 14, instalacja centralnego ogrzewania, dach', type: 'text' },
      { id: 'opis_szkody', label: 'Opis powstałych szkód', placeholder: 'Opisz jakie powstały szkody (sufit, podłoga, meble)', type: 'textarea' },
      { id: 'szacowana_wartosc', label: 'Szacowana wartość szkody (zł)', placeholder: 'np. 5000', type: 'text' }
    ]
  },
  {
    id: 'wglad_dokumenty_wspolnota',
    nazwa: 'Wniosek o wgląd do dokumentów wspólnoty',
    kategoria: 'Mieszkanie',
    opis: 'Żądanie udostępnienia dokumentów wspólnoty mieszkaniowej',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15, Warszawa', type: 'text' },
      { id: 'zarzadca', label: 'Nazwa zarządcy/wspólnoty', placeholder: 'np. ABC Zarządzanie', type: 'text' },
      { id: 'dokumenty', label: 'Jakie dokumenty chcesz zobaczyć?', placeholder: 'np. protokoły z zebrań, rozliczenia finansowe, umowy z dostawcami', type: 'textarea' },
      { id: 'okres', label: 'Z jakiego okresu?', placeholder: 'np. rok 2024, ostatnie 6 miesięcy', type: 'text' }
    ]
  },
  {
    id: 'rozliczenie_mediow',
    nazwa: 'Pismo o rozliczenie mediów',
    kategoria: 'Mieszkanie',
    opis: 'Żądanie szczegółowego rozliczenia mediów (woda, gaz, prąd)',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15/3, Warszawa', type: 'text' },
      { id: 'zarzadca', label: 'Nazwa zarządcy', placeholder: 'np. Wspólnota Mieszkaniowa', type: 'text' },
      { id: 'media', label: 'Jakie media?', placeholder: 'np. woda, ogrzewanie, gaz', type: 'text' },
      { id: 'okres', label: 'Okres rozliczeniowy', placeholder: 'np. 2024 rok, ostatnie 12 miesięcy', type: 'text' },
      { id: 'powod', label: 'Powód żądania rozliczenia', placeholder: 'np. zawyżone opłaty, brak szczegółowego rozliczenia', type: 'textarea' }
    ]
  }
];

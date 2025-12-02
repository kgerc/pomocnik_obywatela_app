// Pisma związane ze studiami i uczelnią

export const pismaStudia = [
  {
    id: 'usprawiedliwienie_nieobecnosci',
    nazwa: 'Podanie o usprawiedliwienie nieobecności',
    kategoria: 'Studia',
    opis: 'Usprawiedliwienie nieobecności na zajęciach akademickich',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'wydzial', label: 'Wydział', placeholder: 'np. Wydział Informatyki', type: 'text' },
      { id: 'kierunek', label: 'Kierunek studiów', placeholder: 'np. Informatyka', type: 'text' },
      { id: 'rok_semestr', label: 'Rok i semestr', placeholder: 'np. II rok, semestr letni', type: 'text' },
      { id: 'data_nieobecnosci', label: 'Data/daty nieobecności', placeholder: 'np. 15-20.01.2025', type: 'text' },
      { id: 'przedmiot', label: 'Nazwa przedmiotu', placeholder: 'np. Algorytmy i struktury danych', type: 'text' },
      { id: 'powod', label: 'Powód nieobecności', placeholder: 'np. choroba, urlop zdrowotny, losowa okoliczność', type: 'textarea' }
    ]
  },
  {
    id: 'przeds przedluzenie_terminu',
    nazwa: 'Podanie o przedłużenie terminu',
    kategoria: 'Studia',
    opis: 'Prośba o przedłużenie terminu egzaminu, zaliczenia lub projektu',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'wydzial', label: 'Wydział', placeholder: 'np. Wydział Informatyki', type: 'text' },
      { id: 'przedmiot', label: 'Nazwa przedmiotu', placeholder: 'np. Bazy danych', type: 'text' },
      { id: 'typ_zaliczenia', label: 'Typ zaliczenia', placeholder: 'np. egzamin, projekt, kolokwium', type: 'text' },
      { id: 'termin_obecny', label: 'Obecny termin', placeholder: 'np. 25.01.2025', type: 'text' },
      { id: 'termin_proponowany', label: 'Proponowany nowy termin', placeholder: 'np. 15.02.2025', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie', placeholder: 'Wyjaśnij powód prośby o przedłużenie', type: 'textarea' }
    ]
  },
  {
    id: 'podanie_warunek',
    nazwa: 'Podanie o warunek',
    kategoria: 'Studia',
    opis: 'Prośba o przyjęcie na uczelnię warunkowo',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'wydzial', label: 'Wydział', placeholder: 'np. Wydział Informatyki', type: 'text' },
      { id: 'kierunek', label: 'Kierunek studiów', placeholder: 'np. Informatyka', type: 'text' },
      { id: 'rok_akademicki', label: 'Rok akademicki', placeholder: 'np. 2025/2026', type: 'text' },
      { id: 'warunek', label: 'Jaki warunek nie został spełniony?', placeholder: 'np. brak świadectwa maturalnego, brak wyniku egzaminu', type: 'textarea' },
      { id: 'termin_spelnienia', label: 'Kiedy zostanie spełniony?', placeholder: 'np. do 30.09.2025', type: 'text' }
    ]
  },
  {
    id: 'podanie_ios',
    nazwa: 'Podanie o IOS (Indywidualna Organizacja Studiów)',
    kategoria: 'Studia',
    opis: 'Wniosek o indywidualną organizację studiów',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'wydzial', label: 'Wydział', placeholder: 'np. Wydział Informatyki', type: 'text' },
      { id: 'kierunek', label: 'Kierunek studiów', placeholder: 'np. Informatyka', type: 'text' },
      { id: 'rok_semestr', label: 'Rok i semestr', placeholder: 'np. II rok, semestr letni', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie prośby o IOS', placeholder: 'np. praca zawodowa, opieka nad dzieckiem, stan zdrowia', type: 'textarea' }
    ]
  },
  {
    id: 'przepisanie_grupa',
    nazwa: 'Prośba o przepisanie do innej grupy',
    kategoria: 'Studia',
    opis: 'Zmiana grupy ćwiczeniowej lub laboratoryjnej',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'przedmiot', label: 'Nazwa przedmiotu', placeholder: 'np. Programowanie obiektowe', type: 'text' },
      { id: 'grupa_obecna', label: 'Obecna grupa', placeholder: 'np. Grupa 3, poniedziałek 10:00', type: 'text' },
      { id: 'grupa_docelowa', label: 'Docelowa grupa', placeholder: 'np. Grupa 5, środa 14:00', type: 'text' },
      { id: 'powod', label: 'Powód zmiany', placeholder: 'np. kolizja z innym przedmiotem, praca', type: 'textarea' }
    ]
  },
  {
    id: 'zaliczenie_praktyk',
    nazwa: 'Oświadczenie o zaliczeniu praktyk',
    kategoria: 'Studia',
    opis: 'Potwierdzenie ukończenia praktyk zawodowych',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'wydzial', label: 'Wydział', placeholder: 'np. Wydział Informatyki', type: 'text' },
      { id: 'firma', label: 'Nazwa firmy', placeholder: 'np. ABC Software Sp. z o.o.', type: 'text' },
      { id: 'okres', label: 'Okres praktyk', placeholder: 'np. 01.07.2025 - 31.08.2025', type: 'text' },
      { id: 'liczba_godzin', label: 'Liczba godzin', placeholder: 'np. 160 godzin', type: 'text' },
      { id: 'zakres_obowiazkow', label: 'Zakres obowiązków', placeholder: 'Krótko opisz czym się zajmowałeś', type: 'textarea' }
    ]
  },
  {
    id: 'duplikat_legitymacji',
    nazwa: 'Podanie o duplikat legitymacji',
    kategoria: 'Studia',
    opis: 'Wniosek o wydanie duplikatu legitymacji studenckiej',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'wydzial', label: 'Wydział', placeholder: 'np. Wydział Informatyki', type: 'text' },
      { id: 'numer_albumu', label: 'Numer albumu', placeholder: 'np. 123456', type: 'text' },
      { id: 'powod', label: 'Powód wydania duplikatu', placeholder: 'np. zgubienie, kradzież, zniszczenie', type: 'text' }
    ]
  },
  {
    id: 'wniosek_akademik',
    nazwa: 'Wniosek o akademik',
    kategoria: 'Studia',
    opis: 'Wniosek o przyznanie miejsca w akademiku',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'wydzial', label: 'Wydział', placeholder: 'np. Wydział Informatyki', type: 'text' },
      { id: 'rok_akademicki', label: 'Rok akademicki', placeholder: 'np. 2025/2026', type: 'text' },
      { id: 'preferowany_akademik', label: 'Preferowany akademik (opcjonalnie)', placeholder: 'np. DS "Bratniak"', type: 'text' },
      { id: 'odleglosc_od_domu', label: 'Odległość od miejsca zamieszkania (km)', placeholder: 'np. 350 km', type: 'text' },
      { id: 'uzasadnienie', label: 'Dodatkowe uzasadnienie', placeholder: 'np. trudna sytuacja materialna, brak środków na wynajem', type: 'textarea' }
    ]
  },
  {
    id: 'stypendium_motywacyjne',
    nazwa: 'Wniosek o stypendium motywacyjne',
    kategoria: 'Studia',
    opis: 'Wniosek o stypendium za wyniki w nauce',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'wydzial', label: 'Wydział', placeholder: 'np. Wydział Informatyki', type: 'text' },
      { id: 'rok_semestr', label: 'Rok i semestr', placeholder: 'np. II rok, semestr zimowy', type: 'text' },
      { id: 'srednia_ocen', label: 'Średnia ocen', placeholder: 'np. 4.75', type: 'text' },
      { id: 'osiagniecia', label: 'Osiągnięcia naukowe/sportowe (opcjonalnie)', placeholder: 'np. publikacje, konkursy, zawody', type: 'textarea' }
    ]
  },
  {
    id: 'stypendium_socjalne',
    nazwa: 'Wniosek o stypendium socjalne',
    kategoria: 'Studia',
    opis: 'Wniosek o stypendium dla osób w trudnej sytuacji materialnej',
    pytania: [
      { id: 'uczelnia', label: 'Nazwa uczelni', placeholder: 'np. Uniwersytet Warszawski', type: 'text' },
      { id: 'wydzial', label: 'Wydział', placeholder: 'np. Wydział Informatyki', type: 'text' },
      { id: 'liczba_osob_w_rodzinie', label: 'Liczba osób w rodzinie', placeholder: 'np. 4', type: 'text' },
      { id: 'dochod_na_osobe', label: 'Dochód na osobę (zł)', placeholder: 'np. 800', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie sytuacji materialnej', placeholder: 'Opisz krótko sytuację finansową rodziny', type: 'textarea' }
    ]
  }
];

// Pisma administracyjne i urzędowe

export const pismaAdministracja = [
  {
    id: 'wniosek_o_raty',
    nazwa: 'Wniosek o rozłożenie zadłużenia na raty',
    kategoria: 'Administracja',
    opis: 'Wygeneruj gotowy wniosek o rozłożenie należności na raty',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu', placeholder: 'np. Urząd Skarbowy w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Marszałkowska 1/3', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 00-624 Warszawa', type: 'text' },
      { id: 'kwota', label: 'Jaka jest kwota zadłużenia?', placeholder: 'np. 5000 zł', type: 'text' },
      { id: 'raty', label: 'Na ile rat chcesz rozłożyć zadłużenie?', placeholder: 'np. 12 miesięcy', type: 'text' },
      { id: 'powod', label: 'Jaki jest powód Twojej trudnej sytuacji?', placeholder: 'np. utrata pracy, choroba', type: 'textarea' }
    ]
  },
  {
    id: 'odwolanie_decyzja',
    nazwa: 'Odwołanie od decyzji administracyjnej',
    kategoria: 'Administracja',
    opis: 'Złóż odwołanie od niekorzystnej decyzji urzędu',
    pytania: [
      { id: 'nazwa_organu', label: 'Jaki organ wydał decyzję?', placeholder: 'np. Zakład Ubezpieczeń Społecznych Oddział w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Szamocka 3/5', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 01-748 Warszawa', type: 'text' },
      { id: 'data_decyzji', label: 'Data wydania decyzji', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'numer_decyzji', label: 'Numer decyzji (jeśli jest)', placeholder: 'np. ZUS/DEC/123/2025', type: 'text' },
      { id: 'powod_odwolania', label: 'Dlaczego nie zgadzasz się z decyzją?', placeholder: 'Opisz szczegółowo powody odwołania', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_zasilek',
    nazwa: 'Wniosek o zasiłek dla bezrobotnych',
    kategoria: 'Praca',
    opis: 'Złóż wniosek o zasiłek dla osób bezrobotnych',
    pytania: [
      { id: 'nazwa_organu', label: 'Do którego Urzędu Pracy kierujesz wniosek?', placeholder: 'np. Powiatowy Urząd Pracy w Krakowie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Lipowa 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 30-702 Kraków', type: 'text' },
      { id: 'data_utraty', label: 'Kiedy straciłeś/aś pracę?', placeholder: 'np. 01.12.2024', type: 'text' },
      { id: 'ostatnie_miejsce', label: 'Gdzie ostatnio pracowałeś/aś?', placeholder: 'np. nazwa firmy i stanowisko', type: 'text' },
      { id: 'wyksztalcenie', label: 'Jakie masz wykształcenie?', placeholder: 'np. wyższe, średnie', type: 'text' }
    ]
  },
  {
    id: 'skarga_urzad',
    nazwa: 'Skarga na bezczynność urzędu',
    kategoria: 'Administracja',
    opis: 'Złóż skargę gdy urząd nie załatwia Twojej sprawy',
    pytania: [
      { id: 'nazwa_organu', label: 'Jaki urząd nie załatwia sprawy?', placeholder: 'np. Urząd Miasta Warszawa', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. pl. Bankowy 3/5', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 00-950 Warszawa', type: 'text' },
      { id: 'sprawa', label: 'Jakiej sprawy dotyczy?', placeholder: 'np. wniosek o świadczenie, pozwolenie', type: 'text' },
      { id: 'data_zlozenia', label: 'Kiedy złożyłeś/aś wniosek?', placeholder: 'np. 15.10.2024', type: 'text' },
      { id: 'numer_sprawy', label: 'Numer sprawy (jeśli znasz)', placeholder: 'np. WM/123/2024', type: 'text' }
    ]
  },
  {
    id: 'umorzenie_zaleglosci',
    nazwa: 'Wniosek o umorzenie zaległości',
    kategoria: 'Administracja',
    opis: 'Złóż wniosek o umorzenie zaległości podatkowych lub innych należności',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu/instytucji', placeholder: 'np. Urząd Skarbowy w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Marszałkowska 1/3', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 00-624 Warszawa', type: 'text' },
      { id: 'rodzaj_zaleglosci', label: 'Jakiego rodzaju zaległość?', placeholder: 'np. podatek dochodowy, opłaty administracyjne', type: 'text' },
      { id: 'kwota_zaleglosci', label: 'Kwota zaległości', placeholder: 'np. 3500 zł', type: 'text' },
      { id: 'powod_umorzenia', label: 'Dlaczego wnioskujesz o umorzenie?', placeholder: 'np. trudna sytuacja finansowa, utrata pracy, choroba', type: 'textarea' }
    ]
  },
  {
    id: 'przyspieszenie_sprawy',
    nazwa: 'Wniosek o przyspieszenie załatwienia sprawy',
    kategoria: 'Administracja',
    opis: 'Wnioskuj o pilne rozpatrzenie sprawy urzędowej',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu rozpatrującego sprawę', placeholder: 'np. Urząd Miasta w Krakowie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. pl. Wszystkich Świętych 3-4', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 31-004 Kraków', type: 'text' },
      { id: 'przedmiot_sprawy', label: 'Czego dotyczy sprawa?', placeholder: 'np. wniosek o pozwolenie na budowę', type: 'text' },
      { id: 'numer_sprawy', label: 'Numer sprawy/wniosku', placeholder: 'np. WM/2024/12345', type: 'text' },
      { id: 'data_zlozenia', label: 'Kiedy złożono wniosek?', placeholder: 'np. 15.09.2024', type: 'text' },
      { id: 'uzasadnienie', label: 'Dlaczego sprawa jest pilna?', placeholder: 'np. konieczność rozpoczęcia prac, terminy umowne', type: 'textarea' }
    ]
  },
  {
    id: 'wydanie_zaswiadczenia',
    nazwa: 'Wniosek o wydanie zaświadczenia',
    kategoria: 'Administracja',
    opis: 'Uzyskaj zaświadczenie z urzędu lub instytucji',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu/instytucji', placeholder: 'np. Urząd Skarbowy w Gdańsku', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Długa 75/76', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 80-831 Gdańsk', type: 'text' },
      { id: 'rodzaj_zaswiadczenia', label: 'Jakiego zaświadczenia potrzebujesz?', placeholder: 'np. zaświadczenie o niezaleganiu w podatkach', type: 'text' },
      { id: 'cel_zaswiadczenia', label: 'W jakim celu?', placeholder: 'np. do postępowania przetargowego, kredyt', type: 'text' }
    ]
  },
  {
    id: 'sprostowanie_danych',
    nazwa: 'Wniosek o sprostowanie danych',
    kategoria: 'Administracja',
    opis: 'Popraw błędne dane w dokumentach urzędowych',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu/instytucji', placeholder: 'np. Urząd Stanu Cywilnego w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Nowy Świat 18/20', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 00-373 Warszawa', type: 'text' },
      { id: 'rodzaj_dokumentu', label: 'Jakiego dokumentu dotyczy błąd?', placeholder: 'np. akt urodzenia, decyzja administracyjna', type: 'text' },
      { id: 'dane_bledne', label: 'Jakie dane są błędne?', placeholder: 'np. data urodzenia: 15.05.1990', type: 'text' },
      { id: 'dane_poprawne', label: 'Jakie powinny być poprawne dane?', placeholder: 'np. 15.05.1985', type: 'text' }
    ]
  },
  {
    id: 'informacja_publiczna',
    nazwa: 'Wniosek o udostępnienie informacji publicznej',
    kategoria: 'Administracja',
    opis: 'Uzyskaj dostęp do informacji publicznej zgodnie z ustawą',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu/instytucji', placeholder: 'np. Urząd Miasta Poznań', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. pl. Kolegiacki 17', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 61-841 Poznań', type: 'text' },
      { id: 'zakres_informacji', label: 'Jakiej informacji potrzebujesz?', placeholder: 'np. dane o wydatkach na inwestycje w 2024 r.', type: 'textarea' },
      { id: 'forma_udostepnienia', label: 'W jakiej formie chcesz otrzymać informację?', placeholder: 'np. kopia dokumentów, wgląd do akt, email', type: 'text' }
    ]
  },
  {
    id: 'zmiana_danych_osobowych',
    nazwa: 'Zawiadomienie o zmianie danych osobowych',
    kategoria: 'Administracja',
    opis: 'Powiadom urząd o zmianie danych osobowych',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu/instytucji', placeholder: 'np. Zakład Ubezpieczeń Społecznych', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Szamocka 3/5', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 01-748 Warszawa', type: 'text' },
      { id: 'jakie_dane', label: 'Jakie dane uległy zmianie?', placeholder: 'np. adres zamieszkania, numer telefonu', type: 'text' },
      { id: 'dane_stare', label: 'Stare dane', placeholder: 'np. ul. Kwiatowa 5, 00-001 Warszawa', type: 'text' },
      { id: 'dane_nowe', label: 'Nowe dane', placeholder: 'np. ul. Różana 12, 02-567 Warszawa', type: 'text' },
      { id: 'data_zmiany', label: 'Data zmiany danych', placeholder: 'np. 01.12.2024', type: 'text' }
    ]
  },
  {
    id: 'umorzenie_mandatu',
    nazwa: 'Wniosek o umorzenie mandatu',
    kategoria: 'Administracja',
    opis: 'Złóż wniosek o umorzenie mandatu karnego',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu (który nałożył mandat)', placeholder: 'np. Komenda Miejska Policji w Łodzi', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer komendy', placeholder: 'np. ul. Lutomierska 108/112', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 91-048 Łódź', type: 'text' },
      { id: 'numer_mandatu', label: 'Numer mandatu', placeholder: 'np. MND/2024/12345', type: 'text' },
      { id: 'data_mandatu', label: 'Data nałożenia mandatu', placeholder: 'np. 20.11.2024', type: 'text' },
      { id: 'kwota_mandatu', label: 'Kwota mandatu', placeholder: 'np. 500 zł', type: 'text' },
      { id: 'uzasadnienie', label: 'Dlaczego wnioskujesz o umorzenie?', placeholder: 'np. nie popełniono wykroczenia, błąd funkcjonariusza, okoliczności łagodzące', type: 'textarea' }
    ]
  },
  {
    id: 'ponowne_rozpatrzenie',
    nazwa: 'Wniosek o ponowne rozpatrzenie sprawy',
    kategoria: 'Administracja',
    opis: 'Wnioskuj o ponowne rozpatrzenie sprawy przez urząd',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa organu', placeholder: 'np. Urząd Wojewódzki w Katowicach', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Jagiellońska 25', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 40-032 Katowice', type: 'text' },
      { id: 'przedmiot_sprawy', label: 'Czego dotyczyła sprawa?', placeholder: 'np. wniosek o dotację, pozwolenie', type: 'text' },
      { id: 'numer_decyzji', label: 'Numer decyzji/postanowienia', placeholder: 'np. UW/DEC/2024/789', type: 'text' },
      { id: 'data_decyzji', label: 'Data wydania decyzji', placeholder: 'np. 10.10.2024', type: 'text' },
      { id: 'nowe_okolicznosci', label: 'Jakie są nowe okoliczności/dowody?', placeholder: 'Opisz nowe fakty, które pojawiły się po wydaniu decyzji', type: 'textarea' }
    ]
  }
];

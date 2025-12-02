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
    kategoria: 'Administracja',
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
  }
];

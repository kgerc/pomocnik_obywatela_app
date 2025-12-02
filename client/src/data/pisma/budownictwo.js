// Pisma związane z budownictwem i nieruchomościami

export const pismaBudownictwo = [
  {
    id: 'zgloszenie_rozpoczecia_prac',
    nazwa: 'Zgłoszenie rozpoczęcia prac budowlanych',
    kategoria: 'Budownictwo',
    opis: 'Zgłoszenie do urzędu o rozpoczęciu prac niewymagających pozwolenia',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15, Warszawa', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'rodzaj_prac', label: 'Rodzaj prac', placeholder: 'np. remont elewacji, wymiana okien, budowa altany', type: 'text' },
      { id: 'data_rozpoczecia', label: 'Planowana data rozpoczęcia', placeholder: 'np. 01.03.2025', type: 'text' },
      { id: 'data_zakonczenia', label: 'Planowana data zakończenia', placeholder: 'np. 30.04.2025', type: 'text' },
      { id: 'opis_prac', label: 'Opis zakresu prac', placeholder: 'Opisz dokładnie co będzie robione', type: 'textarea' }
    ]
  },
  {
    id: 'zgloszenie_zakonczenia_prac',
    nazwa: 'Zgłoszenie zakończenia prac budowlanych',
    kategoria: 'Budownictwo',
    opis: 'Zawiadomienie urzędu o zakończeniu robót',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15, Warszawa', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'numer_zgloszenia', label: 'Numer zgłoszenia rozpoczęcia prac', placeholder: 'np. ZG/2025/123', type: 'text' },
      { id: 'data_zakonczenia', label: 'Data zakończenia prac', placeholder: 'np. 25.04.2025', type: 'text' },
      { id: 'rodzaj_prac', label: 'Rodzaj wykonanych prac', placeholder: 'np. remont elewacji, wymiana okien', type: 'text' }
    ]
  },
  {
    id: 'zgloszenie_robot_bez_pozwolenia',
    nazwa: 'Zgłoszenie robót niewymagających pozwolenia',
    kategoria: 'Budownictwo',
    opis: 'Zgłoszenie prac budowlanych do starostwa (art. 29 i 30 Prawa budowlanego)',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15, Warszawa', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'numer_ksiegi_wieczystej', label: 'Numer księgi wieczystej', placeholder: 'np. WA1W/00123456/7', type: 'text' },
      { id: 'rodzaj_roboty', label: 'Rodzaj roboty', placeholder: 'np. budowa wiaty, przebudowa garażu, rozbudowa budynku', type: 'text' },
      { id: 'parametry', label: 'Parametry techniczne', placeholder: 'np. powierzchnia zabudowy 35 m2, wysokość 3,5 m', type: 'textarea' },
      { id: 'data_rozpoczecia', label: 'Planowana data rozpoczęcia', placeholder: 'np. 01.04.2025', type: 'text' }
    ]
  },
  {
    id: 'oswiadczenie_prawo_dysponowania',
    nazwa: 'Oświadczenie o prawie do dysponowania nieruchomością',
    kategoria: 'Budownictwo',
    opis: 'Oświadczenie wymagane przy zgłoszeniu robót budowlanych',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15, Warszawa', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'numer_ksiegi_wieczystej', label: 'Numer księgi wieczystej', placeholder: 'np. WA1W/00123456/7', type: 'text' },
      { id: 'tytul_prawny', label: 'Tytuł prawny', placeholder: 'np. własność, użytkowanie wieczyste, dzierżawa', type: 'text' },
      { id: 'cel_dysponowania', label: 'Cel dysponowania nieruchomością', placeholder: 'np. budowa wiaty, remont budynku', type: 'text' }
    ]
  },
  {
    id: 'zmiana_sposobu_uzytkowania',
    nazwa: 'Zgłoszenie zmiany sposobu użytkowania',
    kategoria: 'Budownictwo',
    opis: 'Zgłoszenie zmiany funkcji obiektu (np. mieszkanie na biuro)',
    pytania: [
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Główna 15/3, Warszawa', type: 'text' },
      { id: 'obecny_sposob', label: 'Obecny sposób użytkowania', placeholder: 'np. mieszkanie', type: 'text' },
      { id: 'docelowy_sposob', label: 'Docelowy sposób użytkowania', placeholder: 'np. biuro, pracownia, gabinet', type: 'text' },
      { id: 'powierzchnia', label: 'Powierzchnia (m2)', placeholder: 'np. 50 m2', type: 'text' },
      { id: 'zakres_prac', label: 'Czy będą roboty budowlane?', placeholder: 'np. nie, tylko zmiana funkcji lub tak - opisz jakie', type: 'textarea' }
    ]
  }
];

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
  },
  {
    id: 'wniosek_pozwolenie_budowa_domu',
    nazwa: 'Wniosek o pozwolenie na budowę domu',
    kategoria: 'Budownictwo',
    opis: 'Wniosek o wydanie pozwolenia na budowę domu jednorodzinnego',
    pytania: [
      { id: 'nazwa_organu', label: 'Starosta/Prezydent Miasta', placeholder: 'np. Starosta Powiatu Warszawskiego Zachodniego', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Warszawska 10', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 05-082 Błonie', type: 'text' },
      { id: 'adres_dzialki', label: 'Adres działki budowlanej', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'numer_ksiegi_wieczystej', label: 'Numer księgi wieczystej', placeholder: 'np. WA1W/00123456/7', type: 'text' },
      { id: 'powierzchnia_dzialki', label: 'Powierzchnia działki (m2)', placeholder: 'np. 1000', type: 'text' },
      { id: 'powierzchnia_zabudowy', label: 'Powierzchnia zabudowy (m2)', placeholder: 'np. 150', type: 'text' },
      { id: 'powierzchnia_uzytkowa', label: 'Powierzchnia użytkowa domu (m2)', placeholder: 'np. 200', type: 'text' },
      { id: 'wysokosc_budynku', label: 'Wysokość budynku (m)', placeholder: 'np. 9 m', type: 'text' },
      { id: 'liczba_kondygnacji', label: 'Liczba kondygnacji', placeholder: 'np. 2 kondygnacje nadziemne + poddasze użytkowe', type: 'text' }
    ]
  },
  {
    id: 'wniosek_wylaczenie_gruntow_rolnych',
    nazwa: 'Wniosek o wyłączenie gruntów rolnych z produkcji',
    kategoria: 'Budownictwo',
    opis: 'Wniosek o wyłączenie gruntów rolnych na cele budowlane',
    pytania: [
      { id: 'nazwa_organu', label: 'Starosta Powiatu', placeholder: 'np. Starosta Powiatu Warszawskiego Zachodniego', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Warszawska 10', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 05-082 Błonie', type: 'text' },
      { id: 'adres_dzialki', label: 'Adres działki', placeholder: 'np. ul. Polna, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'powierzchnia_wylaczenia', label: 'Powierzchnia do wyłączenia (m2)', placeholder: 'np. 1000', type: 'text' },
      { id: 'klasa_gruntu', label: 'Klasa gruntu', placeholder: 'np. IV, V, VI', type: 'text' },
      { id: 'cel_wylaczenia', label: 'Cel wyłączenia', placeholder: 'np. budowa domu jednorodzinnego', type: 'text' }
    ]
  },
  {
    id: 'wniosek_warunki_zabudowy',
    nazwa: 'Wniosek o wydanie warunków zabudowy',
    kategoria: 'Budownictwo',
    opis: 'Wniosek o ustalenie warunków zabudowy i zagospodarowania terenu',
    pytania: [
      { id: 'nazwa_organu', label: 'Wójt/Burmistrz/Prezydent Miasta', placeholder: 'np. Burmistrz Miasta Podkowa Leśna', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Miejska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 05-807 Podkowa Leśna', type: 'text' },
      { id: 'adres_dzialki', label: 'Adres działki', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'powierzchnia_dzialki', label: 'Powierzchnia działki (m2)', placeholder: 'np. 1000', type: 'text' },
      { id: 'cel_inwestycji', label: 'Cel inwestycji', placeholder: 'np. budowa domu jednorodzinnego', type: 'text' },
      { id: 'parametry_inwestycji', label: 'Parametry planowanej zabudowy', placeholder: 'np. powierzchnia zabudowy 150 m2, wysokość 9 m', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_podzial_dzialki',
    nazwa: 'Wniosek o podział działki',
    kategoria: 'Budownictwo',
    opis: 'Wniosek o zatwierdzenie podziału nieruchomości',
    pytania: [
      { id: 'nazwa_organu', label: 'Wójt/Burmistrz/Prezydent Miasta', placeholder: 'np. Burmistrz Miasta Podkowa Leśna', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Miejska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 05-807 Podkowa Leśna', type: 'text' },
      { id: 'adres_dzialki', label: 'Adres działki do podziału', placeholder: 'np. ul. Polna, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'powierzchnia_dzialki', label: 'Powierzchnia działki (m2)', placeholder: 'np. 2000', type: 'text' },
      { id: 'liczba_dzialek', label: 'Na ile działek ma być podzielona?', placeholder: 'np. 2 działki', type: 'text' },
      { id: 'cel_podzialu', label: 'Cel podziału', placeholder: 'np. budowa domu, sprzedaż części działki', type: 'text' }
    ]
  },
  {
    id: 'wniosek_przyslugowe_wodno_kanalizacyjne',
    nazwa: 'Wniosek o przyłącze wodno-kanalizacyjne',
    kategoria: 'Budownictwo',
    opis: 'Wniosek o wydanie warunków przyłączenia do sieci',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa przedsiębiorstwa wod-kan', placeholder: 'np. Wodociągi Miejskie Sp. z o.o.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Wodna 10', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości do przyłączenia', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'rodzaj_przylacza', label: 'Rodzaj przyłącza', placeholder: 'np. woda, kanalizacja sanitarna, kanalizacja deszczowa', type: 'text' },
      { id: 'przeznaczenie', label: 'Przeznaczenie', placeholder: 'np. dom jednorodzinny', type: 'text' },
      { id: 'liczba_mieszkancow', label: 'Planowana liczba mieszkańców', placeholder: 'np. 4 osoby', type: 'text' }
    ]
  },
  {
    id: 'wniosek_przylacze_energetyczne',
    nazwa: 'Wniosek o przyłącze energetyczne',
    kategoria: 'Budownictwo',
    opis: 'Wniosek o warunki przyłączenia do sieci elektroenergetycznej',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa zakładu energetycznego', placeholder: 'np. PGE Dystrybucja S.A.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Energetyczna 5', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości do przyłączenia', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'moc_przylaczeniowa', label: 'Planowana moc przyłączeniowa (kW)', placeholder: 'np. 15 kW', type: 'text' },
      { id: 'przeznaczenie', label: 'Przeznaczenie obiektu', placeholder: 'np. dom jednorodzinny', type: 'text' },
      { id: 'napiecie', label: 'Rodzaj napięcia', placeholder: 'np. niskie napięcie (nn)', type: 'text' }
    ]
  },
  {
    id: 'wniosek_przylacze_gazowe',
    nazwa: 'Wniosek o przyłącze gazowe',
    kategoria: 'Budownictwo',
    opis: 'Wniosek o warunki przyłączenia do sieci gazowej',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa zakładu gazowniczego', placeholder: 'np. Polska Spółka Gazownictwa Sp. z o.o.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Gazowa 20', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości do przyłączenia', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'zapotrzebowanie_gazu', label: 'Zapotrzebowanie na gaz (m3/h)', placeholder: 'np. 3 m3/h', type: 'text' },
      { id: 'przeznaczenie', label: 'Przeznaczenie', placeholder: 'np. ogrzewanie i ciepła woda użytkowa w domu jednorodzinnym', type: 'text' }
    ]
  },
  {
    id: 'zawiadomienie_budowy_studni',
    nazwa: 'Zawiadomienie o budowie studni',
    kategoria: 'Budownictwo',
    opis: 'Zgłoszenie budowy studni lub ujęcia wody',
    pytania: [
      { id: 'nazwa_organu', label: 'Starosta/Dyrektor Zarządu Melioracji', placeholder: 'np. Starosta Powiatu Warszawskiego Zachodniego', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Warszawska 10', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 05-082 Błonie', type: 'text' },
      { id: 'adres_nieruchomosci', label: 'Adres nieruchomości', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'glebkosc_studni', label: 'Planowana głębokość studni (m)', placeholder: 'np. 30 m', type: 'text' },
      { id: 'cel_uzycia', label: 'Cel użycia wody', placeholder: 'np. zaopatrzenie w wodę domu jednorodzinnego, podlewanie ogrodu', type: 'text' },
      { id: 'wydajnosc', label: 'Planowana wydajność (m3/dobę)', placeholder: 'np. 1 m3/dobę', type: 'text' }
    ]
  },
  {
    id: 'wniosek_pozwolenie_wejscie_na_sasiednia_dzialke',
    nazwa: 'Wniosek o pozwolenie na wejście na sąsiednią działkę',
    kategoria: 'Budownictwo',
    opis: 'Wniosek do sąsiada o umożliwienie wejścia na działkę w związku z budową',
    pytania: [
      { id: 'imie_nazwisko_sasiada', label: 'Imię i nazwisko sąsiada', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'adres_sasiada', label: 'Adres sąsiada', placeholder: 'np. ul. Budowlana 7, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki_sasiada', label: 'Numer działki sąsiada', placeholder: 'np. 123/5', type: 'text' },
      { id: 'adres_inwestycji', label: 'Adres Twojej inwestycji', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'cel_wejscia', label: 'Cel wejścia na działkę', placeholder: 'np. wykonanie ściany budynku, montaż rusztowań, prace wykończeniowe', type: 'text' },
      { id: 'okres_korzystania', label: 'Przewidywany okres korzystania', placeholder: 'np. 3 miesiące od rozpoczęcia prac', type: 'text' },
      { id: 'zakres_prac', label: 'Zakres prac', placeholder: 'Opisz szczegółowo co będzie wykonywane', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_dziennik_budowy',
    nazwa: 'Wniosek o wydanie dziennika budowy',
    kategoria: 'Budownictwo',
    opis: 'Wniosek o wydanie dziennika budowy przez odpowiedni organ',
    pytania: [
      { id: 'nazwa_organu', label: 'Powiatowy Inspektorat Nadzoru Budowlanego', placeholder: 'np. Powiatowy Inspektorat Nadzoru Budowlanego w Grodzisku Maz.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Budowlana 10', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 05-825 Grodzisk Mazowiecki', type: 'text' },
      { id: 'adres_budowy', label: 'Adres budowy', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'numer_pozwolenia', label: 'Numer pozwolenia na budowę', placeholder: 'np. AB.6740.12.2024', type: 'text' },
      { id: 'rodzaj_obiektu', label: 'Rodzaj obiektu', placeholder: 'np. budynek mieszkalny jednorodzinny', type: 'text' }
    ]
  },
  {
    id: 'zawiadomienie_kierownika_budowy',
    nazwa: 'Zawiadomienie o ustanowieniu kierownika budowy',
    kategoria: 'Budownictwo',
    opis: 'Zgłoszenie kierownika budowy do nadzoru budowlanego',
    pytania: [
      { id: 'nazwa_organu', label: 'Powiatowy Inspektorat Nadzoru Budowlanego', placeholder: 'np. Powiatowy Inspektorat Nadzoru Budowlanego w Grodzisku Maz.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Budowlana 10', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 05-825 Grodzisk Mazowiecki', type: 'text' },
      { id: 'adres_budowy', label: 'Adres budowy', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'numer_pozwolenia', label: 'Numer pozwolenia na budowę', placeholder: 'np. AB.6740.12.2024', type: 'text' },
      { id: 'imie_nazwisko_kierownika', label: 'Imię i nazwisko kierownika budowy', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'uprawnienia_kierownika', label: 'Uprawnienia kierownika budowy', placeholder: 'np. uprawnienia budowlane w specjalności konstrukcyjno-budowlanej bez ograniczeń', type: 'text' },
      { id: 'numer_uprawnien', label: 'Numer uprawnień', placeholder: 'np. MAZ/0012/KBUD/08', type: 'text' }
    ]
  },
  {
    id: 'zgloszenie_zamiaru_budowy',
    nazwa: 'Zgłoszenie zamiaru rozpoczęcia budowy',
    kategoria: 'Budownictwo',
    opis: 'Zgłoszenie zamiaru rozpoczęcia robót budowlanych do nadzoru',
    pytania: [
      { id: 'nazwa_organu', label: 'Powiatowy Inspektorat Nadzoru Budowlanego', placeholder: 'np. Powiatowy Inspektorat Nadzoru Budowlanego w Grodzisku Maz.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Budowlana 10', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 05-825 Grodzisk Mazowiecki', type: 'text' },
      { id: 'adres_budowy', label: 'Adres budowy', placeholder: 'np. ul. Budowlana 5, Podkowa Leśna', type: 'text' },
      { id: 'numer_dzialki', label: 'Numer działki', placeholder: 'np. 123/4', type: 'text' },
      { id: 'numer_pozwolenia', label: 'Numer pozwolenia na budowę', placeholder: 'np. AB.6740.12.2024', type: 'text' },
      { id: 'data_rozpoczecia', label: 'Planowana data rozpoczęcia robót', placeholder: 'np. 15.03.2025', type: 'text' },
      { id: 'rodzaj_obiektu', label: 'Rodzaj obiektu budowlanego', placeholder: 'np. budynek mieszkalny jednorodzinny', type: 'text' }
    ]
  }
];

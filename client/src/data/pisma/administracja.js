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
  },
  {
    id: 'wniosek_odpis_akt_zgonu',
    nazwa: 'Wniosek o wydanie odpisu aktu zgonu',
    kategoria: 'Urząd Stanu Cywilnego',
    opis: 'Wniosek o wydanie odpisu aktu zgonu',
    pytania: [
      { id: 'nazwa_usc', label: 'Nazwa Urzędu Stanu Cywilnego', placeholder: 'np. Urząd Stanu Cywilnego w Warszawie', type: 'text' },
      { id: 'ulica_usc', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Nowy Świat 18/20', type: 'text' },
      { id: 'kod_miasto_usc', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-373 Warszawa', type: 'text' },
      { id: 'imie_nazwisko_zmarlego', label: 'Imię i nazwisko zmarłego', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'data_zgonu', label: 'Data zgonu', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'miejsce_zgonu', label: 'Miejsce zgonu', placeholder: 'np. Warszawa', type: 'text' },
      { id: 'rodzaj_odpisu', label: 'Rodzaj odpisu', placeholder: 'np. zupełny, skrócony', type: 'text' },
      { id: 'cel', label: 'Cel wydania odpisu', placeholder: 'np. sprawa spadkowa, ubezpieczenie, emerytura', type: 'text' },
      { id: 'stosunek_do_zmarlego', label: 'Twój stosunek do zmarłego', placeholder: 'np. syn, córka, małżonek', type: 'text' }
    ]
  },
  {
    id: 'wniosek_dowod_osobisty',
    nazwa: 'Wniosek o wydanie dowodu osobistego',
    kategoria: 'Administracja',
    opis: 'Wniosek o wydanie nowego dowodu osobistego',
    pytania: [
      { id: 'nazwa_urzedu', label: 'Nazwa urzędu', placeholder: 'np. Urząd Dzielnicy Śródmieście m.st. Warszawy', type: 'text' },
      { id: 'ulica_urzedu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Nowogrodzka 43', type: 'text' },
      { id: 'kod_miasto_urzedu', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-691 Warszawa', type: 'text' },
      { id: 'powod_wniosku', label: 'Powód złożenia wniosku', placeholder: 'np. upływ terminu ważności, kradzież, zgubienie, zmiana danych', type: 'text' },
      { id: 'numer_starego', label: 'Numer poprzedniego dowodu (jeśli posiadasz)', placeholder: 'np. ABC 123456', type: 'text' },
      { id: 'adres_do_korespondencji', label: 'Adres do korespondencji (jeśli inny niż zameldowania)', placeholder: 'np. ul. Kwiatowa 5, 02-123 Warszawa', type: 'text' }
    ]
  },
  {
    id: 'wniosek_ekuz',
    nazwa: 'Wniosek o wydanie Europejskiej Karty Ubezpieczenia Zdrowotnego (EKUZ)',
    kategoria: 'Ubezpieczenia',
    opis: 'Wniosek o wydanie EKUZ umożliwiającej korzystanie z opieki zdrowotnej w UE',
    pytania: [
      { id: 'oddzial_nfz', label: 'Oddział NFZ', placeholder: 'np. Mazowiecki Oddział Wojewódzki NFZ w Warszawie', type: 'text' },
      { id: 'ulica_nfz', label: 'Ulica i numer', placeholder: 'np. ul. Grójecka 186', type: 'text' },
      { id: 'kod_miasto_nfz', label: 'Kod pocztowy i miasto', placeholder: 'np. 02-390 Warszawa', type: 'text' },
      { id: 'numer_pesel', label: 'Numer PESEL', placeholder: 'np. 90010112345', type: 'text' },
      { id: 'okres_waznosci', label: 'Na jaki okres potrzebujesz karty?', placeholder: 'np. od 01.02.2025 do 31.08.2025', type: 'text' },
      { id: 'kraj_docelowy', label: 'Kraj, do którego planujesz wyjazd', placeholder: 'np. Niemcy, Hiszpania, Włochy', type: 'text' },
      { id: 'cel_pobytu', label: 'Cel pobytu za granicą', placeholder: 'np. turystyka, praca, studia', type: 'text' }
    ]
  },
  {
    id: 'wniosek_zameldowanie',
    nazwa: 'Wniosek o zameldowanie na pobyt stały',
    kategoria: 'Administracja',
    opis: 'Zgłoszenie pobytu stałego w nowym miejscu zamieszkania',
    pytania: [
      { id: 'nazwa_urzedu', label: 'Nazwa urzędu', placeholder: 'np. Urząd Dzielnicy Praga-Północ m.st. Warszawy', type: 'text' },
      { id: 'ulica_urzedu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Kłopotowskiego 15', type: 'text' },
      { id: 'kod_miasto_urzedu', label: 'Kod pocztowy i miasto', placeholder: 'np. 03-708 Warszawa', type: 'text' },
      { id: 'adres_nowy', label: 'Nowy adres zamieszkania', placeholder: 'np. ul. Targowa 10 m. 5, 03-728 Warszawa', type: 'text' },
      { id: 'data_wprowadzenia', label: 'Data wprowadzenia się', placeholder: 'np. 01.02.2025', type: 'text' },
      { id: 'tytul_prawny', label: 'Tytuł prawny do lokalu', placeholder: 'np. właściciel, najemca, członek rodziny właściciela', type: 'text' },
      { id: 'wlasciciel', label: 'Imię i nazwisko właściciela (jeśli nie jesteś właścicielem)', placeholder: 'np. Anna Kowalska', type: 'text' }
    ]
  },
  {
    id: 'wniosek_wymeldowanie',
    nazwa: 'Wniosek o wymeldowanie z pobytu stałego',
    kategoria: 'Administracja',
    opis: 'Zgłoszenie zakończenia pobytu stałego pod dotychczasowym adresem',
    pytania: [
      { id: 'nazwa_urzedu', label: 'Nazwa urzędu', placeholder: 'np. Urząd Dzielnicy Mokotów m.st. Warszawy', type: 'text' },
      { id: 'ulica_urzedu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Rakowiecka 25/27', type: 'text' },
      { id: 'kod_miasto_urzedu', label: 'Kod pocztowy i miasto', placeholder: 'np. 02-517 Warszawa', type: 'text' },
      { id: 'adres_aktualny', label: 'Adres, z którego się wymeldujesz', placeholder: 'np. ul. Puławska 100 m. 20, 02-620 Warszawa', type: 'text' },
      { id: 'data_wyprowadzki', label: 'Data wyprowadzki', placeholder: 'np. 31.01.2025', type: 'text' },
      { id: 'nowy_adres', label: 'Nowy adres zamieszkania (jeśli znany)', placeholder: 'np. ul. Kwiatowa 5, 30-001 Kraków', type: 'text' },
      { id: 'powod', label: 'Powód wymeldowania', placeholder: 'np. przeprowadzka, wyjazd za granicę, zmiana miejsca zamieszkania', type: 'text' }
    ]
  },
  {
    id: 'pismo_wojewoda_karta_pobytu',
    nazwa: 'Pismo do wojewody o wydanie karty pobytu',
    kategoria: 'Administracja',
    opis: 'Wniosek o wydanie karty pobytu dla cudzoziemca',
    pytania: [
      { id: 'nazwa_urzedu', label: 'Nazwa urzędu wojewódzkiego', placeholder: 'np. Mazowiecki Urząd Wojewódzki w Warszawie', type: 'text' },
      { id: 'ulica_urzedu', label: 'Ulica i numer', placeholder: 'np. pl. Bankowy 3/5', type: 'text' },
      { id: 'kod_miasto_urzedu', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-950 Warszawa', type: 'text' },
      { id: 'rodzaj_karty', label: 'Rodzaj karty pobytu', placeholder: 'np. karta pobytu czasowego, stałego, rezydenta długoterminowego UE', type: 'text' },
      { id: 'obywatelstwo', label: 'Twoje obywatelstwo', placeholder: 'np. Ukraina, Białoruś', type: 'text' },
      { id: 'numer_paszportu', label: 'Numer paszportu', placeholder: 'np. AB1234567', type: 'text' },
      { id: 'cel_pobytu', label: 'Cel pobytu w Polsce', placeholder: 'np. praca, studia, połączenie rodziny', type: 'text' },
      { id: 'adres_w_polsce', label: 'Adres zamieszkania w Polsce', placeholder: 'np. ul. Marszałkowska 10/5, 00-001 Warszawa', type: 'text' }
    ]
  },
  {
    id: 'wniosek_orzeczenie_niepelnosprawnosc',
    nazwa: 'Wniosek o wydanie orzeczenia o niepełnosprawności',
    kategoria: 'Administracja',
    opis: 'Wniosek o ustalenie niepełnosprawności lub stopnia niepełnosprawności',
    pytania: [
      { id: 'nazwa_zespolu', label: 'Nazwa Powiatowego Zespołu ds. Orzekania o Niepełnosprawności', placeholder: 'np. Powiatowy Zespół ds. Orzekania o Niepełnosprawności w Warszawie', type: 'text' },
      { id: 'ulica_zespolu', label: 'Ulica i numer', placeholder: 'np. ul. Polna 40', type: 'text' },
      { id: 'kod_miasto_zespolu', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-635 Warszawa', type: 'text' },
      { id: 'rodzaj_orzeczenia', label: 'Rodzaj orzeczenia', placeholder: 'np. o niepełnosprawności, o stopniu niepełnosprawności', type: 'text' },
      { id: 'grupa_wiekowa', label: 'Grupa wiekowa', placeholder: 'np. osoba dorosła (powyżej 16 lat), dziecko (do 16 lat)', type: 'text' },
      { id: 'schorzenia', label: 'Główne schorzenia', placeholder: 'Opisz schorzenia uzasadniające wniosek', type: 'textarea' },
      { id: 'cel_orzeczenia', label: 'Cel uzyskania orzeczenia', placeholder: 'np. ulgi podatkowe, dofinansowania, prawo jazdy, inne świadczenia', type: 'text' }
    ]
  },
  {
    id: 'wniosek_zaswiadczenie_zameldowanie',
    nazwa: 'Wniosek o wydanie zaświadczenia o zameldowaniu/braku zameldowania',
    kategoria: 'Administracja',
    opis: 'Zaświadczenie o miejscu zameldowania lub jego braku',
    pytania: [
      { id: 'nazwa_urzedu', label: 'Nazwa urzędu', placeholder: 'np. Urząd Dzielnicy Wola m.st. Warszawy', type: 'text' },
      { id: 'ulica_urzedu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Wolska 21/29', type: 'text' },
      { id: 'kod_miasto_urzedu', label: 'Kod pocztowy i miasto', placeholder: 'np. 01-197 Warszawa', type: 'text' },
      { id: 'rodzaj_zaswiadczenia', label: 'Rodzaj zaświadczenia', placeholder: 'np. o zameldowaniu na pobyt stały, o braku zameldowania', type: 'text' },
      { id: 'adres_zameldowania', label: 'Adres zameldowania (jeśli dotyczy)', placeholder: 'np. ul. Górczewska 30/10, 01-401 Warszawa', type: 'text' },
      { id: 'cel', label: 'Cel wydania zaświadczenia', placeholder: 'np. dla banku, do postępowania sądowego, dla pracodawcy', type: 'text' }
    ]
  }
];

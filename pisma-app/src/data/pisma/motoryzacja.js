// Pisma związane z motoryzacją i pojazdami

export const pismaMotoryzacja = [
  {
    id: 'odwolanie_mandat_itd',
    nazwa: 'Odwołanie od mandatu ITD',
    kategoria: 'Motoryzacja',
    opis: 'Odwołanie od mandatu Inspekcji Transportu Drogowego',
    pytania: [
      { id: 'numer_mandatu', label: 'Numer mandatu', placeholder: 'np. ITD/2025/123456', type: 'text' },
      { id: 'data_nalozen ia', label: 'Data nałożenia mandatu', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'kwota', label: 'Kwota mandatu (zł)', placeholder: 'np. 500', type: 'text' },
      { id: 'zarzut', label: 'Za co został nałożony?', placeholder: 'np. przekroczenie czasu pracy, przeciążenie pojazdu', type: 'text' },
      { id: 'marka_pojazdu', label: 'Marka i model pojazdu', placeholder: 'np. Mercedes Actros', type: 'text' },
      { id: 'numer_rejestracyjny', label: 'Numer rejestracyjny', placeholder: 'np. WA 12345', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie odwołania', placeholder: 'Wyjaśnij dlaczego mandat jest niesłuszny', type: 'textarea' }
    ]
  },
  {
    id: 'reklamacja_badanie_techniczne',
    nazwa: 'Reklamacja badania technicznego',
    kategoria: 'Motoryzacja',
    opis: 'Reklamacja nieprawidłowego przebiegu badania technicznego pojazdu',
    pytania: [
      { id: 'nazwa_stacji', label: 'Nazwa stacji kontroli pojazdów', placeholder: 'np. SKP "Auto-Test"', type: 'text' },
      { id: 'adres_stacji', label: 'Adres stacji', placeholder: 'np. ul. Przemysłowa 5, Warszawa', type: 'text' },
      { id: 'data_badania', label: 'Data badania', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'marka_pojazdu', label: 'Marka i model pojazdu', placeholder: 'np. Volkswagen Golf', type: 'text' },
      { id: 'numer_rejestracyjny', label: 'Numer rejestracyjny', placeholder: 'np. WA 12345', type: 'text' },
      { id: 'numer_protokolu', label: 'Numer protokołu badania', placeholder: 'np. SKP/2025/123', type: 'text' },
      { id: 'opis_problemu', label: 'Opis nieprawidłowości', placeholder: 'Opisz co było nie tak (np. odmowa bez powodu, niewłaściwa ocena)', type: 'textarea' }
    ]
  },
  {
    id: 'zwrot_oc_sprzedaz',
    nazwa: 'Pismo o zwrot za OC po sprzedaży auta',
    kategoria: 'Motoryzacja',
    opis: 'Wniosek o zwrot niewykorzystanej składki OC po sprzedaży pojazdu',
    pytania: [
      { id: 'ubezpieczyciel', label: 'Nazwa ubezpieczyciela', placeholder: 'np. PZU, Warta, Ergo Hestia', type: 'text' },
      { id: 'numer_polisy', label: 'Numer polisy OC', placeholder: 'np. OC/2025/123456', type: 'text' },
      { id: 'marka_pojazdu', label: 'Marka i model pojazdu', placeholder: 'np. Volkswagen Golf', type: 'text' },
      { id: 'numer_rejestracyjny', label: 'Numer rejestracyjny', placeholder: 'np. WA 12345', type: 'text' },
      { id: 'data_sprzedazy', label: 'Data sprzedaży pojazdu', placeholder: 'np. 10.01.2025', type: 'text' },
      { id: 'koniec_polisy', label: 'Data końca polisy', placeholder: 'np. 31.12.2025', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do zwrotu', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  },
  {
    id: 'zgloszenie_szkoda_parking',
    nazwa: 'Zgłoszenie szkody parkingowej',
    kategoria: 'Motoryzacja',
    opis: 'Zgłoszenie uszkodzenia pojazdu na parkingu',
    pytania: [
      { id: 'nazwa_parkingu', label: 'Nazwa parkingu/właściciel', placeholder: 'np. Parking Centrum, Galeria XYZ', type: 'text' },
      { id: 'adres_parkingu', label: 'Adres parkingu', placeholder: 'np. ul. Główna 10, Warszawa', type: 'text' },
      { id: 'data_zdarzenia', label: 'Data zdarzenia', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'godzina', label: 'Godzina zdarzenia (jeśli znana)', placeholder: 'np. około 14:00', type: 'text' },
      { id: 'marka_pojazdu', label: 'Marka i model Twojego pojazdu', placeholder: 'np. Toyota Corolla', type: 'text' },
      { id: 'numer_rejestracyjny', label: 'Numer rejestracyjny', placeholder: 'np. WA 12345', type: 'text' },
      { id: 'opis_szkody', label: 'Opis szkody', placeholder: 'Opisz uszkodzenia (np. zarysowanie, wgniecenie)', type: 'textarea' },
      { id: 'szacowana_wartosc', label: 'Szacowana wartość szkody (zł)', placeholder: 'np. 2000', type: 'text' },
      { id: 'czy_monitoring', label: 'Czy parking ma monitoring?', placeholder: 'tak/nie/nie wiem', type: 'text' }
    ]
  },
  {
    id: 'pismo_ubezpieczyciel_sprawcy',
    nazwa: 'Pismo do ubezpieczyciela sprawcy',
    kategoria: 'Motoryzacja',
    opis: 'Zgłoszenie szkody do ubezpieczyciela sprawcy kolizji (OC sprawcy)',
    pytania: [
      { id: 'ubezpieczyciel_sprawcy', label: 'Ubezpieczyciel sprawcy', placeholder: 'np. PZU, Warta', type: 'text' },
      { id: 'numer_polisy_sprawcy', label: 'Numer polisy OC sprawcy', placeholder: 'np. OC/2025/987654', type: 'text' },
      { id: 'data_kolizji', label: 'Data kolizji', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'miejsce_kolizji', label: 'Miejsce kolizji', placeholder: 'np. ul. Główna / ul. Boczna, Warszawa', type: 'text' },
      { id: 'dane_sprawcy', label: 'Dane sprawcy', placeholder: 'Imię, nazwisko, nr rejestracyjny', type: 'text' },
      { id: 'twoj_pojazd', label: 'Marka i nr rej. Twojego pojazdu', placeholder: 'np. Toyota Corolla, WA 12345', type: 'text' },
      { id: 'opis_przebiegu', label: 'Przebieg zdarzenia', placeholder: 'Opisz jak doszło do kolizji', type: 'textarea' },
      { id: 'opis_szkod', label: 'Opis uszkodzeń', placeholder: 'Opisz uszkodzenia w Twoim pojeździe', type: 'textarea' },
      { id: 'szacowana_wartosc', label: 'Szacowana wartość szkody (zł)', placeholder: 'np. 8000', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do wypłaty (opcjonalnie)', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  },
  {
    id: 'oswiadczenie_sprawcy_kolizji',
    nazwa: 'Oświadczenie sprawcy kolizji',
    kategoria: 'Motoryzacja',
    opis: 'Oświadczenie dla poszkodowanego o uznaniu winy (super poszukiwany dokument!)',
    pytania: [
      { id: 'data_kolizji', label: 'Data kolizji', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'miejsce_kolizji', label: 'Miejsce kolizji', placeholder: 'np. ul. Główna / ul. Boczna, Warszawa', type: 'text' },
      { id: 'twoj_pojazd', label: 'Marka i nr rej. Twojego pojazdu (sprawcy)', placeholder: 'np. Audi A4, WA 98765', type: 'text' },
      { id: 'pojazd_poszkodowanego', label: 'Marka i nr rej. pojazdu poszkodowanego', placeholder: 'np. Toyota Corolla, WA 12345', type: 'text' },
      { id: 'dane_poszkodowanego', label: 'Dane poszkodowanego', placeholder: 'Imię i nazwisko właściciela drugiego pojazdu', type: 'text' },
      { id: 'przebieg_zdarzenia', label: 'Przebieg zdarzenia', placeholder: 'Opisz krótko jak doszło do kolizji', type: 'textarea' },
      { id: 'ubezpieczyciel', label: 'Twój ubezpieczyciel OC', placeholder: 'np. PZU', type: 'text' },
      { id: 'numer_polisy', label: 'Numer Twojej polisy OC', placeholder: 'np. OC/2025/987654', type: 'text' }
    ]
  },
  {
    id: 'umowa_kupna_sprzedazy_auto_pl',
    nazwa: 'Umowa kupna-sprzedaży pojazdu (PL)',
    kategoria: 'Motoryzacja',
    opis: 'Umowa kupna-sprzedaży pojazdu używanego zakupionego w Polsce',
    pytania: [
      { id: 'nazwa_organu', label: 'Miejsce zawarcia umowy', placeholder: 'np. Warszawa', type: 'text' },
      { id: 'data_zawarcia', label: 'Data zawarcia umowy', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'dane_sprzedajacego', label: 'Dane sprzedającego (PESEL)', placeholder: 'Imię, nazwisko, adres, PESEL', type: 'textarea' },
      { id: 'dane_kupujacego', label: 'Dane kupującego (PESEL)', placeholder: 'Imię, nazwisko, adres, PESEL', type: 'textarea' },
      { id: 'marka_model', label: 'Marka i model pojazdu', placeholder: 'np. Volkswagen Golf VII', type: 'text' },
      { id: 'rok_produkcji', label: 'Rok produkcji', placeholder: 'np. 2015', type: 'text' },
      { id: 'numer_vin', label: 'Numer VIN', placeholder: 'np. WVWZZZ1KZBW123456', type: 'text' },
      { id: 'numer_rejestracyjny', label: 'Numer rejestracyjny', placeholder: 'np. WA 12345', type: 'text' },
      { id: 'przebieg', label: 'Przebieg (km)', placeholder: 'np. 120000', type: 'text' },
      { id: 'pojemnosc', label: 'Pojemność silnika (cm³)', placeholder: 'np. 1598', type: 'text' },
      { id: 'rodzaj_paliwa', label: 'Rodzaj paliwa', placeholder: 'np. benzyna, diesel, LPG', type: 'text' },
      { id: 'numer_dowodu', label: 'Numer dowodu rejestracyjnego', placeholder: 'np. ABC123456', type: 'text' },
      { id: 'cena_slownie', label: 'Cena (zł)', placeholder: 'np. 35000', type: 'text' },
      { id: 'dodatkowe_informacje', label: 'Dodatkowe informacje o stanie pojazdu', placeholder: 'np. wyposażenie dodatkowe, wady, naprawy', type: 'textarea' }
    ]
  },
  {
    id: 'umowa_kupna_sprzedazy_auto_zagranica',
    nazwa: 'Umowa kupna-sprzedaży pojazdu (z zagranicy)',
    kategoria: 'Motoryzacja',
    opis: 'Umowa kupna-sprzedaży pojazdu sprowadzonego z zagranicy',
    pytania: [
      { id: 'nazwa_organu', label: 'Miejsce zawarcia umowy', placeholder: 'np. Berlin, Niemcy', type: 'text' },
      { id: 'data_zawarcia', label: 'Data zawarcia umowy', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'dane_sprzedajacego', label: 'Dane sprzedającego (zagraniczne)', placeholder: 'Imię, nazwisko/firma, adres, dane identyfikacyjne', type: 'textarea' },
      { id: 'dane_kupujacego', label: 'Dane kupującego (PESEL)', placeholder: 'Imię, nazwisko, adres w Polsce, PESEL', type: 'textarea' },
      { id: 'marka_model', label: 'Marka i model pojazdu', placeholder: 'np. BMW 320d', type: 'text' },
      { id: 'rok_produkcji', label: 'Rok produkcji', placeholder: 'np. 2018', type: 'text' },
      { id: 'numer_vin', label: 'Numer VIN', placeholder: 'np. WBA8E5101JA123456', type: 'text' },
      { id: 'kraj_rejestracji', label: 'Kraj dotychczasowej rejestracji', placeholder: 'np. Niemcy', type: 'text' },
      { id: 'numer_rejestracyjny_zagraniczny', label: 'Zagraniczny nr rejestracyjny', placeholder: 'np. B-AB 1234', type: 'text' },
      { id: 'przebieg', label: 'Przebieg (km)', placeholder: 'np. 85000', type: 'text' },
      { id: 'pojemnosc', label: 'Pojemność silnika (cm³)', placeholder: 'np. 1995', type: 'text' },
      { id: 'rodzaj_paliwa', label: 'Rodzaj paliwa', placeholder: 'np. diesel', type: 'text' },
      { id: 'cena_slownie', label: 'Cena w PLN lub EUR', placeholder: 'np. 15000 EUR lub 65000 PLN', type: 'text' },
      { id: 'data_pierwszej_rejestracji', label: 'Data pierwszej rejestracji', placeholder: 'np. 15.03.2018', type: 'text' },
      { id: 'dokumenty_pojazdu', label: 'Przekazywane dokumenty', placeholder: 'np. dowód rejestracyjny, karta pojazdu, serwisówka', type: 'textarea' }
    ]
  },
  {
    id: 'pelnomocnictwo_wyrejestrowanie',
    nazwa: 'Pełnomocnictwo do wyrejestrowania pojazdu',
    kategoria: 'Motoryzacja',
    opis: 'Pełnomocnictwo dla kupującego do wyrejestrowania pojazdu po sprzedaży',
    pytania: [
      { id: 'nazwa_organu', label: 'Wydział Komunikacji / Starostwo', placeholder: 'np. Wydział Komunikacji Urzędu Miasta Warszawy', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Marszałkowska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'dane_pelnomocnika', label: 'Dane pełnomocnika (kupującego)', placeholder: 'Imię, nazwisko, PESEL, adres', type: 'textarea' },
      { id: 'marka_model', label: 'Marka i model pojazdu', placeholder: 'np. Ford Focus', type: 'text' },
      { id: 'numer_vin', label: 'Numer VIN', placeholder: 'np. WF0AXXGCDA123456', type: 'text' },
      { id: 'numer_rejestracyjny', label: 'Numer rejestracyjny', placeholder: 'np. WA 12345', type: 'text' },
      { id: 'zakres', label: 'Zakres pełnomocnictwa', placeholder: 'np. wyrejestrowanie pojazdu, odbiór dokumentów', type: 'textarea' }
    ]
  },
  {
    id: 'pelnomocnictwo_zarejestrowanie',
    nazwa: 'Pełnomocnictwo do zarejestrowania pojazdu',
    kategoria: 'Motoryzacja',
    opis: 'Pełnomocnictwo do zarejestrowania pojazdu w urzędzie',
    pytania: [
      { id: 'nazwa_organu', label: 'Wydział Komunikacji / Starostwo', placeholder: 'np. Wydział Komunikacji Urzędu Miasta Warszawy', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Marszałkowska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'dane_pelnomocnika', label: 'Dane pełnomocnika', placeholder: 'Imię, nazwisko, PESEL, adres osoby, która ma załatwić sprawę', type: 'textarea' },
      { id: 'marka_model', label: 'Marka i model pojazdu', placeholder: 'np. Opel Astra', type: 'text' },
      { id: 'numer_vin', label: 'Numer VIN', placeholder: 'np. W0L0AHL123456789', type: 'text' },
      { id: 'zakres', label: 'Zakres pełnomocnictwa', placeholder: 'np. rejestracja pojazdu, odbiór dokumentów, składanie wniosków', type: 'textarea' }
    ]
  },
  {
    id: 'pelnomocnictwo_import_auto',
    nazwa: 'Pełnomocnictwo do sprowadzenia auta z zagranicy',
    kategoria: 'Motoryzacja',
    opis: 'Pełnomocnictwo do reprezentowania w sprawach związanych z importem pojazdu',
    pytania: [
      { id: 'nazwa_organu', label: 'Właściwe urzędy', placeholder: 'np. Wydział Komunikacji, Urząd Celny, inne instytucje', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer (jeśli konkretny)', placeholder: 'np. ul. Marszałkowska 1 lub "dowolny"', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'dane_pelnomocnika', label: 'Dane pełnomocnika', placeholder: 'Imię, nazwisko, PESEL, adres osoby, która sprowadza auto', type: 'textarea' },
      { id: 'marka_model', label: 'Marka i model pojazdu', placeholder: 'np. Mercedes-Benz E220', type: 'text' },
      { id: 'numer_vin', label: 'Numer VIN', placeholder: 'np. WDD2120071A123456', type: 'text' },
      { id: 'kraj_pochodzenia', label: 'Kraj pochodzenia pojazdu', placeholder: 'np. Niemcy', type: 'text' },
      { id: 'zakres', label: 'Zakres pełnomocnictwa', placeholder: 'np. odprawa celna, rejestracja, badania techniczne, tłumaczenie dokumentów', type: 'textarea' }
    ]
  },
  {
    id: 'oswiadczenie_sprzedaz_auto',
    nazwa: 'Oświadczenie o sprzedaży pojazdu',
    kategoria: 'Motoryzacja',
    opis: 'Oświadczenie sprzedającego o sprzedaży pojazdu (do wydziału komunikacji)',
    pytania: [
      { id: 'nazwa_organu', label: 'Wydział Komunikacji', placeholder: 'np. Wydział Komunikacji Starostwa Powiatowego w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Marszałkowska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'marka_model', label: 'Marka i model pojazdu', placeholder: 'np. Skoda Octavia', type: 'text' },
      { id: 'numer_vin', label: 'Numer VIN', placeholder: 'np. TMBJG7NE0C0123456', type: 'text' },
      { id: 'numer_rejestracyjny', label: 'Numer rejestracyjny', placeholder: 'np. WA 12345', type: 'text' },
      { id: 'dane_kupujacego', label: 'Dane kupującego', placeholder: 'Imię, nazwisko, PESEL, adres nowego właściciela', type: 'textarea' },
      { id: 'data_sprzedazy', label: 'Data sprzedaży', placeholder: 'np. 15.01.2025', type: 'text' }
    ]
  },
  {
    id: 'wniosek_rejestracja_auto_import',
    nazwa: 'Wniosek o rejestrację pojazdu sprowadzonego z zagranicy',
    kategoria: 'Motoryzacja',
    opis: 'Wniosek o pierwszą rejestrację pojazdu importowanego do Polski',
    pytania: [
      { id: 'nazwa_organu', label: 'Wydział Komunikacji', placeholder: 'np. Wydział Komunikacji Starostwa Powiatowego w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Marszałkowska 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'marka_model', label: 'Marka i model pojazdu', placeholder: 'np. Audi A6', type: 'text' },
      { id: 'rok_produkcji', label: 'Rok produkcji', placeholder: 'np. 2017', type: 'text' },
      { id: 'numer_vin', label: 'Numer VIN', placeholder: 'np. WAUZZZ4G7DN123456', type: 'text' },
      { id: 'kraj_pochodzenia', label: 'Kraj pochodzenia', placeholder: 'np. Niemcy', type: 'text' },
      { id: 'data_zakupu', label: 'Data zakupu pojazdu', placeholder: 'np. 10.01.2025', type: 'text' },
      { id: 'numer_faktury', label: 'Numer faktury zakupu', placeholder: 'np. FV/2025/001 (jeśli dotyczy)', type: 'text' },
      { id: 'pojemnosc', label: 'Pojemność silnika (cm³)', placeholder: 'np. 2967', type: 'text' },
      { id: 'rodzaj_paliwa', label: 'Rodzaj paliwa', placeholder: 'np. diesel', type: 'text' },
      { id: 'dokumenty_zalaczone', label: 'Załączane dokumenty', placeholder: 'np. umowa, dokument celny, certyfikat COC, badanie techniczne', type: 'textarea' }
    ]
  }
];

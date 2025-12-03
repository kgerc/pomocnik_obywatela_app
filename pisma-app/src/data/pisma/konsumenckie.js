// Pisma związane z prawami konsumenta

export const pismaKonsumenckie = [
  {
    id: 'zwrot_zakupow_internetowych',
    nazwa: 'Wniosek o zwrot zakupów internetowych',
    kategoria: 'Prawa konsumenta',
    opis: 'Odstąpienie od umowy zakupu online w ciągu 14 dni',
    pytania: [
      { id: 'nazwa_sklepu', label: 'Nazwa sklepu/sprzedawcy', placeholder: 'np. Allegro, Sklep XYZ', type: 'text' },
      { id: 'numer_zamowienia', label: 'Numer zamówienia', placeholder: 'np. 123456789', type: 'text' },
      { id: 'data_zakupu', label: 'Data zakupu/otrzymania', placeholder: 'np. 10.01.2025', type: 'text' },
      { id: 'produkt', label: 'Co zakupiłeś?', placeholder: 'np. Laptop Dell XPS 15', type: 'text' },
      { id: 'kwota', label: 'Wartość zakupu (zł)', placeholder: 'np. 5000', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do zwrotu', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  },
  {
    id: 'prosba_sprostowanie_danych_bank',
    nazwa: 'Prośba o sprostowanie danych w banku',
    kategoria: 'Bankowość',
    opis: 'Wniosek o poprawienie błędnych danych osobowych w banku',
    pytania: [
      { id: 'nazwa_banku', label: 'Nazwa banku', placeholder: 'np. PKO BP, mBank', type: 'text' },
      { id: 'numer_rachunku', label: 'Numer rachunku bankowego', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' },
      { id: 'dane_bledne', label: 'Jakie dane są błędne?', placeholder: 'np. adres, numer telefonu, PESEL', type: 'text' },
      { id: 'dane_poprawne', label: 'Jakie są poprawne dane?', placeholder: 'Podaj właściwe informacje', type: 'textarea' }
    ]
  },
  {
    id: 'zgloszenie_szkody_ubezpieczyciel',
    nazwa: 'Zgłoszenie szkody do ubezpieczyciela',
    kategoria: 'Ubezpieczenia',
    opis: 'Minimalistyczne zgłoszenie szkody do towarzystwa ubezpieczeniowego',
    pytania: [
      { id: 'ubezpieczyciel', label: 'Nazwa ubezpieczyciela', placeholder: 'np. PZU, Warta, Ergo Hestia', type: 'text' },
      { id: 'numer_polisy', label: 'Numer polisy', placeholder: 'np. POL/2025/123456', type: 'text' },
      { id: 'data_zdarzenia', label: 'Data zdarzenia', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'miejsce_zdarzenia', label: 'Miejsce zdarzenia', placeholder: 'np. ul. Główna 10, Warszawa', type: 'text' },
      { id: 'opis_szkody', label: 'Opis szkody', placeholder: 'Opisz co się stało i jakie powstały szkody', type: 'textarea' },
      { id: 'szacowana_wartosc', label: 'Szacowana wartość szkody (zł)', placeholder: 'np. 3000', type: 'text' }
    ]
  },
  {
    id: 'reklamacja_rekojmia',
    nazwa: 'Reklamacja towaru z tytułu rękojmi',
    kategoria: 'Prawa konsumenta',
    opis: 'Zgłoś wadę towaru i dochódź swoich praw jako konsument',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa sprzedawcy/sklepu', placeholder: 'np. Media Expert Sp. z o.o.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer sklepu', placeholder: 'np. ul. Handlowa 5', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 02-677 Warszawa', type: 'text' },
      { id: 'produkt', label: 'Nazwa produktu', placeholder: 'np. Laptop Dell Inspiron 15', type: 'text' },
      { id: 'data_zakupu', label: 'Data zakupu', placeholder: 'np. 15.06.2024', type: 'text' },
      { id: 'numer_paragonu', label: 'Numer paragonu/faktury', placeholder: 'np. PAR/2024/12345', type: 'text' },
      { id: 'opis_wady', label: 'Opis wady/problemu', placeholder: 'Dokładnie opisz, co jest nie tak z produktem', type: 'textarea' },
      { id: 'zadanie', label: 'Czego żądasz?', placeholder: 'np. naprawy, wymiany na nowy, zwrotu pieniędzy', type: 'text' }
    ]
  },
  {
    id: 'reklamacja_gwarancja',
    nazwa: 'Reklamacja towaru z tytułu gwarancji',
    kategoria: 'Prawa konsumenta',
    opis: 'Zgłoś reklamację w ramach gwarancji producenta',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa producenta/gwaranta', placeholder: 'np. Samsung Electronics Polska Sp. z o.o.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Postępu 14', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 02-676 Warszawa', type: 'text' },
      { id: 'produkt', label: 'Nazwa produktu i model', placeholder: 'np. Smartfon Samsung Galaxy S24', type: 'text' },
      { id: 'numer_seryjny', label: 'Numer seryjny urządzenia', placeholder: 'np. SN123456789', type: 'text' },
      { id: 'data_zakupu', label: 'Data zakupu', placeholder: 'np. 10.03.2024', type: 'text' },
      { id: 'okres_gwarancji', label: 'Okres gwarancji', placeholder: 'np. 24 miesiące', type: 'text' },
      { id: 'opis_wady', label: 'Opis usterki', placeholder: 'Opisz problem objęty gwarancją', type: 'textarea' }
    ]
  },
  {
    id: 'reklamacja_uslugi',
    nazwa: 'Reklamacja usługi',
    kategoria: 'Prawa konsumenta',
    opis: 'Zgłoś wadliwie wykonaną usługę',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa firmy świadczącej usługę', placeholder: 'np. Auto Serwis Kowalski', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Mechaniczna 12', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 30-001 Kraków', type: 'text' },
      { id: 'rodzaj_uslugi', label: 'Jakiej usługi dotyczy reklamacja?', placeholder: 'np. naprawa samochodu, remont mieszkania', type: 'text' },
      { id: 'data_wykonania', label: 'Data wykonania usługi', placeholder: 'np. 20.11.2024', type: 'text' },
      { id: 'kwota', label: 'Kwota zapłacona za usługę', placeholder: 'np. 2500 zł', type: 'text' },
      { id: 'opis_problemu', label: 'Opis nieprawidłowości', placeholder: 'Opisz, co zostało źle wykonane', type: 'textarea' },
      { id: 'zadanie', label: 'Czego żądasz?', placeholder: 'np. ponownego wykonania, obniżenia ceny, zwrotu pieniędzy', type: 'text' }
    ]
  },
  {
    id: 'zadanie_obnizenia_ceny',
    nazwa: 'Żądanie obniżenia ceny',
    kategoria: 'Prawa konsumenta',
    opis: 'Żądaj obniżenia ceny za towar z wadą',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa sprzedawcy', placeholder: 'np. RTV Euro AGD', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Handlowa 8', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 00-001 Warszawa', type: 'text' },
      { id: 'produkt', label: 'Nazwa produktu', placeholder: 'np. Pralka Bosch Serie 6', type: 'text' },
      { id: 'data_zakupu', label: 'Data zakupu', placeholder: 'np. 05.09.2024', type: 'text' },
      { id: 'kwota_zakupu', label: 'Cena zakupu', placeholder: 'np. 2800 zł', type: 'text' },
      { id: 'opis_wady', label: 'Opis wady', placeholder: 'Opisz usterkę wpływającą na wartość', type: 'textarea' },
      { id: 'kwota_obnizenia', label: 'O ile żądasz obniżenia ceny?', placeholder: 'np. 500 zł', type: 'text' }
    ]
  },
  {
    id: 'zadanie_naprawy_wymiany',
    nazwa: 'Żądanie naprawy lub wymiany towaru',
    kategoria: 'Prawa konsumenta',
    opis: 'Zażądaj naprawy lub wymiany wadliwego produktu',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa sprzedawcy', placeholder: 'np. Komputronik S.A.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Wołoska 5', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 02-675 Warszawa', type: 'text' },
      { id: 'produkt', label: 'Nazwa produktu', placeholder: 'np. Monitor LG UltraWide 34"', type: 'text' },
      { id: 'data_zakupu', label: 'Data zakupu', placeholder: 'np. 12.08.2024', type: 'text' },
      { id: 'numer_dowodu', label: 'Numer paragonu/faktury', placeholder: 'np. FV/2024/08/12345', type: 'text' },
      { id: 'opis_wady', label: 'Opis wady', placeholder: 'Opisz problem z produktem', type: 'textarea' },
      { id: 'zadanie', label: 'Czego żądasz?', placeholder: 'naprawy lub wymiany na nowy egzemplarz', type: 'text' }
    ]
  },
  {
    id: 'odstapienie_umowy_odleglosc',
    nazwa: 'Odstąpienie od umowy zawartej na odległość',
    kategoria: 'Prawa konsumenta',
    opis: 'Odstąp od zakupu online w ciągu 14 dni bez podania przyczyny',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa sklepu internetowego', placeholder: 'np. Allegro Sp. z o.o.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer (adres siedziby)', placeholder: 'np. ul. Grunwaldzka 182', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 60-166 Poznań', type: 'text' },
      { id: 'numer_zamowienia', label: 'Numer zamówienia', placeholder: 'np. ZAM/2024/987654', type: 'text' },
      { id: 'data_otrzymania', label: 'Data otrzymania towaru', placeholder: 'np. 28.11.2024', type: 'text' },
      { id: 'produkt', label: 'Nazwa produktu', placeholder: 'np. Słuchawki bezprzewodowe Sony WH-1000XM5', type: 'text' },
      { id: 'kwota', label: 'Wartość zakupu', placeholder: 'np. 1399 zł', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do zwrotu', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  },
  {
    id: 'odstapienie_umowy_poza_lokalem',
    nazwa: 'Odstąpienie od umowy zawartej poza lokalem przedsiębiorstwa',
    kategoria: 'Prawa konsumenta',
    opis: 'Odstąp od umowy podpisanej w domu, na ulicy lub w innym miejscu niż lokal firmy',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa przedsiębiorcy', placeholder: 'np. Fotowoltaika Plus Sp. z o.o.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Słoneczna 45', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 50-001 Wrocław', type: 'text' },
      { id: 'data_zawarcia', label: 'Data zawarcia umowy', placeholder: 'np. 01.12.2024', type: 'text' },
      { id: 'miejsce_zawarcia', label: 'Gdzie zawarto umowę?', placeholder: 'np. w moim mieszkaniu, na ulicy', type: 'text' },
      { id: 'przedmiot_umowy', label: 'Czego dotyczyła umowa?', placeholder: 'np. montaż paneli fotowoltaicznych, okna', type: 'text' },
      { id: 'wartosc_umowy', label: 'Wartość umowy', placeholder: 'np. 35000 zł', type: 'text' }
    ]
  },
  {
    id: 'wezwanie_zwrot_oplaty',
    nazwa: 'Wezwanie do zwrotu nienależnej opłaty',
    kategoria: 'Prawa konsumenta',
    opis: 'Żądaj zwrotu niesłusznie pobranej opłaty',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa firmy', placeholder: 'np. T-Mobile Polska S.A.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Marynarska 12', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 02-674 Warszawa', type: 'text' },
      { id: 'rodzaj_oplaty', label: 'Jakiej opłaty dotyczy?', placeholder: 'np. opłata za usługę, która nie była świadczona', type: 'text' },
      { id: 'kwota', label: 'Kwota nienależnej opłaty', placeholder: 'np. 89 zł', type: 'text' },
      { id: 'data_pobrania', label: 'Kiedy pobrano opłatę?', placeholder: 'np. 15.11.2024', type: 'text' },
      { id: 'uzasadnienie', label: 'Dlaczego opłata jest nienależna?', placeholder: 'Opisz powód, dla którego opłata nie powinna być pobrana', type: 'textarea' },
      { id: 'numer_konta', label: 'Numer konta do zwrotu', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  },
  {
    id: 'wezwanie_usuniecie_wad',
    nazwa: 'Wezwanie do usunięcia wad towaru',
    kategoria: 'Prawa konsumenta',
    opis: 'Wezwij sprzedawcę do naprawy wadliwego produktu',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa sprzedawcy', placeholder: 'np. Media Markt Polska Sp. z o.o.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Puławska 14', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 02-566 Warszawa', type: 'text' },
      { id: 'produkt', label: 'Nazwa produktu', placeholder: 'np. Telewizor Samsung QLED 55"', type: 'text' },
      { id: 'data_zakupu', label: 'Data zakupu', placeholder: 'np. 20.07.2024', type: 'text' },
      { id: 'opis_wad', label: 'Opis wad do usunięcia', placeholder: 'Szczegółowo opisz wady wymagające naprawy', type: 'textarea' },
      { id: 'termin', label: 'W jakim terminie żądasz naprawy?', placeholder: 'np. 14 dni od otrzymania wezwania', type: 'text' }
    ]
  },
  {
    id: 'wezwanie_wykonanie_umowy',
    nazwa: 'Wezwanie do wykonania umowy',
    kategoria: 'Prawa konsumenta',
    opis: 'Wezwij przedsiębiorcę do wywiązania się z umowy',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa firmy', placeholder: 'np. Meble na Wymiar Sp. z o.o.', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer', placeholder: 'np. ul. Stołowa 8', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto', placeholder: 'np. 40-001 Katowice', type: 'text' },
      { id: 'przedmiot_umowy', label: 'Czego dotyczy umowa?', placeholder: 'np. wykonanie i montaż mebli kuchennych', type: 'text' },
      { id: 'data_umowy', label: 'Data zawarcia umowy', placeholder: 'np. 10.09.2024', type: 'text' },
      { id: 'termin_wykonania', label: 'Ustalony termin wykonania', placeholder: 'np. 15.11.2024', type: 'text' },
      { id: 'co_niewykonane', label: 'Co nie zostało wykonane?', placeholder: 'Opisz, czego przedsiębiorca nie zrobił zgodnie z umową', type: 'textarea' },
      { id: 'termin_wezwania', label: 'W jakim terminie ma wykonać?', placeholder: 'np. 7 dni od otrzymania wezwania', type: 'text' }
    ]
  }
];

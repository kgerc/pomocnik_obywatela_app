// Pisma z zakresu pomocy społecznej (MOPS/GOPS)

export const pismaPomocSpoleczna = [
  {
    id: 'wniosek_zasilek_staly',
    nazwa: 'Wniosek o zasiłek stały',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o zasiłek stały w MOPS/GOPS dla osób niezdolnych do pracy',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Konwiktorska 3', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 00-217 Warszawa', type: 'text' },
      { id: 'liczba_osob', label: 'Liczba osób w gospodarstwie domowym', placeholder: 'np. 1 osoba / 3 osoby', type: 'text' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny gospodarstwa (netto)', placeholder: 'np. 800 zł', type: 'text' },
      { id: 'sytuacja_zdrowotna', label: 'Opisz swoją sytuację zdrowotną i niezdolność do pracy', placeholder: 'np. orzeczenie o znacznym stopniu niepełnosprawności, choroby przewlekłe', type: 'textarea' },
      { id: 'dodatkowe_informacje', label: 'Dodatkowe informacje o sytuacji życiowej', placeholder: 'np. brak wsparcia rodziny, wysokie koszty leczenia', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_zasilek_okresowy',
    nazwa: 'Wniosek o zasiłek okresowy',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o zasiłek okresowy w MOPS/GOPS w trudnej sytuacji życiowej',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Gminny Ośrodek Pomocy Społecznej w Krakowie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Rynek Główny 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 31-042 Kraków', type: 'text' },
      { id: 'liczba_osob', label: 'Liczba osób w gospodarstwie domowym', placeholder: 'np. 2 osoby', type: 'text' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny gospodarstwa (netto)', placeholder: 'np. 500 zł', type: 'text' },
      { id: 'okres_pomocy', label: 'Na jaki okres potrzebujesz pomocy?', placeholder: 'np. 6 miesięcy, do czasu znalezienia pracy', type: 'text' },
      { id: 'powod_trudnej_sytuacji', label: 'Opisz powód trudnej sytuacji życiowej', placeholder: 'np. utrata pracy, choroba, śmierć osoby bliskiej, rozwód', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_zasilek_celowy',
    nazwa: 'Wniosek o zasiłek celowy',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o zasiłek celowy na konkretny cel (żywność, leki, opał, odzież, remont)',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej w Poznaniu', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Grunwaldzka 12', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 60-780 Poznań', type: 'text' },
      { id: 'liczba_osob', label: 'Liczba osób w gospodarstwie domowym', placeholder: 'np. 4 osoby', type: 'text' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny gospodarstwa (netto)', placeholder: 'np. 1200 zł', type: 'text' },
      { id: 'cel_zasilku', label: 'Na jaki cel potrzebujesz zasiłku?', placeholder: 'np. zakup opału na zimę / zakup leków / remont po zalaniu', type: 'text' },
      { id: 'kwota_potrzebna', label: 'Jaka kwota jest potrzebna?', placeholder: 'np. 500 zł', type: 'text' },
      { id: 'uzasadnienie', label: 'Szczegółowe uzasadnienie potrzeby', placeholder: 'Opisz dlaczego potrzebujesz tej pomocy i dlaczego nie możesz pokryć tego kosztu samodzielnie', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_specjalny_zasilek_celowy',
    nazwa: 'Wniosek o specjalny zasiłek celowy',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o specjalny zasiłek celowy dla osób przekraczających kryterium dochodowe',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej we Wrocławiu', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Świdnicka 40', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 50-028 Wrocław', type: 'text' },
      { id: 'liczba_osob', label: 'Liczba osób w gospodarstwie domowym', placeholder: 'np. 3 osoby', type: 'text' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny gospodarstwa (netto)', placeholder: 'np. 2500 zł', type: 'text' },
      { id: 'zdarzenie_losowe', label: 'Opisz zdarzenie losowe lub sytuację kryzysową', placeholder: 'np. pożar mieszkania, powódź, kradzież, śmierć członka rodziny, nagła choroba wymagająca kosztownego leczenia', type: 'textarea' },
      { id: 'cel_zasilku', label: 'Na jaki cel potrzebujesz pomocy?', placeholder: 'np. zakup mebli po pożarze, remont po zalaniu, koszty pogrzebu', type: 'text' },
      { id: 'kwota_potrzebna', label: 'Jaka kwota jest potrzebna?', placeholder: 'np. 2000 zł', type: 'text' }
    ]
  },
  {
    id: 'wniosek_pomoc_posilek',
    nazwa: 'Wniosek o pomoc w formie posiłku',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o pomoc w formie posiłku dla dzieci, osób starszych lub rodzin w trudnej sytuacji',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Gminny Ośrodek Pomocy Społecznej w Gdańsku', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Długa 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 80-827 Gdańsk', type: 'text' },
      { id: 'liczba_osob', label: 'Liczba osób w gospodarstwie domowym', placeholder: 'np. 5 osób (2 dorosłych, 3 dzieci)', type: 'text' },
      { id: 'liczba_osob_objeta_pomoca', label: 'Dla ilu osób wnioskujesz o pomoc w formie posiłku?', placeholder: 'np. 3 dzieci w wieku 6, 8 i 10 lat', type: 'text' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny gospodarstwa (netto)', placeholder: 'np. 1500 zł', type: 'text' },
      { id: 'dochod_na_osobe', label: 'Dochód na osobę w gospodarstwie', placeholder: 'np. 300 zł', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie wniosku', placeholder: 'Opisz dlaczego potrzebujesz pomocy w formie posiłku', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_dozywianie_szkola',
    nazwa: 'Wniosek o dożywianie w szkole',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o dożywianie dziecka w szkole w ramach programu "Posiłek w szkole i w domu"',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej lub szkoły', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej w Łodzi', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka/szkoły', placeholder: 'np. ul. Piotrkowska 104', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka/szkoły', placeholder: 'np. 90-926 Łódź', type: 'text' },
      { id: 'dane_dziecka', label: 'Imię, nazwisko i wiek dziecka', placeholder: 'np. Jan Kowalski, 8 lat', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły i klasa', placeholder: 'np. Szkoła Podstawowa nr 12, klasa 2a', type: 'text' },
      { id: 'liczba_osob', label: 'Liczba osób w gospodarstwie domowym', placeholder: 'np. 4 osoby', type: 'text' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny gospodarstwa (netto)', placeholder: 'np. 1800 zł', type: 'text' },
      { id: 'dochod_na_osobe', label: 'Dochód na osobę w gospodarstwie', placeholder: 'np. 450 zł', type: 'text' },
      { id: 'rodzaj_posilku', label: 'Jaki rodzaj posiłku wnioskujesz?', placeholder: 'np. obiad / śniadanie i obiad', type: 'text' }
    ]
  },
  {
    id: 'wniosek_schronienie',
    nazwa: 'Wniosek o schronienie (noclegownia, ogrzewalnia)',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o udzielenie schronienia w noclegowni lub ogrzewalni',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej w Katowicach', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Powstańców 23', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 40-039 Katowice', type: 'text' },
      { id: 'rodzaj_pomocy', label: 'Jaki rodzaj schronienia potrzebujesz?', placeholder: 'np. noclegownia / ogrzewalnia / dom dla bezdomnych', type: 'text' },
      { id: 'okres_pomocy', label: 'Na jaki okres potrzebujesz pomocy?', placeholder: 'np. 3 miesiące / do czasu znalezienia mieszkania', type: 'text' },
      { id: 'sytuacja_mieszkaniowa', label: 'Opisz swoją aktualną sytuację mieszkaniową', placeholder: 'np. eksmisja, utrata mieszkania, brak środków na wynajem', type: 'textarea' },
      { id: 'sytuacja_zyciowa', label: 'Opisz swoją sytuację życiową', placeholder: 'np. bezrobocie, brak wsparcia rodziny, problemy zdrowotne', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_uslugi_opiekuncze',
    nazwa: 'Wniosek o usługi opiekuńcze / specjalistyczne usługi opiekuńcze',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o usługi opiekuńcze w miejscu zamieszkania',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Gminny Ośrodek Pomocy Społecznej w Lublinie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Krakowskie Przedmieście 53', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 20-076 Lublin', type: 'text' },
      { id: 'rodzaj_uslug', label: 'Jaki rodzaj usług potrzebujesz?', placeholder: 'np. usługi opiekuńcze / specjalistyczne usługi opiekuńcze dla osób z chorobą Alzheimera', type: 'text' },
      { id: 'zakres_uslug', label: 'Jaki zakres usług jest potrzebny?', placeholder: 'np. pomoc w czynnościach codziennych, przygotowywanie posiłków, zakupy, opieka pielęgniarska', type: 'textarea' },
      { id: 'liczba_godzin', label: 'Ile godzin usług tygodniowo potrzebujesz?', placeholder: 'np. 10 godzin tygodniowo', type: 'text' },
      { id: 'sytuacja_zdrowotna', label: 'Opisz swoją sytuację zdrowotną', placeholder: 'np. niepełnosprawność, choroba przewlekła, niezdolność do samodzielnej egzystencji', type: 'textarea' },
      { id: 'sytuacja_rodzinna', label: 'Opisz swoją sytuację rodzinną', placeholder: 'np. brak rodziny, rodzina mieszka daleko i nie może pomagać', type: 'textarea' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny (netto)', placeholder: 'np. 1500 zł (emerytura)', type: 'text' }
    ]
  },
  {
    id: 'wniosek_pokrycie_kosztow_pogrzebu',
    nazwa: 'Wniosek o pokrycie kosztów pogrzebu osoby bezdomnej',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o pokrycie kosztów pogrzebu osoby bezdomnej lub bliskiej bez środków',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej w Warszawie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Konwiktorska 3', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 00-217 Warszawa', type: 'text' },
      { id: 'dane_zmarlego', label: 'Imię, nazwisko i PESEL zmarłego', placeholder: 'np. Jan Kowalski, PESEL: 12345678901', type: 'text' },
      { id: 'data_zgonu', label: 'Data zgonu', placeholder: 'np. 15.03.2025', type: 'text' },
      { id: 'miejsce_zgonu', label: 'Miejsce zgonu', placeholder: 'np. Szpital Bródnowski w Warszawie', type: 'text' },
      { id: 'stosunek_do_zmarlego', label: 'Jaki jest Twój stosunek do zmarłego?', placeholder: 'np. osoba organizująca pogrzeb / członek rodziny / opiekun', type: 'text' },
      { id: 'brak_rodziny', label: 'Czy zmarły miał rodzinę? Jeśli tak, dlaczego nie może pokryć kosztów?', placeholder: 'np. brak rodziny / rodzina w trudnej sytuacji materialnej / brak kontaktu z rodziną', type: 'textarea' },
      { id: 'szacunkowe_koszty', label: 'Szacunkowe koszty pogrzebu', placeholder: 'np. 3000 zł', type: 'text' },
      { id: 'uzasadnienie', label: 'Dodatkowe uzasadnienie', placeholder: 'Opisz sytuację i dlaczego koszty nie mogą być pokryte z innych źródeł', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_skierowanie_dps',
    nazwa: 'Wniosek o skierowanie do domu pomocy społecznej (DPS)',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o skierowanie do domu pomocy społecznej dla osób wymagających całodobowej opieki',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej w Krakowie', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Rynek Główny 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 31-042 Kraków', type: 'text' },
      { id: 'typ_dps', label: 'Jaki typ domu pomocy społecznej jest potrzebny?', placeholder: 'np. dla osób starszych / dla osób przewlekle psychicznie chorych / dla osób niepełnosprawnych intelektualnie', type: 'text' },
      { id: 'sytuacja_zdrowotna', label: 'Opisz swoją sytuację zdrowotną', placeholder: 'np. schorzenia, stopień niepełnosprawności, potrzeba całodobowej opieki', type: 'textarea' },
      { id: 'sytuacja_rodzinna', label: 'Opisz swoją sytuację rodzinną i mieszkaniową', placeholder: 'np. brak rodziny, niemożność samodzielnego funkcjonowania, brak opieki w domu', type: 'textarea' },
      { id: 'aktualne_miejsce', label: 'Gdzie obecnie mieszkasz?', placeholder: 'np. w domu samodzielnie / u rodziny / w szpitalu', type: 'text' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny (netto)', placeholder: 'np. 1800 zł (emerytura)', type: 'text' },
      { id: 'uzasadnienie', label: 'Dlaczego potrzebujesz umieszczenia w DPS?', placeholder: 'Opisz szczegółowo powody, dla których potrzebujesz całodobowej opieki', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_refundacja_opal',
    nazwa: 'Wniosek o refundację zakupu opału/energii',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o zwrot kosztów zakupu opału lub energii elektrycznej w ramach dodatku węglowego',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Gminny Ośrodek Pomocy Społecznej w Poznaniu', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Grunwaldzka 12', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 60-780 Poznań', type: 'text' },
      { id: 'liczba_osob', label: 'Liczba osób w gospodarstwie domowym', placeholder: 'np. 3 osoby', type: 'text' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny gospodarstwa (netto)', placeholder: 'np. 2200 zł', type: 'text' },
      { id: 'rodzaj_opalu', label: 'Jaki rodzaj opału lub energii?', placeholder: 'np. węgiel / drewno / energia elektryczna / gaz / olej opałowy', type: 'text' },
      { id: 'kwota_wydatkow', label: 'Kwota poniesionych wydatków', placeholder: 'np. 3000 zł', type: 'text' },
      { id: 'data_zakupu', label: 'Data zakupu opału/energii', placeholder: 'np. 15.10.2024', type: 'text' },
      { id: 'zrodlo_ogrzewania', label: 'Główne źródło ogrzewania w domu', placeholder: 'np. piec węglowy / kocioł gazowy / ogrzewanie elektryczne', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie wniosku', placeholder: 'Opisz dlaczego potrzebujesz pomocy w pokryciu kosztów ogrzewania', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_interwencja_pracownik_socjalny',
    nazwa: 'Wniosek o interwencję pracownika socjalnego',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o interwencję pracownika socjalnego w sytuacji kryzysowej',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej we Wrocławiu', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Świdnicka 40', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 50-028 Wrocław', type: 'text' },
      { id: 'adres_interwencji', label: 'Adres, gdzie potrzebna jest interwencja', placeholder: 'np. ul. Kwiatowa 15/3, 50-123 Wrocław', type: 'text' },
      { id: 'dotyczy_kogo', label: 'Kogo dotyczy interwencja?', placeholder: 'np. mnie samego / osoby bliskiej / sąsiada / dziecka', type: 'text' },
      { id: 'rodzaj_sytuacji', label: 'Jaki rodzaj sytuacji kryzysowej?', placeholder: 'np. zaniedbanie dzieci / przemoc domowa / bezdomność / uzależnienie / choroba psychiczna', type: 'text' },
      { id: 'pilnosc', label: 'Czy sytuacja wymaga pilnej interwencji?', placeholder: 'np. tak, sytuacja zagraża życiu lub zdrowiu / nie, można zaplanować wizytę', type: 'text' },
      { id: 'opis_sytuacji', label: 'Szczegółowy opis sytuacji', placeholder: 'Opisz dokładnie sytuację, która wymaga interwencji pracownika socjalnego', type: 'textarea' },
      { id: 'wcześniejsze_dzialania', label: 'Czy wcześniej podejmowano jakieś działania?', placeholder: 'np. zgłoszenie na policję, kontakt z lekarzem, rozmowy z osobą', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_asystent_rodziny',
    nazwa: 'Wniosek o asystenta rodziny',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o przydzielenie asystenta rodziny w celu wsparcia w wychowywaniu dzieci',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Gminny Ośrodek Pomocy Społecznej w Gdańsku', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Długa 1', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 80-827 Gdańsk', type: 'text' },
      { id: 'liczba_dzieci', label: 'Liczba dzieci w rodzinie', placeholder: 'np. 3 dzieci', type: 'text' },
      { id: 'wiek_dzieci', label: 'Wiek dzieci', placeholder: 'np. 3 lata, 6 lat, 9 lat', type: 'text' },
      { id: 'liczba_osob_gospodarstwo', label: 'Liczba osób w gospodarstwie domowym', placeholder: 'np. 5 osób (2 dorosłych, 3 dzieci)', type: 'text' },
      { id: 'dochod_miesieczny', label: 'Dochód miesięczny gospodarstwa (netto)', placeholder: 'np. 2500 zł', type: 'text' },
      { id: 'problemy_rodziny', label: 'Jakie problemy występują w rodzinie?', placeholder: 'np. trudności wychowawcze, problemy z nauką dzieci, zaniedbanie, ubóstwo', type: 'textarea' },
      { id: 'cel_pomocy', label: 'W jakich obszarach potrzebujesz pomocy asystenta?', placeholder: 'np. organizacja budżetu domowego, pomoc w kontaktach ze szkołą, nauka zasad higieny, rozwijanie umiejętności wychowawczych', type: 'textarea' },
      { id: 'dodatkowe_informacje', label: 'Dodatkowe informacje o sytuacji rodziny', placeholder: 'Opisz inne okoliczności, które mogą być istotne', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_pomoc_ofiara_przemocy',
    nazwa: 'Wniosek o pomoc dla ofiar przemocy domowej',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o pomoc dla ofiar przemocy domowej (pomoc psychologiczna, schronienie, wsparcie prawne)',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej w Łodzi', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Piotrkowska 104', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 90-926 Łódź', type: 'text' },
      { id: 'liczba_osob_dotknieta', label: 'Ile osób dotkniętych przemocą (w tym dzieci)?', placeholder: 'np. 2 osoby (ja i 1 dziecko)', type: 'text' },
      { id: 'rodzaj_przemocy', label: 'Jaki rodzaj przemocy?', placeholder: 'np. przemoc fizyczna / psychiczna / seksualna / ekonomiczna', type: 'text' },
      { id: 'czy_trwa', label: 'Czy przemoc nadal trwa?', placeholder: 'np. tak, nadal mieszkam ze sprawcą / nie, opuściłam/opuściłem dom', type: 'text' },
      { id: 'rodzaj_pomocy', label: 'Jakiego rodzaju pomocy potrzebujesz?', placeholder: 'np. schronienie w ośrodku / pomoc psychologiczna / pomoc prawna / wsparcie materialne', type: 'textarea' },
      { id: 'pilnosc', label: 'Czy sytuacja wymaga natychmiastowej interwencji?', placeholder: 'np. tak, jestem w bezpośrednim zagrożeniu / nie, ale potrzebuję wsparcia', type: 'text' },
      { id: 'zgłoszenia_policja', label: 'Czy zgłaszałaś/zgłaszałeś sprawę na policję?', placeholder: 'np. tak, data zgłoszenia / nie, jeszcze nie', type: 'text' },
      { id: 'opis_sytuacji', label: 'Opis sytuacji (jeśli możesz, opisz szczegóły)', placeholder: 'Możesz opisać swoją sytuację, ale tylko jeśli czujesz się komfortowo', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_zaswiadczenie_pomoc_spoleczna',
    nazwa: 'Wniosek o zaświadczenie o korzystaniu z pomocy społecznej',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o wydanie zaświadczenia o korzystaniu z pomocy społecznej',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa ośrodka pomocy społecznej', placeholder: 'np. Miejski Ośrodek Pomocy Społecznej w Katowicach', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer ośrodka', placeholder: 'np. ul. Powstańców 23', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto ośrodka', placeholder: 'np. 40-039 Katowice', type: 'text' },
      { id: 'cel_zaswiadczenia', label: 'W jakim celu potrzebujesz zaświadczenia?', placeholder: 'np. wniosek o stypendium / postępowanie sądowe / ulga w opłatach / inny urząd', type: 'text' },
      { id: 'rodzaj_pomocy', label: 'Z jakiej pomocy korzystasz lub korzystałeś?', placeholder: 'np. zasiłek stały / zasiłek okresowy / pomoc w formie posiłku', type: 'text' },
      { id: 'okres_pomocy', label: 'Za jaki okres ma być wydane zaświadczenie?', placeholder: 'np. od 01.01.2024 do 31.12.2024 / aktualnie korzystam', type: 'text' },
      { id: 'liczba_egzemplarzy', label: 'Ile egzemplarzy zaświadczenia potrzebujesz?', placeholder: 'np. 1 egzemplarz / 2 egzemplarze', type: 'text' }
    ]
  },
  {
    id: 'wniosek_dodatek_mieszkaniowy',
    nazwa: 'Wniosek o dodatek mieszkaniowy',
    kategoria: 'Pomoc społeczna',
    opis: 'Złóż wniosek o dodatek mieszkaniowy do kosztów najmu lub utrzymania mieszkania',
    pytania: [
      { id: 'nazwa_organu', label: 'Nazwa urzędu miasta/gminy', placeholder: 'np. Urząd Miasta Warszawa, Wydział Dodatków Mieszkaniowych', type: 'text' },
      { id: 'ulica_organu', label: 'Ulica i numer urzędu', placeholder: 'np. ul. Marszałkowska 77/79', type: 'text' },
      { id: 'kod_miasto_organu', label: 'Kod pocztowy i miasto urzędu', placeholder: 'np. 00-683 Warszawa', type: 'text' },
      { id: 'adres_mieszkania', label: 'Adres mieszkania', placeholder: 'np. ul. Kwiatowa 15/3, 00-123 Warszawa', type: 'text' },
      { id: 'powierzchnia', label: 'Powierzchnia mieszkania', placeholder: 'np. 45 m²', type: 'text' },
      { id: 'tytul_prawny', label: 'Tytuł prawny do mieszkania', placeholder: 'np. najem / własnościowe / spółdzielcze lokatorskie', type: 'text' },
      { id: 'liczba_osob', label: 'Liczba osób zamieszkujących', placeholder: 'np. 4 osoby', type: 'text' },
      { id: 'dochod_gospodarstwa', label: 'Dochód gospodarstwa domowego (netto)', placeholder: 'np. 3500 zł', type: 'text' },
      { id: 'dochod_na_osobe', label: 'Dochód na osobę', placeholder: 'np. 875 zł', type: 'text' },
      { id: 'czynsz_miesieczny', label: 'Miesięczny czynsz lub koszty utrzymania', placeholder: 'np. 1200 zł', type: 'text' },
      { id: 'oplaty_eksploatacyjne', label: 'Opłaty eksploatacyjne (media)', placeholder: 'np. 400 zł', type: 'text' }
    ]
  }
];

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
  }
];

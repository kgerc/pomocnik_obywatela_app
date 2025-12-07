// Pisma związane ze szkołą i dziećmi

export const pismaSzkola = [
  {
    id: 'zgoda_wycieczka',
    nazwa: 'Zgoda na udział dziecka w wycieczce',
    kategoria: 'Szkoła',
    opis: 'Zgoda rodzica na wyjazd szkolny',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'cel_wycieczki', label: 'Dokąd/cel wycieczki', placeholder: 'np. Kraków, Muzeum Narodowe', type: 'text' },
      { id: 'data_wycieczki', label: 'Data wycieczki', placeholder: 'np. 20-22.03.2025', type: 'text' },
      { id: 'telefon_kontaktowy', label: 'Telefon kontaktowy rodzica', placeholder: 'np. 123-456-789', type: 'text' }
    ]
  },
  {
    id: 'zgoda_zajecia_dodatkowe',
    nazwa: 'Zgoda na zajęcia dodatkowe',
    kategoria: 'Szkoła',
    opis: 'Zgoda na udział w zajęciach pozalekcyjnych',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'rodzaj_zajec', label: 'Rodzaj zajęć', placeholder: 'np. koło informatyczne, zajęcia sportowe, angielski', type: 'text' },
      { id: 'dzien_godzina', label: 'Dzień i godzina zajęć', placeholder: 'np. poniedziałki 15:00-16:00', type: 'text' }
    ]
  },
  {
    id: 'samodzielny_powrot',
    nazwa: 'Oświadczenie o samodzielnym powrocie do domu',
    kategoria: 'Szkoła',
    opis: 'Zgoda na samodzielny powrót dziecka ze szkoły',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'od_kiedy', label: 'Od kiedy obowiązuje', placeholder: 'np. od 01.02.2025 do końca roku szkolnego', type: 'text' }
    ]
  },
  {
    id: 'informacja_alergie',
    nazwa: 'Informacja o alergiach dziecka',
    kategoria: 'Szkoła',
    opis: 'Zgłoszenie alergii pokarmowych lub innych do szkoły',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'rodzaj_alergii', label: 'Rodzaj alergii', placeholder: 'np. alergia na orzechy, laktozę, pyłki', type: 'text' },
      { id: 'objawy', label: 'Objawy alergii', placeholder: 'np. wysypka, duszności, ból brzucha', type: 'textarea' },
      { id: 'postepowanie', label: 'Jak postępować w razie reakcji?', placeholder: 'np. podać lek, wezwać pogotowie, kontakt z rodzicem', type: 'textarea' },
      { id: 'telefon_kontaktowy', label: 'Telefon kontaktowy rodzica', placeholder: 'np. 123-456-789', type: 'text' }
    ]
  },
  {
    id: 'zwolnienie_wf',
    nazwa: 'Zwolnienie z zajęć WF',
    kategoria: 'Szkoła',
    opis: 'Prośba o zwolnienie z wychowania fizycznego',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'okres', label: 'Na jaki okres?', placeholder: 'np. 15.01-30.01.2025', type: 'text' },
      { id: 'powod', label: 'Powód zwolnienia', placeholder: 'np. kontuzja nogi, choroba, zalecenie lekarza', type: 'text' },
      { id: 'czy_zaswiadczenie', label: 'Czy załączono zaświadczenie lekarskie?', placeholder: 'tak/nie', type: 'text' }
    ]
  },
  {
    id: 'indywidualny_tok_nauczania',
    nazwa: 'Wniosek o indywidualny tok nauczania',
    kategoria: 'Szkoła',
    opis: 'Wniosek o ITN dla szczególnie uzdolnionego dziecka',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'przedmiot', label: 'Przedmiot/obszar', placeholder: 'np. matematyka, informatyka, język angielski', type: 'text' },
      { id: 'osiagniecia', label: 'Osiągnięcia dziecka', placeholder: 'np. olimpiady, konkursy, certyfikaty', type: 'textarea' },
      { id: 'uzasadnienie', label: 'Uzasadnienie wniosku', placeholder: 'Dlaczego dziecko potrzebuje ITN?', type: 'textarea' }
    ]
  },
  {
    id: 'potwierdzenie_opieki_pracodawca',
    nazwa: 'Potwierdzenie opieki nad dzieckiem (dla pracodawcy)',
    kategoria: 'Szkoła',
    opis: 'Zaświadczenie ze szkoły o zamknięciu placówki (np. do L4)',
    pytania: [
      { id: 'imie_nazwisko_rodzica', label: 'Imię i nazwisko rodzica', placeholder: 'np. Anna Kowalska', type: 'text' },
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'okres_zamkniecia', label: 'Okres zamknięcia szkoły', placeholder: 'np. 15-20.01.2025', type: 'text' },
      { id: 'powod', label: 'Powód zamknięcia', placeholder: 'np. grypa, remont, awaria', type: 'text' }
    ]
  },
  {
    id: 'usprawiedliwienie_nieobecnosci',
    nazwa: 'Usprawiedliwienie nieobecności w szkole',
    kategoria: 'Szkoła',
    opis: 'Usprawiedliwienie nieobecności dziecka na zajęciach',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'data_nieobecnosci', label: 'Data/daty nieobecności', placeholder: 'np. 15.01.2025 lub 15-17.01.2025', type: 'text' },
      { id: 'powod', label: 'Powód nieobecności', placeholder: 'np. choroba, wizyta lekarska, sprawy rodzinne', type: 'text' }
    ]
  },
  {
    id: 'wniosek_zwolnienie_lekcji',
    nazwa: 'Wniosek o zwolnienie z lekcji',
    kategoria: 'Szkoła',
    opis: 'Prośba o wcześniejsze odebranie dziecka ze szkoły',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'data_zwolnienia', label: 'Data zwolnienia', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'godzina_zwolnienia', label: 'Godzina zwolnienia', placeholder: 'np. po 4 lekcji / o godz. 11:00', type: 'text' },
      { id: 'powod', label: 'Powód wcześniejszego zwolnienia', placeholder: 'np. wizyta lekarska, uroczystość rodzinna', type: 'text' }
    ]
  },
  {
    id: 'wniosek_zmiana_klasy',
    nazwa: 'Wniosek o zmianę klasy',
    kategoria: 'Szkoła',
    opis: 'Prośba o przeniesienie dziecka do innej klasy',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa_obecna', label: 'Obecna klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'klasa_docelowa', label: 'Klasa docelowa', placeholder: 'np. 5b', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie prośby', placeholder: 'Opisz powody zmiany klasy', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_przedluzenie_nauki',
    nazwa: 'Wniosek o przedłużenie okresu nauki',
    kategoria: 'Szkoła',
    opis: 'Wniosek o powtórzenie klasy lub przedłużenie nauki',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie wniosku', placeholder: 'np. problemy zdrowotne, trudności w nauce, zaległości', type: 'textarea' }
    ]
  },
  {
    id: 'odwolanie_uwaga_ocena',
    nazwa: 'Odwołanie od oceny lub uwagi',
    kategoria: 'Szkoła',
    opis: 'Odwołanie od oceny cząstkowej, śródrocznej lub uwagi',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'przedmiot', label: 'Przedmiot', placeholder: 'np. matematyka, język polski', type: 'text' },
      { id: 'rodzaj_decyzji', label: 'Rodzaj decyzji', placeholder: 'np. ocena niedostateczna, uwaga za zachowanie', type: 'text' },
      { id: 'data_decyzji', label: 'Data wystawienia oceny/uwagi', placeholder: 'np. 10.01.2025', type: 'text' },
      { id: 'uzasadnienie_odwolania', label: 'Uzasadnienie odwołania', placeholder: 'Opisz dlaczego uważasz ocenę/uwagę za niesłuszną', type: 'textarea' }
    ]
  },
  {
    id: 'wniosek_konsultacje_pedagog',
    nazwa: 'Wniosek o konsultację z pedagogiem/psychologiem',
    kategoria: 'Szkoła',
    opis: 'Prośba o spotkanie z pedagogiem lub psychologiem szkolnym',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'specjalista', label: 'Z kim chcesz się spotkać?', placeholder: 'np. pedagog szkolny, psycholog szkolny', type: 'text' },
      { id: 'problem', label: 'Opisz problem/temat konsultacji', placeholder: 'np. problemy z nauką, trudności w relacjach, problemy emocjonalne', type: 'textarea' },
      { id: 'telefon_kontaktowy', label: 'Telefon kontaktowy', placeholder: 'np. 123-456-789', type: 'text' }
    ]
  },
  {
    id: 'wniosek_karta_rowerowa',
    nazwa: 'Zgoda na egzamin na kartę rowerową',
    kategoria: 'Szkoła',
    opis: 'Zgoda rodzica na uczestnictwo w egzaminie na kartę rowerową',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 4a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'data_egzaminu', label: 'Data egzaminu', placeholder: 'np. 20.03.2025', type: 'text' },
      { id: 'telefon_kontaktowy', label: 'Telefon kontaktowy rodzica', placeholder: 'np. 123-456-789', type: 'text' }
    ]
  },
  {
    id: 'wniosek_zmiana_religii_etyki',
    nazwa: 'Wniosek o zmianę z religii na etykę (lub odwrotnie)',
    kategoria: 'Szkoła',
    opis: 'Oświadczenie o zmianie uczestnictwa w lekcjach religii/etyki',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'zmiana', label: 'Na jakie zajęcia chcesz zmienić?', placeholder: 'np. z religii na etykę / z etyki na religię', type: 'text' },
      { id: 'od_kiedy', label: 'Od kiedy zmiana ma obowiązywać?', placeholder: 'np. od 01.02.2025 / od nowego semestru', type: 'text' }
    ]
  },
  {
    id: 'wniosek_swietlica',
    nazwa: 'Wniosek o przyjęcie do świetlicy szkolnej',
    kategoria: 'Szkoła',
    opis: 'Wniosek o zapisy dziecka do świetlicy',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 1a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'dni_godziny', label: 'W jakie dni i godziny?', placeholder: 'np. poniedziałek-piątek 7:00-8:00 i 14:00-16:00', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie (praca rodziców)', placeholder: 'np. oboje rodzice pracują w godzinach 8-16', type: 'textarea' },
      { id: 'telefon_kontaktowy', label: 'Telefon kontaktowy', placeholder: 'np. 123-456-789', type: 'text' }
    ]
  },
  {
    id: 'wniosek_darmowe_podreczniki',
    nazwa: 'Wniosek o dofinansowanie do podręczników',
    kategoria: 'Szkoła',
    opis: 'Wniosek o dopłatę do podręczników szkolnych',
    pytania: [
      { id: 'imie_nazwisko_dziecka', label: 'Imię i nazwisko dziecka', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'klasa', label: 'Klasa', placeholder: 'np. 5a', type: 'text' },
      { id: 'nazwa_szkoly', label: 'Nazwa szkoły', placeholder: 'np. Szkoła Podstawowa nr 10 w Warszawie', type: 'text' },
      { id: 'liczba_osob_w_rodzinie', label: 'Liczba osób w rodzinie', placeholder: 'np. 4 osoby', type: 'text' },
      { id: 'dochod_na_osobe', label: 'Dochód na osobę w rodzinie', placeholder: 'np. 600 zł', type: 'text' },
      { id: 'trudna_sytuacja', label: 'Opisz trudną sytuację materialną rodziny', placeholder: 'np. bezrobocie, choroba, niski dochód', type: 'textarea' }
    ]
  }
];

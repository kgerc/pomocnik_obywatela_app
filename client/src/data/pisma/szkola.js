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
  }
];

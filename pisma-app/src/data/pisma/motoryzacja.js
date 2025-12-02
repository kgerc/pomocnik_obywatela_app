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
  }
];

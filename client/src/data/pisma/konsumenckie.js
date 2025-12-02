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
  }
];

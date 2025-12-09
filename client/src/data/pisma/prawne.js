// Pisma prawne i finansowe

export const pismaPrawne = [
  {
    id: 'wezwanie_do_zaplaty',
    nazwa: 'Wezwanie do zapłaty',
    kategoria: 'Sprawy prawne',
    opis: 'Przedsądowe wezwanie dłużnika do zapłaty należności',
    pytania: [
      { id: 'imie_nazwisko_dluznika', label: 'Imię i nazwisko dłużnika (lub nazwa firmy)', placeholder: 'np. Jan Kowalski / Firma ABC Sp. z o.o.', type: 'text' },
      { id: 'adres_dluznika', label: 'Adres dłużnika', placeholder: 'np. ul. Główna 10, 00-001 Warszawa', type: 'text' },
      { id: 'kwota_zadluzenia', label: 'Kwota zadłużenia (zł)', placeholder: 'np. 5000', type: 'text' },
      { id: 'tytul_zadluzenia', label: 'Tytuł zadłużenia', placeholder: 'np. faktura nr 123/2024, umowa pożyczki', type: 'text' },
      { id: 'data_powstania', label: 'Data powstania zobowiązania', placeholder: 'np. 15.10.2024', type: 'text' },
      { id: 'termin_platnosci', label: 'Pierwotny termin płatności', placeholder: 'np. 30.10.2024', type: 'text' },
      { id: 'termin_wezwania', label: 'Termin do zapłaty po wezwaniu (dni)', placeholder: 'np. 7 dni', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do wpłaty', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' }
    ]
  }
];

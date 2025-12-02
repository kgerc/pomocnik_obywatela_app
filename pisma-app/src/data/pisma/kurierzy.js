// Pisma związane z usługami kurierskimi i przesyłkami

export const pismaKurierzy = [
  {
    id: 'reklamacja_dpd',
    nazwa: 'Reklamacja usługi kurierskiej DPD',
    kategoria: 'Kurierzy i przesyłki',
    opis: 'Reklamacja opóźnienia, uszkodzenia lub zagubienia przesyłki DPD',
    pytania: [
      { id: 'numer_przesylki', label: 'Numer przesyłki', placeholder: 'np. 123456789', type: 'text' },
      { id: 'data_nadania', label: 'Data nadania przesyłki', placeholder: 'np. 10.01.2025', type: 'text' },
      { id: 'wartosc_przesylki', label: 'Wartość przesyłki (zł)', placeholder: 'np. 500', type: 'text' },
      { id: 'opis_problemu', label: 'Opisz problem', placeholder: 'np. przesyłka nie dotarła, została uszkodzona, opóźnienie', type: 'textarea' },
      { id: 'roszczenie', label: 'Czego oczekujesz?', placeholder: 'np. zwrot kosztów, odszkodowanie', type: 'textarea' }
    ]
  },
  {
    id: 'reklamacja_inpost',
    nazwa: 'Reklamacja usługi kurierskiej InPost',
    kategoria: 'Kurierzy i przesyłki',
    opis: 'Reklamacja opóźnienia, uszkodzenia lub zagubienia przesyłki InPost',
    pytania: [
      { id: 'numer_przesylki', label: 'Numer przesyłki', placeholder: 'np. 600000123456789', type: 'text' },
      { id: 'data_nadania', label: 'Data nadania przesyłki', placeholder: 'np. 10.01.2025', type: 'text' },
      { id: 'wartosc_przesylki', label: 'Wartość przesyłki (zł)', placeholder: 'np. 500', type: 'text' },
      { id: 'opis_problemu', label: 'Opisz problem', placeholder: 'np. przesyłka nie dotarła, została uszkodzona, opóźnienie', type: 'textarea' },
      { id: 'roszczenie', label: 'Czego oczekujesz?', placeholder: 'np. zwrot kosztów, odszkodowanie', type: 'textarea' }
    ]
  },
  {
    id: 'reklamacja_gls',
    nazwa: 'Reklamacja usługi kurierskiej GLS',
    kategoria: 'Kurierzy i przesyłki',
    opis: 'Reklamacja opóźnienia, uszkodzenia lub zagubienia przesyłki GLS',
    pytania: [
      { id: 'numer_przesylki', label: 'Numer przesyłki', placeholder: 'np. 123456789', type: 'text' },
      { id: 'data_nadania', label: 'Data nadania przesyłki', placeholder: 'np. 10.01.2025', type: 'text' },
      { id: 'wartosc_przesylki', label: 'Wartość przesyłki (zł)', placeholder: 'np. 500', type: 'text' },
      { id: 'opis_problemu', label: 'Opisz problem', placeholder: 'np. przesyłka nie dotarła, została uszkodzona, opóźnienie', type: 'textarea' },
      { id: 'roszczenie', label: 'Czego oczekujesz?', placeholder: 'np. zwrot kosztów, odszkodowanie', type: 'textarea' }
    ]
  },
  {
    id: 'odwolanie_mandat_inpost',
    nazwa: 'Odwołanie od mandatu InPost',
    kategoria: 'Kurierzy i przesyłki',
    opis: 'Odwołanie od kary/mandatu za nieodbiorczą paczkę w InPost',
    pytania: [
      { id: 'numer_mandatu', label: 'Numer mandatu/opłaty', placeholder: 'np. M/2025/123456', type: 'text' },
      { id: 'kwota', label: 'Kwota mandatu (zł)', placeholder: 'np. 50', type: 'text' },
      { id: 'numer_przesylki', label: 'Numer przesyłki (jeśli znany)', placeholder: 'np. 600000123456789', type: 'text' },
      { id: 'uzasadnienie', label: 'Uzasadnienie odwołania', placeholder: 'Wyjaśnij dlaczego uważasz, że mandat jest niesłuszny', type: 'textarea' }
    ]
  }
];

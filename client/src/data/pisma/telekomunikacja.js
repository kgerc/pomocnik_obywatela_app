// Pisma związane z telekomunikacją i usługami cyfrowymi

export const pismaTelekomunikacja = [
  {
    id: 'reklamacja_orange',
    nazwa: 'Reklamacja usług Orange',
    kategoria: 'Telekomunikacja',
    opis: 'Reklamacja usług, faktur lub problemów technicznych w Orange',
    pytania: [
      { id: 'numer_umowy', label: 'Numer umowy / telefonu', placeholder: 'np. 123456789', type: 'text' },
      { id: 'data_problemu', label: 'Data wystąpienia problemu', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'opis_problemu', label: 'Opisz problem szczegółowo', placeholder: 'Dokładny opis problemu z usługą Orange', type: 'textarea' },
      { id: 'roszczenie', label: 'Czego oczekujesz?', placeholder: 'np. zwrot środków, naprawa usługi, anulowanie opłaty', type: 'textarea' }
    ]
  },
  {
    id: 'reklamacja_play',
    nazwa: 'Reklamacja usług Play',
    kategoria: 'Telekomunikacja',
    opis: 'Reklamacja usług, faktur lub problemów technicznych w Play',
    pytania: [
      { id: 'numer_umowy', label: 'Numer umowy / telefonu', placeholder: 'np. 123456789', type: 'text' },
      { id: 'data_problemu', label: 'Data wystąpienia problemu', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'opis_problemu', label: 'Opisz problem szczegółowo', placeholder: 'Dokładny opis problemu z usługą Play', type: 'textarea' },
      { id: 'roszczenie', label: 'Czego oczekujesz?', placeholder: 'np. zwrot środków, naprawa usługi, anulowanie opłaty', type: 'textarea' }
    ]
  },
  {
    id: 'reklamacja_tmobile',
    nazwa: 'Reklamacja usług T-Mobile',
    kategoria: 'Telekomunikacja',
    opis: 'Reklamacja usług, faktur lub problemów technicznych w T-Mobile',
    pytania: [
      { id: 'numer_umowy', label: 'Numer umowy / telefonu', placeholder: 'np. 123456789', type: 'text' },
      { id: 'data_problemu', label: 'Data wystąpienia problemu', placeholder: 'np. 15.01.2025', type: 'text' },
      { id: 'opis_problemu', label: 'Opisz problem szczegółowo', placeholder: 'Dokładny opis problemu z usługą T-Mobile', type: 'textarea' },
      { id: 'roszczenie', label: 'Czego oczekujesz?', placeholder: 'np. zwrot środków, naprawa usługi, anulowanie opłaty', type: 'textarea' }
    ]
  },
  {
    id: 'odstapienie_umowy_telekom',
    nazwa: 'Odstąpienie od umowy telekomunikacyjnej',
    kategoria: 'Telekomunikacja',
    opis: 'Odstąpienie od umowy z operatorem w ciągu 14 dni od zawarcia',
    pytania: [
      { id: 'operator', label: 'Nazwa operatora', placeholder: 'np. Orange, Play, T-Mobile', type: 'text' },
      { id: 'numer_umowy', label: 'Numer umowy', placeholder: 'np. UM/2025/123456', type: 'text' },
      { id: 'data_zawarcia', label: 'Data zawarcia umowy', placeholder: 'np. 05.01.2025', type: 'text' },
      { id: 'powod', label: 'Powód odstąpienia (opcjonalnie)', placeholder: 'Możesz podać powód lub zostawić puste', type: 'textarea' }
    ]
  }
];

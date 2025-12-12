// Konfiguracja typów artykułów i strategii CTA

export const ARTICLE_TYPES = {
  FIRE_FIGHTING: 'fire_fighting', // Gaszenie Pożarów - artykuły o nagłych problemach
  LIFE_OPPORTUNITIES: 'life_opportunities', // Życiowe Okazje - artykuły o świadczeniach/dotacjach
  HUB_CONTENT: 'hub_content' // Artykuły zbiorcze (przewodniki kompleksowe)
};

export const CTA_STRATEGIES = {
  // Strategia dla "Gaszenie Pożarów"
  [ARTICLE_TYPES.FIRE_FIGHTING]: {
    primary: {
      type: 'generator',
      title: 'Wygeneruj to pismo za 2 zł',
      description: 'Nasz generator wypełni wszystkie wymagane pola i przygotuje profesjonalne pismo gotowe do wysłania.',
      buttonText: 'Wygeneruj pismo →',
      price: '2 zł'
    },
    upsell: {
      type: 'subscription',
      title: 'LUB odblokuj dostęp do wszystkich pism',
      description: 'Pobierz to pismo ZA DARMO w ramach subskrypcji Pomocnik Obywatela (5 zł/msc) i sprawdź, jakie inne dotacje i świadczenia Ci przysługują.',
      buttonText: 'Aktywuj subskrypcję za 5 zł/msc →',
      features: [
        'Dostęp do 50+ gotowych pism',
        'Baza wszystkich dotacji i świadczeń',
        'Powiadomienia o nowych świadczeniach',
        'Kalkulator uprawnień'
      ],
      savings: 'Już po wygenerowaniu 3 pism wychodzisz na plus!'
    }
  },

  // Strategia dla "Życiowe Okazje"
  [ARTICLE_TYPES.LIFE_OPPORTUNITIES]: {
    primary: {
      type: 'subscription',
      title: 'Nie trać pieniędzy - sprawdź co Ci się należy',
      description: 'Pomocnik Obywatela przeskanuje Twoją sytuację i znajdzie wszystkie świadczenia i dotacje, które możesz otrzymać.',
      buttonText: 'Sprawdź swoje uprawnienia za 5 zł/msc →',
      features: [
        'Pełna baza świadczeń i dotacji 2025',
        'Powiadomienia o zmianach w przepisach',
        'Kalkulatory i testy uprawnień',
        'Gotowe wnioski do pobrania'
      ]
    },
    secondary: null // Tylko subskrypcja, bez opcji jednorazowego zakupu
  },

  // Strategia dla "Hub Content"
  [ARTICLE_TYPES.HUB_CONTENT]: {
    primary: {
      type: 'subscription',
      title: 'Wszystko w jednym miejscu',
      description: 'Subskrybuj Pomocnika Obywatela i miej dostęp do wszystkich pism, przewodników i aktualnych informacji o świadczeniach.',
      buttonText: 'Rozpocznij za 5 zł/msc →',
      features: [
        '50+ gotowych wzorów pism',
        'Kompleksowe przewodniki',
        'Baza dotacji i świadczeń',
        'Stały dostęp do aktualnych informacji'
      ]
    },
    secondary: {
      type: 'generator',
      title: 'Lub wygeneruj pojedyncze pismo',
      buttonText: 'Zobacz dostępne pisma →',
      description: 'Jeśli potrzebujesz tylko jednego dokumentu'
    }
  }
};

// Mapowanie kategorii do sugerowanych działań dla upsell
export const CATEGORY_UPSELLS = {
  'Telekomunikacja': {
    relatedBenefits: [
      'Sprawdź czy przysługuje Ci dofinansowanie do Internetu (program „Internet dla uczniów")',
      'Ulgi dla osób niepełnosprawnych na usługi telekomunikacyjne'
    ]
  },
  'Motoryzacja': {
    relatedBenefits: [
      'Dotacje do samochodów elektrycznych',
      'Dofinansowanie na przekwalifikowanie pojazdu na LPG',
      'Ulgi podatkowe dla osób niepełnosprawnych'
    ]
  },
  'Pomoc społeczna': {
    relatedBenefits: [
      'Zasiłki rodzinne i dodatki',
      'Świadczenie 800+ i Dobry Start',
      'Zasiłki dla bezrobotnych',
      'Dodatki mieszkaniowe i energetyczne'
    ]
  },
  'Mieszkanie': {
    relatedBenefits: [
      'Dodatek mieszkaniowy',
      'Dofinansowanie do wymiany pieców',
      'Ulga termomodernizacyjna',
      'Dotacje do fotowoltaiki'
    ]
  },
  'Budownictwo': {
    relatedBenefits: [
      'Dotacje na budowę domu energooszczędnego',
      'Dofinansowanie do fotowoltaiki i pomp ciepła',
      'Ulga termomodernizacyjna',
      'Program „Czyste Powietrze"'
    ]
  },
  'Praca': {
    relatedBenefits: [
      'Zasiłek dla bezrobotnych',
      'Bon na zasiedlenie',
      'Dofinansowanie do szkoleń',
      'Ulgi podatkowe dla pracujących rodziców'
    ]
  },
  'Studia': {
    relatedBenefits: [
      'Stypendium socjalne',
      'Stypendium rektora',
      'Zapomoga',
      'Bon na zasiedlenie'
    ]
  },
  'Urząd Skarbowy': {
    relatedBenefits: [
      'Wszystkie ulgi podatkowe PIT 2025',
      'Ulga dla rodzin 4+',
      'Ulga termomodernizacyjna',
      'Ulga na dzieci'
    ]
  }
};

export default {
  ARTICLE_TYPES,
  CTA_STRATEGIES,
  CATEGORY_UPSELLS
};

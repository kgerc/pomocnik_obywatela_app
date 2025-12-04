/**
 * SEO Utilities for dynamic meta tags and structured data
 */

// Base URL for the application
const BASE_URL = 'https://pisma.pomocnikobywatela.pl';

// Category metadata for SEO
export const CATEGORY_META = {
  'Administracja': {
    title: 'Pisma Administracyjne - Generator Dokumentów AI | Pomocnik Obywatela',
    description: 'Generuj pisma administracyjne online: wnioski do urzędów, odwołania od decyzji, skargi administracyjne i więcej. Profesjonalne dokumenty w minutę z AI.',
    keywords: 'pisma administracyjne, wnioski do urzędu, odwołania administracyjne, dokumenty urzędowe'
  },
  'Telekomunikacja': {
    title: 'Reklamacje Telekomunikacyjne - Generator Pism AI | Pomocnik Obywatela',
    description: 'Wygeneruj reklamację telefonu, internetu, TV. Pisma do Orange, Play, Plus, T-Mobile. Odwołania do UKE. Profesjonalne dokumenty AI w minutę.',
    keywords: 'reklamacja telefon, reklamacja internet, reklamacja TV, odwołanie UKE, pisma telekomunikacyjne'
  },
  'Kurierzy': {
    title: 'Reklamacje do Kurierów - Generator Pism AI | Pomocnik Obywatela',
    description: 'Generuj reklamacje do InPost, DPD, DHL, Poczta Polska. Zgłoszenie uszkodzonej przesyłki, opóźnienia, zgubienia paczki. Dokumenty AI w minutę.',
    keywords: 'reklamacja InPost, reklamacja DPD, reklamacja DHL, reklamacja Poczta Polska, zgubiona paczka'
  },
  'Konsumenckie': {
    title: 'Pisma Konsumenckie - Reklamacje i Odwołania AI | Pomocnik Obywatela',
    description: 'Generator pism konsumenckich: reklamacje produktów wadliwych, zwroty, gwarancje, odwołania do UOKiK, pisma ubezpieczeniowe. Dokumenty AI w minutę.',
    keywords: 'reklamacja produktu, zwrot towaru, reklamacja gwarancyjna, pisma ubezpieczeniowe, odwołanie UOKiK'
  },
  'Studia': {
    title: 'Pisma dla Studentów - Generator Dokumentów AI | Pomocnik Obywatela',
    description: 'Wygeneruj podania dla studentów: urlopy dziekańskie, stypendia, egzaminy poprawkowe, zmiany kierunku. Profesjonalne dokumenty AI w minutę.',
    keywords: 'podanie urlop dziekański, wniosek stypendium, podanie egzamin poprawkowy, pisma studenckie'
  },
  'Mieszkanie': {
    title: 'Pisma Mieszkaniowe - Generator Dokumentów AI | Pomocnik Obywatela',
    description: 'Generuj pisma mieszkaniowe: wypowiedzenia umów najmu, reklamacje lokali, wnioski do spółdzielni, pisma do zarządców. Dokumenty AI w minutę.',
    keywords: 'wypowiedzenie najmu, reklamacja mieszkania, pisma do spółdzielni, zarządca nieruchomości'
  },
  'Biznesowe': {
    title: 'Pisma Biznesowe - Generator Dokumentów AI | Pomocnik Obywatela',
    description: 'Wygeneruj pisma biznesowe: zawieszenie działalności, rejestracja firmy, wnioski do CEIDG, pisma podatkowe. Profesjonalne dokumenty AI w minutę.',
    keywords: 'zawieszenie działalności, rejestracja firmy, wnioski CEIDG, pisma podatkowe, dokumenty biznesowe'
  },
  'Szkola': {
    title: 'Pisma Szkolne dla Rodziców - Generator AI | Pomocnik Obywatela',
    description: 'Generuj pisma szkolne: zwolnienia, podania o urlop, reklamacje ocen, wnioski do dyrektora. Profesjonalne dokumenty dla rodziców AI w minutę.',
    keywords: 'zwolnienie z zajęć, podanie urlop szkolny, reklamacja oceny, pisma do szkoły, wnioski rodziców'
  },
  'Praca': {
    title: 'Pisma Związane z Pracą - Generator AI | Pomocnik Obywatela',
    description: 'Wygeneruj pisma pracownicze: urlopy, podwyżki, reklamacje wypłat, wnioski o świadectwo pracy, pisma do ZUS. Dokumenty AI w minutę.',
    keywords: 'wniosek urlop, podwyżka wynagrodzenia, świadectwo pracy, reklamacja wypłaty, pisma ZUS'
  },
  'Budownictwo': {
    title: 'Pisma Budowlane - Generator Dokumentów AI | Pomocnik Obywatela',
    description: 'Generuj pisma budowlane: wnioski o pozwolenia na budowę, zgłoszenia robót, podłączenia mediów, wnioski geodezyjne. Dokumenty AI w minutę.',
    keywords: 'pozwolenie na budowę, zgłoszenie robót budowlanych, podłączenie mediów, pisma budowlane'
  },
  'Motoryzacja': {
    title: 'Pisma Motoryzacyjne - Generator Dokumentów AI | Pomocnik Obywatela',
    description: 'Wygeneruj pisma motoryzacyjne: odwołania od mandatów, reklamacje serwisów, wnioski komunikacyjne, umowy kupna-sprzedaży. Dokumenty AI w minutę.',
    keywords: 'odwołanie mandat, reklamacja serwis samochodowy, umowa kupna auta, pisma komunikacyjne'
  },
  'Urząd Stanu Cywilnego': {
    title: 'Pisma do USC - Generator Dokumentów AI | Pomocnik Obywatela',
    description: 'Generuj wnioski do Urzędu Stanu Cywilnego: akty urodzenia, ślubu, zgonu, zmiana nazwiska. Profesjonalne dokumenty AI w minutę.',
    keywords: 'akt urodzenia, akt małżeństwa, zmiana nazwiska, pisma USC'
  },
  'Pomoc społeczna': {
    title: 'Wnioski o Pomoc Społeczną - Generator AI | Pomocnik Obywatela',
    description: 'Wygeneruj wnioski o pomoc społeczną: zasiłki rodzinne, świadczenia, pomoc materialna. Profesjonalne dokumenty AI w minutę.',
    keywords: 'zasiłek rodzinny, wniosek pomoc społeczna, świadczenia rodzinne, OPS'
  },
  'Urząd Skarbowy': {
    title: 'Pisma do Urzędu Skarbowego - Generator AI | Pomocnik Obywatela',
    description: 'Generuj pisma do US: zwrot nadpłaty podatku, wnioski podatkowe, korekty zeznań. Profesjonalne dokumenty AI w minutę.',
    keywords: 'zwrot podatku, wniosek US, nadpłata podatku, pisma podatkowe'
  },
  'Ubezpieczenia': {
    title: 'Pisma Ubezpieczeniowe - Generator Dokumentów AI | Pomocnik Obywatela',
    description: 'Wygeneruj pisma ubezpieczeniowe: odwołania od decyzji, wnioski o dopłatę, zgłoszenia szkód, reklamacje ubezpieczeń. Dokumenty AI w minutę.',
    keywords: 'odwołanie decyzja ubezpieczyciel, zgłoszenie szkody, reklamacja ubezpieczenie, dopłata odszkodowanie'
  }
};

// Default meta tags
export const DEFAULT_META = {
  title: 'Generator Pism AI - Ponad 100 Typów Dokumentów | Pomocnik Obywatela',
  description: 'Najszerszy wybór pism urzędowych w Polsce! Wygeneruj profesjonalne dokumenty AI w minutę: wnioski administracyjne, reklamacje telekomunikacyjne, pisma do kurierów, studia, mieszkanie, praca i więcej. Tylko 2 zł za dokument.',
  keywords: 'generator pism, pisma urzędowe, wnioski AI, dokumenty online, pisma administracyjne, reklamacje telekomunikacyjne, pisma do kurierów, wnioski konsumenckie, pisma szkolne, dokumenty praca, pisma mieszkaniowe, wnioski budownictwo, dokumenty motoryzacja, generator dokumentów, sztuczna inteligencja, pisma online, automatyczne pisma, wzory pism, generator wniosków',
  ogImage: `${BASE_URL}/og-image.png`
};

/**
 * Update document title dynamically
 */
export const updateTitle = (title) => {
  document.title = title || DEFAULT_META.title;
};

/**
 * Update meta tag
 */
const updateMetaTag = (property, content, isProperty = false) => {
  if (!content) return;

  const attribute = isProperty ? 'property' : 'name';
  let element = document.querySelector(`meta[${attribute}="${property}"]`);

  if (element) {
    element.setAttribute('content', content);
  } else {
    element = document.createElement('meta');
    element.setAttribute(attribute, property);
    element.setAttribute('content', content);
    document.head.appendChild(element);
  }
};

/**
 * Update all meta tags for a page
 */
export const updateMetaTags = (meta) => {
  const { title, description, keywords, ogImage, ogUrl, canonical } = {
    ...DEFAULT_META,
    ...meta
  };

  // Update title
  updateTitle(title);

  // Update basic meta tags
  updateMetaTag('description', description);
  updateMetaTag('keywords', keywords);

  // Update Open Graph tags
  updateMetaTag('og:title', title, true);
  updateMetaTag('og:description', description, true);
  updateMetaTag('og:image', ogImage, true);
  updateMetaTag('og:url', ogUrl || BASE_URL, true);

  // Update Twitter Card tags
  updateMetaTag('twitter:title', title, true);
  updateMetaTag('twitter:description', description, true);
  updateMetaTag('twitter:image', ogImage, true);

  // Update canonical URL
  if (canonical) {
    let canonicalElement = document.querySelector('link[rel="canonical"]');
    if (canonicalElement) {
      canonicalElement.setAttribute('href', canonical);
    } else {
      canonicalElement = document.createElement('link');
      canonicalElement.setAttribute('rel', 'canonical');
      canonicalElement.setAttribute('href', canonical);
      document.head.appendChild(canonicalElement);
    }
  }
};

/**
 * Get meta tags for a specific category
 */
export const getCategoryMeta = (category) => {
  const categoryData = CATEGORY_META[category];
  if (!categoryData) return DEFAULT_META;

  return {
    ...categoryData,
    ogImage: DEFAULT_META.ogImage,
    ogUrl: `${BASE_URL}/?kategoria=${encodeURIComponent(category)}`,
    canonical: `${BASE_URL}/?kategoria=${encodeURIComponent(category)}`
  };
};

/**
 * Get meta tags for a specific document
 */
export const getDocumentMeta = (document) => {
  if (!document) return DEFAULT_META;

  const title = `${document.nazwa} - Generator AI | Pomocnik Obywatela`;
  const description = `${document.opis}. Wygeneruj profesjonalne pismo "${document.nazwa}" w minutę z pomocą AI. Format PDF i DOCX. Tylko 2 zł.`;
  const keywords = `${document.nazwa}, generator ${document.nazwa.toLowerCase()}, ${document.kategoria.toLowerCase()}, pisma ${document.kategoria.toLowerCase()}, wzór pisma`;

  return {
    title,
    description,
    keywords,
    ogImage: DEFAULT_META.ogImage,
    ogUrl: `${BASE_URL}/?dokument=${encodeURIComponent(document.id)}`,
    canonical: `${BASE_URL}/?dokument=${encodeURIComponent(document.id)}`
  };
};

/**
 * Generate JSON-LD structured data for BreadcrumbList
 */
export const generateBreadcrumbSchema = (items) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

/**
 * Generate JSON-LD structured data for a specific document
 */
export const generateDocumentSchema = (document) => {
  if (!document) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": `Jak wygenerować: ${document.nazwa}`,
    "description": document.opis,
    "totalTime": "PT3M",
    "tool": {
      "@type": "HowToTool",
      "name": "Generator Pism AI"
    },
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Wybierz typ pisma",
        "text": `Wybierz szablon: ${document.nazwa}`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Wypełnij formularz",
        "text": "Odpowiedz na pytania dotyczące Twojej sprawy"
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Wygeneruj dokument",
        "text": "AI wygeneruje profesjonalne pismo w kilka sekund"
      },
      {
        "@type": "HowToStep",
        "position": 4,
        "name": "Pobierz i wydrukuj",
        "text": "Pobierz dokument w formacie PDF lub DOCX"
      }
    ]
  };
};

/**
 * Inject or update JSON-LD structured data
 */
export const updateStructuredData = (schema, id = 'structured-data') => {
  if (!schema) return;

  let scriptElement = document.getElementById(id);

  if (scriptElement) {
    scriptElement.textContent = JSON.stringify(schema);
  } else {
    scriptElement = document.createElement('script');
    scriptElement.id = id;
    scriptElement.type = 'application/ld+json';
    scriptElement.textContent = JSON.stringify(schema);
    document.head.appendChild(scriptElement);
  }
};

/**
 * Generate FAQ schema for common questions
 */
export const generateFAQSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ile kosztuje wygenerowanie dokumentu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Koszt wygenerowania pojedynczego dokumentu to tylko 2 zł. Płatność można dokonać przez BLIK lub kartę płatniczą."
        }
      },
      {
        "@type": "Question",
        "name": "Jakie formaty dokumentów są dostępne?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wygenerowane dokumenty są dostępne w formatach PDF i DOCX, gotowe do wydruku i wysłania."
        }
      },
      {
        "@type": "Question",
        "name": "Czy dokumenty są zgodne z polskim prawem?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, wszystkie generowane pisma są zgodne z polskimi przepisami prawa i zawierają właściwe sformułowania prawne."
        }
      },
      {
        "@type": "Question",
        "name": "Ile czasu zajmuje wygenerowanie pisma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Wygenerowanie profesjonalnego pisma zajmuje zaledwie kilka sekund. Cały proces od wyboru typu pisma do pobrania dokumentu trwa około 3 minuty."
        }
      },
      {
        "@type": "Question",
        "name": "Czy potrzebuję rejestracji?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nie, rejestracja nie jest wymagana. Możesz natychmiast rozpocząć generowanie dokumentów bez zakładania konta."
        }
      }
    ]
  };
};

export default {
  updateTitle,
  updateMetaTags,
  getCategoryMeta,
  getDocumentMeta,
  generateBreadcrumbSchema,
  generateDocumentSchema,
  updateStructuredData,
  generateFAQSchema,
  DEFAULT_META,
  CATEGORY_META,
  BASE_URL
};

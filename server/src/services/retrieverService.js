// Uniwersalny retriever dla różnych typów danych

export const findBestMatches = (items, query, config = {}) => {
  const {
    limit = 5,
    keywordsField = 'slowa_kluczowe',
    nameField = 'nazwa',
    categoryField = 'kategoria',
    descriptionField = 'krotki_opis'
  } = config;

  const queryLower = query.toLowerCase();
  
  const scored = items.map(item => {
    let score = 0;
    
    // Punkty za słowa kluczowe
    if (item[keywordsField]) {
      const keywords = Array.isArray(item[keywordsField]) 
        ? item[keywordsField] 
        : [item[keywordsField]];
      
      keywords.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 10;
        }
      });
    }
    
    // Punkty za nazwę
    if (item[nameField] && queryLower.includes(item[nameField].toLowerCase())) {
      score += 20;
    }
    
    // Punkty za kategorię
    if (item[categoryField] && queryLower.includes(item[categoryField].toLowerCase())) {
      score += 5;
    }
    
    // Punkty za opis
    if (item[descriptionField] && queryLower.includes(item[descriptionField].toLowerCase())) {
      score += 3;
    }
    
    return { ...item, score };
  });
  
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const findSwiadczenia = (swiadczenia, query, limit = 5) => {
  return findBestMatches(swiadczenia, query, {
    limit,
    keywordsField: 'slowa_kluczowe',
    nameField: 'nazwa',
    categoryField: 'kategoria',
    descriptionField: 'krotki_opis'
  });
};

export const findPisma = (pisma, query, limit = 5) => {
  return findBestMatches(pisma, query, {
    limit,
    keywordsField: 'slowa_kluczowe',
    nameField: 'nazwa',
    categoryField: 'kategoria',
    descriptionField: 'opis'
  });
};

export const findDotacje = (dotacje, query, limit = 5) => {
  const queryLower = query.toLowerCase();
  
  const scored = dotacje.map(dotacja => {
    let score = 0;
    
    // Słowa kluczowe
    if (dotacja.slowa_kluczowe) {
      dotacja.slowa_kluczowe.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 10;
        }
      });
    }
    
    // Nazwa
    if (queryLower.includes(dotacja.nazwa.toLowerCase())) {
      score += 20;
    }
    
    // Sektor
    if (dotacja.sektor && queryLower.includes(dotacja.sektor.toLowerCase())) {
      score += 5;
    }
    
    // Beneficjenci
    if (dotacja.beneficjenci) {
      dotacja.beneficjenci.forEach(ben => {
        if (queryLower.includes(ben.toLowerCase())) {
          score += 8;
        }
      });
    }
    
    return { ...dotacja, score };
  });
  
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export default {
  findBestMatches,
  findSwiadczenia,
  findPisma,
  findDotacje
};
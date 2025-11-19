import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Retriever - wyszukiwanie najlepszych dopasowań
const findBestMatches = (swiadczenia, query, limit = 3) => {
  const queryLower = query.toLowerCase();
  
  const scored = swiadczenia.map(sw => {
    let score = 0;
    
    // Punkty za słowa kluczowe
    if (sw.slowa_kluczowe) {
      sw.slowa_kluczowe.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 10;
        }
      });
    }
    
    // Punkty za nazwę
    if (queryLower.includes(sw.nazwa.toLowerCase())) {
      score += 20;
    }
    
    // Punkty za kategorię
    if (sw.kategoria && queryLower.includes(sw.kategoria.toLowerCase())) {
      score += 5;
    }
    
    // Punkty za opis
    if (sw.krotki_opis && queryLower.includes(sw.krotki_opis.toLowerCase())) {
      score += 3;
    }
    
    return { ...sw, score };
  });
  
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const getAllSwiadczenia = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('swiadczenia')
      .select('*')
      .order('nazwa', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching swiadczenia:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSwiadczenieById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('swiadczenia')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ success: false, message: 'Świadczenie nie znalezione' });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching swiadczenie:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchSwiadczenia = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ success: false, message: 'Brak zapytania wyszukiwania' });
    }

    // Pobierz wszystkie świadczenia
    const { data: allSwiadczenia, error } = await supabase
      .from('swiadczenia')
      .select('*');

    if (error) throw error;

    // Znajdź najlepsze dopasowania
    const matches = findBestMatches(allSwiadczenia, q, 5);

    res.json({ success: true, data: matches });
  } catch (error) {
    console.error('Error searching swiadczenia:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSwiadczeniaByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const { data, error } = await supabase
      .from('swiadczenia')
      .select('*')
      .eq('kategoria', category)
      .order('nazwa', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching swiadczenia by category:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('swiadczenia')
      .select('kategoria')
      .order('kategoria', { ascending: true });

    if (error) throw error;

    // Unikalne kategorie
    const categories = [...new Set(data.map(item => item.kategoria))];

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllSwiadczenia,
  getSwiadczenieById,
  searchSwiadczenia,
  getSwiadczeniaByCategory,
  getCategories,
};
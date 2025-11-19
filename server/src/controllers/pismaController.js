import { supabase } from '../config/supabase.js';

// Retriever dla pism
const findMatchingPisma = (pisma, query, limit = 5) => {
  const queryLower = query.toLowerCase();
  
  const scored = pisma.map(pismo => {
    let score = 0;
    
    if (pismo.slowa_kluczowe) {
      pismo.slowa_kluczowe.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 10;
        }
      });
    }
    
    if (queryLower.includes(pismo.nazwa.toLowerCase())) {
      score += 20;
    }
    
    if (pismo.kategoria && queryLower.includes(pismo.kategoria.toLowerCase())) {
      score += 5;
    }
    
    return { ...pismo, score };
  });
  
  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

export const getAllPisma = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pisma')
      .select('*')
      .order('nazwa', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching pisma:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPismoById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('pisma')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ 
        success: false, 
        message: 'Pismo nie znalezione' 
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching pismo:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchPisma = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ 
        success: false, 
        message: 'Brak zapytania wyszukiwania' 
      });
    }

    const { data: allPisma, error } = await supabase
      .from('pisma')
      .select('*');

    if (error) throw error;

    const matches = findMatchingPisma(allPisma, q, 5);

    res.json({ success: true, data: matches });
  } catch (error) {
    console.error('Error searching pisma:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPismaByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const { data, error } = await supabase
      .from('pisma')
      .select('*')
      .eq('kategoria', category)
      .order('nazwa', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching pisma by category:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('pisma')
      .select('kategoria')
      .order('kategoria', { ascending: true });

    if (error) throw error;

    const categories = [...new Set(data.map(item => item.kategoria))];

    res.json({ success: true, data: categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllPisma,
  getPismoById,
  searchPisma,
  getPismaByCategory,
  getCategories
};
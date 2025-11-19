import { supabase } from '../config/supabase.js';

// Retriever dla dotacji
const findMatchingDotacje = (dotacje, query, limit = 5) => {
  const queryLower = query.toLowerCase();
  
  const scored = dotacje.map(dotacja => {
    let score = 0;
    
    if (dotacja.slowa_kluczowe) {
      dotacja.slowa_kluczowe.forEach(keyword => {
        if (queryLower.includes(keyword.toLowerCase())) {
          score += 10;
        }
      });
    }
    
    if (queryLower.includes(dotacja.nazwa.toLowerCase())) {
      score += 20;
    }
    
    if (dotacja.sektor && queryLower.includes(dotacja.sektor.toLowerCase())) {
      score += 5;
    }
    
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

export const getAllDotacje = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('dotacje')
      .select('*')
      .order('nazwa', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching dotacje:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDotacjaById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('dotacje')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ 
        success: false, 
        message: 'Dotacja nie znaleziona' 
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching dotacja:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchDotacje = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ 
        success: false, 
        message: 'Brak zapytania wyszukiwania' 
      });
    }

    const { data: allDotacje, error } = await supabase
      .from('dotacje')
      .select('*');

    if (error) throw error;

    const matches = findMatchingDotacje(allDotacje, q, 5);

    res.json({ success: true, data: matches });
  } catch (error) {
    console.error('Error searching dotacje:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getDotacjeBySektor = async (req, res) => {
  try {
    const { sektor } = req.params;

    const { data, error } = await supabase
      .from('dotacje')
      .select('*')
      .eq('sektor', sektor)
      .order('nazwa', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching dotacje by sektor:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSektory = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('dotacje')
      .select('sektor')
      .order('sektor', { ascending: true });

    if (error) throw error;

    const sektory = [...new Set(data.map(item => item.sektor))];

    res.json({ success: true, data: sektory });
  } catch (error) {
    console.error('Error fetching sektory:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getActiveDotacje = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('dotacje')
      .select('*')
      .eq('status', 'aktywna')
      .order('nazwa', { ascending: true });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching active dotacje:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllDotacje,
  getDotacjaById,
  searchDotacje,
  getDotacjeBySektor,
  getSektory,
  getActiveDotacje
};
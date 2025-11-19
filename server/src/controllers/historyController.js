import { supabase } from '../config/supabase.js';

export const getAllHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { limit = 50, offset = 0 } = req.query;

    const { data, error, count } = await supabase
      .from('chat_history')
      .select('*', { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    res.json({
      success: true,
      data,
      pagination: {
        total: count,
        limit: parseInt(limit),
        offset: parseInt(offset)
      }
    });
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addHistoryItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { role, content, matches } = req.body;

    if (!role || !content) {
      return res.status(400).json({
        success: false,
        message: 'Role i content są wymagane'
      });
    }

    const { data, error } = await supabase
      .from('chat_history')
      .insert({
        user_id: userId,
        role,
        content,
        matches: matches || null
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Dodano do historii',
      data
    });
  } catch (error) {
    console.error('Error adding history item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getHistoryItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('id', id)
      .eq('user_id', userId)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Element historii nie znaleziony'
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching history item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHistoryItem = async (req, res) => {
  try {
    const userId = req.userId;
    const { id } = req.params;

    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('id', id)
      .eq('user_id', userId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Usunięto element historii'
    });
  } catch (error) {
    console.error('Error deleting history item:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearHistory = async (req, res) => {
  try {
    const userId = req.userId;

    const { error } = await supabase
      .from('chat_history')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Wyczyszczono historię'
    });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchHistory = async (req, res) => {
  try {
    const userId = req.userId;
    const { q, limit = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: 'Brak zapytania wyszukiwania'
      });
    }

    const { data, error } = await supabase
      .from('chat_history')
      .select('*')
      .eq('user_id', userId)
      .ilike('content', `%${q}%`)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error searching history:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllHistory,
  addHistoryItem,
  getHistoryItem,
  deleteHistoryItem,
  clearHistory,
  searchHistory
};
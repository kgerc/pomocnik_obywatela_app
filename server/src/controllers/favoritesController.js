import { supabase } from '../config/supabase.js';

export const getAllFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFavoritesByType = async (req, res) => {
  try {
    const userId = req.userId;
    const { type } = req.params;

    const { data, error } = await supabase
      .from('favorites')
      .select('*')
      .eq('user_id', userId)
      .eq('item_type', type)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching favorites by type:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemType, itemId } = req.body;

    // Sprawdź czy już istnieje
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .single();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Ten element jest już w ulubionych'
      });
    }

    const { data, error } = await supabase
      .from('favorites')
      .insert({
        user_id: userId,
        item_type: itemType,
        item_id: itemId
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Dodano do ulubionych',
      data
    });
  } catch (error) {
    console.error('Error adding favorite:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemType, itemId } = req.body;

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Usunięto z ulubionych'
    });
  } catch (error) {
    console.error('Error removing favorite:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkFavorite = async (req, res) => {
  try {
    const userId = req.userId;
    const { itemType, itemId } = req.query;

    const { data, error } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('item_type', itemType)
      .eq('item_id', itemId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.json({
      success: true,
      isFavorite: !!data
    });
  } catch (error) {
    console.error('Error checking favorite:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearAllFavorites = async (req, res) => {
  try {
    const userId = req.userId;

    const { error } = await supabase
      .from('favorites')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Usunięto wszystkie ulubione'
    });
  } catch (error) {
    console.error('Error clearing favorites:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getAllFavorites,
  getFavoritesByType,
  addFavorite,
  removeFavorite,
  checkFavorite,
  clearAllFavorites
};
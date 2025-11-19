import { supabase } from '../config/supabase.js';

class Favorite {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id || data.userId;
    this.itemType = data.item_type || data.itemType;
    this.itemId = data.item_id || data.itemId;
    this.createdAt = data.created_at || data.createdAt;
  }

  // Znajdź wszystkie ulubione użytkownika
  static async findByUserId(userId, options = {}) {
    try {
      const { limit = 100, offset = 0 } = options;

      const { data, error, count } = await supabase
        .from('favorites')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        favorites: data.map(f => new Favorite(f)),
        total: count
      };
    } catch (error) {
      console.error('Error finding favorites:', error);
      throw error;
    }
  }

  // Znajdź ulubione według typu
  static async findByUserIdAndType(userId, itemType) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId)
        .eq('item_type', itemType)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data.map(f => new Favorite(f));
    } catch (error) {
      console.error('Error finding favorites by type:', error);
      throw error;
    }
  }

  // Sprawdź czy element jest w ulubionych
  static async isFavorite(userId, itemType, itemId) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('item_type', itemType)
        .eq('item_id', itemId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return false;
        throw error;
      }

      return !!data;
    } catch (error) {
      console.error('Error checking favorite:', error);
      throw error;
    }
  }

  // Dodaj do ulubionych
  static async create(userId, itemType, itemId) {
    try {
      // Sprawdź czy już istnieje
      const exists = await Favorite.isFavorite(userId, itemType, itemId);
      if (exists) {
        throw new Error('Ten element jest już w ulubionych');
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

      return new Favorite(data);
    } catch (error) {
      console.error('Error creating favorite:', error);
      throw error;
    }
  }

  // Usuń z ulubionych
  static async delete(userId, itemType, itemId) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('item_type', itemType)
        .eq('item_id', itemId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting favorite:', error);
      throw error;
    }
  }

  // Usuń pojedynczy element po ID
  static async deleteById(id, userId) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting favorite by id:', error);
      throw error;
    }
  }

  // Wyczyść wszystkie ulubione użytkownika
  static async clearAll(userId) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error clearing favorites:', error);
      throw error;
    }
  }

  // Wyczyść ulubione według typu
  static async clearByType(userId, itemType) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('item_type', itemType);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error clearing favorites by type:', error);
      throw error;
    }
  }

  // Policz ulubione użytkownika
  static async countByUserId(userId) {
    try {
      const { count, error } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (error) throw error;

      return count;
    } catch (error) {
      console.error('Error counting favorites:', error);
      throw error;
    }
  }

  // Policz według typu
  static async countByType(userId, itemType) {
    try {
      const { count, error } = await supabase
        .from('favorites')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)
        .eq('item_type', itemType);

      if (error) throw error;

      return count;
    } catch (error) {
      console.error('Error counting favorites by type:', error);
      throw error;
    }
  }

  // Toggle ulubione (dodaj jeśli nie ma, usuń jeśli jest)
  static async toggle(userId, itemType, itemId) {
    try {
      const exists = await Favorite.isFavorite(userId, itemType, itemId);
      
      if (exists) {
        await Favorite.delete(userId, itemType, itemId);
        return { action: 'removed', isFavorite: false };
      } else {
        await Favorite.create(userId, itemType, itemId);
        return { action: 'added', isFavorite: true };
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      itemType: this.itemType,
      itemId: this.itemId,
      createdAt: this.createdAt
    };
  }
}

export default Favorite;
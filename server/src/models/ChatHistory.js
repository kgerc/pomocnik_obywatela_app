import { supabase } from '../config/supabase.js';

class ChatHistory {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id || data.userId;
    this.role = data.role;
    this.content = data.content;
    this.matches = data.matches;
    this.createdAt = data.created_at || data.createdAt;
  }

  // Znajdź historię użytkownika
  static async findByUserId(userId, options = {}) {
    try {
      const { limit = 50, offset = 0 } = options;

      const { data, error, count } = await supabase
        .from('chat_history')
        .select('*', { count: 'exact' })
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        history: data.map(h => new ChatHistory(h)),
        total: count
      };
    } catch (error) {
      console.error('Error finding chat history:', error);
      throw error;
    }
  }

  // Znajdź element po ID
  static async findById(id, userId) {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new ChatHistory(data) : null;
    } catch (error) {
      console.error('Error finding chat history item:', error);
      throw error;
    }
  }

  // Dodaj wiadomość do historii
  static async create(userId, role, content, matches = null) {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .insert({
          user_id: userId,
          role,
          content,
          matches
        })
        .select()
        .single();

      if (error) throw error;

      return new ChatHistory(data);
    } catch (error) {
      console.error('Error creating chat history item:', error);
      throw error;
    }
  }

  // Dodaj wiele wiadomości naraz
  static async createMany(userId, messages) {
    try {
      const items = messages.map(msg => ({
        user_id: userId,
        role: msg.role,
        content: msg.content,
        matches: msg.matches || null
      }));

      const { data, error } = await supabase
        .from('chat_history')
        .insert(items)
        .select();

      if (error) throw error;

      return data.map(h => new ChatHistory(h));
    } catch (error) {
      console.error('Error creating multiple chat history items:', error);
      throw error;
    }
  }

  // Usuń element z historii
  static async deleteById(id, userId) {
    try {
      const { error } = await supabase
        .from('chat_history')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting chat history item:', error);
      throw error;
    }
  }

  // Wyczyść całą historię użytkownika
  static async clearAll(userId) {
    try {
      const { error } = await supabase
        .from('chat_history')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error clearing chat history:', error);
      throw error;
    }
  }

  // Wyczyść starą historię (starsze niż X dni)
  static async clearOlderThan(userId, days = 30) {
    try {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - days);

      const { error } = await supabase
        .from('chat_history')
        .delete()
        .eq('user_id', userId)
        .lt('created_at', cutoffDate.toISOString());

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error clearing old chat history:', error);
      throw error;
    }
  }

  // Wyszukaj w historii
  static async search(userId, query, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', userId)
        .ilike('content', `%${query}%`)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data.map(h => new ChatHistory(h));
    } catch (error) {
      console.error('Error searching chat history:', error);
      throw error;
    }
  }

  // Pobierz ostatnią konwersację (N ostatnich wiadomości)
  static async getRecentMessages(userId, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Odwróć kolejność, żeby najstarsza była pierwsza
      return data.reverse().map(h => new ChatHistory(h));
    } catch (error) {
      console.error('Error getting recent messages:', error);
      throw error;
    }
  }

  // Policz wiadomości użytkownika
  static async countByUserId(userId) {
    try {
      const { count, error } = await supabase
        .from('chat_history')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (error) throw error;

      return count;
    } catch (error) {
      console.error('Error counting chat history:', error);
      throw error;
    }
  }

  // Pobierz statystyki historii
  static async getStats(userId) {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('role, created_at')
        .eq('user_id', userId);

      if (error) throw error;

      const totalMessages = data.length;
      const userMessages = data.filter(m => m.role === 'user').length;
      const assistantMessages = data.filter(m => m.role === 'assistant').length;

      // Pierwsza i ostatnia wiadomość
      const sortedByDate = data.sort((a, b) => 
        new Date(a.created_at) - new Date(b.created_at)
      );
      
      const firstMessage = sortedByDate[0]?.created_at;
      const lastMessage = sortedByDate[sortedByDate.length - 1]?.created_at;

      return {
        totalMessages,
        userMessages,
        assistantMessages,
        firstMessage,
        lastMessage
      };
    } catch (error) {
      console.error('Error getting chat history stats:', error);
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      role: this.role,
      content: this.content,
      matches: this.matches,
      createdAt: this.createdAt
    };
  }

  // Format dla wyświetlenia w UI
  toDisplayFormat() {
    return {
      role: this.role,
      content: this.content,
      matches: this.matches,
      timestamp: this.createdAt
    };
  }
}

export default ChatHistory;
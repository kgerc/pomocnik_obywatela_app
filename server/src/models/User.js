import { supabase } from '../config/supabase.js';

class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.fullName = data.full_name || data.fullName;
    this.createdAt = data.created_at || data.createdAt;
    this.updatedAt = data.updated_at || data.updatedAt;
  }

  // Znajdź użytkownika po ID
  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }

      return data ? new User(data) : null;
    } catch (error) {
      console.error('Error finding user by ID:', error);
      throw error;
    }
  }

  // Znajdź użytkownika po email
  static async findByEmail(email) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new User(data) : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  // Utwórz nowego użytkownika (profil)
  static async create(userData) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert({
          id: userData.id,
          email: userData.email,
          full_name: userData.fullName || ''
        })
        .select()
        .single();

      if (error) throw error;

      return new User(data);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  // Aktualizuj profil użytkownika
  static async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: updates.fullName,
          updated_at: new Date()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return new User(data);
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  // Usuń użytkownika
  static async delete(id) {
    try {
      // Usuń auth user (Supabase automatycznie usunie profil przez CASCADE)
      const { error } = await supabase.auth.admin.deleteUser(id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  // Pobierz wszystkich użytkowników (admin)
  static async findAll(limit = 50, offset = 0) {
    try {
      const { data, error, count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        users: data.map(u => new User(u)),
        total: count
      };
    } catch (error) {
      console.error('Error finding all users:', error);
      throw error;
    }
  }

  // Wyszukaj użytkowników
  static async search(query, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .or(`email.ilike.%${query}%,full_name.ilike.%${query}%`)
        .limit(limit);

      if (error) throw error;

      return data.map(u => new User(u));
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  // Sprawdź czy email istnieje
  static async emailExists(email) {
    try {
      const user = await User.findByEmail(email);
      return !!user;
    } catch (error) {
      console.error('Error checking email existence:', error);
      throw error;
    }
  }

  // Instance methods
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      fullName: this.fullName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  toPublicJSON() {
    return {
      id: this.id,
      fullName: this.fullName
    };
  }
}

export default User;
import { supabase } from '../config/supabase.js';

class Swiadczenie {
  constructor(data) {
    this.id = data.id;
    this.nazwa = data.nazwa;
    this.kategoria = data.kategoria;
    this.krotki_opis = data.krotki_opis;
    this.kogo_dotyczy = data.kogo_dotyczy;
    this.kwalifikacja = data.kwalifikacja;
    this.dokumenty = data.dokumenty;
    this.kiedy_zlozyc = data.kiedy_zlozyc;
    this.gdzie_zlozyc = data.gdzie_zlozyc;
    this.uwagi = data.uwagi;
    this.link = data.link;
    this.pdf = data.pdf;
    this.slowa_kluczowe = data.slowa_kluczowe;
    this.ostatnia_aktualizacja = data.ostatnia_aktualizacja;
    this.created_at = data.created_at;
  }

  // Znajdź świadczenie po ID
  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('swiadczenia')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new Swiadczenie(data) : null;
    } catch (error) {
      console.error('Error finding swiadczenie:', error);
      throw error;
    }
  }

  // Pobierz wszystkie świadczenia
  static async findAll(options = {}) {
    try {
      const { limit = 100, offset = 0, orderBy = 'nazwa' } = options;

      const { data, error, count } = await supabase
        .from('swiadczenia')
        .select('*', { count: 'exact' })
        .order(orderBy, { ascending: true })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        swiadczenia: data.map(s => new Swiadczenie(s)),
        total: count
      };
    } catch (error) {
      console.error('Error finding all swiadczenia:', error);
      throw error;
    }
  }

  // Znajdź po kategorii
  static async findByCategory(kategoria) {
    try {
      const { data, error } = await supabase
        .from('swiadczenia')
        .select('*')
        .eq('kategoria', kategoria)
        .order('nazwa', { ascending: true });

      if (error) throw error;

      return data.map(s => new Swiadczenie(s));
    } catch (error) {
      console.error('Error finding swiadczenia by category:', error);
      throw error;
    }
  }

  // Wyszukaj świadczenia
  static async search(query, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('swiadczenia')
        .select('*')
        .or(`nazwa.ilike.%${query}%,krotki_opis.ilike.%${query}%`)
        .limit(limit);

      if (error) throw error;

      return data.map(s => new Swiadczenie(s));
    } catch (error) {
      console.error('Error searching swiadczenia:', error);
      throw error;
    }
  }

  // Pobierz kategorie
  static async getCategories() {
    try {
      const { data, error } = await supabase
        .from('swiadczenia')
        .select('kategoria')
        .order('kategoria', { ascending: true });

      if (error) throw error;

      return [...new Set(data.map(item => item.kategoria))];
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  }

  // Utwórz nowe świadczenie (admin)
  static async create(swiadczenieData) {
    try {
      const { data, error } = await supabase
        .from('swiadczenia')
        .insert(swiadczenieData)
        .select()
        .single();

      if (error) throw error;

      return new Swiadczenie(data);
    } catch (error) {
      console.error('Error creating swiadczenie:', error);
      throw error;
    }
  }

  // Aktualizuj świadczenie (admin)
  static async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('swiadczenia')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return new Swiadczenie(data);
    } catch (error) {
      console.error('Error updating swiadczenie:', error);
      throw error;
    }
  }

  // Usuń świadczenie (admin)
  static async delete(id) {
    try {
      const { error } = await supabase
        .from('swiadczenia')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting swiadczenie:', error);
      throw error;
    }
  }

  // Wyszukiwanie z punktacją (retriever)
  static async findMatches(query, limit = 5) {
    try {
      const { data, error } = await supabase
        .from('swiadczenia')
        .select('*');

      if (error) throw error;

      const queryLower = query.toLowerCase();
      
      const scored = data.map(sw => {
        let score = 0;
        
        if (sw.slowa_kluczowe) {
          sw.slowa_kluczowe.forEach(keyword => {
            if (queryLower.includes(keyword.toLowerCase())) {
              score += 10;
            }
          });
        }
        
        if (queryLower.includes(sw.nazwa.toLowerCase())) {
          score += 20;
        }
        
        if (sw.kategoria && queryLower.includes(sw.kategoria.toLowerCase())) {
          score += 5;
        }
        
        return { ...sw, score };
      });
      
      return scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(s => new Swiadczenie(s));
    } catch (error) {
      console.error('Error finding matches:', error);
      throw error;
    }
  }

  // Instance methods
  toJSON() {
    return {
      id: this.id,
      nazwa: this.nazwa,
      kategoria: this.kategoria,
      krotki_opis: this.krotki_opis,
      kogo_dotyczy: this.kogo_dotyczy,
      kwalifikacja: this.kwalifikacja,
      dokumenty: this.dokumenty,
      kiedy_zlozyc: this.kiedy_zlozyc,
      gdzie_zlozyc: this.gdzie_zlozyc,
      uwagi: this.uwagi,
      link: this.link,
      pdf: this.pdf,
      slowa_kluczowe: this.slowa_kluczowe,
      ostatnia_aktualizacja: this.ostatnia_aktualizacja,
      created_at: this.created_at
    };
  }
}

export default Swiadczenie;
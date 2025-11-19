import { supabase } from '../config/supabase.js';

class Pismo {
  constructor(data) {
    this.id = data.id;
    this.nazwa = data.nazwa;
    this.kategoria = data.kategoria;
    this.opis = data.opis;
    this.pdf = data.pdf;
    this.link = data.link;
    this.szablon = data.szablon;
    this.slowa_kluczowe = data.slowa_kluczowe;
    this.created_at = data.created_at;
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('pisma')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new Pismo(data) : null;
    } catch (error) {
      console.error('Error finding pismo:', error);
      throw error;
    }
  }

  static async findAll(options = {}) {
    try {
      const { limit = 100, offset = 0, orderBy = 'nazwa' } = options;

      const { data, error, count } = await supabase
        .from('pisma')
        .select('*', { count: 'exact' })
        .order(orderBy, { ascending: true })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        pisma: data.map(p => new Pismo(p)),
        total: count
      };
    } catch (error) {
      console.error('Error finding all pisma:', error);
      throw error;
    }
  }

  static async findByCategory(kategoria) {
    try {
      const { data, error } = await supabase
        .from('pisma')
        .select('*')
        .eq('kategoria', kategoria)
        .order('nazwa', { ascending: true });

      if (error) throw error;

      return data.map(p => new Pismo(p));
    } catch (error) {
      console.error('Error finding pisma by category:', error);
      throw error;
    }
  }

  static async search(query, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('pisma')
        .select('*')
        .or(`nazwa.ilike.%${query}%,opis.ilike.%${query}%`)
        .limit(limit);

      if (error) throw error;

      return data.map(p => new Pismo(p));
    } catch (error) {
      console.error('Error searching pisma:', error);
      throw error;
    }
  }

  static async getCategories() {
    try {
      const { data, error } = await supabase
        .from('pisma')
        .select('kategoria')
        .order('kategoria', { ascending: true });

      if (error) throw error;

      return [...new Set(data.map(item => item.kategoria))];
    } catch (error) {
      console.error('Error getting categories:', error);
      throw error;
    }
  }

  static async create(pismoData) {
    try {
      const { data, error } = await supabase
        .from('pisma')
        .insert(pismoData)
        .select()
        .single();

      if (error) throw error;

      return new Pismo(data);
    } catch (error) {
      console.error('Error creating pismo:', error);
      throw error;
    }
  }

  static async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('pisma')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return new Pismo(data);
    } catch (error) {
      console.error('Error updating pismo:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('pisma')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting pismo:', error);
      throw error;
    }
  }

  static async findMatches(query, limit = 5) {
    try {
      const { data, error } = await supabase
        .from('pisma')
        .select('*');

      if (error) throw error;

      const queryLower = query.toLowerCase();
      
      const scored = data.map(pismo => {
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
        .filter(p => p.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(p => new Pismo(p));
    } catch (error) {
      console.error('Error finding matches:', error);
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      nazwa: this.nazwa,
      kategoria: this.kategoria,
      opis: this.opis,
      pdf: this.pdf,
      link: this.link,
      szablon: this.szablon,
      slowa_kluczowe: this.slowa_kluczowe,
      created_at: this.created_at
    };
  }
}

export default Pismo;
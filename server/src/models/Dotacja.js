import { supabase } from '../config/supabase.js';

class Dotacja {
  constructor(data) {
    this.id = data.id;
    this.nazwa = data.nazwa;
    this.sektor = data.sektor;
    this.beneficjenci = data.beneficjenci;
    this.kwota_max = data.kwota_max;
    this.opis = data.opis;
    this.termin = data.termin;
    this.link = data.link;
    this.status = data.status;
    this.slowa_kluczowe = data.slowa_kluczowe;
    this.created_at = data.created_at;
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('dotacje')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new Dotacja(data) : null;
    } catch (error) {
      console.error('Error finding dotacja:', error);
      throw error;
    }
  }

  static async findAll(options = {}) {
    try {
      const { limit = 100, offset = 0, orderBy = 'nazwa' } = options;

      const { data, error, count } = await supabase
        .from('dotacje')
        .select('*', { count: 'exact' })
        .order(orderBy, { ascending: true })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      return {
        dotacje: data.map(d => new Dotacja(d)),
        total: count
      };
    } catch (error) {
      console.error('Error finding all dotacje:', error);
      throw error;
    }
  }

  static async findBySektor(sektor) {
    try {
      const { data, error } = await supabase
        .from('dotacje')
        .select('*')
        .eq('sektor', sektor)
        .order('nazwa', { ascending: true });

      if (error) throw error;

      return data.map(d => new Dotacja(d));
    } catch (error) {
      console.error('Error finding dotacje by sektor:', error);
      throw error;
    }
  }

  static async findByStatus(status) {
    try {
      const { data, error } = await supabase
        .from('dotacje')
        .select('*')
        .eq('status', status)
        .order('nazwa', { ascending: true });

      if (error) throw error;

      return data.map(d => new Dotacja(d));
    } catch (error) {
      console.error('Error finding dotacje by status:', error);
      throw error;
    }
  }

  static async findActive() {
    return Dotacja.findByStatus('aktywna');
  }

  static async search(query, limit = 10) {
    try {
      const { data, error } = await supabase
        .from('dotacje')
        .select('*')
        .or(`nazwa.ilike.%${query}%,opis.ilike.%${query}%`)
        .limit(limit);

      if (error) throw error;

      return data.map(d => new Dotacja(d));
    } catch (error) {
      console.error('Error searching dotacje:', error);
      throw error;
    }
  }

  static async getSektory() {
    try {
      const { data, error } = await supabase
        .from('dotacje')
        .select('sektor')
        .order('sektor', { ascending: true });

      if (error) throw error;

      return [...new Set(data.map(item => item.sektor))];
    } catch (error) {
      console.error('Error getting sektory:', error);
      throw error;
    }
  }

  static async create(dotacjaData) {
    try {
      const { data, error } = await supabase
        .from('dotacje')
        .insert(dotacjaData)
        .select()
        .single();

      if (error) throw error;

      return new Dotacja(data);
    } catch (error) {
      console.error('Error creating dotacja:', error);
      throw error;
    }
  }

  static async update(id, updates) {
    try {
      const { data, error } = await supabase
        .from('dotacje')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return new Dotacja(data);
    } catch (error) {
      console.error('Error updating dotacja:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('dotacje')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting dotacja:', error);
      throw error;
    }
  }

  static async findMatches(query, limit = 5) {
    try {
      const { data, error } = await supabase
        .from('dotacje')
        .select('*');

      if (error) throw error;

      const queryLower = query.toLowerCase();
      
      const scored = data.map(dotacja => {
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
        .filter(d => d.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(d => new Dotacja(d));
    } catch (error) {
      console.error('Error finding matches:', error);
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      nazwa: this.nazwa,
      sektor: this.sektor,
      beneficjenci: this.beneficjenci,
      kwota_max: this.kwota_max,
      opis: this.opis,
      termin: this.termin,
      link: this.link,
      status: this.status,
      slowa_kluczowe: this.slowa_kluczowe,
      created_at: this.created_at
    };
  }
}

export default Dotacja;
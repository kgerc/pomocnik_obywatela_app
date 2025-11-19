import { supabase } from '../config/supabase.js';
import Swiadczenie from './Swiadczenie.js';

class Personalization {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id || data.userId;
    this.liczba_dzieci = data.liczba_dzieci;
    this.wiek_dzieci = data.wiek_dzieci || [];
    this.dochod_na_osobe = data.dochod_na_osobe;
    this.niepelnosprawnosc = data.niepelnosprawnosc;
    this.status_zawodowy = data.status_zawodowy;
    this.stan_cywilny = data.stan_cywilny;
    this.wlasnosc_mieszkania = data.wlasnosc_mieszkania;
    this.createdAt = data.created_at || data.createdAt;
    this.updatedAt = data.updated_at || data.updatedAt;
  }

  // Znajdź personalizację użytkownika
  static async findByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('personalization')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new Personalization(data) : null;
    } catch (error) {
      console.error('Error finding personalization:', error);
      throw error;
    }
  }

  // Utwórz lub zaktualizuj personalizację
  static async upsert(userId, personalizationData) {
    try {
      const existing = await Personalization.findByUserId(userId);

      if (existing) {
        return await Personalization.update(userId, personalizationData);
      } else {
        return await Personalization.create(userId, personalizationData);
      }
    } catch (error) {
      console.error('Error upserting personalization:', error);
      throw error;
    }
  }

  // Utwórz nową personalizację
  static async create(userId, personalizationData) {
    try {
      const { data, error } = await supabase
        .from('personalization')
        .insert({
          user_id: userId,
          ...personalizationData
        })
        .select()
        .single();

      if (error) throw error;

      return new Personalization(data);
    } catch (error) {
      console.error('Error creating personalization:', error);
      throw error;
    }
  }

  // Zaktualizuj personalizację
  static async update(userId, updates) {
    try {
      const { data, error } = await supabase
        .from('personalization')
        .update({
          ...updates,
          updated_at: new Date()
        })
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return new Personalization(data);
    } catch (error) {
      console.error('Error updating personalization:', error);
      throw error;
    }
  }

  // Usuń personalizację
  static async delete(userId) {
    try {
      const { error } = await supabase
        .from('personalization')
        .delete()
        .eq('user_id', userId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting personalization:', error);
      throw error;
    }
  }

  // Generuj rekomendacje świadczeń na podstawie personalizacji
  static async generateRecommendations(userId) {
    try {
      const personalization = await Personalization.findByUserId(userId);
      
      if (!personalization) {
        return [];
      }

      // Pobierz wszystkie świadczenia
      const { swiadczenia } = await Swiadczenie.findAll({ limit: 100 });
      const recommendations = [];

      // Algorytm rekomendacji
      
      // 1. Świadczenia rodzinne
      if (personalization.liczba_dzieci > 0) {
        const rodzinne = swiadczenia.filter(s => 
          s.kategoria === 'Świadczenia rodzinne' || 
          s.id === '500plus' || 
          s.id === 'zasilek-rodzinny' ||
          s.id === 'dobry-start'
        );
        recommendations.push(...rodzinne);
      }

      // 2. Karta Dużej Rodziny
      if (personalization.liczba_dzieci >= 3) {
        const kdr = swiadczenia.find(s => s.id === 'karta-duzej-rodziny');
        if (kdr) recommendations.push(kdr);
      }

      // 3. Świadczenia dla osób o niskich dochodach
      if (personalization.dochod_na_osobe < 1000) {
        const niskie_dochody = swiadczenia.filter(s =>
          s.id === 'dodatek-mieszkaniowy' ||
          s.id === 'dodatek-oslonowy' ||
          s.id === 'bon-energetyczny'
        );
        recommendations.push(...niskie_dochody);
      }

      // 4. Świadczenia dla osób z niepełnosprawnością
      if (personalization.niepelnosprawnosc) {
        const niepelnosprawnosc = swiadczenia.filter(s =>
          s.kategoria === 'Świadczenia opiekuńcze' ||
          s.kategoria === 'Rehabilitacja' ||
          s.id === 'zasilek-pielegnacyjny' ||
          s.id === 'swiadczenie-wspierajace' ||
          s.id === 'dofinansowanie-turnusu'
        );
        recommendations.push(...niepelnosprawnosc);
      }

      // 5. Status zawodowy
      if (personalization.status_zawodowy === 'bezrobotny') {
        const bezrobotny = swiadczenia.find(s => s.id === 'zasilek-dla-bezrobotnych');
        if (bezrobotny) recommendations.push(bezrobotny);
      }

      if (personalization.status_zawodowy === 'student') {
        const student = swiadczenia.filter(s => 
          s.kategoria === 'Edukacja' ||
          s.id === 'stypendium-socjalne'
        );
        recommendations.push(...student);
      }

      if (personalization.status_zawodowy === 'emeryt') {
        const emeryt = swiadczenia.filter(s =>
          s.kategoria === 'ZUS' ||
          s.id === 'emerytura' ||
          s.id === 'renta'
        );
        recommendations.push(...emeryt);
      }

      // 6. Własność mieszkania - dla wynajmujących
      if (personalization.wlasnosc_mieszkania === 'wynajem') {
        const wynajem = swiadczenia.find(s => s.id === 'dodatek-mieszkaniowy');
        if (wynajem) recommendations.push(wynajem);
      }

      // Usuń duplikaty
      const uniqueRecommendations = Array.from(
        new Map(recommendations.map(item => [item.id, item])).values()
      );

      return uniqueRecommendations;
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  }

  // Oblicz scoring dla świadczenia (jak dobrze pasuje do użytkownika)
  calculateMatchScore(swiadczenie) {
    let score = 0;

    // Dzieci
    if (this.liczba_dzieci > 0) {
      if (swiadczenie.kategoria === 'Świadczenia rodzinne') score += 30;
      if (swiadczenie.slowa_kluczowe?.includes('dziecko')) score += 20;
    }

    // Dochody
    if (this.dochod_na_osobe < 1000) {
      if (swiadczenie.slowa_kluczowe?.includes('niskie dochody')) score += 25;
      if (swiadczenie.id?.includes('dodatek')) score += 15;
    }

    // Niepełnosprawność
    if (this.niepelnosprawnosc) {
      if (swiadczenie.kategoria === 'Rehabilitacja') score += 40;
      if (swiadczenie.slowa_kluczowe?.includes('niepełnosprawność')) score += 30;
    }

    // Status zawodowy
    if (this.status_zawodowy === 'bezrobotny' && 
        swiadczenie.slowa_kluczowe?.includes('praca')) {
      score += 35;
    }

    return score;
  }

  // Pobierz statystyki personalizacji
  toStats() {
    return {
      hasChildren: this.liczba_dzieci > 0,
      isLargeFamily: this.liczba_dzieci >= 3,
      isLowIncome: this.dochod_na_osobe < 1000,
      hasDisability: this.niepelnosprawnosc,
      employmentStatus: this.status_zawodowy,
      maritalStatus: this.stan_cywilny,
      housingStatus: this.wlasnosc_mieszkania
    };
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      liczba_dzieci: this.liczba_dzieci,
      wiek_dzieci: this.wiek_dzieci,
      dochod_na_osobe: this.dochod_na_osobe,
      niepelnosprawnosc: this.niepelnosprawnosc,
      status_zawodowy: this.status_zawodowy,
      stan_cywilny: this.stan_cywilny,
      wlasnosc_mieszkania: this.wlasnosc_mieszkania,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default Personalization;
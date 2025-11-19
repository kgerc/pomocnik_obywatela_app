import { supabase } from '../config/supabase.js';

export const getPersonalization = async (req, res) => {
  try {
    const userId = req.userId;

    const { data, error } = await supabase
      .from('personalization')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    // Jeśli nie ma danych, zwróć domyślne wartości
    if (!data) {
      return res.json({
        success: true,
        data: {
          liczba_dzieci: 0,
          wiek_dzieci: [],
          dochod_na_osobe: 0,
          niepelnosprawnosc: false,
          status_zawodowy: 'zatrudniony',
          stan_cywilny: 'single',
          wlasnosc_mieszkania: 'wynajem'
        }
      });
    }

    res.json({ success: true, data });
  } catch (error) {
    console.error('Error fetching personalization:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updatePersonalization = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      liczba_dzieci,
      wiek_dzieci,
      dochod_na_osobe,
      niepelnosprawnosc,
      status_zawodowy,
      stan_cywilny,
      wlasnosc_mieszkania
    } = req.body;

    // Sprawdź czy istnieje rekord
    const { data: existing } = await supabase
      .from('personalization')
      .select('id')
      .eq('user_id', userId)
      .single();

    let data, error;

    if (existing) {
      // Update
      ({ data, error } = await supabase
        .from('personalization')
        .update({
          liczba_dzieci,
          wiek_dzieci,
          dochod_na_osobe,
          niepelnosprawnosc,
          status_zawodowy,
          stan_cywilny,
          wlasnosc_mieszkania,
          updated_at: new Date()
        })
        .eq('user_id', userId)
        .select()
        .single());
    } else {
      // Insert
      ({ data, error } = await supabase
        .from('personalization')
        .insert({
          user_id: userId,
          liczba_dzieci,
          wiek_dzieci,
          dochod_na_osobe,
          niepelnosprawnosc,
          status_zawodowy,
          stan_cywilny,
          wlasnosc_mieszkania
        })
        .select()
        .single());
    }

    if (error) throw error;

    res.json({
      success: true,
      message: 'Personalizacja zaktualizowana',
      data
    });
  } catch (error) {
    console.error('Error updating personalization:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const userId = req.userId;

    // Pobierz dane personalizacji
    const { data: personalization, error: persError } = await supabase
      .from('personalization')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (persError && persError.code !== 'PGRST116') throw persError;

    if (!personalization) {
      return res.json({
        success: true,
        data: [],
        message: 'Uzupełnij dane personalizacji aby otrzymać rekomendacje'
      });
    }

    // Pobierz wszystkie świadczenia
    const { data: allSwiadczenia, error: swError } = await supabase
      .from('swiadczenia')
      .select('*');

    if (swError) throw swError;

    // Algorytm rekomendacji
    const recommendations = [];

    // 500+ dla rodzin z dziećmi
    if (personalization.liczba_dzieci > 0) {
      const sw500 = allSwiadczenia.find(s => s.id === '500plus');
      if (sw500) recommendations.push(sw500);

      const zasilekRodzinny = allSwiadczenia.find(s => s.id === 'zasilek-rodzinny');
      if (zasilekRodzinny) recommendations.push(zasilekRodzinny);

      const dobryStart = allSwiadczenia.find(s => s.id === 'dobry-start');
      if (dobryStart) recommendations.push(dobryStart);
    }

    // Karta Dużej Rodziny
    if (personalization.liczba_dzieci >= 3) {
      const kdr = allSwiadczenia.find(s => s.id === 'karta-duzej-rodziny');
      if (kdr) recommendations.push(kdr);
    }

    // Świadczenia dla osób o niskich dochodach
    if (personalization.dochod_na_osobe < 1000) {
      const dodatekMieszkaniowy = allSwiadczenia.find(s => s.id === 'dodatek-mieszkaniowy');
      if (dodatekMieszkaniowy) recommendations.push(dodatekMieszkaniowy);

      const dodatekOslonowy = allSwiadczenia.find(s => s.id === 'dodatek-oslonowy');
      if (dodatekOslonowy) recommendations.push(dodatekOslonowy);
    }

    // Świadczenia dla osób z niepełnosprawnością
    if (personalization.niepelnosprawnosc) {
      const zasilekPielegnacyjny = allSwiadczenia.find(s => s.id === 'zasilek-pielegnacyjny');
      if (zasilekPielegnacyjny) recommendations.push(zasilekPielegnacyjny);

      const swiadczenieWspierajace = allSwiadczenia.find(s => s.id === 'swiadczenie-wspierajace');
      if (swiadczenieWspierajace) recommendations.push(swiadczenieWspierajace);

      const dofinansowanieTurnusu = allSwiadczenia.find(s => s.id === 'dofinansowanie-turnusu');
      if (dofinansowanieTurnusu) recommendations.push(dofinansowanieTurnusu);
    }

    // Świadczenia związane ze statusem zawodowym
    if (personalization.status_zawodowy === 'bezrobotny') {
      const zasilekBezrobotnych = allSwiadczenia.find(s => s.id === 'zasilek-dla-bezrobotnych');
      if (zasilekBezrobotnych) recommendations.push(zasilekBezrobotnych);
    }

    if (personalization.status_zawodowy === 'student') {
      const stypendium = allSwiadczenia.find(s => s.id === 'stypendium-socjalne');
      if (stypendium) recommendations.push(stypendium);
    }

    if (personalization.status_zawodowy === 'emeryt') {
      const emerytura = allSwiadczenia.find(s => s.id === 'emerytura');
      if (emerytura) recommendations.push(emerytura);
    }

    // Usuń duplikaty
    const uniqueRecommendations = Array.from(
      new Map(recommendations.map(item => [item.id, item])).values()
    );

    res.json({
      success: true,
      data: uniqueRecommendations
    });
  } catch (error) {
    console.error('Error getting recommendations:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deletePersonalization = async (req, res) => {
  try {
    const userId = req.userId;

    const { error } = await supabase
      .from('personalization')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    res.json({
      success: true,
      message: 'Dane personalizacji zostały usunięte'
    });
  } catch (error) {
    console.error('Error deleting personalization:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export default {
  getPersonalization,
  updatePersonalization,
  getRecommendations,
  deletePersonalization
};
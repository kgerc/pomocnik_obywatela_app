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

    // 800+ i świadczenia dla rodzin z dziećmi
    if (personalization.liczba_dzieci > 0) {
      const sw800 = allSwiadczenia.find(s => s.id === 'rodzina_800_plus');
      if (sw800) recommendations.push(sw800);

      const zasilekRodzinny = allSwiadczenia.find(s => s.id === 'zasilek_rodzinny');
      if (zasilekRodzinny) recommendations.push(zasilekRodzinny);

      const dobryStart = allSwiadczenia.find(s => s.id === 'dobry_start');
      if (dobryStart) recommendations.push(dobryStart);

      const becikowe = allSwiadczenia.find(s => s.id === 'becikowe');
      if (becikowe) recommendations.push(becikowe);

      const swiadczenieRodzicielskie = allSwiadczenia.find(s => s.id === 'swiadczenie_rodzicielskie');
      if (swiadczenieRodzicielskie) recommendations.push(swiadczenieRodzicielskie);

      const aktynieWZlobku = allSwiadczenia.find(s => s.id === 'aktywnie_w_zlobku');
      if (aktynieWZlobku) recommendations.push(aktynieWZlobku);

      const aktywnieWDomu = allSwiadczenia.find(s => s.id === 'aktywnie_w_domu');
      if (aktywnieWDomu) recommendations.push(aktywnieWDomu);

      const dodatekUrodzenieDziecka = allSwiadczenia.find(s => s.id === 'dodatek_urodzenie_dziecka');
      if (dodatekUrodzenieDziecka) recommendations.push(dodatekUrodzenieDziecka);

      const dodatekRozpoczecieRokuSzkolnego = allSwiadczenia.find(s => s.id === 'dodatek_rozpoczecie_roku_szkolnego');
      if (dodatekRozpoczecieRokuSzkolnego) recommendations.push(dodatekRozpoczecieRokuSzkolnego);
    }

    // Karta Dużej Rodziny
    if (personalization.liczba_dzieci >= 3) {
      const kdr = allSwiadczenia.find(s => s.id === 'karta_duzej_rodziny');
      if (kdr) recommendations.push(kdr);

      const dodatekRodzinaWielodzietna = allSwiadczenia.find(s => s.id === 'dodatek_rodzina_wielodzietna');
      if (dodatekRodzinaWielodzietna) recommendations.push(dodatekRodzinaWielodzietna);
    }

    // Świadczenia dla osób o niskich dochodach
    if (personalization.dochod_na_osobe < 1000) {
      const dodatekMieszkaniowy = allSwiadczenia.find(s => s.id === 'dodatek_mieszkaniowy');
      if (dodatekMieszkaniowy) recommendations.push(dodatekMieszkaniowy);

      const bonCieplowniczy = allSwiadczenia.find(s => s.id === 'bon_cieplowniczy');
      if (bonCieplowniczy) recommendations.push(bonCieplowniczy);

      const zasilekCelowy = allSwiadczenia.find(s => s.id === 'zasilek_celowy');
      if (zasilekCelowy) recommendations.push(zasilekCelowy);

      const zasilekStaly = allSwiadczenia.find(s => s.id === 'zasilek_staly');
      if (zasilekStaly) recommendations.push(zasilekStaly);

      const zasilekOkresowy = allSwiadczenia.find(s => s.id === 'zasilek_okresowy');
      if (zasilekOkresowy) recommendations.push(zasilekOkresowy);

      const posilekWSzkoleIDDomu = allSwiadczenia.find(s => s.id === 'posilek_w_szkole_i_w_domu');
      if (posilekWSzkoleIDDomu) recommendations.push(posilekWSzkoleIDDomu);
    }

    // Świadczenia dla osób z niepełnosprawnością
    if (personalization.niepelnosprawnosc) {
      const zasilekPielegnacyjny = allSwiadczenia.find(s => s.id === 'zasilek_pielegnacyjny');
      if (zasilekPielegnacyjny) recommendations.push(zasilekPielegnacyjny);

      const swiadczenieWspierajace = allSwiadczenia.find(s => s.id === 'swiadczenie_wspierajace');
      if (swiadczenieWspierajace) recommendations.push(swiadczenieWspierajace);

      const dofinansowanieTurnusu = allSwiadczenia.find(s => s.id === 'dofinansowanie_turnus_rehabilitacyjny');
      if (dofinansowanieTurnusu) recommendations.push(dofinansowanieTurnusu);

      const dodatekPielegnacyjny = allSwiadczenia.find(s => s.id === 'dodatek_pielegnacyjny');
      if (dodatekPielegnacyjny) recommendations.push(dodatekPielegnacyjny);

      const rentaSocjalna = allSwiadczenia.find(s => s.id === 'renta_socjalna');
      if (rentaSocjalna) recommendations.push(rentaSocjalna);

      const dofinansowanieSprzetu = allSwiadczenia.find(s => s.id === 'dofinansowanie-sprzetu');
      if (dofinansowanieSprzetu) recommendations.push(dofinansowanieSprzetu);

      const dofinansowanieBariery = allSwiadczenia.find(s => s.id === 'dofinansowanie_bariery_architektoniczne');
      if (dofinansowanieBariery) recommendations.push(dofinansowanieBariery);

      const ulgaRehabilitacyjna = allSwiadczenia.find(s => s.id === 'ulga-rehabilitacyjna');
      if (ulgaRehabilitacyjna) recommendations.push(ulgaRehabilitacyjna);

      const dodatekKsztalcenieRehabilitacja = allSwiadczenia.find(s => s.id === 'dodatek_ksztalcenie_rehabilitacja');
      if (dodatekKsztalcenieRehabilitacja) recommendations.push(dodatekKsztalcenieRehabilitacja);

      const jednorazowe4000 = allSwiadczenia.find(s => s.id === 'jednorazowe_4000_dziecko_chore');
      if (jednorazowe4000) recommendations.push(jednorazowe4000);
    }

    // Świadczenia związane ze statusem zawodowym
    if (personalization.status_zawodowy === 'bezrobotny') {
      const zasilekBezrobotnych = allSwiadczenia.find(s => s.id === 'zasilek_dla_bezrobotnych');
      if (zasilekBezrobotnych) recommendations.push(zasilekBezrobotnych);

      const bonStazowy = allSwiadczenia.find(s => s.id === 'bon_stazowy');
      if (bonStazowy) recommendations.push(bonStazowy);

      const praceInterwencyjne = allSwiadczenia.find(s => s.id === 'prace_interwencyjne');
      if (praceInterwencyjne) recommendations.push(praceInterwencyjne);

      const stypendiumSzkolenie = allSwiadczenia.find(s => s.id === 'stypendium_szkolenie_staz_2025');
      if (stypendiumSzkolenie) recommendations.push(stypendiumSzkolenie);

      const dodatekAktywizacyjny = allSwiadczenia.find(s => s.id === 'dodatek_aktywizacyjny');
      if (dodatekAktywizacyjny) recommendations.push(dodatekAktywizacyjny);

      const refundacjaDojazdu = allSwiadczenia.find(s => s.id === 'refundacja_kosztow_dojazdu_praca_2025');
      if (refundacjaDojazdu) recommendations.push(refundacjaDojazdu);
    }

    if (personalization.status_zawodowy === 'student') {
      const stypendium = allSwiadczenia.find(s => s.id === 'stypendium-socjalne');
      if (stypendium) recommendations.push(stypendium);

      const dofinansowanieStudiow = allSwiadczenia.find(s => s.id === 'dofinansowanie-studiow');
      if (dofinansowanieStudiow) recommendations.push(dofinansowanieStudiow);
    }

    if (personalization.status_zawodowy === 'emeryt') {
      const emerytura = allSwiadczenia.find(s => s.id === 'emerytura');
      if (emerytura) recommendations.push(emerytura);

      const ryczaltEnergetyczny = allSwiadczenia.find(s => s.id === 'ryczalt-energetyczny');
      if (ryczaltEnergetyczny) recommendations.push(ryczaltEnergetyczny);

      const dodatekTajneNauczanie = allSwiadczenia.find(s => s.id === 'dodatek-tajne-nauczanie');
      if (dodatekTajneNauczanie) recommendations.push(dodatekTajneNauczanie);
    }

    // Renty
    if (personalization.niepelnosprawnosc || personalization.status_zawodowy === 'rencista') {
      const renta = allSwiadczenia.find(s => s.id === 'renta');
      if (renta) recommendations.push(renta);

      const rentaRodzinna = allSwiadczenia.find(s => s.id === 'renta-rodzinna');
      if (rentaRodzinna) recommendations.push(rentaRodzinna);
    }

    // Świadczenia rodzicielskie
    if (personalization.liczba_dzieci > 0 || personalization.stan_cywilny === 'parent') {
      const zasilekMacierzynski = allSwiadczenia.find(s => s.id === 'zasilek_macierzynski');
      if (zasilekMacierzynski) recommendations.push(zasilekMacierzynski);

      const zasilekOpiekunczy = allSwiadczenia.find(s => s.id === 'zasilek_opiekunczy');
      if (zasilekOpiekunczy) recommendations.push(zasilekOpiekunczy);

      const dodatekSamotneWychowywanie = allSwiadczenia.find(s => s.id === 'dodatek_samotne_wychowywanie');
      if (dodatekSamotneWychowywanie) recommendations.push(dodatekSamotneWychowywanie);

      const funduszAlimentacyjny = allSwiadczenia.find(s => s.id === 'fundusz_alimentacyjny');
      if (funduszAlimentacyjny) recommendations.push(funduszAlimentacyjny);

      const dodatekUrlopWychowawczy = allSwiadczenia.find(s => s.id === 'dodatek_urlop_wychowawczy');
      if (dodatekUrlopWychowawczy) recommendations.push(dodatekUrlopWychowawczy);

      const dodatkowyUrlopWczesniaki = allSwiadczenia.find(s => s.id === 'dodatkowy_urlop_wczesniaki');
      if (dodatkowyUrlopWczesniaki) recommendations.push(dodatkowyUrlopWczesniaki);

      const dodatekSzkolaPozaMiejscem = allSwiadczenia.find(s => s.id === 'dodatek_szkola_poza_miejscem_zamieszkania');
      if (dodatekSzkolaPozaMiejscem) recommendations.push(dodatekSzkolaPozaMiejscem);
    }

    // Inne świadczenia
    if (personalization.status_zawodowy === 'zatrudniony' || personalization.status_zawodowy === 'bezrobotny') {
      const zasilekChorobowy = allSwiadczenia.find(s => s.id === 'zasilek-chorobowy');
      if (zasilekChorobowy) recommendations.push(zasilekChorobowy);

      const zasilekRehabilitacyjny = allSwiadczenia.find(s => s.id === 'zasilek_rehabilitacyjny');
      if (zasilekRehabilitacyjny) recommendations.push(zasilekRehabilitacyjny);
    }

    const zasilekPogrzebowy = allSwiadczenia.find(s => s.id === 'zasilek-pogrzebowy');
    if (zasilekPogrzebowy) recommendations.push(zasilekPogrzebowy);

    // Świadczenia mieszkaniowe
    if (personalization.wlasnosc_mieszkania === 'wlasne' || personalization.wlasnosc_mieszkania === 'wynajem') {
      const ulgaTermomodernizacyjna = allSwiadczenia.find(s => s.id === 'ulga-termomodernizacyjna');
      if (ulgaTermomodernizacyjna) recommendations.push(ulgaTermomodernizacyjna);

      const bonZasiedlenie = allSwiadczenia.find(s => s.id === 'bon_zasiedlenie');
      if (bonZasiedlenie) recommendations.push(bonZasiedlenie);
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
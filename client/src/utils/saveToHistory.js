import { historyAPI } from '../services/api';

/**
 * Uniwersalna funkcja do zapisywania konwersacji z AI do historii
 * @param {string} userQuery - Pytanie użytkownika
 * @param {string} aiResponse - Odpowiedź AI
 * @param {Array} matches - Tablica dopasowanych elementów (świadczenia, pisma, dotacje)
 * @returns {Promise<boolean>} - True jeśli zapisano pomyślnie, false jeśli wystąpił błąd
 */
export const saveConversationToHistory = async (userQuery, aiResponse, matches = []) => {
  try {
    // Zapisz pytanie użytkownika
    await historyAPI.add({
      role: 'user',
      content: userQuery,
      matches: matches.length > 0 ? matches.map(m => ({ id: m.id, nazwa: m.nazwa })) : null
    });

    // Zapisz odpowiedź AI
    await historyAPI.add({
      role: 'assistant',
      content: aiResponse,
      matches: matches.length > 0 ? matches.map(m => ({ id: m.id, nazwa: m.nazwa })) : null
    });

    return true;
  } catch (error) {
    console.error('Error saving conversation to history:', error);
    return false;
  }
};

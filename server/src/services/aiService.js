import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateChatResponse = async (query, context) => {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `Jesteś asystentem obywatela w Polsce. Odpowiadaj TYLKO po polsku.

Użytkownik pyta: "${query}"

${context ? `Dostępne informacje w bazie danych:\n${context}\n` : ''}

Odpowiedz krótko i konkretnie (max 3-4 zdania):
1. Które elementy z bazy danych pasują do pytania użytkownika
2. Podstawowe informacje o kwalifikacji lub dostępności
3. Zachęć do sprawdzenia szczegółów poniżej

NIE podawaj linków ani nie wymyślaj elementów spoza podanej bazy.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return {
      success: true,
      data: text
    };
  } catch (error) {
    console.error('AI Service error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export const generateSwiadczeniaResponse = async (query, matches) => {
  const contextForAI = matches.map(m => 
    `${m.nazwa}: ${m.krotki_opis}`
  ).join('\n');

  return await generateChatResponse(query, contextForAI);
};

export const generatePismaResponse = async (query, matches) => {
  const contextForAI = matches.map(m => 
    `${m.nazwa}: ${m.opis}`
  ).join('\n');

  return await generateChatResponse(query, contextForAI);
};

export const generateDotacjeResponse = async (query, matches) => {
  const contextForAI = matches.map(m => 
    `${m.nazwa} (${m.sektor}): ${m.opis}. Beneficjenci: ${m.beneficjenci.join(', ')}`
  ).join('\n');

  return await generateChatResponse(query, contextForAI);
};

export default {
  generateChatResponse,
  generateSwiadczeniaResponse,
  generatePismaResponse,
  generateDotacjeResponse
};
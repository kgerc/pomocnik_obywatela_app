/**
 * Mapowanie błędów Supabase na polskie komunikaty
 */
export const translateSupabaseError = (errorMessage) => {
  if (!errorMessage) return 'Wystąpił nieznany błąd';

  const errorTranslations = {
    // Authentication errors
    'Invalid login credentials': 'Nieprawidłowy email lub hasło',
    'Email not confirmed': 'Email nie został potwierdzony. Sprawdź swoją skrzynkę odbiorczą.',
    'User already registered': 'Użytkownik z tym adresem email już istnieje',
    'Password should be at least 6 characters': 'Hasło musi mieć co najmniej 6 znaków',
    'Unable to validate email address: invalid format': 'Nieprawidłowy format adresu email',
    'Signup requires a valid password': 'Rejestracja wymaga podania prawidłowego hasła',
    'User not found': 'Użytkownik nie został znaleziony',
    'Email rate limit exceeded': 'Przekroczono limit wysyłania emaili. Spróbuj ponownie później.',
    'For security purposes, you can only request this once every 60 seconds': 'Ze względów bezpieczeństwa możesz to zrobić raz na 60 sekund',
    'Anonymous sign-ins are disabled': 'Logowanie anonimowe jest wyłączone',

    // Password reset errors
    'Unable to send email': 'Nie udało się wysłać emaila. Sprawdź adres i spróbuj ponownie.',
    'Password reset token is invalid or has expired': 'Link do resetowania hasła wygasł lub jest nieprawidłowy',

    // Session errors
    'Invalid Refresh Token: Already Used': 'Sesja wygasła. Zaloguj się ponownie.',
    'refresh_token_not_found': 'Sesja wygasła. Zaloguj się ponownie.',
    'Auth session missing': 'Brak sesji. Zaloguj się ponownie.',

    // Network errors
    'Failed to fetch': 'Błąd połączenia z serwerem. Sprawdź połączenie internetowe.',
    'NetworkError': 'Błąd połączenia z serwerem. Sprawdź połączenie internetowe.',

    // Database errors
    'Database error': 'Błąd bazy danych. Spróbuj ponownie później.',
    'duplicate key value violates unique constraint': 'Ta wartość już istnieje w systemie',

    // Generic errors
    'The new email address provided is invalid': 'Podany adres email jest nieprawidłowy',
    'Email link is invalid or has expired': 'Link jest nieprawidłowy lub wygasł',
    'Token has expired or is invalid': 'Token wygasł lub jest nieprawidłowy',
  };

  // Sprawdź dokładne dopasowanie
  if (errorTranslations[errorMessage]) {
    return errorTranslations[errorMessage];
  }

  // Sprawdź czy błąd zawiera którykolwiek z kluczy
  for (const [englishError, polishError] of Object.entries(errorTranslations)) {
    if (errorMessage.includes(englishError)) {
      return polishError;
    }
  }

  // Jeśli nie znaleziono tłumaczenia, zwróć oryginalny komunikat
  console.warn('Untranslated Supabase error:', errorMessage);
  return errorMessage;
};

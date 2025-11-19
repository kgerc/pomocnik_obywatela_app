import { supabase } from '../config/supabase.js';

export const register = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Rejestracja przez Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-potwierdź email (dla dev)
      user_metadata: {
        full_name: fullName || ''
      }
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    // Utwórz profil użytkownika
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email: email,
        full_name: fullName || ''
      });

    if (profileError) {
      console.error('Error creating profile:', profileError);
    }

    res.status(201).json({
      success: true,
      message: 'Użytkownik został zarejestrowany',
      data: {
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: fullName
        }
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas rejestracji'
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({
        success: false,
        message: 'Nieprawidłowy email lub hasło'
      });
    }

    res.json({
      success: true,
      message: 'Zalogowano pomyślnie',
      data: {
        user: data.user,
        session: data.session
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas logowania'
    });
  }
};

export const logout = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1];

    if (token) {
      const { error } = await supabase.auth.admin.signOut(token);
      if (error) {
        console.error('Logout error:', error);
      }
    }

    res.json({
      success: true,
      message: 'Wylogowano pomyślnie'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas wylogowania'
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    // req.user jest już ustawiony przez middleware auth
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', req.userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
    }

    res.json({
      success: true,
      data: {
        user: req.user,
        profile: profile || null
      }
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania danych użytkownika'
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullName } = req.body;

    // Aktualizuj metadane w auth
    const { error: authError } = await supabase.auth.admin.updateUserById(
      req.userId,
      { user_metadata: { full_name: fullName } }
    );

    if (authError) {
      return res.status(400).json({
        success: false,
        message: authError.message
      });
    }

    // Aktualizuj profil
    const { data, error } = await supabase
      .from('profiles')
      .update({ full_name: fullName, updated_at: new Date() })
      .eq('id', req.userId)
      .select()
      .single();

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      message: 'Profil zaktualizowany',
      data
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas aktualizacji profilu'
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/reset-password`
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.json({
      success: true,
      message: 'Link do resetowania hasła został wysłany na email'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas resetowania hasła'
    });
  }
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  updateProfile,
  resetPassword
};
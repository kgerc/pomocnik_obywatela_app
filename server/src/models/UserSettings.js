import { supabase } from '../config/supabase.js';

class UserSettings {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id || data.userId;
    this.theme = data.theme || 'light';
    this.emailNotifications = data.email_notifications ?? true;
    this.smsNotifications = data.sms_notifications ?? false;
    this.notificationTypes = data.notification_types || {
      newBenefits: true,
      lawChanges: true,
      deadlineReminders: true,
      documentRecommendations: true
    };
    this.gdprConsents = data.gdpr_consents || {
      dataProcessing: true,
      marketing: false,
      newsletter: false
    };
    this.twoFactorEnabled = data.two_factor_enabled || false;
    this.twoFactorMethod = data.two_factor_method; // 'email', 'sms', 'authenticator'
    this.createdAt = data.created_at || data.createdAt;
    this.updatedAt = data.updated_at || data.updatedAt;
  }

  // Znajdź ustawienia użytkownika
  static async findByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // Nie znaleziono - utwórz domyślne ustawienia
          return await UserSettings.createDefault(userId);
        }
        throw error;
      }

      return data ? new UserSettings(data) : null;
    } catch (error) {
      console.error('Error finding user settings:', error);
      throw error;
    }
  }

  // Utwórz domyślne ustawienia
  static async createDefault(userId) {
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .insert({
          user_id: userId,
          theme: 'light',
          email_notifications: true,
          sms_notifications: false,
          notification_types: {
            newBenefits: true,
            lawChanges: true,
            deadlineReminders: true,
            documentRecommendations: true
          },
          gdpr_consents: {
            dataProcessing: true,
            marketing: false,
            newsletter: false
          },
          two_factor_enabled: false
        })
        .select()
        .single();

      if (error) throw error;

      return new UserSettings(data);
    } catch (error) {
      console.error('Error creating default settings:', error);
      throw error;
    }
  }

  // Zaktualizuj ustawienia
  static async update(userId, updates) {
    try {
      const updateData = {
        updated_at: new Date()
      };

      if (updates.theme !== undefined) updateData.theme = updates.theme;
      if (updates.emailNotifications !== undefined) updateData.email_notifications = updates.emailNotifications;
      if (updates.smsNotifications !== undefined) updateData.sms_notifications = updates.smsNotifications;
      if (updates.notificationTypes !== undefined) updateData.notification_types = updates.notificationTypes;
      if (updates.gdprConsents !== undefined) updateData.gdpr_consents = updates.gdprConsents;
      if (updates.twoFactorEnabled !== undefined) updateData.two_factor_enabled = updates.twoFactorEnabled;
      if (updates.twoFactorMethod !== undefined) updateData.two_factor_method = updates.twoFactorMethod;

      const { data, error } = await supabase
        .from('user_settings')
        .update(updateData)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return new UserSettings(data);
    } catch (error) {
      console.error('Error updating user settings:', error);
      throw error;
    }
  }

  // Eksportuj dane użytkownika (GDPR)
  static async exportUserData(userId) {
    try {
      // Pobierz wszystkie dane użytkownika z różnych tabel
      const [profile, settings, favorites, documents, chatHistory, personalization] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', userId).single(),
        supabase.from('user_settings').select('*').eq('user_id', userId).single(),
        supabase.from('favorites').select('*').eq('user_id', userId),
        supabase.from('user_documents').select('*').eq('user_id', userId),
        supabase.from('chat_history').select('*').eq('user_id', userId),
        supabase.from('personalization').select('*').eq('user_id', userId).single()
      ]);

      return {
        exportDate: new Date().toISOString(),
        profile: profile.data,
        settings: settings.data,
        favorites: favorites.data || [],
        documents: documents.data || [],
        chatHistory: chatHistory.data || [],
        personalization: personalization.data || null
      };
    } catch (error) {
      console.error('Error exporting user data:', error);
      throw error;
    }
  }

  // Usuń konto użytkownika (GDPR - prawo do bycia zapomnianym)
  static async deleteAccount(userId) {
    try {
      // Supabase automatycznie usunie powiązane dane przez CASCADE
      const { error } = await supabase.auth.admin.deleteUser(userId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting account:', error);
      throw error;
    }
  }

  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      theme: this.theme,
      emailNotifications: this.emailNotifications,
      smsNotifications: this.smsNotifications,
      notificationTypes: this.notificationTypes,
      gdprConsents: this.gdprConsents,
      twoFactorEnabled: this.twoFactorEnabled,
      twoFactorMethod: this.twoFactorMethod,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default UserSettings;

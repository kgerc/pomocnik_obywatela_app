import { supabase } from '../config/supabase.js';

class UserDocument {
  constructor(data) {
    this.id = data.id;
    this.userId = data.user_id || data.userId;
    this.title = data.title;
    this.description = data.description;
    this.fileUrl = data.file_url || data.fileUrl;
    this.fileName = data.file_name || data.fileName;
    this.fileType = data.file_type || data.fileType;
    this.fileSize = data.file_size || data.fileSize;
    this.source = data.source; // 'upload' lub 'app' (zapisany z aplikacji)
    this.sourceType = data.source_type || data.sourceType; // 'pismo', 'swiadczenie', 'dotacja'
    this.sourceId = data.source_id || data.sourceId; // ID dokumentu z aplikacji
    this.tags = data.tags || [];
    this.createdAt = data.created_at || data.createdAt;
    this.updatedAt = data.updated_at || data.updatedAt;
  }

  // Pobierz wszystkie dokumenty użytkownika
  static async findByUserId(userId, options = {}) {
    try {
      let query = supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      // Filtruj według źródła jeśli podano
      if (options.source) {
        query = query.eq('source', options.source);
      }

      // Filtruj według typu źródła jeśli podano
      if (options.sourceType) {
        query = query.eq('source_type', options.sourceType);
      }

      // Filtruj według typu pliku jeśli podano
      if (options.fileType) {
        query = query.eq('file_type', options.fileType);
      }

      // Limit
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      return data.map(d => new UserDocument(d));
    } catch (error) {
      console.error('Error finding user documents:', error);
      throw error;
    }
  }

  // Pobierz pojedynczy dokument
  static async findById(id, userId) {
    try {
      const { data, error } = await supabase
        .from('user_documents')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw error;
      }

      return data ? new UserDocument(data) : null;
    } catch (error) {
      console.error('Error finding document by ID:', error);
      throw error;
    }
  }

  // Utwórz nowy dokument
  static async create(userId, documentData) {
    try {
      const { data, error } = await supabase
        .from('user_documents')
        .insert({
          user_id: userId,
          title: documentData.title,
          description: documentData.description || null,
          file_url: documentData.fileUrl,
          file_name: documentData.fileName,
          file_type: documentData.fileType,
          file_size: documentData.fileSize,
          source: documentData.source,
          source_type: documentData.sourceType || null,
          source_id: documentData.sourceId || null,
          tags: documentData.tags || []
        })
        .select()
        .single();

      if (error) throw error;

      return new UserDocument(data);
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  // Aktualizuj dokument
  static async update(id, userId, updates) {
    try {
      const updateData = {
        updated_at: new Date()
      };

      if (updates.title !== undefined) updateData.title = updates.title;
      if (updates.description !== undefined) updateData.description = updates.description;
      if (updates.tags !== undefined) updateData.tags = updates.tags;

      const { data, error } = await supabase
        .from('user_documents')
        .update(updateData)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;

      return new UserDocument(data);
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  // Usuń dokument
  static async delete(id, userId) {
    try {
      // Najpierw pobierz dokument, żeby uzyskać URL pliku
      const document = await UserDocument.findById(id, userId);

      if (!document) {
        throw new Error('Document not found');
      }

      // Usuń plik ze storage jeśli jest uploadem użytkownika
      if (document.source === 'upload' && document.fileUrl) {
        const path = document.fileUrl.split('/').pop();
        await supabase.storage
          .from('user-documents')
          .remove([`${userId}/${path}`]);
      }

      // Usuń rekord z bazy
      const { error } = await supabase
        .from('user_documents')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  // Wyszukaj dokumenty użytkownika
  static async search(userId, query, limit = 20) {
    try {
      const { data, error } = await supabase
        .from('user_documents')
        .select('*')
        .eq('user_id', userId)
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;

      return data.map(d => new UserDocument(d));
    } catch (error) {
      console.error('Error searching documents:', error);
      throw error;
    }
  }

  // Upload pliku do Supabase Storage
  static async uploadFile(userId, file) {
    try {
      const fileExt = file.originalname.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `${userId}/${fileName}`;

      const { error } = await supabase.storage
        .from('user-documents')
        .upload(filePath, file.buffer, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.mimetype
        });

      if (error) throw error;

      // Pobierz publiczny URL
      const { data: { publicUrl } } = supabase.storage
        .from('user-documents')
        .getPublicUrl(filePath);

      return {
        fileUrl: publicUrl,
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      };
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Statystyki dokumentów użytkownika
  static async getStats(userId) {
    try {
      const { data, error } = await supabase
        .from('user_documents')
        .select('source, file_type')
        .eq('user_id', userId);

      if (error) throw error;

      const stats = {
        total: data.length,
        bySource: {
          upload: data.filter(d => d.source === 'upload').length,
          app: data.filter(d => d.source === 'app').length
        },
        byFileType: {
          pdf: data.filter(d => d.file_type === 'application/pdf').length,
          png: data.filter(d => d.file_type === 'image/png').length,
          jpg: data.filter(d => d.file_type === 'image/jpeg').length
        }
      };

      return stats;
    } catch (error) {
      console.error('Error getting document stats:', error);
      throw error;
    }
  }

  // Instance methods
  toJSON() {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      description: this.description,
      fileUrl: this.fileUrl,
      fileName: this.fileName,
      fileType: this.fileType,
      fileSize: this.fileSize,
      source: this.source,
      sourceType: this.sourceType,
      sourceId: this.sourceId,
      tags: this.tags,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default UserDocument;

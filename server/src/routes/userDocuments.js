import express from 'express';
import multer from 'multer';
import UserDocument from '../models/UserDocument.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Konfiguracja multer dla upload plików (w pamięci)
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Niedozwolony typ pliku. Dozwolone: PDF, PNG, JPG'));
    }
  }
});

// Wszystkie endpointy wymagają autoryzacji
router.use(optionalAuth);

// GET /api/documents - Pobierz wszystkie dokumenty użytkownika
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id;
    const { source, sourceType, fileType, limit } = req.query;

    const options = {};
    if (source) options.source = source;
    if (sourceType) options.sourceType = sourceType;
    if (fileType) options.fileType = fileType;
    if (limit) options.limit = parseInt(limit);

    const documents = await UserDocument.findByUserId(userId, options);

    res.json({
      success: true,
      data: documents.map(d => d.toJSON())
    });
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania dokumentów'
    });
  }
});

// GET /api/documents/stats - Pobierz statystyki dokumentów
router.get('/stats', async (req, res) => {
  try {
    const userId = req.user.id;
    const stats = await UserDocument.getStats(userId);

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error fetching document stats:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania statystyk'
    });
  }
});

// GET /api/documents/search?q=query - Wyszukaj dokumenty
router.get('/search', async (req, res) => {
  try {
    const userId = req.user.id;
    const { q, limit } = req.query;

    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Brak zapytania wyszukiwania'
      });
    }

    const documents = await UserDocument.search(userId, q, limit ? parseInt(limit) : 20);

    res.json({
      success: true,
      data: documents.map(d => d.toJSON())
    });
  } catch (error) {
    console.error('Error searching documents:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas wyszukiwania dokumentów'
    });
  }
});

// GET /api/documents/:id - Pobierz pojedynczy dokument
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const document = await UserDocument.findById(id, userId);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Dokument nie znaleziony'
      });
    }

    res.json({
      success: true,
      data: document.toJSON()
    });
  } catch (error) {
    console.error('Error fetching document:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas pobierania dokumentu'
    });
  }
});

// POST /api/documents/upload - Upload nowego dokumentu
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Brak pliku do uploadu'
      });
    }

    const { title, description, tags } = req.body;

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Tytuł jest wymagany'
      });
    }

    // Upload pliku do Supabase Storage
    const fileData = await UserDocument.uploadFile(userId, req.file);

    // Utwórz rekord w bazie
    const document = await UserDocument.create(userId, {
      title: title.trim(),
      description: description?.trim() || null,
      fileUrl: fileData.fileUrl,
      fileName: fileData.fileName,
      fileType: fileData.fileType,
      fileSize: fileData.fileSize,
      source: 'upload',
      tags: tags ? JSON.parse(tags) : []
    });

    res.status(201).json({
      success: true,
      data: document.toJSON(),
      message: 'Dokument został przesłany'
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Błąd podczas uploadu dokumentu'
    });
  }
});

// POST /api/documents/save-from-app - Zapisz dokument z aplikacji
router.post('/save-from-app', async (req, res) => {
  try {
    const userId = req.user.id;
    const { title, description, fileUrl, fileName, sourceType, sourceId, tags } = req.body;

    if (!title || !fileUrl || !sourceType) {
      return res.status(400).json({
        success: false,
        message: 'Wymagane pola: title, fileUrl, sourceType'
      });
    }

    const document = await UserDocument.create(userId, {
      title: title.trim(),
      description: description?.trim() || null,
      fileUrl: fileUrl,
      fileName: fileName || 'dokument.pdf',
      fileType: 'application/pdf',
      fileSize: 0,
      source: 'app',
      sourceType: sourceType,
      sourceId: sourceId || null,
      tags: tags || []
    });

    res.status(201).json({
      success: true,
      data: document.toJSON(),
      message: 'Dokument został zapisany'
    });
  } catch (error) {
    console.error('Error saving document from app:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas zapisywania dokumentu'
    });
  }
});

// PUT /api/documents/:id - Aktualizuj dokument
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { title, description, tags } = req.body;

    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (description !== undefined) updates.description = description?.trim() || null;
    if (tags !== undefined) updates.tags = tags;

    const document = await UserDocument.update(id, userId, updates);

    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Dokument nie znaleziony'
      });
    }

    res.json({
      success: true,
      data: document.toJSON(),
      message: 'Dokument został zaktualizowany'
    });
  } catch (error) {
    console.error('Error updating document:', error);
    res.status(500).json({
      success: false,
      message: 'Błąd podczas aktualizacji dokumentu'
    });
  }
});

// DELETE /api/documents/:id - Usuń dokument
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    await UserDocument.delete(id, userId);

    res.json({
      success: true,
      message: 'Dokument został usunięty'
    });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Błąd podczas usuwania dokumentu'
    });
  }
});

export default router;

import React, { useState, useEffect, useRef } from 'react';
import {
  FolderOpen,
  Trash2,
  Upload,
  FileText,
  Download,
  Eye,
  X,
  Loader,
  AlertCircle,
  Filter,
  Search
} from 'lucide-react';
import { useUserDocuments } from '../../hooks/useUserDocuments';
import { useToast } from '../../contexts/ToastContext';
import PremiumFeatureTeaser from '../premium/PremiumFeatureTeaser';

const TwojeDokumentyTab = () => {
  const { showSuccess, showError, confirm } = useToast();
  const [filterSource, setFilterSource] = useState('wszystkie'); // 'wszystkie', 'upload', 'app'
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // małe opóźnienie żeby animacja była bardziej naturalna
    const timer = setTimeout(() => setIsVisible(true), 400);
    return () => clearTimeout(timer);
  }, []);

  const {
    documents,
    loading,
    error,
    stats,
    fetchAll,
    fetchStats,
    search,
    upload,
    deleteDocument
  } = useUserDocuments();

  // Pobierz dokumenty przy montowaniu
  useEffect(() => {
    fetchAll();
    fetchStats();
  }, []);

  // Filtruj dokumenty na podstawie źródła
  useEffect(() => {
    if (filterSource === 'wszystkie') {
      fetchAll();
    } else {
      fetchAll({ source: filterSource });
    }
  }, [filterSource]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      await search(searchQuery);
    } else {
      await fetchAll({ source: filterSource !== 'wszystkie' ? filterSource : undefined });
    }
  };

  const handleDeleteDocument = async (id) => {
    const confirmed = await confirm(
      'Czy na pewno chcesz usunąć ten dokument? Tej operacji nie można cofnąć.',
      'Usuń dokument',
      'Anuluj'
    );

    if (confirmed) {
      try {
        await deleteDocument(id);
        showSuccess('Dokument został usunięty');
      } catch (err) {
        showError('Błąd podczas usuwania dokumentu: ' + err.message);
      }
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('pdf')) {
      return <FileText size={24} color="#d97706" />;
    }
    if (fileType?.includes('image')) {
      return <FileText size={24} color="#10b981" />;
    }
    return <FileText size={24} color="#2c5aa0" />;
  };

  if (loading) {
    return (
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '60px',
        marginBottom: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        textAlign: 'center'
      }}>
        <Loader size={48} className="spin" style={{ color: '#2c5aa0', marginBottom: '20px' }} />
        <p style={{ color: '#5a6c7d', fontSize: '16px' }}>Ładowanie dokumentów...</p>
      </div>
    );
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      marginBottom: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }} className={`fade-in ${isVisible ? "visible" : ""}`}>
      {/* Header */}
      <div style={{
        marginBottom: '25px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {/* Nagłówek z tytułem i przyciskiem */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FolderOpen size={24} color="#2c5aa0" />
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#2c3e50',
              margin: 0
            }}>
              Twoje Dokumenty
            </h2>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            style={{
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 20px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Upload size={18} />
            Prześlij dokument
          </button>
        </div>

        <p style={{
          color: '#5a6c7d',
          margin: 0,
          lineHeight: '1.6'
        }}>
          Zarządzaj swoimi dokumentami - przeglądaj, wyszukuj i pobieraj zapisane pliki
        </p>
      </div>

      {/* Stats */}
      {stats && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px',
          marginBottom: '25px'
        }}>
          <div style={{
            background: 'linear-gradient(135deg, #e8f4f8 0%, #d6ebf5 100%)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#2c5aa0' }}>
              {stats.total}
            </div>
            <div style={{ fontSize: '14px', color: '#5a6c7d', marginTop: '5px' }}>
              Wszystkie
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#059669' }}>
              {stats.bySource.upload}
            </div>
            <div style={{ fontSize: '14px', color: '#5a6c7d', marginTop: '5px' }}>
              Przesłane
            </div>
          </div>
          <div style={{
            background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            padding: '20px',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '32px', fontWeight: '700', color: '#d97706' }}>
              {stats.bySource.app}
            </div>
            <div style={{ fontSize: '14px', color: '#5a6c7d', marginTop: '5px' }}>
              Z aplikacji
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '25px'
      }}>
        <input
          type="text"
          placeholder="Szukaj dokumentów..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          style={{
            flex: 1,
            padding: '12px 15px',
            border: '2px solid #e1e8ed',
            borderRadius: '8px',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Search size={16} />
          Szukaj
        </button>
      </div>

      {/* Filter Buttons */}
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '25px',
        flexWrap: 'wrap'
      }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: '#5a6c7d',
          fontWeight: '600',
          fontSize: '14px'
        }}>
          <Filter size={16} />
          Filtruj:
        </span>
        {['wszystkie', 'upload', 'app'].map(filter => (
          <button
            key={filter}
            onClick={() => setFilterSource(filter)}
            style={{
              background: filterSource === filter ? 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)' : '#f8f9fb',
              color: filterSource === filter ? 'white' : '#2c5aa0',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              transition: 'all 0.2s',
              textTransform: 'capitalize'
            }}
          >
            {filter === 'upload' ? 'Przesłane' : filter === 'app' ? 'Z aplikacji' : 'Wszystkie'}
          </button>
        ))}
      </div>

      {/* Documents List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Loader size={48} className="spin" style={{ color: '#2c5aa0', marginBottom: '20px' }} />
          <p style={{ color: '#5a6c7d' }}>Ładowanie dokumentów...</p>
        </div>
      ) : error ? (
        <div style={{
          background: '#fee',
          border: '2px solid #c33',
          borderRadius: '12px',
          padding: '20px',
          textAlign: 'center'
        }}>
          <AlertCircle size={48} color="#c33" style={{ marginBottom: '15px' }} />
          <p style={{ color: '#c33', fontWeight: '600' }}>Błąd: {error}</p>
        </div>
      ) : documents.length === 0 ? (
        <div style={{
          background: '#f8f9fb',
          borderRadius: '12px',
          padding: '40px',
          textAlign: 'center',
          color: '#5a6c7d'
        }}>
          <FolderOpen size={48} color="#ccc" style={{ marginBottom: '15px' }} />
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>
            Brak dokumentów
          </p>
          <p>
            Prześlij własne dokumenty lub zapisz dokumenty z aplikacji
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {documents.map(doc => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onDelete={handleDeleteDocument}
              getFileIcon={getFileIcon}
              formatFileSize={formatFileSize}
            />
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <UploadModal
          onClose={() => setShowUploadModal(false)}
          onUpload={upload}
        />
      )}
    </div>
  );
};

// Komponent karty dokumentu
const DocumentCard = ({ document, onDelete, getFileIcon, formatFileSize }) => {
  const handleDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(document.fileUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = document.fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      // Fallback do zwykłego linku
      window.open(document.fileUrl, '_blank');
    }
  };

  return (
    <div style={{
      background: '#f8f9fb',
      borderRadius: '12px',
      padding: '20px',
      border: '2px solid #e1e8ed',
      position: 'relative',
      transition: 'all 0.3s ease'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}>
      {/* Badge źródła */}
      <div style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: document.source === 'upload' ? '#d1fae5' : '#fef3c7',
        color: document.source === 'upload' ? '#059669' : '#d97706',
        padding: '4px 10px',
        borderRadius: '15px',
        fontSize: '11px',
        fontWeight: '600'
      }}>
        {document.source === 'upload' ? 'Przesłany' : 'Z aplikacji'}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        marginBottom: '15px',
        marginTop: '15px'
      }}>
        {getFileIcon(document.fileType)}
        <div style={{ flex: 1 }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '700',
            color: '#2c3e50',
            margin: '0 0 5px 0',
            lineHeight: '1.3'
          }}>
            {document.title}
          </h4>
          {document.description && (
            <p style={{
              fontSize: '13px',
              color: '#5a6c7d',
              margin: 0,
              lineHeight: '1.4'
            }}>
              {document.description}
            </p>
          )}
        </div>
      </div>

      <div style={{
        fontSize: '12px',
        color: '#999',
        marginBottom: '15px'
      }}>
        <div>{document.fileName}</div>
        <div>{formatFileSize(document.fileSize)} • {new Date(document.createdAt).toLocaleDateString('pl-PL')}</div>
      </div>

      <div style={{
        display: 'flex',
        gap: '8px'
      }}>
        <button
          onClick={() => window.open(document.fileUrl, '_blank', 'noopener,noreferrer')}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: 'linear-gradient(135deg, #2c5aa0 0%, #4a7dc9 100%)',
            color: 'white',
            padding: '10px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Eye size={14} />
          Zobacz
        </button>
        <button
          onClick={handleDownload}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            background: '#f8f9fb',
            color: '#2c5aa0',
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '13px',
            border: '2px solid #2c5aa0',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          <Download size={14} />
          Pobierz
        </button>
        <button
          onClick={() => onDelete(document.id)}
          style={{
            background: '#fee',
            color: '#c33',
            border: '2px solid #c33',
            padding: '10px',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

// Modal uploadu
const UploadModal = ({ onClose, onUpload }) => {
  const { showSuccess, showError } = useToast();
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ''));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title.trim()) {
      showError('Wybierz plik i podaj tytuł');
      return;
    }

    setUploading(true);
    try {
      await onUpload(file, {
        title: title.trim(),
        description: description.trim()
      });
      showSuccess('Dokument został przesłany');
      onClose();
    } catch (err) {
      showError('Błąd podczas uploadu: ' + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        padding: '30px',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: '#2c3e50',
            margin: 0
          }}>
            Prześlij dokument
          </h3>
          <button
            onClick={onClose}
            disabled={uploading}
            style={{
              background: 'none',
              border: 'none',
              cursor: uploading ? 'not-allowed' : 'pointer',
              padding: '5px'
            }}
          >
            <X size={24} color="#5a6c7d" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* File Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Plik (PDF, PNG, JPG):
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg"
              onChange={handleFileChange}
              disabled={uploading}
              style={{
                display: 'none'
              }}
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed #2c5aa0',
                borderRadius: '8px',
                padding: '30px',
                textAlign: 'center',
                cursor: uploading ? 'not-allowed' : 'pointer',
                background: file ? '#e8f4f8' : '#f8f9fb',
                transition: 'all 0.2s'
              }}
            >
              {file ? (
                <>
                  <FileText size={32} color="#2c5aa0" style={{ marginBottom: '10px' }} />
                  <div style={{ fontWeight: '600', color: '#2c3e50' }}>{file.name}</div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </>
              ) : (
                <>
                  <Upload size={32} color="#2c5aa0" style={{ marginBottom: '10px' }} />
                  <div style={{ fontWeight: '600', color: '#2c3e50' }}>
                    Kliknij aby wybrać plik
                  </div>
                  <div style={{ fontSize: '12px', color: '#999', marginTop: '5px' }}>
                    Maksymalnie 10MB
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Title Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Tytuł *:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={uploading}
              required
              placeholder="Np. Zaświadczenie o dochodach"
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e8ed',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Description Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              fontWeight: '600',
              color: '#2c3e50',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              Opis (opcjonalny):
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={uploading}
              placeholder="Krótki opis dokumentu..."
              rows={3}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e1e8ed',
                background: 'white',
                color: 'black',
                borderRadius: '8px',
                fontSize: '14px',
                outline: 'none',
                resize: 'vertical',
                fontFamily: 'inherit',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              style={{
                background: '#f8f9fb',
                color: '#5a6c7d',
                border: '2px solid #e1e8ed',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: uploading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '14px'
              }}
            >
              Anuluj
            </button>
            <button
              type="submit"
              disabled={uploading || !file || !title.trim()}
              style={{
                background: uploading ? '#ccc' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: (uploading || !file || !title.trim()) ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                fontSize: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {uploading ? (
                <>
                  <Loader size={16} className="spin" />
                  Przesyłanie...
                </>
              ) : (
                <>
                  <Upload size={16} />
                  Prześlij
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TwojeDokumentyTab;

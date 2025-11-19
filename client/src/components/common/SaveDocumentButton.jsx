import React, { useState } from 'react';
import { Save, Loader, CheckCircle } from 'lucide-react';
import { useUserDocuments } from '../../hooks/useUserDocuments';

const SaveDocumentButton = ({ documentData, onSaveSuccess }) => {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { saveFromApp } = useUserDocuments();

  const handleSave = async () => {
    setSaving(true);
    try {
      await saveFromApp(documentData);
      setSaved(true);

      // Pokaż komunikat sukcesu przez 2 sekundy
      setTimeout(() => {
        setSaved(false);
        if (onSaveSuccess) {
          onSaveSuccess();
        }
      }, 2000);
    } catch (err) {
      alert('Błąd podczas zapisywania dokumentu: ' + err.message);
      setSaving(false);
    }
  };

  if (saved) {
    return (
      <button
        disabled
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: '#d1fae5',
          color: '#059669',
          border: '2px solid #059669',
          padding: '10px 20px',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '14px',
          cursor: 'not-allowed'
        }}
      >
        <CheckCircle size={16} />
        Zapisano!
      </button>
    );
  }

  return (
    <button
      onClick={handleSave}
      disabled={saving}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: saving ? '#ccc' : '#f8f9fb',
        color: saving ? '#999' : '#2c5aa0',
        border: `2px solid ${saving ? '#ccc' : '#2c5aa0'}`,
        padding: '10px 20px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '14px',
        cursor: saving ? 'not-allowed' : 'pointer',
        transition: 'transform 0.2s'
      }}
      onMouseOver={(e) => !saving && (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
    >
      {saving ? (
        <>
          <Loader size={16} className="spin" />
          Zapisywanie...
        </>
      ) : (
        <>
          <Save size={16} />
          Zapisz do moich dokumentów
        </>
      )}
    </button>
  );
};

export default SaveDocumentButton;

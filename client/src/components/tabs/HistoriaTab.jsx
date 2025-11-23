import React, { useState, useEffect } from 'react';
import {
  History,
  Trash2,
  Loader
} from 'lucide-react';
import { historyAPI } from '../../services/api';
import { useToast } from '../../contexts/ToastContext';

const HistoriaTab = () => {
  const { showSuccess, showError, confirm } = useToast();
  const [chatHistory, setChatHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  // Pobierz historię przy montowaniu
  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    setHistoryLoading(true);
    try {
      const response = await historyAPI.getAll();
      setChatHistory(response.data || []);
    } catch (err) {
      console.error('Error loading chat history:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const clearHistory = async () => {
    const confirmed = await confirm(
      'Czy na pewno chcesz wyczyścić całą historię rozmów? Tej operacji nie można cofnąć.',
      'Wyczyść historię',
      'Anuluj'
    );

    if (confirmed) {
      try {
        await historyAPI.clear();
        setChatHistory([]);
        showSuccess('Historia rozmów została wyczyszczona');
      } catch (err) {
        console.error('Error clearing history:', err);
        showError('Błąd podczas czyszczenia historii');
      }
    }
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      marginBottom: '20px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        flexWrap: 'wrap',
        gap: '15px'
      }}>
        <div>
          <h2 style={{
            fontSize: '24px',
            fontWeight: '700',
            color: '#2c3e50',
            margin: '0 0 10px 0',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <History size={24} color="#2c5aa0" />
            Historia rozmów z AI
          </h2>
          <p style={{ color: '#5a6c7d', margin: 0 }}>
            Historia twoich rozmów z asystentem AI
          </p>
        </div>

        {chatHistory.length > 0 && (
          <button
            onClick={clearHistory}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fee',
              color: '#c33',
              border: '2px solid #c33',
              padding: '10px 16px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px'
            }}
          >
            <Trash2 size={16} />
            Wyczyść historię
          </button>
        )}
      </div>

      {/* Chat History */}
      {historyLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Loader size={48} className="spin" style={{ color: '#2c5aa0', marginBottom: '20px' }} />
          <p style={{ color: '#5a6c7d' }}>Ładowanie historii...</p>
        </div>
      ) : chatHistory.length === 0 ? (
        <div style={{
          background: '#f8f9fb',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#5a6c7d'
        }}>
          <History size={48} color="#ccc" style={{ marginBottom: '15px' }} />
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>
            Brak historii rozmów
          </p>
          <p>
            Twoje rozmowy z asystentem AI będą zapisywane tutaj
          </p>
        </div>
      ) : (
        <div style={{
          maxHeight: '600px',
          overflowY: 'auto'
        }}>
          {chatHistory.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
        </div>
      )}
    </div>
  );
};

// Komponent wiadomości czatu
const ChatMessage = ({ message }) => (
  <div style={{
    marginBottom: '20px',
    padding: '15px',
    background: message.role === 'user' ? '#e8f4f8' : '#f8f9fb',
    borderRadius: '12px',
    border: `2px solid ${message.role === 'user' ? '#2c5aa0' : '#e1e8ed'}`
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '10px'
    }}>
      <div style={{ fontSize: '20px' }}>
        {message.role === 'user' ? '👤' : '🤖'}
      </div>
      <div style={{
        fontWeight: '600',
        color: '#2c5aa0'
      }}>
        {message.role === 'user' ? 'Ty' : 'Asystent AI'}
      </div>
      <div style={{
        fontSize: '12px',
        color: '#999',
        marginLeft: 'auto'
      }}>
        {new Date(message.timestamp).toLocaleString('pl-PL')}
      </div>
    </div>
    <div style={{
      color: '#2c3e50',
      lineHeight: '1.6',
      whiteSpace: 'pre-wrap'
    }}>
      {message.content}
    </div>
  </div>
);

export default HistoriaTab;

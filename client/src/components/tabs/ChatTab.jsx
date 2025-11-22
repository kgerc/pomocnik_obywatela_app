import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import ChatInterface from '../../components/chat/ChatInterface';
import { useSwiadczenia } from '../../hooks/useSwiadczenia';

const ChatTab = ({ onToggleFavorite, isFavorite }) => {
  const { swiadczenia, loading, fetchAll } = useSwiadczenia();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (swiadczenia.length === 0 && !isInitialized) {
        await fetchAll();
        setIsInitialized(true);
      } else {
        setIsInitialized(true);
      }
    };
    loadData();
  }, []);

  if (loading && !isInitialized) {
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
        <p style={{ color: '#5a6c7d', fontSize: '16px' }}>Ładowanie...</p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
          .spin {
            animation: spin 1s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  return (
    <ChatInterface
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
      preloadedSwiadczenia={swiadczenia}
    />
  );
};

export default ChatTab;
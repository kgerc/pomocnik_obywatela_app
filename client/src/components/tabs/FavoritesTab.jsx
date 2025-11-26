import { useEffect } from 'react';
import { Heart } from 'lucide-react';
import SwiadczenieCard from '../../components/swiadczenia/SwiadczenieCard';
import { useAppData } from '../../contexts/AppDataContext';
import { useSwiadczenia } from '../../hooks/useSwiadczenia';

const FavoritesTab = () => {
  const { favorites, toggleFavorite } = useAppData();
  const { swiadczenia, fetchAll } = useSwiadczenia();

  useEffect(() => {
    fetchAll();
  }, []);

  const handleToggleFavorite = async (itemId) => {
    await toggleFavorite('swiadczenie', itemId);
  };

  const favoriteSwiadczenia = swiadczenia.filter(sw =>
    favorites.some(fav => fav.item_id === sw.id)
  );
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '30px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    }}>
      <h2 style={{
        fontSize: '24px',
        fontWeight: '700',
        color: '#2c3e50',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <Heart size={24} color="#2c5aa0" />
        Ulubione świadczenia ({favoriteSwiadczenia.length})
      </h2>

      {favoriteSwiadczenia.length === 0 ? (
        <div style={{
          background: '#f8f9fb',
          padding: '40px',
          borderRadius: '12px',
          textAlign: 'center',
          color: '#5a6c7d'
        }}>
          <Heart size={48} color="#ccc" style={{ marginBottom: '15px' }} />
          <p style={{ fontSize: '18px', marginBottom: '10px' }}>
            Nie masz jeszcze ulubionych świadczeń
          </p>
          <p>
            Kliknij ikonę serca przy interesujących Cię świadczeniach, aby zapisać je tutaj.
          </p>
        </div>
      ) : (
        favoriteSwiadczenia.map(sw => (
          <SwiadczenieCard
            key={sw.id}
            swiadczenie={sw}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={true}
          />
        ))
      )}
    </div>
  );
};

export default FavoritesTab;
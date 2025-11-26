import { createContext, useContext } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import { useSubscription } from '../hooks/useSubscription';

const AppDataContext = createContext(null);

export const AppDataProvider = ({ children }) => {
  const favoritesData = useFavorites();
  const subscriptionData = useSubscription();

  return (
    <AppDataContext.Provider value={{ ...favoritesData, ...subscriptionData }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error('useAppData must be used within AppDataProvider');
  }
  return context;
};

export default AppDataContext;

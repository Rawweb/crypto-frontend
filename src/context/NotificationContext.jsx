import { createContext, useContext, useEffect, useState } from 'react';
import api from '@api/axios';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get('/notifications/unread-count');
      setUnreadCount(res.data.unread);
    } catch (err) {
      console.error('Failed to fetch unread count');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        unreadCount,
        loading,
        refreshUnreadCount: fetchUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);

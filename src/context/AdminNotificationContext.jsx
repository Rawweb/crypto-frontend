import { createContext, useContext, useEffect, useState } from 'react';
import api from '@api/axios';


const AdminNotificationContext = createContext(null);

export const AdminNotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);



  const fetchUnread = async () => {
    try {
      const res = await api.get('/admin/notifications/unread-count');
      setUnreadCount(res.data.unread);
    } catch (err) {
      console.error('Failed to fetch admin unread count');
    }
  };

  useEffect(() => {
    fetchUnread();
  }, []);

  return (
    <AdminNotificationContext.Provider
      value={{
        unreadCount,
        refreshUnread: fetchUnread,
      }}
    >
      {children}
    </AdminNotificationContext.Provider>
  );
};

export const useAdminNotifications = () => {
  return useContext(AdminNotificationContext);
};

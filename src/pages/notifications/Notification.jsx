import { useEffect, useState } from 'react';
import api from '@api/axios';
import { FiBell } from 'react-icons/fi';
import { useNotifications } from '@context/NotificationContext';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshUnreadCount } = useNotifications();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await api.get('/notifications');
        setNotifications(res.data);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = async id => {
    await api.patch(`/notifications/${id}/read`);

    setNotifications(prev =>
      prev.map(n => (n._id === id ? { ...n, isRead: true } : n))
    );

    refreshUnreadCount();
  };

  if (loading) {
    return <p className="text-text-muted">Loading notifications…</p>;
  }

  if (!notifications.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <FiBell className="text-4xl text-text-muted mb-4" />
        <p className="text-text-muted">You’re all caught up</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map(n => (
        <div
          key={n._id}
          onClick={() => !n.isRead && markAsRead(n._id)}
          className={`
            cursor-pointer rounded-xl border p-4 transition
            ${
              n.isRead
                ? 'bg-bg-surface border-bg-elevated'
                : 'bg-brand-primary/5 border-brand-primary/30 hover:bg-brand-primary/10'
            }
          `}
        >
          <div className="flex gap-3">
            {!n.isRead && (
              <span className="mt-2 h-2 w-2 rounded-full bg-brand-primary" />
            )}

            <div className="flex-1">
              <p className="font-medium">{n.title}</p>
              <p className="text-sm text-text-muted">{n.message}</p>
              <p className="mt-1 text-xs text-text-muted">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notifications;

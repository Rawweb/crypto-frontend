import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api/axios';
import {
  FiBell,
  FiTrendingUp,
  FiCreditCard,
  FiCheckCircle,
} from 'react-icons/fi';
import { useNotifications } from '@context/NotificationContext';
import { FiTrash2 } from 'react-icons/fi';

/* ---------------- helpers ---------------- */

const getNotificationIcon = title => {
  if (title.toLowerCase().includes('investment'))
    return <FiTrendingUp className="text-brand-primary" />;
  if (title.toLowerCase().includes('withdrawal'))
    return <FiCreditCard className="text-status-warning" />;
  if (title.toLowerCase().includes('deposit'))
    return <FiCreditCard className="text-status-success" />;

  return <FiBell className="text-text-muted" />;
};

const getDeepLink = title => {
  if (title.toLowerCase().includes('investment')) return '/investments';
  if (title.toLowerCase().includes('withdrawal')) return '/wallet';
  if (title.toLowerCase().includes('deposit')) return '/wallet';
  return null;
};

const isToday = date => {
  const d = new Date(date);
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

const isYesterday = date => {
  const d = new Date(date);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return d.toDateString() === yesterday.toDateString();
};

/* ---------------- component ---------------- */

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
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

  const markAllAsRead = async () => {
    await api.patch('/notifications/read-all');
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    refreshUnreadCount();
  };

  const deleteOne = async id => {
    await api.delete(`/notifications/${id}`);
    setNotifications(prev => prev.filter(n => n._id !== id));
    refreshUnreadCount();
  };

  const grouped = useMemo(() => {
    return {
      today: notifications.filter(n => isToday(n.createdAt)),
      yesterday: notifications.filter(n => isYesterday(n.createdAt)),
      earlier: notifications.filter(
        n => !isToday(n.createdAt) && !isYesterday(n.createdAt)
      ),
    };
  }, [notifications]);

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

  const renderGroup = (title, items) =>
    items.length > 0 && (
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-wide text-text-muted">
          {title}
        </p>

        {items.map(n => (
          <div
            key={n._id}
            onClick={() => {
              if (!n.isRead) markAsRead(n._id);
              const link = getDeepLink(n.title);
              if (link) navigate(link);
            }}
            className={`group cursor-pointer rounded-xl border p-4 transition hover:shadow-sm flex gap-3 ${
              n.isRead
                ? 'bg-bg-surface border-bg-elevated'
                : 'bg-brand-primary/5 border-brand-primary/30 hover:bg-brand-primary/10'
            }
  `}
          >
            <div className="mt-1">{getNotificationIcon(n.title)}</div>

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{n.title}</p>
                  {!n.isRead && (
                    <span className="h-2 w-2 rounded-full bg-brand-primary" />
                  )}
                </div>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    deleteOne(n._id);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition text-text-muted hover:text-status-danger "
                >
                  <FiTrash2 className="size-4" />
                </button>
              </div>

              <p className="text-sm text-text-muted">{n.message}</p>

              <p className="mt-1 text-xs text-text-muted">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className=" bg-brand-primary/15 text-brand-primary p-2 rounded-xl">
              <FiBell className="size-6" />{' '}
            </div>
            <div>
              <h1 className="font-semibold text-lg">Notifications</h1>
              <p className="text-xs text-text-muted">
                {unreadCount > 0
                  ? `You have ${unreadCount} unread notification${
                      unreadCount > 1 ? 's' : ''
                    }`
                  : 'All caught up'}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={markAllAsRead}
          disabled={unreadCount === 0}
          className={`flex items-center gap-1 text-xs transition ${
            unreadCount === 0
              ? 'text-text-muted/40 cursor-not-allowed'
              : 'text-text-muted hover:text-brand-primary'
          }`}
        >
          <FiCheckCircle className="size-4" />
          Mark all as read
        </button>
      </div>

      {renderGroup('Today', grouped.today)}
      {renderGroup('Yesterday', grouped.yesterday)}
      {renderGroup('Earlier', grouped.earlier)}
    </div>
  );
};

export default Notifications;

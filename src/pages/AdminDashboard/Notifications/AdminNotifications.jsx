import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api/axios';
import {
  FiBell,
  FiTrendingUp,
  FiCreditCard,
  FiCheckCircle,
} from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import AdminSkeleton from '@pages/AdminDashboard/Dashboard/components/AdminSkeleton';
import { useAdminNotifications } from '@context/AdminNotificationContext';

/* ---------------- helpers ---------------- */

const getIcon = type => {
  if (type === 'deposit')
    return <FiCreditCard className="text-status-success" />;
  if (type === 'withdrawal')
    return <FiTrendingUp className="text-status-warning" />;
  return <FiBell className="text-text-muted" />;
};

const getAdminLink = n => {
  if (n.type === 'deposit') return `/admin/deposits?highlight=${n.entityId}`;
  if (n.type === 'withdrawal')
    return `/admin/withdrawals?highlight=${n.entityId}`;
  return null;
};

const isToday = date =>
  new Date(date).toDateString() === new Date().toDateString();

const isYesterday = date => {
  const d = new Date(date);
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return d.toDateString() === y.toDateString();
};

/* ---------------- component ---------------- */

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { refreshUnread } = useAdminNotifications();

  useEffect(() => {
    api.get('/admin/notifications').then(res => {
      setNotifications(res.data);
      setLoading(false);
    });
  }, []);

  const markAsRead = async id => {
    await api.patch(`/admin/notifications/${id}/read`);
    setNotifications(n =>
      n.map(x => (x._id === id ? { ...x, isRead: true } : x))
    );
    refreshUnread();
  };

  const markAllAsRead = async () => {
    await api.patch('/admin/notifications/read-all');
    setNotifications(n => n.map(x => ({ ...x, isRead: true })));
    refreshUnread();
  };

  const deleteOne = async id => {
    await api.delete(`/admin/notifications/${id}`);
    setNotifications(n => n.filter(x => x._id !== id));
    refreshUnread();
  };

  const grouped = useMemo(
    () => ({
      today: notifications.filter(n => isToday(n.createdAt)),
      yesterday: notifications.filter(n => isYesterday(n.createdAt)),
      earlier: notifications.filter(
        n => !isToday(n.createdAt) && !isYesterday(n.createdAt)
      ),
    }),
    [notifications]
  );

  if (loading) return <AdminSkeleton />;

  if (!notifications.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold">Admin Notifications</h1>

        <div className="rounded-xl border border-status-info/20 bg-status-info/10 p-6 text-center">
          <FiBell className="mx-auto mb-3 text-2xl text-status-info" />

          <p className="text-sm font-medium text-status-info">
            No notifications yet
          </p>

          <p className="text-xs text-text-muted mt-1">
            Admin alerts such as deposits and withdrawals will appear here.
          </p>
        </div>
      </div>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const renderGroup = (label, items) =>
    items.length > 0 && (
      <div className="space-y-3">
        <p className="text-xs uppercase text-text-muted">{label}</p>

        {items.map(n => (
          <div
            key={n._id}
            onClick={() => {
              if (!n.isRead) markAsRead(n._id);
              const link = getAdminLink(n);
              if (link) navigate(link);
            }}
            className={`group cursor-pointer rounded-xl border p-4 flex gap-3 transition
              ${
                n.isRead
                  ? 'bg-bg-surface border-bg-elevated'
                  : 'bg-brand-primary/5 border-brand-primary/30'
              }`}
          >
            <div className="mt-1">{getIcon(n.type)}</div>

            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-medium">{n.title}</p>

                <button
                  onClick={e => {
                    e.stopPropagation();
                    deleteOne(n._id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-status-danger"
                >
                  <FiTrash2 />
                </button>
              </div>

              <p className="text-sm text-text-muted">{n.message}</p>
              <p className="text-xs text-text-muted mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Admin Notifications</h1>

        <button
          onClick={markAllAsRead}
          disabled={!unreadCount}
          className="text-xs flex items-center gap-1 text-text-muted hover:text-brand-primary disabled:opacity-40"
        >
          <FiCheckCircle />
          Mark all as read
        </button>
      </div>

      {renderGroup('Today', grouped.today)}
      {renderGroup('Yesterday', grouped.yesterday)}
      {renderGroup('Earlier', grouped.earlier)}
    </div>
  );
};

export default AdminNotifications;

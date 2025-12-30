import {
  FiBell,
  FiChevronDown,
  FiSettings,
  FiUser,
  FiLogOut,
  FiCheck,
} from 'react-icons/fi';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { dashboardTitles } from '@components/utils/dashboardTitles';
import { useNotifications } from '@context/NotificationContext';
import { formatBadgeCount } from '@components/utils/formatBadgeCount';
import { useAuth } from '@context/AuthContext';
import ConfirmModal from '@components/ui/ConfirmModal';

const DEV_BADGE_COUNT = 80;

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const menuRef = useRef(null);

  const { pathname } = useLocation();
  const title = dashboardTitles[pathname] || 'Dashboard';

  const { unreadCount: realUnreadCount } = useNotifications();
  const unreadCount = DEV_BADGE_COUNT ?? realUnreadCount;
  const badgeText = formatBadgeCount(unreadCount);

  const avatarLetter = user?.username?.charAt(0)?.toUpperCase() || 'U';
  const avatarUrl = user?.avatar || null;

  useEffect(() => {
    const handleClickOutside = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () =>
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
    setShowLogout(false);
  };

  return (
    <>
      <header className="h-16 border-b border-bg-elevated px-4 md:px-6 flex items-center justify-between bg-bg-surface">
        <h1 className="font-semibold">{title}</h1>

        <div className="flex items-center gap-4 relative" ref={menuRef}>
          {/* Notifications */}
          <button
            onClick={() => navigate('/notifications')}
            className="relative"
          >
            <FiBell className="size-6" />
            {badgeText && (
              <span className="absolute -top-1 -right-2 h-5 px-1 rounded-full bg-brand-primary text-[10px] flex items-center justify-center text-black font-medium">
                {badgeText}
              </span>
            )}
          </button>

          {/* User menu */}
          <button
            onClick={() => setOpen(o => !o)}
            className="flex items-center gap-2"
          >
            <div className="relative">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="size-8 rounded-full object-cover border border-bg-elevated"
                />
              ) : (
                <div className="size-8 rounded-full bg-bg-elevated flex items-center justify-center text-sm font-semibold">
                  {avatarLetter}
                </div>
              )}

              {user?.isVerified && (
                <span className="absolute top-0.5 -right-0.5 size-4 rounded-full bg-brand-primary flex items-center justify-center text-black">
                  <FiCheck className="size-3" />
                </span>
              )}
            </div>

            <FiChevronDown className="size-4" />
          </button>

          {open && (
            <div className="absolute right-0 top-12 w-48 bg-bg-elevated rounded-xl shadow-lg overflow-hidden z-10">
              <div className="px-4 py-3 border-b border-bg-surface">
                <p className="text-sm font-medium uppercase mb-1">
                  {user.username}
                </p>
                <p className="text-xs text-text-muted truncate">
                  {user.email}
                </p>
              </div>

              <button
                onClick={() => {
                  navigate('/account/profile');
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 hover:bg-bg-surface text-sm"
              >
                <FiUser />
                Profile
              </button>

              <button
                onClick={() => {
                  navigate('/account/settings');
                  setOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 hover:bg-bg-surface text-sm"
              >
                <FiSettings />
                Settings
              </button>

              <button
                onClick={() => {
                  setOpen(false);
                  setShowLogout(true);
                }}
                className="flex items-center gap-2 w-full px-4 py-3 hover:bg-bg-surface text-sm text-status-danger"
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Logout modal */}
      <ConfirmModal
        open={showLogout}
        title="Log out"
        description="Are you sure you want to log out of your account?"
        confirmText="Log out"
        danger
        onCancel={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default DashboardHeader;

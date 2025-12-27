import { FiBell, FiChevronDown } from 'react-icons/fi';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { dashboardTitles } from '@components/utils/dashboardTitles';
import { useNotifications } from '@context/NotificationContext';
import { formatBadgeCount } from '@components/utils/formatBadgeCount';

const DEV_BADGE_COUNT = 80;
// try: 1, 5, 23, 99, 120

const DashboardHeader = ({ onMenuClick }) => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const title = dashboardTitles[pathname] || 'Dashboard';

  const { unreadCount: realUnreadCount } = useNotifications();
  const unreadCount = DEV_BADGE_COUNT ?? realUnreadCount;
  const badgeText = formatBadgeCount(unreadCount);

  return (
    <header className="h-16 border-b border-bg-elevated px-4 md:px-6 flex items-center justify-between bg-bg-surface">
      {/* left */}

      <h1 className="font-semibold">{title}</h1>

      {/* right */}
      <div className="flex items-center gap-4 relative">
        {/* notifications */}
        <button className="relative">
          <FiBell className="size-6" />
          {badgeText && (
            <span
              className={`absolute -top-1 -right-2 h-5 px-1 rounded-full bg-brand-primary text-[10px] flex items-center justify-center text-black font-medium animate-badge ${
                badgeText === '99+' ? 'min-w-4.5' : 'min-w-3.5'
              } `}
            >
              {badgeText}
            </span>
          )}
        </button>

        {/* user menu */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2"
        >
          <div className="size-8 rounded-full bg-bg-elevated" />
          <FiChevronDown className="size-4" />
        </button>

        {open && (
          <div className="absolute right-0 top-12 w-40 bg-bg-elevated rounded-xl shadow-lg overflow-hidden">
            <button className="block w-full text-left px-4 py-3 hover:bg-bg-surface">
              Profile
            </button>
            <button className="block w-full text-left px-4 py-3 hover:bg-bg-surface text-status-danger">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;

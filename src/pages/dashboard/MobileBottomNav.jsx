import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiCreditCard,
  FiTrendingUp,
  FiBell,
  FiUser,
} from 'react-icons/fi';
import { useNotifications } from '@context/NotificationContext';
import { formatBadgeCount } from '@components/utils/formatBadgeCount';

const DEV_BADGE_COUNT = 100;
// try: 1, 5, 23, 99, 120

const items = [
  { path: '/dashboard', icon: FiGrid, label: 'Home' },
  { path: '/wallet', icon: FiCreditCard, label: 'Wallet' },
  { path: '/investments', icon: FiTrendingUp, label: 'Invest' },
  { path: '/notifications', icon: FiBell, label: 'Alerts' },
  { path: '/profile', icon: FiUser, label: 'Profile' },
];

const MobileBottomNav = ({ hidden }) => {
  const { unreadCount: realUnreadCount } = useNotifications();
  const unreadCount = DEV_BADGE_COUNT ?? realUnreadCount;
  const badgeText = formatBadgeCount(unreadCount);

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-bg-surface border-t border-bg-elevated
        md:hidden
        transition-transform duration-300 ease-out
        ${hidden ? 'translate-y-full' : 'translate-y-0'}
      `}
    >
      <div className="flex justify-around items-center h-16">
        {items.map(({ path, icon: Icon, label }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `
              flex flex-col items-center justify-center gap-1 text-xs
              transition-colors
              ${isActive ? 'text-brand-primary' : 'text-text-muted'}
            `
            }
          >
            <div className="relative">
              <Icon className="size-5" />

              {label === 'Alerts' && badgeText  && (
                <span
                  className={`absolute -top-1 -right-2 h-4 px-1 rounded-full bg-brand-primary text-[9px] flex items-center justify-center text-black font-medium animate-badge ${
                    badgeText === '99+' ? 'min-w-4.5' : 'min-w-3.5'
                  } `}
                >
                  {badgeText}
                </span>
              )}
            </div>

            <span className="text-[10px]">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;

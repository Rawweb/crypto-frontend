import { NavLink } from 'react-router-dom';
import {
  FiGrid,
  FiCreditCard,
  FiTrendingUp,
  FiBell,
  FiUser,
} from 'react-icons/fi';

const navItems = [
  { label: 'Overview', path: '/dashboard', icon: FiGrid },
  { label: 'Wallet', path: '/wallet', icon: FiCreditCard },
  { label: 'Investments', path: '/investments', icon: FiTrendingUp },
  { label: 'Notifications', path: '/notifications', icon: FiBell },
  { label: 'Profile', path: '/profile', icon: FiUser },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 border-r border-bg-elevated bg-bg-surface">
      <div className="flex flex-col w-full p-6">
        {/* logo */}
        <div className="mb-10 text-lg font-bold">Crypto Dashboard</div>

        {/* nav */}
        <nav className="space-y-1">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors
                ${
                  isActive
                    ? 'bg-bg-elevated text-brand-primary'
                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                }
              `
              }
            >
              <Icon className="size-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;

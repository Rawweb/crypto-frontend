import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiHome,
  FiUsers,
  FiCreditCard,
  FiTrendingUp,
  FiArrowUpRight,
  FiArrowDownLeft,
  FiFileText,
  FiBell,
  FiLogOut,
  FiLayers,
} from 'react-icons/fi';
import ConfirmModal from '@components/ui/ConfirmModal';
import { useAuth } from '@context/AuthContext';
import { useState } from 'react';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: FiHome },
  { name: 'Users', path: '/admin/users', icon: FiUsers },
  { name: 'Transactions', path: '/admin/transactions', icon: FiCreditCard },
  { name: 'Deposits', path: '/admin/deposits', icon: FiArrowDownLeft },
  { name: 'Withdrawals', path: '/admin/withdrawals', icon: FiArrowUpRight },
  { name: 'Investments', path: '/admin/investments', icon: FiTrendingUp },
  { name: 'Investment Plans', path: '/admin/investment-plans', icon: FiLayers},
  { name: 'Pages', path: '/admin/pages', icon: FiFileText },
  { name: 'Notifications', path: '/admin/notifications', icon: FiBell },
];

const AdminSidebar = ({ open, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogout, setShowLogout] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
    setShowLogout(false);
    onClose?.();
  };

  return (
    <>
      <aside
        className={`
          fixed lg:sticky top-0
          z-50
          bg-bg-surface border-r border-bg-elevated
          w-64
          h-screen
          transform transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Header */}
        <div className="h-16 flex items-center px-4 font-semibold border-b border-bg-elevated">
          Admin Panel
        </div>

        {/* Nav */}
        <nav className="flex flex-col flex-1 space-y-2 px-2 py-4 overflow-y-auto">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                ${
                  isActive
                    ? 'bg-bg-elevated text-brand-primary'
                    : 'text-text-secondary hover:bg-bg-elevated hover:text-text-primary'
                }`
              }
            >
              <Icon size={18} />
              <span>{name}</span>
            </NavLink>
          ))}

          <button
            onClick={() => setShowLogout(true)}
            className="mt-auto flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                       transition-colors text-status-danger hover:bg-bg-elevated"
          >
            <FiLogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

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

export default AdminSidebar;

import { adminDashboardTitles } from '@components/utils/adminDashboardTirles';
import { useAuth } from '@context/AuthContext';
import { useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';

const AdminTopbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();

  const { pathname } = useLocation();
  const title = adminDashboardTitles[pathname] || 'Dashboard';

  return (
    <header className=" h-16 border-b border-bg-elevated flex items-center px-6 bg-bg-surface">
      <div className="flex items-center w-full">
        {/* Mobile toggle */}
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded hover:bg-bg-elevated"
        >
          <FiMenu size={20} />
        </button>
        <div className="w-full flex items-center ml-4 justify-between">
          <h1 className="font-medium">{title}</h1>

          <p className="text-text-muted capitalize text-sm">{user?.username}</p>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;

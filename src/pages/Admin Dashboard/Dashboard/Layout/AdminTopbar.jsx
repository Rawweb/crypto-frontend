import { adminDashboardTitles } from '@components/utils/adminDashboardTirles';
import { useAuth } from '@context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiMenu, FiBell } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import { formatBadgeCount } from '@components/utils/formatBadgeCount';
import api from '@api/axios';
import { useAdminNotifications } from '@context/AdminNotificationContext';

const AdminTopbar = ({ onToggleSidebar }) => {
  const { user } = useAuth();
  const { unreadCount } = useAdminNotifications();
  const badgeText = formatBadgeCount(unreadCount);
  const navigate = useNavigate();

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
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button
              onClick={() => navigate('/admin/notifications')}
              className="relative p-2 rounded-lg hover:bg-bg-elevated"
            >
              <FiBell className="text-lg" />

              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 bg-status-danger text-white text-[10px] px-1.5 rounded-full">
                  {badgeText}
                </span>
              )}
            </button>

            {/* Admin name */}
            <p className="text-text-muted capitalize text-sm">
              {user?.username}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;

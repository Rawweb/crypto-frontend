import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import Sidebar from '@pages/User Dashboard/Dashboard/Sidebar';
import DashboardHeader from '@pages/User Dashboard/Dashboard/DashboardHeader';
import MobileBottomNav from '@pages/User Dashboard/Dashboard/MobileBottomNav';
import { NotificationProvider } from '@context/NotificationContext';
import { useAuth } from '@context/AuthContext';

const DashboardLayout = () => {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        setHideNav(true);
      } else {
        setHideNav(false);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!loading && user && !user.isVerified) {
      navigate('/verify-email', { replace: true });
    }
  }, [user, loading, navigate]);

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-bg-main text-text-primary flex ">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <DashboardHeader />

          <main className="flex-1 overflow-y-auto px-4 py-6 md:p-6 pb-24 md:pb-6 overflow-x-hidden">
            <Outlet />
          </main>

          <MobileBottomNav hidden={hideNav} />
        </div>
      </div>
    </NotificationProvider>
  );
};

export default DashboardLayout;

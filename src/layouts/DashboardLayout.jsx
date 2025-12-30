import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@pages/dashboard/Sidebar';
import DashboardHeader from '@pages/dashboard/DashboardHeader';
import MobileBottomNav from '@pages/dashboard/MobileBottomNav';
import { NotificationProvider } from '@context/NotificationContext';





const DashboardLayout = () => {
  const [hideNav, setHideNav] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

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

  return (
    <NotificationProvider>
      <div className="min-h-screen bg-bg-main text-text-primary flex">
        <Sidebar />

        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          

          <main className="flex-1 overflow-y-auto p-6 pb-24 md:pb-6">
            
            <Outlet />
          </main>

          <MobileBottomNav hidden={hideNav} />
        </div>
      </div>
    </NotificationProvider>
  );
};

export default DashboardLayout;

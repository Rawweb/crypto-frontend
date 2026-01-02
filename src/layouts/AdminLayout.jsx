import AdminSidebar from '@pages/Admin Dashboard/Dashboard/Layout/AdminSidebar';
import AdminTopbar from '@pages/Admin Dashboard/Dashboard/Layout/AdminTopbar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="min-h-screen flex bg-bg-main text-text-primary ">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main area */}
      <div className="flex-1 flex flex-col">
        <AdminTopbar onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

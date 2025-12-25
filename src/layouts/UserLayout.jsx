import Footer from '@components/layout/Footer';
import Navbar from '@components/layout/Navbar';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-bg-main text-text-primary">
      {/* navbar */}
      <Navbar />

      {/* main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default UserLayout;

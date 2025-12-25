import { Outlet, Link } from 'react-router-dom';
import logo from '@assets/logo.png';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-bg-main text-text-primary flex flex-col items-center justify-center px-4">
      {/* logo → home */}
      <Link to="/" className="mb-6 flex items-center gap-2 group">
        <img
          src={logo}
          alt="Crypto logo"
          className="size-7 group-hover:scale-110 transition-transform"
        />
        <span className="text-xl font-bold">Crypto</span>
      </Link>

      {/* auth card */}
      <div className="w-full max-w-md bg-bg-surface border border-bg-elevated rounded-2xl p-6 sm:p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

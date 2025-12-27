import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLayout from '@layouts/AdminLayout';
import AuthLayout from '@layouts/AuthLayout';
import UserLayout from '@layouts/UserLayout';

import HomePage from '@pages/home/HomePage';
import AboutPage from '@pages/about/AboutPage';
import ContactPage from '@pages/contact/ContactPage';
import BuySellPage from '@pages/buy-sell/BuySellPage';

import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import VerifyEmail from '@pages/auth/VerifyEmail';

import PrivacyPolicy from '@pages/legal/PrivacyPolicy';
import TermsOfService from '@pages/legal/TermsOfService';

import Dashboard from '@pages/dashboard/Dashboard';
import Wallet from '@pages/wallets/Wallet';

import RequireVerified from '@components/guards/RequireVerified';
import ScrollToTop from '@components/utils/ScrollToTop';

const App = () => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user'))
  );

  useEffect(() => {
    const syncUser = () => setUser(JSON.parse(localStorage.getItem('user')));

    window.addEventListener('storage', syncUser);
    return () => window.removeEventListener('storage', syncUser);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* public */}
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="sell" element={<BuySellPage />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
        </Route>

        {/* auth */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>

        {/* verified */}
        <Route
          element={
            <RequireVerified user={user}>
              <UserLayout />
            </RequireVerified>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>

        {/* admin */}
        <Route element={<AdminLayout />} />
      </Routes>
    </Router>
  );
};

export default App;

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
import DashboardLayout from '@layouts/DashboardLayout';
import DepositPage from '@pages/deposit/DepositPage';
import WithdrawPage from '@pages/withdrawal/WithdrawPage';
import AdminDeposits from '@pages/deposit/AdminDeposits';
import ActiveInvestments from '@pages/investments/ActiveInvestments';
import CompletedInvestments from '@pages/investments/CompletedInvestments';
import InvestmentOverview from '@pages/investments/InvestmentOverview';
import InvestmentPlans from '@pages/investments/InvestmentPlans';
import InvestmentDetails from '@pages/investments/InvestmentsDetails';
import ProfitHistory from '@pages/investments/ProfitHistory';
import Account from '@pages/Account/Account';
import Notification from '@pages/notifications/Notification';
import Profile from '@pages/Account/Profile';
import AccountSettings from '@pages/Account/AccountSettings';

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
              <DashboardLayout />
            </RequireVerified>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          {/* wallet */}
          <Route path="wallet" element={<Wallet />} />
          <Route path="wallet/deposit" element={<DepositPage />} />
          <Route path="wallet/withdraw" element={<WithdrawPage />} />

          {/* investments */}
          <Route path="/investments" element={<InvestmentOverview />} />
          <Route path="/investments/invest" element={<InvestmentPlans />} />
          <Route path="/investments/active" element={<ActiveInvestments />} />
          <Route path="/investments/:id" element={<InvestmentDetails />} />
          <Route path="/investments/:id/profits" element={<ProfitHistory />} />
          <Route
            path="/investments/completed"
            element={<CompletedInvestments />}
          />

          {/* account */}
          <Route path="account" element={<Account />} />
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/settings" element={<AccountSettings />} />

          {/* notifications */}
          <Route path="notifications" element={<Notification />} />
        </Route>

        {/* admin */}
        <Route element={<AdminLayout />} />
        <Route path="admin/deposits" element={<AdminDeposits />} />
      </Routes>
    </Router>
  );
};

export default App;

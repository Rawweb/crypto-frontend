import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminLayout from '@layouts/AdminLayout';
import AuthLayout from '@layouts/AuthLayout';
import UserLayout from '@layouts/UserLayout';
import DashboardLayout from '@layouts/DashboardLayout';

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
import DepositPage from '@pages/deposit/DepositPage';
import WithdrawPage from '@pages/withdrawal/WithdrawPage';

import ActiveInvestments from '@pages/investments/ActiveInvestments';
import CompletedInvestments from '@pages/investments/CompletedInvestments';
import InvestmentOverview from '@pages/investments/InvestmentOverview';
import InvestmentPlans from '@pages/investments/InvestmentPlans';
import InvestmentDetails from '@pages/investments/InvestmentsDetails';
import ProfitHistory from '@pages/investments/ProfitHistory';

import Account from '@pages/Account/Account';
import Profile from '@pages/Account/Profile';
import AccountSettings from '@pages/Account/AccountSettings';

import Notification from '@pages/notifications/Notification';
import AdminDeposits from '@pages/deposit/AdminDeposits';

import ScrollToTop from '@components/utils/ScrollToTop';
import ProtectedRoute from '@routes/ProtectedRoutes';


const App = () => {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* PUBLIC */}
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="sell" element={<BuySellPage />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<TermsOfService />} />
        </Route>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-email" element={<VerifyEmail />} />
        </Route>

        {/* USER DASHBOARD (PROTECTED) */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />

          {/* wallet */}
          <Route path="wallet" element={<Wallet />} />
          <Route path="wallet/deposit" element={<DepositPage />} />
          <Route path="wallet/withdraw" element={<WithdrawPage />} />

          {/* investments */}
          <Route path="investments" element={<InvestmentOverview />} />
          <Route path="investments/invest" element={<InvestmentPlans />} />
          <Route path="investments/active" element={<ActiveInvestments />} />
          <Route path="investments/completed" element={<CompletedInvestments />} />
          <Route path="investments/:id" element={<InvestmentDetails />} />
          <Route path="investments/:id/profits" element={<ProfitHistory />} />

          {/* account */}
          <Route path="account" element={<Account />} />
          <Route path="account/profile" element={<Profile />} />
          <Route path="account/settings" element={<AccountSettings />} />

          {/* notifications */}
          <Route path="notifications" element={<Notification />} />
        </Route>

        {/* ADMIN (ROLE PROTECTED) */}
        <Route
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="admin/deposits" element={<AdminDeposits />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

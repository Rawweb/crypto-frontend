import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@components/utils/ScrollToTop';

import ProtectedRoute from '@routes/ProtectedRoutes';

import AdminLayout from '@layouts/AdminLayout';
import AuthLayout from '@layouts/AuthLayout';
import DashboardLayout from '@layouts/DashboardLayout';
import UserLayout from '@layouts/UserLayout';

import Login from '@pages/Auth/Login';
import Register from '@pages/Auth/Register';
import VerifyEmail from '@pages/Auth/VerifyEmail';

import AboutPage from '@pages/Publics/About/AboutPage';
import BuySellPage from '@pages/Publics/Buy-sell/BuySellPage';
import ContactPage from '@pages/Publics/Contact/ContactPage';
import HomePage from '@pages/Publics/Home/HomePage';

import PrivacyPolicy from '@pages/Publics/Legal/PrivacyPolicy';
import TermsOfService from '@pages/Publics/Legal/TermsOfService';

import Dashboard from '@pages/User Dashboard/Dashboard/Dashboard';

import InvestmentOverview from '@pages/User Dashboard/Investments/InvestmentOverview';
import ActiveInvestments from '@pages/User Dashboard/Investments/ActiveInvestments';
import CompletedInvestments from '@pages/User Dashboard/Investments/CompletedInvestments';
import InvestmentPlans from '@pages/User Dashboard/Investments/InvestmentPlans';
import InvestmentDetails from '@pages/User Dashboard/Investments/InvestmentsDetails';
import ProfitHistory from '@pages/User Dashboard/Investments/ProfitHistory';

import Wallet from '@pages/User Dashboard/Wallets/Wallet';
import WithdrawPage from '@pages/User Dashboard/Withdrawal/WithdrawPage';
import DepositPage from '@pages/User Dashboard/Deposit/DepositPage';

import Account from '@pages/User Dashboard/Account/Account';
import AccountSettings from '@pages/User Dashboard/Account/AccountSettings';
import Profile from '@pages/User Dashboard/Account/Profile';

import Notification from '@pages/User Dashboard/Notifications/Notification';

import AdminDashboard from '@pages/Admin Dashboard/Dashboard/Pages/AdminDashboard';
import AdminUsers from '@pages/Admin Dashboard/Users/AdminUsers';
import AdminTransactions from '@pages/Admin Dashboard/Transactions/AdminTransactions';
import AdminDeposits from '@pages/Admin Dashboard/Deposits/AdminDeposits';
import AdminWithdrawals from '@pages/Admin Dashboard/Withdrawals/AdminWithdrawals';
import AdminPages from '@pages/Admin Dashboard/CMS - pages/AdminPages';
import AdminNotifications from '@pages/Admin Dashboard/Notifications/AdminNotifications';
import AdminInvestments from '@pages/Admin Dashboard/Investments/AdminInvestments';


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
            <ProtectedRoute roles={'user'}>
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
          <Route
            path="investments/completed"
            element={<CompletedInvestments />}
          />
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
            <ProtectedRoute roles={'admin'}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/users" element={<AdminUsers />} />
          <Route path="admin/transactions" element={<AdminTransactions />} />
          <Route path="admin/deposits" element={<AdminDeposits />} />
          <Route path="admin/withdrawals" element={<AdminWithdrawals />} />
          <Route path="admin/pages" element={<AdminPages />} />
          <Route path="admin/notifications" element={<AdminNotifications/>} />
          <Route path="admin/investments" element={<AdminInvestments/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

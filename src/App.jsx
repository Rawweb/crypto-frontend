import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from '@components/utils/ScrollToTop';

import ProtectedRoute from '@routes/ProtectedRoutes';

import AdminLayout from '@layouts/AdminLayout';
import AuthLayout from '@layouts/AuthLayout';
import DashboardLayout from '@layouts/DashboardLayout';
import UserLayout from '@layouts/UserLayout';

import Login from '@pages/auth/Login';
import Register from '@pages/auth/Register';
import VerifyEmail from '@pages/auth/VerifyEmail';

import AboutPage from '@pages/Publics/About/AboutPage';
import BuySellPage from '@pages/Publics/Buy-sell/BuySellPage';
import ContactPage from '@pages/Publics/Contact/ContactPage';
import HomePage from '@pages/Publics/Home/HomePage';


import Dashboard from '@pages/UserDashboard/Dashboard/Dashboard';

import InvestmentOverview from '@pages/UserDashboard/Investments/InvestmentOverview';
import ActiveInvestments from '@pages/UserDashboard/Investments/ActiveInvestments';
import CompletedInvestments from '@pages/UserDashboard/Investments/CompletedInvestments';
import InvestmentPlans from '@pages/UserDashboard/Investments/InvestmentPlans';
import InvestmentDetails from '@pages/UserDashboard/Investments/InvestmentsDetails';
import ProfitHistory from '@pages/UserDashboard/Investments/ProfitHistory';

import Wallet from '@pages/UserDashboard/Wallets/Wallet';
import WithdrawPage from '@pages/UserDashboard/Withdrawal/WithdrawPage';
import DepositPage from '@pages/UserDashboard/Deposit/DepositPage';

import Account from '@pages/UserDashboard/Account/Account';
import AccountSettings from '@pages/UserDashboard/Account/AccountSettings';
import Profile from '@pages/UserDashboard/Account/Profile';

import Notification from '@pages/UserDashboard/Notifications/Notification';

import AdminDashboard from '@pages/AdminDashboard/Dashboard/Pages/AdminDashboard';
import AdminUsers from '@pages/AdminDashboard/Users/AdminUsers';
import AdminTransactions from '@pages/AdminDashboard/Transactions/AdminTransactions';
import AdminDeposits from '@pages/AdminDashboard/Deposits/AdminDeposits';
import AdminWithdrawals from '@pages/AdminDashboard/Withdrawals/AdminWithdrawals';
import AdminNotifications from '@pages/AdminDashboard/Notifications/AdminNotifications';
import AdminInvestments from '@pages/AdminDashboard/Investments/AdminInvestments';
import AdminInvestmentPlans from '@pages/AdminDashboard/Investments/AdminInvestmentPlans';
import PageRenderer from '@pages/Publics/Legal/PageRenderer';
import AdminFaqs from '@pages/AdminDashboard/CMS - pages/AdminFaqs';
import AdminPages from '@pages/AdminDashboard/CMS - pages/AdminPages';
import AdminPageEditor from '@pages/AdminDashboard/CMS - pages/AdminPageEditor';
import AdminPagesHome from '@pages/AdminDashboard/CMS - pages/AdminPagesHome';
import AdminFaqEditor from '@pages/AdminDashboard/CMS - pages/AdminFaqEditor';

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
          <Route path="pages/:slug" element={<PageRenderer />} />
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
          <Route path="admin/notifications" element={<AdminNotifications />} />
          <Route path="admin/investments" element={<AdminInvestments />} />
          <Route
            path="admin/investment-plans"
            element={<AdminInvestmentPlans />}
          />

          <Route path="admin/pages" element={<AdminPagesHome />} />

          <Route path="admin/cms/faqs" element={<AdminFaqs />} />
          <Route path="admin/cms/faqs/new" element={<AdminFaqEditor />} />
          <Route path="admin/cms/faqs/:id/edit" element={<AdminFaqEditor />} />

          <Route path="admin/cms/pages" element={<AdminPages />} />
          <Route path="admin/cms/pages/new" element={<AdminPageEditor />} />
          <Route
            path="admin/cms/pages/:id/edit"
            element={<AdminPageEditor />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

import SuspensionBanner from '@components/common/SuspensionBanner';
import React from 'react';
import StatsGrid from './components/StatsGrid';
import WalletOverview from './components/WalletOverview';
import InvestmentOverview from './components/InvestmentOverview';
import RecentActivity from './components/RecentActivity';

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* suspension banner */}
      <SuspensionBanner />
      {/* summary cards */}
      <StatsGrid />

      {/* middle section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WalletOverview />
        <InvestmentOverview />
      </div>

      {/* recent activity */}
      <RecentActivity />
    </div>
  );
};

export default Dashboard;

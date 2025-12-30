import React from 'react';
import StatsGrid from '@pages/dashboard/components/StatsGrid';
import WalletOverview from '@pages/dashboard/components/WalletOverview';
import InvestmentOverview from '@pages/dashboard/components/InvestmentOverview';
import RecentActivity from '@pages/dashboard/components/RecentActivity';
import SuspensionBanner from '@components/common/SuspensionBanner';

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

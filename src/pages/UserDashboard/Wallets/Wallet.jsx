import React from 'react';
import WalletHeroBalance from '@pages/UserDashboard/Wallets/WalletHeroBalance';
import WalletBreakdown from '@pages/UserDashboard/Wallets/WalletBreakdown';
import WalletActions from '@pages/UserDashboard/Wallets/WalletActions';
import SavedWallets from '@pages/UserDashboard/Wallets/SavedWallets';
import WalletRecentActivity from '@pages/UserDashboard/Wallets/WalletRecentActivity';


const Wallet = () => {
  return (
    <div className="space-y-10 w-full max-w-full">
      <WalletHeroBalance />
      <WalletBreakdown />
      <WalletActions />
      <SavedWallets/>
      <WalletRecentActivity />
    </div>
  );
};

export default Wallet;

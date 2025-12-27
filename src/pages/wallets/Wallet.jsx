import React from 'react';
import WalletHeroBalance from '@pages/wallets/WalletHeroBalance';
import WalletBreakdown from '@pages/wallets/WalletBreakdown';
import WalletActions from '@pages/wallets/WalletActions';
import WalletRecentActivity from './WalletRecentActivity';

const Wallet = () => {
  return (
    <div className="space-y-8">
      <WalletHeroBalance />
      <WalletBreakdown />
      <WalletActions />
      <WalletRecentActivity />
    </div>
  );
};

export default Wallet;

import React from 'react';
import WalletHeroBalance from '@pages/wallets/WalletHeroBalance';
import WalletBreakdown from '@pages/wallets/WalletBreakdown';
import WalletActions from '@pages/wallets/WalletActions';
import WalletRecentActivity from './WalletRecentActivity';
import SavedWallets from './SavedWallets';

const Wallet = () => {
  return (
    <div className="space-y-10 w-full max-w-full">
      <WalletHeroBalance />
      <WalletBreakdown />
      <WalletActions />
      <SavedWallets />
      <WalletRecentActivity />
    </div>
  );
};

export default Wallet;

import React from 'react';
import WalletHeroBalance from './WalletHeroBalance';
import WalletBreakdown from './WalletBreakdown';
import WalletActions from './WalletActions';
import SavedWallets from './SavedWallets';
import WalletRecentActivity from './WalletRecentActivity';


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

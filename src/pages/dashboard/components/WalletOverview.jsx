import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiDollarSign, FiLock } from 'react-icons/fi';
import api from '@api/axios';

const WalletOverview = () => {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await api.get('/wallet');
        const rawWallet = res.data;

        setWallet({
          availableBalance: rawWallet.balance,
          lockedBalance: rawWallet.lockedBalance,
        });
      } catch (error) {
        console.error('Failed to load wallet', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  if (loading || !wallet) {
    return <div className="h-48 bg-bg-elevated rounded-xl animate-pulse" />;
  }

  return (
    <div className="w-full max-w-full bg-bg-surface border border-bg-elevated rounded-xl p-6">

      {/* header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold uppercase">Wallet Overview</h2>
        <Link
          to="/wallet"
          className="text-sm text-brand-primary hover:border-b"
        >
          View wallet
        </Link>
      </div>

      <ul className="space-y-3">
        <li className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-elevated">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-bg-elevated text-text-muted">
              <FiDollarSign className="size-5" />
            </div>
            <span className="text-sm">Available Balance</span>
          </div>

          <span className="text-sm font-semibold">
            ${wallet.availableBalance.toFixed(2)}
          </span>
        </li>

        <li className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-elevated">
          <div className="flex items-center gap-4">
            <div className="p-2 rounded-full bg-bg-elevated text-text-muted">
              <FiLock className="size-5" />
            </div>
            <span className="text-sm">Locked / Pending</span>
          </div>

          <span className="text-sm font-semibold">
            ${wallet.lockedBalance.toFixed(2)}
          </span>
        </li>
      </ul>

      <div className="flex gap-3 mt-6">
        <Link
          to="/wallet"
          className="flex-1 min-w-0 bg-brand-primary text-black py-2 rounded-lg text-sm font-medium text-center hover:bg-brand-hover transition-colors"
        >
          Deposit
        </Link>
        <Link
          to="/wallet"
          className="flex-1 min-w-0 border border-bg-elevated py-2 rounded-lg text-sm text-center hover:bg-bg-elevated transition-colors"
        >
          Withdraw
        </Link>
      </div>
    </div>
  );
};

export default WalletOverview;

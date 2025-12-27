import { FiDollarSign, FiLock, FiTrendingUp, FiClock } from 'react-icons/fi';
import api from '@api/axios';
import { useEffect, useState } from 'react';

const StatsGrid = () => {
  const [wallet, setWallet] = useState(null);
  const [invested, setInvested] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [walletRes, investmentRes] = await Promise.all([
          api.get('/wallet'),
          api.get('/investments/my-investments'),
        ]);

        const rawWallet = walletRes.data;

        setWallet({
          totalBalance:
            rawWallet.balance +
            rawWallet.profitBalance +
            rawWallet.referralBalance,

          availableBalance: rawWallet.balance,
          lockedBalance: rawWallet.lockedBalance,
        });

        const totalInvested = Array.isArray(investmentRes.data)
          ? investmentRes.data.reduce((sum, inv) => sum + (inv.amount || 0), 0)
          : 0;

        setInvested(totalInvested);
      } catch (error) {
        console.error('Failed to load stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading || !wallet) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-bg-elevated rounded-xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Balance',
      value: `$${wallet.totalBalance.toFixed(2)}`,
      icon: FiDollarSign,
    },
    {
      label: 'Available Balance',
      value: `$${wallet.availableBalance.toFixed(2)}`,
      icon: FiLock,
    },
    {
      label: 'Invested / Locked',
      value: `$${wallet.lockedBalance.toFixed(2)}`,
      icon: FiTrendingUp,
    },
    {
      label: 'Total Invested',
      value: `$${invested.toFixed(2)}`,
      icon: FiClock,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ label, value, icon: Icon }) => (
        <div
          key={label}
          className="bg-bg-surface border border-bg-elevated rounded-xl p-5 flex items-center gap-4"
        >
          <div className="p-3 rounded-full bg-bg-elevated text-brand-primary">
            <Icon className="size-5" />
          </div>

          <div>
            <p className="text-sm text-text-muted">{label}</p>
            <p className="text-lg font-semibold">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsGrid;

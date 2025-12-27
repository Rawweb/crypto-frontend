import { useEffect, useState } from 'react';
import api from '@api/axios';

const WalletHeroBalance = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await api.get('/wallet');
        const w = res.data;

        const totalBalance =
          w.balance + w.profitBalance + w.referralBalance;

        setTotal(totalBalance);
      } catch (error) {
        console.error('Failed to load wallet', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWallet();
  }, []);

  return (
    <div className="bg-bg-surface border border-bg-elevated rounded-xl p-8">
      <p className="text-sm text-text-muted mb-2">Total Balance</p>

      {loading ? (
        <div className="h-10 w-40 bg-bg-elevated rounded" />
      ) : (
        <h1 className="text-3xl font-bold">
          ${total.toFixed(2)}
        </h1>
      )}
    </div>
  );
};

export default WalletHeroBalance;

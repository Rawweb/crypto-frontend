import { useEffect, useState } from 'react';
import {
  FiDollarSign,
  FiLock,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';
import api from '@api/axios';

const rows = [
  { key: 'balance', label: 'Available Balance', icon: FiDollarSign },
  { key: 'lockedBalance', label: 'Locked / Pending', icon: FiLock },
  { key: 'profitBalance', label: 'Profit Balance', icon: FiTrendingUp },
  { key: 'referralBalance', label: 'Referral Balance', icon: FiUsers },
];

const WalletBreakdown = () => {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const fetchWallet = async () => {
      const res = await api.get('/wallet');
      setWallet(res.data);
    };

    fetchWallet();
  }, []);

  if (!wallet) {
    return (
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-3">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-bg-elevated rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
      <ul className="space-y-3">
        {rows.map(({ key, label, icon: Icon }) => (
          <li
            key={key}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-elevated"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-bg-elevated text-text-muted">
                <Icon className="size-5" />
              </div>
              <span className="text-sm">{label}</span>
            </div>

            <span className="text-sm font-semibold">
              ${wallet[key].toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WalletBreakdown;

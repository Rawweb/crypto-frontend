import { useEffect, useState } from 'react';
import api from '@api/axios';
import {
  FiCreditCard,
  FiCopy,
  FiStar,
  FiCheck,
  FiTrash2,
} from 'react-icons/fi';

const shorten = addr => `${addr.slice(0, 6)}…${addr.slice(-4)}`;

const SavedWallets = () => {
  const [wallets, setWallets] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWallets = async () => {
    const res = await api.get('/wallet/saved-wallets');
    setWallets(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const copy = (id, address) => {
    navigator.clipboard.writeText(address);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1200);
  };

  const setDefault = async id => {
    await api.put('/wallet/default-wallet', { id });
    fetchWallets();
  };

  const deleteWallet = async id => {
    if (!window.confirm('Delete this wallet address?')) return;
    await api.delete(`/wallet/saved-wallets/${id}`);
    fetchWallets();
  };

  if (loading) {
    return <p className="text-sm text-text-muted">Loading wallets…</p>;
  }

  if (!wallets.length) {
    return (
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6 text-sm text-text-muted">
        Your saved withdrawal wallets will appear here after your first
        withdrawal.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Saved wallets</h3>

      <div className="grid gap-3">
        {wallets.map(w => (
          <div
            key={w._id}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-bg-surface border border-bg-elevated min-w-0 overflow-hidden"
          >
            <div className="bg-brand-primary/15 text-brand-primary rounded-lg p-2">
              <FiCreditCard />
            </div>

            <div className="flex-1">
              <p className="ext-sm font-medium break-all">{shorten(w.address)}</p>
              <p className="text-xs text-text-muted">
                {w.network.replace('_', ' ')}
              </p>
              {w.isDefault && (
                <span className="text-xs text-brand-primary">Default</span>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => copy(w._id, w.address)}
                className="icon-btn"
                title="Copy"
              >
                {copiedId === w._id ? <FiCheck /> : <FiCopy />}
              </button>

              {!w.isDefault && (
                <button
                  onClick={() => setDefault(w._id)}
                  className="icon-btn"
                  title="Set default"
                >
                  <FiStar />
                </button>
              )}

              {!w.isDefault && (
                <button
                  onClick={() => deleteWallet(w._id)}
                  className="icon-btn text-red-500"
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedWallets;

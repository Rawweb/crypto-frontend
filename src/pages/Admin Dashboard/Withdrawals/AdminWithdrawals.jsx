import { useEffect, useState } from 'react';
import api from '@api/axios';
import AdminSkeleton from '../Dashboard/Components/AdminSkeleton';
import StatusBadge from '../Dashboard/Components/StatusBadge';
import ActionButtons from '../Dashboard/Components/ActionButtons';
import AdminTable from '../Dashboard/Components/AdminTable';
import ConfirmModal from '@components/ui/ConfirmModal';
import NetworkBadge from '../Dashboard/Components/NetworkBadge';
import { normalizeNetworkName } from '@components/utils/normalizeNetworkName';

const trimWallet = (address, start = 6, end = 4) => {
  if (!address) return '—';
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};

const copyToClipboard = async text => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    alert('Failed to copy');
  }
};

const AdminWithdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [actionType, setActionType] = useState(null);

  const [search, setSearch] = useState('');
  const [networkFilter, setNetworkFilter] = useState('all');

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await api.get('/admin/wallet/withdrawals/pending');
        if (!mounted) return;
        setWithdrawals(res.data);
      } catch {
        setError('Failed to load pending withdrawals');
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => (mounted = false);
  }, []);

  const handleAction = async () => {
    if (!selected) return;
    setActionLoading(true);

    try {
      await api.post(
        actionType === 'approve'
          ? '/admin/wallet/withdrawal/approve'
          : '/admin/wallet/withdrawal/reject',
        { withdrawalId: selected._id }
      );

      setWithdrawals(prev => prev.filter(w => w._id !== selected._id));
    } catch {
      alert('Action failed');
    } finally {
      setActionLoading(false);
      setSelected(null);
      setActionType(null);
    }
  };

  if (loading) return <AdminSkeleton showTable />;

  if (error) {
    return (
      <div className="bg-status-danger/10 border border-status-danger/20 rounded-xl p-4 text-status-danger">
        {error}
      </div>
    );
  }

  const filteredWithdrawals = withdrawals.filter(w => {
    const matchesSearch = w.userId?.email
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesNetwork =
      networkFilter === 'all' ||
      normalizeNetworkName(w.network) === networkFilter;

    return matchesSearch && matchesNetwork;
  });

  const columns = [
    {
      key: 'user',
      label: 'User',
      render: r => r.userId?.email || '—',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: r => `$${r.amount}`,
    },
    {
      key: 'wallet',
      label: 'Wallet',
      render: r => (
        <button
          onClick={() => copyToClipboard(r.walletAddress)}
          className="text-left hover:underline font-mono text-sm"
          title="Click to copy wallet address"
        >
          {trimWallet(r.walletAddress)}
        </button>
      ),
    },

    {
      key: 'network',
      label: 'Network',
      render: r => <NetworkBadge network={normalizeNetworkName(r.network)} />,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: row => (
        <ActionButtons
          loading={actionLoading}
          onApprove={() => {
            setSelected(row);
            setActionType('approve');
          }}
          onReject={() => {
            setSelected(row);
            setActionType('reject');
          }}
        />
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Pending Withdrawals</h1>

      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by user email"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="bg-bg-main border border-bg-elevated rounded-lg px-3 py-2 text-sm w-full md:w-64"
        />

        <select
          value={networkFilter}
          onChange={e => setNetworkFilter(e.target.value)}
          className="bg-bg-main border border-bg-elevated rounded-lg px-3 py-2 text-sm w-full md:w-40"
        >
          <option value="all">All Networks</option>
          <option value="BTC">BTC</option>
          <option value="ETH">ETH</option>
          <option value="USDT">USDT</option>
        </select>
      </div>

      <AdminTable columns={columns} data={filteredWithdrawals} />

      <ConfirmModal
        open={!!selected}
        title={`${actionType === 'approve' ? 'Approve' : 'Reject'} Withdrawal`}
        description="Are you sure you want to continue?"
        confirmText="Confirm"
        danger={actionType === 'reject'}
        loading={actionLoading}
        onCancel={() => setSelected(null)}
        onConfirm={handleAction}
      />
    </div>
  );
};

export default AdminWithdrawals;

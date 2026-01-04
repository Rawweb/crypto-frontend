import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@api/axios';
import StatCard from '../components/StatCard';
import AdminTable from '../components/AdminTable';
import StatusBadge from '../components/StatusBadge';
import AdminSkeleton from '../components/AdminSkeleton';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const [statsRes, txRes] = await Promise.all([
          api.get('/admin/stats/balances'),
          api.get('/admin/transactions?limit=10'),
        ]);

        if (!mounted) return;

        setStats(statsRes.data);
        setTransactions(txRes.data.transactions);
      } catch (err) {
        setError('Failed to load admin dashboard');
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => (mounted = false);
  }, []);

  if (loading) return <AdminSkeleton />;

  if (error) {
    return (
      <div className="bg-status-danger/10 border border-status-danger/20 rounded-xl p-4 text-status-danger">
        {error}
      </div>
    );
  }

  if (!stats) {
    return <AdminSkeleton />;
  }

  const columns = [
    {
      key: 'user',
      label: 'User',
      render: row => row.userId?.email || '—',
    },
    {
      key: 'type',
      label: 'Type',
      render: row => <StatusBadge type={row.type} />,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: row => `$${row.amount}`,
    },
    {
      key: 'date',
      label: 'Date',
      render: row => new Date(row.createdAt).toLocaleString(),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats?.users?.totalUsers ?? 0} />
        <StatCard label="Active Users" value={stats?.users?.activeUsers ?? 0} />
        <StatCard
          label="Total Deposits"
          value={`$${stats?.totals?.totalDeposits ?? 0}`}
        />
        <StatCard
          label="Total Withdrawals"
          value={`$${stats?.totals?.totalWithdrawals ?? 0}`}
        />
      </div>

      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-medium">Recent Transactions</h2>
          <Link
            to="/admin/transactions"
            className="text-xs text-brand-primary hover:underline"
          >
            View all
          </Link>
        </div>

        <AdminTable columns={columns} data={transactions} />
      </div>
    </div>
  );
};

export default AdminDashboard;

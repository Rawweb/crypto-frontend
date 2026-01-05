import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@api/axios';

import AdminTable from '@pages/AdminDashboard/Dashboard/components/AdminTable';
import AdminSkeleton from '@pages/AdminDashboard/Dashboard/components/AdminSkeleton';
import StatusBadge from '@pages/AdminDashboard/Dashboard/components/StatusBadge';
import Pagination from '@pages/AdminDashboard/Dashboard/components/Pagination';

/* ---------------- component ---------------- */

const AdminTransactions = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const highlightId = params.get('highlight');

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /* pagination */
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  /* filters */
  const [type, setType] = useState('all');

  /* fetch data */
  useEffect(() => {
    let mounted = true;

    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get('/admin/transactions', {
          params: {
            page,
            limit: 20,
            type: type === 'all' ? undefined : type,
          },
        });

        if (!mounted) return;

        setTransactions(res.data.transactions);
        setTotalPages(res.data.totalPages);
      } catch {
        setError('Failed to load transactions');
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, [page, type]);

  /* ---------------- states ---------------- */

  if (loading) return <AdminSkeleton showTable />;

  if (error) {
    return (
      <div className="bg-status-danger/10 border border-status-danger/20 rounded-xl p-4 text-status-danger">
        {error}
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold">Transactions</h1>

        <div className="rounded-xl border border-status-info/20 bg-status-info/10 p-6 text-center">
          <p className="font-medium text-status-info">No transactions found</p>
          <p className="text-xs text-text-muted mt-1">
            Try adjusting the filter or check back later.
          </p>
        </div>
      </div>
    );
  }

  /* ---------------- table columns ---------------- */

  const columns = [
    {
      key: 'user',
      label: 'User',
      render: r => (
        <button
          onClick={() => navigate(`/admin/users?open=${r.userId?._id}`)}
          className="text-brand-primary hover:underline"
        >
          {r.userId?.email || '—'}
        </button>
      ),
    },

    {
      key: 'type',
      label: 'Type',
      render: r => <StatusBadge type={r.type} />,
    },
    {
      key: 'amount',
      label: 'Amount',
      render: r => `$${r.amount}`,
    },
    {
      key: 'description',
      label: 'Description',
      render: r => r.description || '—',
    },
    {
      key: 'date',
      label: 'Date',
      render: r => new Date(r.createdAt).toLocaleString(),
    },
  ];

  /* ---------------- render ---------------- */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Transactions</h1>

        {/* Filter */}
        <select
          value={type}
          onChange={e => {
            setPage(1);
            setType(e.target.value);
          }}
          className="bg-bg-surface border border-bg-elevated rounded-lg px-3 py-2 text-sm"
        >
          <option value="all">All types</option>
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="profit">Profit</option>
          <option value="adjustment">Adjustment</option>
        </select>
      </div>

      {/* Table */}
      <AdminTable
        columns={columns}
        data={transactions}
        highlightId={highlightId}
      />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
};

export default AdminTransactions;

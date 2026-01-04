import { useEffect, useState } from 'react';
import api from '@api/axios';

import AdminTable from '@pages/AdminDashboard/Dashboard/Components/AdminTable';
import AdminSkeleton from '@pages/AdminDashboard/Dashboard/Components/AdminSkeleton';
import Pagination from '@pages/AdminDashboard/Dashboard/Components/Pagination';
import ConfirmModal from '@components/ui/ConfirmModal';

const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-green-500/10 text-green-500',
    completed: 'bg-yellow-500/10 text-yellow-500',
  };

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        styles[status] || 'bg-bg-elevated text-text-muted'
      }`}
    >
      {status}
    </span>
  );
};

const InvestmentDrawer = ({ investment, onClose, onCancel }) => {
  if (!investment) return null;

  const remainingAllowed = investment.planId?.maxMultiplier
    ? investment.amount * investment.planId.maxMultiplier -
      investment.profitEarned
    : null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />

      <aside className="w-full sm:w-105 bg-bg-surface border-l border-bg-elevated p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Investment Details</h2>

        <div className="space-y-3 text-sm">
          <div>
            <p className="text-text-muted">User</p>
            <p>{investment.userId?.email}</p>
          </div>

          <div>
            <p className="text-text-muted">Plan</p>
            <p>{investment.planId?.name}</p>
          </div>

          <div>
            <p className="text-text-muted">Amount</p>
            <p>${investment.amount}</p>
          </div>

          <div>
            <p className="text-text-muted">ROI</p>
            <p>
              {investment.planId?.roi}% ({investment.planId?.roiType})
            </p>
          </div>

          <div>
            <p className="text-text-muted">Profit Earned</p>
            <p>${investment.profitEarned}</p>
          </div>

          {remainingAllowed !== null && (
            <div>
              <p className="text-text-muted">Remaining Profit Cap</p>
              <p>${remainingAllowed.toFixed(2)}</p>
            </div>
          )}

          <div>
            <p className="text-text-muted">Status</p>
            <p>{investment.status}</p>
          </div>

          <div>
            <p className="text-text-muted">Started</p>
            <p>{new Date(investment.createdAt).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-text-muted">Ends</p>
            <p>{new Date(investment.endDate).toLocaleString()}</p>
          </div>

          <div>
            <p className="text-text-muted">Next Profit Time</p>
            <p>{new Date(investment.nextProfitTime).toLocaleString()}</p>
          </div>
        </div>

        {investment.status === 'active' && (
          <button
            onClick={onCancel}
            className="mt-6 w-full px-4 py-2 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20"
          >
            Cancel Investment
          </button>
        )}

        <button
          onClick={onClose}
          className="mt-4 text-sm text-text-muted hover:underline"
        >
          Close
        </button>
      </aside>
    </div>
  );
};

/* ==============================
   Admin Investments Page
============================== */

const AdminInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [statusFilter, setStatusFilter] = useState('all');

  // debounced search
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [confirmCancel, setConfirmCancel] = useState(false);

  /* ---------------- debounce search ---------------- */

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      setSearchQuery(searchInput);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  /* ---------------- fetch investments ---------------- */

  const loadInvestments = async () => {
    try {
      setLoading(true);

      const res = await api.get('/admin/investments', {
        params: {
          page,
          search: searchQuery || undefined,
          status: statusFilter !== 'all' ? statusFilter : undefined,
        },
      });

      setInvestments(res.data.investments || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      setError('Failed to load investments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInvestments();
  }, [page, searchQuery, statusFilter]);

  /* ---------------- cancel investment ---------------- */

  const cancelInvestment = async () => {
    if (!selectedInvestment) return;

    try {
      await api.put(`/admin/investments/${selectedInvestment._id}/cancel`);

      setInvestments(prev =>
        prev.map(inv =>
          inv._id === selectedInvestment._id
            ? { ...inv, status: 'cancelled' }
            : inv
        )
      );
    } catch {
      alert('Failed to cancel investment');
    } finally {
      setConfirmCancel(false);
      setSelectedInvestment(null);
    }
  };

  /* ---------------- states ---------------- */

  if (loading) return <AdminSkeleton showTable />;

  if (error) {
    return (
      <div className="bg-status-danger/10 border border-status-danger/20 rounded-xl p-4 text-status-danger">
        {error}
      </div>
    );
  }

  if (!investments.length) {
  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Investments</h1>

      <div className="rounded-xl border border-status-info/20 bg-status-info/10 p-6 text-center">
        <p className="text-sm font-medium text-status-info">
          No investments
        </p>
        <p className="text-xs text-text-muted mt-1">
          New investments will appear here when users invest in a plan.
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
      render: r => r.userId?.email || '—',
    },
    {
      key: 'plan',
      label: 'Plan',
      render: r => r.planId?.name || '—',
    },
    {
      key: 'amount',
      label: 'Amount',
      render: r => `$${r.amount}`,
    },
    {
      key: 'profit',
      label: 'Profit',
      render: r => `$${r.profitEarned || 0}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: r => <StatusBadge status={r.status} />,
    },
    {
      key: 'actions',
      label: 'Details',
      render: r => (
        <button
          onClick={() => setSelectedInvestment(r)}
          className="text-sm hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  /* ---------------- render ---------------- */

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Investments</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search by user email"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          className="bg-bg-main border border-bg-elevated rounded-lg px-3 py-2 text-sm w-full md:w-64"
        />

        <select
          value={statusFilter}
          onChange={e => {
            setPage(1);
            setStatusFilter(e.target.value);
          }}
          className="bg-bg-main border border-bg-elevated rounded-lg px-3 py-2 text-sm w-full md:w-40"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <AdminTable columns={columns} data={investments} />

      {/* Pagination */}
      <Pagination page={page} totalPages={totalPages} onChange={setPage} />

      {/* Drawer */}
      <InvestmentDrawer
        investment={selectedInvestment}
        onClose={() => setSelectedInvestment(null)}
        onCancel={() => setConfirmCancel(true)}
      />

      {/* Confirm cancel */}
      <ConfirmModal
        open={confirmCancel}
        title="Cancel Investment"
        description="This will stop ROI generation permanently. Are you sure?"
        confirmText="Yes, cancel"
        danger
        onCancel={() => setConfirmCancel(false)}
        onConfirm={cancelInvestment}
      />
    </div>
  );
};

export default AdminInvestments;

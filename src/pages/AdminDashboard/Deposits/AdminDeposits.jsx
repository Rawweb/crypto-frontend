import { useEffect, useState } from 'react';
import api from '@api/axios';

import AdminTable from '../Dashboard/Components/AdminTable';
import AdminSkeleton from '../Dashboard/Components/AdminSkeleton';
import StatusBadge from '../Dashboard/Components/StatusBadge';
import ActionButtons from '../Dashboard/Components/ActionButtons';
import ConfirmModal from '@components/ui/ConfirmModal';
import { useLocation } from 'react-router-dom';
import { useAdminNotifications } from '@context/AdminNotificationContext';

const AdminDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [actionType, setActionType] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const highlightId = params.get('highlight');

  const { refreshUnread } = useAdminNotifications();

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const res = await api.get('/admin/wallet/deposits/pending');
        if (!mounted) return;
        setDeposits(res.data);
      } catch {
        setError('Failed to load pending deposits');
      } finally {
        setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAction = async () => {
    if (!selected) return;

    setActionLoading(true);

    try {
      await api.post(
        actionType === 'approve'
          ? '/admin/wallet/deposits/approve'
          : '/admin/wallet/deposits/reject',
        { depositId: selected._id }
      );

      setDeposits(prev => prev.filter(d => d._id !== selected._id));
      refreshUnread();
    } catch {
      alert('Action failed');
    } finally {
      setActionLoading(false);
      setSelected(null);
      setActionType(null);
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

  if (!deposits.length) {
    return (
      <div className="space-y-6">
        <h1 className="text-lg font-semibold">Pending Deposits</h1>

        <div className="rounded-xl border border-status-info/20 bg-status-info/10 p-6 text-center">
          <p className="text-sm font-medium text-status-info">
            No pending deposits
          </p>
          <p className="text-xs text-text-muted mt-1">
            New deposit requests will appear here when users submit them.
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
      key: 'amount',
      label: 'Amount',
      render: r => `$${r.amount}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: () => <StatusBadge type="deposit" />,
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

  /* ---------------- render ---------------- */

  return (
    <div className="space-y-6">
      <h1 className="text-lg font-semibold">Pending Deposits</h1>

      <AdminTable columns={columns} data={deposits} highlightId={highlightId} />

      <ConfirmModal
        open={!!selected}
        title={`${actionType === 'approve' ? 'Approve' : 'Reject'} Deposit`}
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

export default AdminDeposits;

import { useEffect, useState } from 'react';
import api from '@api/axios';

const AdminDeposits = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fetchDeposits = async () => {
    try {
      const res = await api.get('/admin/wallet/deposits/pending');
      setDeposits(res.data);
    } catch (err) {
      console.error('Failed to fetch deposits', err);
    } finally {
      setLoading(false);
    }
  };

  const approveDeposit = async depositId => {
    setActionLoading(depositId);
    try {
      await api.post('/admin/wallet/deposit/approve', { depositId });
      fetchDeposits();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to approve deposit');
    } finally {
      setActionLoading(null);
    }
  };

  const rejectDeposit = async depositId => {
    setActionLoading(depositId);
    try {
      await api.post('/admin/wallet/deposit/reject', { depositId });
      fetchDeposits();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reject deposit');
    } finally {
      setActionLoading(null);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  if (loading) {
    return <p className="text-text-muted">Loading pending deposits…</p>;
  }

  if (!deposits.length) {
    return (
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6 text-center text-text-muted">
        No pending deposits 🎉
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Pending Deposits</h2>

        {deposits.map(dep => (
          <div
            key={dep._id}
            className="bg-bg-surface border border-bg-elevated rounded-xl p-5 flex gap-6"
          >
            {/* Proof image */}
            <img
              src={dep.proofImage}
              alt="Deposit proof"
              onClick={() => setPreviewImage(dep.proofImage)}
              className="w-40 h-40 object-cover rounded-lg border cursor-pointer hover:opacity-90"
            />

            {/* Info */}
            <div className="flex-1 space-y-2">
              <p>
                <span className="text-text-muted">User:</span>{' '}
                <strong>{dep.userId.username}</strong>
              </p>

              <p>
                <span className="text-text-muted">Email:</span>{' '}
                {dep.userId.email}
              </p>

              <p>
                <span className="text-text-muted">Amount:</span>{' '}
                <strong>${dep.amount}</strong>
              </p>

              <p className="text-xs text-text-muted">
                Submitted: {new Date(dep.createdAt).toLocaleString()}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => approveDeposit(dep._id)}
                  disabled={actionLoading === dep._id}
                  className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-4 py-2 rounded-lg text-white text-sm"
                >
                  {actionLoading === dep._id ? 'Processing…' : 'Approve'}
                </button>

                <button
                  onClick={() => rejectDeposit(dep._id)}
                  disabled={actionLoading === dep._id}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-50 px-4 py-2 rounded-lg text-white text-sm"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Image preview modal */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
        >
          <img
            src={previewImage}
            alt="Proof preview"
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
          />
        </div>
      )}
    </>
  );
};

export default AdminDeposits;

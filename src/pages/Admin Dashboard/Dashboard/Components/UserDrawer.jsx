import { useEffect, useState } from 'react';
import api from '@api/axios';

const UserDrawer = ({ user, onClose, onUpdated, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [showAdjust, setShowAdjust] = useState(false);
  const [confirmAdjust, setConfirmAdjust] = useState(false);

  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustReason, setAdjustReason] = useState('');

  const [wallet, setWallet] = useState(null);

  const [form, setForm] = useState({
    username: '',
    email: '',
    role: 'user',
  });

  /* ---------------- load wallet ---------------- */

  const loadWallet = async () => {
    try {
      const res = await api.get(`/admin/wallet/${user._id}`);
      setWallet(res.data);
    } catch {
      // wallet is optional UI info, don't hard fail
    }
  };

  /* ---------------- sync when user changes ---------------- */

  useEffect(() => {
    if (!user) return;

    setForm({
      username: user.username || '',
      email: user.email || '',
      role: user.role || 'user',
    });

    setEditing(false);
    setShowAdjust(false);
    setConfirmAdjust(false);
    setAdjustAmount('');
    setAdjustReason('');
    setError('');
    setSuccess('');

    loadWallet();
  }, [user]);

  /* ---------------- update user ---------------- */

  const handleUpdate = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const res = await api.put(`/admin/users/${user._id}/update`, form);
      onUpdated?.(res.data.user);

      setEditing(false);
      setSuccess('User updated successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- apply balance adjustment ---------------- */

  const applyAdjustment = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      await api.post('/admin/transactions/adjust-balance', {
        userId: user._id,
        amount: Number(adjustAmount),
        description: adjustReason,
      });

      // optimistic UI update
      setWallet(prev =>
        prev ? { ...prev, balance: prev.balance + Number(adjustAmount) } : prev
      );

      setSuccess('Balance adjusted successfully');
      setAdjustAmount('');
      setAdjustReason('');
      setShowAdjust(false);
      setConfirmAdjust(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to adjust balance');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* overlay */}
      <div className="flex-1 bg-black/40" onClick={onClose} />

      {/* drawer */}
      <aside className="w-full sm:w-105 bg-bg-surface border-l border-bg-elevated p-6 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">User Details</h2>

        {/* feedback */}
        {error && (
          <div className="mb-4 rounded-lg bg-status-danger/10 border border-status-danger/20 px-3 py-2 text-sm text-status-danger">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-lg bg-status-success/10 border border-status-success/20 px-3 py-2 text-sm text-status-success">
            {success}
          </div>
        )}

        {/* user info */}
        <div className="space-y-4 text-sm">
          {/* Email */}
          <div>
            <p className="text-text-muted">Email</p>
            {editing ? (
              <input
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2"
              />
            ) : (
              <p className="border px-3 py-2 rounded-md bg-bg-main border-bg-elevated">
                {user.email}
              </p>
            )}
          </div>

          {/* Username */}
          <div>
            <p className="text-text-muted">Username</p>
            {editing ? (
              <input
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2"
              />
            ) : (
              <p className="border px-3 py-2 rounded-md bg-bg-main border-bg-elevated">
                @{user.username}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <p className="text-text-muted">Role</p>
            {editing ? (
              <select
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            ) : (
              <p className="border px-3 py-2 rounded-md bg-bg-main border-bg-elevated">
                {user.role}
              </p>
            )}
          </div>
        </div>

        {/* toggle */}
        <button
          onClick={() => setShowAdjust(v => !v)}
          className="mt-6 px-4 py-2 text-sm rounded border border-bg-elevated hover:bg-bg-elevated transition"
        >
          {showAdjust ? 'Cancel Balance Adjustment' : 'Adjust Balance'}
        </button>

        {/* adjust balance */}
        {showAdjust && (
          <div className="mt-4 border-t border-bg-elevated pt-4 space-y-3">
            {/* Balance */}
            {wallet && (
              <div>
                <p className="text-text-muted">Current Balance</p>
                <p className="border px-3 py-2 rounded-md bg-bg-main border-bg-elevated font-medium">
                  ${wallet.balance.toLocaleString()}
                </p>
              </div>
            )}

            <input
              type="number"
              placeholder="Amount (e.g. 50 or -20)"
              value={adjustAmount}
              onChange={e => setAdjustAmount(e.target.value)}
              className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2 text-sm"
            />

            <input
              type="text"
              placeholder="Reason (optional)"
              value={adjustReason}
              onChange={e => setAdjustReason(e.target.value)}
              className="w-full bg-bg-main border border-bg-elevated rounded px-3 py-2 text-sm"
            />

            <button
              disabled={!adjustAmount}
              onClick={() => setConfirmAdjust(true)}
              className="w-full bg-brand-primary text-white py-2 rounded text-sm"
            >
              Review Adjustment
            </button>
          </div>
        )}

        {/* confirm modal */}
        {confirmAdjust && (
          <div className="mt-4 rounded-lg border border-bg-elevated bg-bg-main p-4">
            <p className="text-sm font-medium mb-2">
              Confirm Balance Adjustment
            </p>
            <p className="text-xs text-text-muted mb-4">
              This will change the user balance by{' '}
              <strong>{adjustAmount}</strong>.
            </p>

            <div className="flex gap-2">
              <button
                onClick={applyAdjustment}
                disabled={loading}
                className="flex-1 bg-status-success text-white py-2 rounded text-sm"
              >
                Confirm
              </button>

              <button
                onClick={() => setConfirmAdjust(false)}
                className="flex-1 border border-bg-elevated py-2 rounded text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* bottom actions */}
        <div className="mt-8 flex justify-between items-center">
          {editing ? (
            <div className="flex gap-2">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-4 py-2 text-sm rounded bg-brand-primary text-white"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 text-sm rounded border border-bg-elevated"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 text-sm rounded border border-bg-elevated"
            >
              Edit
            </button>
          )}

          <button
            onClick={() => onDelete?.(user)}
            className="px-4 py-2 text-sm rounded border border-bg-elevated text-status-danger"
          >
            Delete User
          </button>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full px-4 py-2 text-sm rounded border border-bg-elevated text-text-muted"
        >
          Close
        </button>
      </aside>
    </div>
  );
};

export default UserDrawer;

import { useState } from 'react';
import api from '@api/axios';
import { useNavigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';

const AccountSettings = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isDisabled =
    loading ||
    !currentPassword ||
    !newPassword ||
    !confirmPassword;

  const changePassword = async () => {
    if (loading) return;

    setError('');
    setSuccess('');

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await api.put('/password/change', {
        currentPassword,
        newPassword,
      });

      setSuccess('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl">
      <form
        onSubmit={e => {
          e.preventDefault();
          changePassword();
        }}
        className="bg-bg-surface border border-bg-elevated rounded-2xl p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="bg-brand-primary/15 rounded-lg p-2">
            <FiLock className="text-brand-primary size-5" />
          </div>
          <h2 className="text-xl font-semibold">Change Password</h2>
        </div>

        <p className="text-sm text-text-muted">
          Password must be at least 8 characters and different from your current
          password.
        </p>

        {/* Current */}
        <div className="space-y-2">
          <label className="text-sm text-text-muted">
            Current password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-bg-main border border-bg-elevated focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        {/* New */}
        <div className="space-y-2">
          <label className="text-sm text-text-muted">New password</label>
          <input
            type="password"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-bg-main border border-bg-elevated focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        {/* Confirm */}
        <div className="space-y-2">
          <label className="text-sm text-text-muted">
            Confirm new password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className="w-full h-12 px-4 rounded-xl bg-bg-main border border-bg-elevated focus:ring-1 focus:ring-brand-primary"
          />
        </div>

        {error && <p className="text-sm text-status-danger">{error}</p>}
        {success && <p className="text-sm text-status-success">{success}</p>}

        <button
          type="submit"
          disabled={isDisabled}
          className="w-full h-12 rounded-xl bg-brand-primary text-black text-sm font-medium disabled:opacity-50"
        >
          {loading ? 'Updating password…' : 'Update Password'}
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full h-12 rounded-xl border border-bg-elevated text-sm text-text-muted hover:bg-bg-elevated transition"
        >
          ← Back to Account
        </button>
      </form>
    </div>
  );
};

export default AccountSettings;

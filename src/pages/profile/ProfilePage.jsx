import { useEffect, useState } from 'react';
import api from '@api/axios';
import {
  FiUser,
  FiMail,
  FiShield,
  FiCopy,
  FiCheck,
  FiLogOut,
} from 'react-icons/fi';

const ProfilePage = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  const [wallet, setWallet] = useState(null);
  const [address, setAddress] = useState('');
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loadingWallet, setLoadingWallet] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // 🚫 Guard
  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  // Fetch wallet
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await api.get('/wallet');
        setWallet(res.data);
        setAddress(res.data.usdtAddress || '');
      } catch {
        setError('Failed to load wallet details');
      } finally {
        setLoadingWallet(false);
      }
    };

    fetchWallet();
  }, []);

  const referralLink = user
    ? `${window.location.origin}/register?ref=${user.referralCode}`
    : '';

  const copyReferral = text => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const saveAddress = async () => {
    setError('');
    setSuccess('');

    // Basic USDT address validation (frontend only)
    if (!address || address.length < 20) {
      setError('Please enter a valid USDT wallet address');
      return;
    }

    try {
      setSaving(true);
      await api.put('/wallet/update-address', {
        usdtAddress: address,
      });
      setSuccess('Wallet address saved successfully');
    } catch {
      setError('Failed to save wallet address');
    } finally {
      setSaving(false);
    }
  };

  const logout = () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    localStorage.clear();
    window.location.href = '/login';
  };

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-text-muted mt-1">
          Manage your account and security settings
        </p>
      </div>

      {/* Account Details */}
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-4">
        <h2 className="font-medium flex items-center gap-2">
          <FiUser /> Account Details
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-text-muted">Username</p>
            <p className="font-medium">{user.username}</p>
          </div>

          <div>
            <p className="text-text-muted">Email</p>
            <p className="font-medium flex items-center gap-2">
              <FiMail />
              {user.email}
            </p>
          </div>

          <div>
            <p className="text-text-muted">Status</p>
            <p
              className={`font-medium ${
                user.isVerified ? 'text-green-500' : 'text-yellow-500'
              }`}
            >
              {user.isVerified ? 'Verified' : 'Unverified'}
            </p>
          </div>

          <div>
            <p className="text-text-muted">Member since</p>
            <p className="font-medium">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Referral */}
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-4">
        <h2 className="font-medium flex items-center gap-2">
          <FiShield /> Referral
        </h2>

        <div className="flex items-center gap-3">
          <code className="px-3 py-2 bg-bg-elevated rounded-lg text-sm truncate">
            {referralLink}
          </code>

          <button
            type="button"
            onClick={() => copyReferral(referralLink)}
            aria-label="Copy referral link"
            className="p-2 rounded-lg border border-bg-elevated hover:bg-bg-elevated"
          >
            {copied ? <FiCheck /> : <FiCopy />}
          </button>
        </div>

        <p className="text-sm text-text-muted">
          Total referral earnings:{' '}
          <span className="font-medium">
            ${wallet?.referralBalance?.toFixed(2) || '0.00'}
          </span>
        </p>
      </div>

      {/* Wallet Address */}
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-4">
        <h2 className="font-medium">USDT Wallet Address</h2>

        {loadingWallet ? (
          <p className="text-sm text-text-muted">Loading wallet...</p>
        ) : (
          <>
            <input
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Enter your USDT address (TRC20 / ERC20)"
              className="w-full bg-bg-elevated border border-bg-elevated rounded-lg px-4 py-2 text-sm"
            />

            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}

            <button
              type="button"
              onClick={saveAddress}
              disabled={saving}
              className="bg-brand-primary text-black px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Address'}
            </button>
          </>
        )}
      </div>

      {/* Security */}
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-4">
        <h2 className="font-medium">Security</h2>

        {!user.isVerified && (
          <p className="text-sm text-yellow-500">
            Your email is not verified. Please verify to unlock full features.
          </p>
        )}

        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-2 text-red-500 text-sm"
        >
          <FiLogOut />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

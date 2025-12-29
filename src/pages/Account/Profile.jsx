import { useEffect, useState } from 'react';
import {
  FiMail,
  FiShield,
  FiCopy,
  FiCheck,
  FiLogOut,
  FiArrowLeft,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AccountDetailsCard from '@pages/Account/AccountDetailsCard';

const Profile = () => {
  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!user) {
      window.location.href = '/login';
    }
  }, [user]);

  if (!user) return null;

  const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const logout = () => {
    if (!window.confirm('Are you sure you want to logout?')) return;
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main"
      >
        <FiArrowLeft />
        Back
      </button>

      {/* Header */}
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
        <h1 className="text-2xl font-semibold">Profile</h1>
        <p className="text-text-muted mt-1">Manage your personal information</p>
      </div>

  
      {/* Account Details */}
      <AccountDetailsCard
        user={user}
        onUserUpdate={updatedUser => {
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }}
      />

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
            onClick={copyReferral}
            className="p-2 rounded-lg border border-bg-elevated hover:bg-bg-elevated"
          >
            {copied ? <FiCheck /> : <FiCopy />}
          </button>
        </div>
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

export default Profile;

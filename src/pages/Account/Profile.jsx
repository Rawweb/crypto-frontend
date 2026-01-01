import {
  FiShield,
  FiCopy,
  FiCheck,
  FiLogOut,
  FiArrowLeft,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import AccountDetailsCard from '@pages/Account/AccountDetailsCard';
import ProfileSkeleton from '@components/ui/ProfileSkeleton';
import ConfirmModal from '@components/ui/ConfirmModal';
import { useAuth } from '@context/AuthContext';
import { useState } from 'react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, loading, logout, updateUser } = useAuth();

  const [copied, setCopied] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  if (!loading && !user) {
    navigate('/login', { replace: true });
    return null;
  }

  if (loading || !user) {
    return <ProfileSkeleton />;
  }

  const referralLink = `${window.location.origin}/register?ref=${user.referralCode}`;

  const copyReferral = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const confirmLogout = () => {
    logout();
    navigate('/login', { replace: true });
    setShowLogout(false);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto space-y-8 w-full px-4 md:px-0 overflow-x-hidden">
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
          <p className="text-text-muted mt-1">
            Manage your personal information
          </p>
        </div>

        <AccountDetailsCard user={user} onUserUpdate={updateUser} />

        {/* Security */}
        <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-4">
          <h2 className="font-medium">Security</h2>

          {!user.isVerified && (
            <p className="text-sm text-yellow-500">
              Your email is not verified. Please verify to unlock full features.
            </p>
          )}

          <button
            onClick={() => setShowLogout(true)}
            className="flex items-center gap-2 text-status-danger text-sm"
          >
            <FiLogOut />
            Logout
          </button>
        </div>

        {/* Referral */}
        <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-4">
          <h2 className="font-medium flex items-center gap-2">
            <FiShield /> Referral
          </h2>

          <div className="flex items-center gap-3">
            <code className="px-3 py-2 bg-bg-elevated rounded-lg text-sm break-all max-w-full">
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
      </div>

      <ConfirmModal
        open={showLogout}
        title="Log out?"
        description="You will be signed out of your account on this device."
        confirmText="Logout"
        danger
        onCancel={() => setShowLogout(false)}
        onConfirm={confirmLogout}
      />
    </>
  );
};

export default Profile;

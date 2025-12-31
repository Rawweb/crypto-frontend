import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdOutlineEmail } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';

import Reveal from '@components/motion/Reveal';
import api from '@api/axios';
import { useAuth } from '@context/AuthContext';
import { getRemainingSeconds } from '@components/utils/cooldown';

import ConfirmModal from '@components/ui/ConfirmModal';

/* =====================================================
   Segmented OTP Input (6 boxes)
===================================================== */
const OtpInput = ({ value, onChange, length = 6 }) => {
  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, '');
    if (!val) return;

    const next = value.split('');
    next[index] = val[0];
    onChange(next.join(''));

    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const next = value.split('');
      next[index] = '';
      onChange(next.join(''));

      if (index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = e => {
    const pasted = e.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length);

    if (!pasted) return;
    onChange(pasted);
  };

  return (
    <div
      className="flex justify-center gap-2"
      onPaste={handlePaste}
      aria-label="6 digit verification code"
    >
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => (inputsRef.current[i] = el)}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKeyDown(e, i)}
          className="
            size-10 text-center text-lg font-mono
            rounded-xl bg-bg-main border border-bg-elevated
            focus:outline-none focus:border-brand-primary
          "
        />
      ))}
    </div>
  );
};

/* =====================================================
   Skeleton Loader (Card)
===================================================== */
const VerifySkeleton = () => (
  <section className="container pt-40 max-w-md animate-pulse">
    <div className="bg-bg-surface border border-bg-elevated rounded-2xl p-10 text-center space-y-6">
      <div className="mx-auto size-16 rounded-full bg-bg-elevated" />
      <div className="h-5 bg-bg-elevated rounded w-1/2 mx-auto" />
      <div className="h-4 bg-bg-elevated rounded w-3/4 mx-auto" />
      <div className="h-10 bg-bg-elevated rounded-xl" />
      <div className="flex justify-center gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="size-10 bg-bg-elevated rounded-xl" />
        ))}
      </div>
      <div className="h-12 bg-bg-elevated rounded-full" />
    </div>
  </section>
);

/* =====================================================
   Verify Email Page
===================================================== */
const VerifyEmail = () => {
  const navigate = useNavigate();
  const { user, loading, updateUser, logout } = useAuth();

  const [showLogout, setShowLogout] = useState(false);

  const [otp, setOtp] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  /* --------------------------------
     Init cooldown
  -------------------------------- */
  useEffect(() => {
    if (user?.resendCooldowns?.verify_email) {
      setCooldown(getRemainingSeconds(user.resendCooldowns.verify_email));
    }
  }, [user]);

  /* --------------------------------
     Guards
  -------------------------------- */
  useEffect(() => {
    if (!loading && !user) {
      navigate('/login', { replace: true });
    }

    if (!loading && user?.isVerified) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  /* --------------------------------
     Cooldown timer
  -------------------------------- */
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  /* --------------------------------
     Verify OTP
  -------------------------------- */
  const handleVerify = async e => {
    e.preventDefault();
    setMessage('');

    if (otp.length !== 6) {
      setStatus('error');
      setMessage('Enter the 6-digit code');
      return;
    }

    try {
      setStatus('verifying');
      await api.post('/verify/verify-email', { token: otp });

      updateUser({ ...user, isVerified: true });
      setStatus('success');

      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 800);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Invalid code');
    }
  };

  /* --------------------------------
     Resend code
  -------------------------------- */
  const handleResend = async () => {
    if (cooldown > 0 || status === 'sending') return;

    try {
      setStatus('sending');
      setMessage('');

      const res = await api.post('/verify/send-email');

      updateUser({
        ...user,
        resendCooldowns: {
          ...user.resendCooldowns,
          verify_email: res.data.nextAllowedAt,
        },
      });

      await refreshUser(); // 🔥 critical

      setCooldown(getRemainingSeconds(res.data.nextAllowedAt));
      setStatus('idle');
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Please wait');
    }
  };

  /* --------------------------------
     Logout
  -------------------------------- */
  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
    setShowLogout(false);
  };

  if (loading || !user) {
    return <VerifySkeleton />;
  }

  return (
    <section>
      <Reveal>
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-brand-primary/30 blur-[30px]" />
              <div className="relative size-16 rounded-full bg-bg-main border border-bg-elevated flex items-center justify-center text-brand-primary">
                <MdOutlineEmail className="size-8" />
              </div>
            </div>
          </div>

          <p className="text-xs text-text-muted mb-2">
            Step 2 of 2· Secure your account
          </p>

          <h1 className="text-2xl font-semibold mb-3">Verify your email</h1>

          <p className="text-text-secondary text-sm mb-4">
            Enter the 6-digit code sent to
          </p>

          <div className="text-text-muted bg-bg-main border border-bg-elevated rounded-xl py-3 px-4 mb-6 text-sm font-medium">
            {user.email}
          </div>

          <form onSubmit={handleVerify} className="space-y-5">
            <OtpInput value={otp} onChange={setOtp} />

            {message && (
              <div
                role="alert"
                className={`text-sm rounded-lg px-4 py-3 ${
                  status === 'error'
                    ? 'bg-red-500/10 text-red-500'
                    : 'bg-green-500/10 text-green-500'
                }`}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={status === 'verifying'}
              className="w-full py-4 rounded-full bg-brand-primary hover:bg-brand-hover font-medium disabled:opacity-50"
            >
              {status === 'verifying' ? 'Verifying…' : 'Verify email'}
            </button>
          </form>

          <div className="mt-6 space-y-4">
            <button
              onClick={handleResend}
              disabled={cooldown > 0 || status === 'sending'}
              className="text-sm text-brand-primary hover:text-brand-hover disabled:opacity-50"
            >
              {cooldown > 0
                ? `Resend available in ${cooldown}s`
                : 'Didn’t get the code? Resend'}
            </button>

            <button
              onClick={() => setShowLogout(true)}
              className="flex items-center justify-center gap-2 text-sm text-text-muted hover:text-brand-primary"
            >
              <FiLogOut />
              Log out
            </button>
          </div>
        </div>
      </Reveal>

      <ConfirmModal
        open={showLogout}
        title="Log out"
        description="Are you sure you want to log out of your account?"
        confirmText="Log out"
        danger
        onCancel={() => setShowLogout(false)}
        onConfirm={handleLogout}
      />
    </section>
  );
};

export default VerifyEmail;

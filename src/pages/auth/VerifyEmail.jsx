import { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import Reveal from '@components/motion/Reveal';
import { MdOutlineEmail } from 'react-icons/md';
import api from '@api/axios';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.isVerified) {
    return <Navigate to="/dashboard" />;
  }

  const [otp, setOtp] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  // idle | verifying | sending | success | error

  // cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown(c => c - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0 || status === 'sending') return;

    try {
      setStatus('sending');
      setMessage('');

      await api.post('/verify/send-email');

      setCooldown(60);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setMessage('Please wait before retrying.');
    }
  };

  const handleVerify = async e => {
    e.preventDefault();
    setMessage('');

    if (otp.length !== 6) {
      setMessage('Enter the 6-digit code');
      return;
    }

    try {
      setStatus('verifying');

      await api.post('/verify/verify-email', { token: otp });

      const updatedUser = { ...user, isVerified: true };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setStatus('success');

      setTimeout(() => {
        navigate('/dashboard');
      }, 800);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Invalid code');
    }
  };

  return (
    <section className="container pt-40 max-w-md">
      <Reveal>
        <div className="bg-bg-surface border border-bg-elevated rounded-2xl p-10 text-center">
          {/* icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-brand-primary/30 blur-[30px]" />
              <div className="relative size-16 rounded-full bg-bg-main border border-bg-elevated flex items-center justify-center text-brand-primary">
                <MdOutlineEmail className="size-8" />
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-semibold mb-3">Verify your email</h1>

          <p className="text-text-secondary/70 text-sm mb-6">
            Enter the 6-digit code sent to your email.
          </p>

          <div className="bg-bg-main border border-bg-elevated rounded-xl py-3 px-4 mb-6 text-sm">
            {user.email}
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <input
              type="text"
              value={otp}
              onChange={e =>
                setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
              }
              placeholder="Enter 6-digit code"
              className="w-full text-center tracking-[0.5em] text-xl rounded-xl bg-bg-main border border-bg-elevated px-4 py-3 focus:outline-none focus:border-brand-primary"
            />

            {message && <p className="text-sm text-status-danger">{message}</p>}

            <button
              type="submit"
              disabled={status === 'verifying'}
              className="w-full py-4 rounded-full bg-brand-primary hover:bg-brand-hover font-medium disabled:opacity-50"
            >
              {status === 'verifying' ? 'Verifying…' : 'Verify email'}
            </button>
          </form>

          {status === 'success' && (
            <p className="text-status-success text-sm mt-4">
              Verification successful.
            </p>
          )}

          <button
            onClick={handleResend}
            disabled={cooldown > 0 || status === 'sending'}
            className="mt-6 text-sm text-brand-primary hover:text-brand-hover disabled:opacity-50"
          >
            {cooldown > 0
              ? `Resend in ${cooldown}s`
              : 'Resend verification code'}
          </button>

          <div className="mt-6 text-sm text-text-muted">
            <Link to="/login" className="hover:text-brand-primary">
              Log out
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default VerifyEmail;

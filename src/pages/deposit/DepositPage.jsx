import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api/axios';
import { FiCheckCircle, FiAlertCircle, FiUpload } from 'react-icons/fi';
import WalletRecentActivity from '@pages/wallets/WalletRecentActivity';

const DepositPage = () => {
  const navigate = useNavigate();

  // form state
  const [amount, setAmount] = useState('');
  const [proof, setProof] = useState(null);

  // ui state
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [message, setMessage] = useState('');

  // deposits history
  const [deposits, setDeposits] = useState([]);
  const [loadingDeposits, setLoadingDeposits] = useState(true);

  /* =========================
      FETCH USER DEPOSITS
  ========================== */
  const fetchDeposits = async () => {
    try {
      const res = await api.get('/wallet/deposits');
      setDeposits(res.data);
    } catch (err) {
      console.error('Failed to fetch deposits', err);
    } finally {
      setLoadingDeposits(false);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  /* =========================
      SUBMIT DEPOSIT
  ========================== */
  const handleSubmit = async e => {
    e.preventDefault();

    if (!proof) {
      setStatus('error');
      setMessage('Please upload a payment proof image.');
      return;
    }

    const formData = new FormData();
    formData.append('amount', amount);
    formData.append('proof', proof);

    setStatus('submitting');
    setMessage('');

    try {
      await api.post('/wallet/deposit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setStatus('success');
      setMessage('Deposit submitted successfully. Pending review.');

      setAmount('');
      setProof(null);

      // refresh history immediately
      fetchDeposits();
    } catch (err) {
      setStatus('error');
      setMessage(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className="flex justify-center items-start min-h-[70vh] pt-10">
      <div className="w-full max-w-md space-y-10">
        {/* =========================
            DEPOSIT FORM
        ========================== */}
        <form
          onSubmit={handleSubmit}
          className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-5"
        >
          <h2 className="font-semibold text-lg">Deposit Funds</h2>

          {/* Amount */}
          <div>
            <label className="text-sm text-text-muted mb-1 block">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2"
              required
            />
          </div>

          {/* Proof Upload */}
          <div>
            <label className="text-sm text-text-muted mb-1 block">
              Payment Proof
            </label>

            <label className="flex items-center gap-3 cursor-pointer bg-bg-main border border-bg-elevated rounded-lg px-3 py-2">
              <FiUpload className="text-text-muted" />
              <span className="text-sm truncate">
                {proof ? proof.name : 'Upload transaction screenshot'}
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => setProof(e.target.files[0])}
              />
            </label>

            <p className="text-xs text-text-muted mt-1">
              JPG, PNG or WEBP. Max size 2MB.
            </p>
          </div>

          {/* Status Message */}
          {status !== 'idle' && (
            <div
              className={`flex items-center gap-2 text-sm rounded-lg px-3 py-2 ${
                status === 'success'
                  ? 'bg-green-500/10 text-green-400'
                  : status === 'error'
                  ? 'bg-red-500/10 text-red-400'
                  : ''
              }`}
            >
              {status === 'success' && <FiCheckCircle />}
              {status === 'error' && <FiAlertCircle />}
              <span>{message}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full bg-brand-primary text-black py-2 rounded-lg font-medium hover:bg-brand-hover disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Submitting…' : 'Submit Deposit'}
          </button>

          {/* Back to wallet */}
          <button
            type="button"
            onClick={() => navigate('/wallet')}
            className="w-full border border-bg-elevated py-2 rounded-lg text-sm hover:bg-bg-elevated"
          >
            ← Back to Wallet
          </button>
        </form>

        {/* =========================
            DEPOSIT HISTORY
        ========================== */}
        <WalletRecentActivity filter="deposit" />
      </div>
    </div>
  );
};

export default DepositPage;

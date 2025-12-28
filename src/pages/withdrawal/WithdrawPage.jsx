import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api/axios';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import WalletRecentActivity from '@pages/wallets/WalletRecentActivity';

const NETWORKS = {
  USDT_TRON: {
    label: 'USDT (TRC20)',
    regex: /^T[a-zA-Z0-9]{33}$/,
    placeholder: 'TRC20 address (starts with T)',
  },
  USDT_ETH: {
    label: 'USDT (ERC20)',
    regex: /^0x[a-fA-F0-9]{40}$/,
    placeholder: 'ERC20 address (starts with 0x)',
  },
  ETH: {
    label: 'Ethereum (ETH)',
    regex: /^0x[a-fA-F0-9]{40}$/,
    placeholder: 'ETH address (starts with 0x)',
  },
  BTC: {
    label: 'Bitcoin (BTC)',
    regex: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/,
    placeholder: 'BTC address',
  },
};

const WithdrawPage = () => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState('');
  const [network, setNetwork] = useState('');
  const [address, setAddress] = useState('');

  const [savedAddresses, setSavedAddresses] = useState([]);

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [message, setMessage] = useState('');

  const isAddressValid = network && NETWORKS[network].regex.test(address);

  /* =========================
      FETCH SAVED ADDRESSES
  ========================== */
  useEffect(() => {
    const fetchSavedAddresses = async () => {
      try {
        const res = await api.get('/wallet/saved-addresses');
        setSavedAddresses(res.data);
      } catch (err) {
        console.error('Failed to load saved addresses');
      }
    };

    fetchSavedAddresses();
  }, []);

  /* =========================
      SUBMIT WITHDRAWAL
  ========================== */
  const handleSubmit = async e => {
    e.preventDefault();

    if (!network) {
      setStatus('error');
      setMessage('Please select a withdrawal network.');
      return;
    }

    if (!isAddressValid) {
      setStatus('error');
      setMessage('Invalid wallet address for selected network.');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      await api.post('/wallet/withdrawal', {
        amount: Number(amount),
        network,
        walletAddress: address,
      });

      setStatus('success');
      setMessage('Withdrawal request submitted successfully.');

      setAmount('');
      setAddress('');
      setNetwork('');
    } catch (err) {
      setStatus('error');
      setMessage(
        err.response?.data?.message ||
          'Withdrawal request failed. Please try again.'
      );
    }
  };

  return (
    <div className="flex justify-center items-start min-h-[70vh] pt-10">
      <div className="w-full max-w-md space-y-10">
        {/* =========================
            WITHDRAW FORM
        ========================== */}
        <form
          onSubmit={handleSubmit}
          className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-5"
        >
          <h2 className="font-semibold text-lg">Withdraw Funds</h2>

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

          {/* Network */}
          <div>
            <label className="text-sm text-text-muted mb-1 block">
              Network
            </label>
            <select
              value={network}
              onChange={e => {
                setNetwork(e.target.value);
                setAddress('');
                setStatus('idle');
                setMessage('');
              }}
              className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2"
              required
            >
              <option value="">Select network</option>
              {Object.entries(NETWORKS).map(([key, net]) => (
                <option key={key} value={key}>
                  {net.label}
                </option>
              ))}
            </select>
          </div>

          {/* Saved addresses */}
          {savedAddresses.length > 0 && (
            <div>
              <label className="text-sm text-text-muted mb-1 block">
                Saved Addresses
              </label>

              <select
                value=""
                onChange={e => {
                  const selected = savedAddresses.find(
                    a => a._id === e.target.value
                  );

                  if (selected) {
                    setNetwork(selected.network);
                    setAddress(selected.address);
                    setStatus('idle');
                    setMessage('');
                  }
                }}
                className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2"
              >
                <option value="">Select saved address</option>
                {savedAddresses.map(addr => (
                  <option key={addr._id} value={addr._id}>
                    {addr.network} — {addr.address.slice(0, 6)}…
                    {addr.address.slice(-4)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Wallet address */}
          <div>
            <label className="text-sm text-text-muted mb-1 block">
              Wallet Address
            </label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value.trim())}
              placeholder={
                network ? NETWORKS[network].placeholder : 'Select network first'
              }
              disabled={!network}
              className={`w-full bg-bg-main border rounded-lg px-3 py-2 ${
                !network
                  ? 'opacity-50 cursor-not-allowed'
                  : isAddressValid
                  ? 'border-green-500'
                  : address
                  ? 'border-red-500'
                  : 'border-bg-elevated'
              }`}
              required
            />
          </div>

          {/* Status message */}
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
            {status === 'submitting' ? 'Submitting…' : 'Request Withdrawal'}
          </button>

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate('/wallet')}
            className="w-full border border-bg-elevated py-2 rounded-lg text-sm hover:bg-bg-elevated"
          >
            ← Back to Wallet
          </button>
        </form>

        {/* =========================
            WITHDRAWAL HISTORY
        ========================== */}
        <WalletRecentActivity filter="withdrawal" />
      </div>
    </div>
  );
};

export default WithdrawPage;

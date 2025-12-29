import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api/axios';
import { FiCheckCircle, FiAlertCircle, FiCopy, FiCheck } from 'react-icons/fi';
import WalletRecentActivity from '@pages/wallets/WalletRecentActivity';

const shorten = addr => `${addr.slice(0, 6)}…${addr.slice(-4)}`;

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

  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const isAddressValid = network && NETWORKS[network].regex.test(address);

  /* =========================
      FETCH SAVED ADDRESSES
  ========================== */
  useEffect(() => {
    const fetchSaved = async () => {
      const res = await api.get('/wallet/saved-wallets');
      setSavedAddresses(res.data);

      const def = res.data.find(w => w.isDefault);
      if (def) {
        setNetwork(def.network);
        setAddress(def.address);
      }
    };

    fetchSaved();
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
            <div className="space-y-2">
              <label className="text-sm text-text-muted">Saved wallets</label>

              <div className="grid gap-2">
                {savedAddresses.map(w => (
                  <button
                    key={w._id}
                    type="button"
                    onClick={() => {
                      setNetwork(w.network);
                      setAddress(w.address);
                      setStatus('idle');
                      setMessage('');
                    }}
                    className={`p-3 rounded-lg border text-sm text-left ${
                      address === w.address
                        ? 'border-brand-primary bg-bg-elevated'
                        : 'border-bg-elevated'
                    }`}
                  >
                    {w.network} — {shorten(w.address)}
                    {w.isDefault && (
                      <span className="ml-2 text-xs text-brand-primary">
                        Default
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wallet address */}
          <div>
            <label className="text-sm text-text-muted mb-1 block">
              Wallet Address
            </label>

            <div className="relative">
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value.trim())}
                placeholder={
                  network
                    ? NETWORKS[network].placeholder
                    : 'Select network first'
                }
                disabled={!network}
                className={`w-full pr-12 bg-bg-main border rounded-lg px-3 py-2 ${
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

              {address && (
                <button
                  type="button"
                  onClick={copyAddress}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-main"
                >
                  {copied ? <FiCheck /> : <FiCopy />}
                </button>
              )}
            </div>
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

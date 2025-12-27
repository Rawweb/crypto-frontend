import { useState } from 'react';
import api from '@api/axios';

const WithdrawPage = () => {
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/wallet/withdrawal', {
        amount: Number(amount),
        walletAddress: address,
      });

      alert('Withdrawal request submitted');
      setAmount('');
      setAddress('');
    } catch (err) {
      alert(err.response?.data?.message || 'Withdrawal failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-4 max-w-md"
    >
      <h2 className="font-semibold">Withdraw Funds</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2"
        required
      />

      <input
        type="text"
        placeholder="Wallet address"
        value={address}
        onChange={e => setAddress(e.target.value)}
        className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2"
        required
      />

      <button
        disabled={loading}
        className="w-full bg-brand-primary text-black py-2 rounded-lg font-medium hover:bg-brand-hover"
      >
        {loading ? 'Submitting...' : 'Request Withdrawal'}
      </button>
    </form>
  );
};

export default WithdrawPage;

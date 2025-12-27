import { useState } from 'react';
import api from '@api/axios';

const DepositPage = () => {
  const [amount, setAmount] = useState('');
  const [proof, setProof] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/wallet/deposit', {
        amount: Number(amount),
        paymentProof: proof,
      });

      alert('Deposit submitted for review');
      setAmount('');
      setProof('');
    } catch (err) {
      alert(err.response?.data?.message || 'Deposit failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-4 max-w-md"
    >
      <h2 className="font-semibold">Deposit Funds</h2>

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
        placeholder="Payment proof / reference"
        value={proof}
        onChange={e => setProof(e.target.value)}
        className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2"
        required
      />

      <button
        disabled={loading}
        className="w-full bg-brand-primary text-black py-2 rounded-lg font-medium hover:bg-brand-hover"
      >
        {loading ? 'Submitting...' : 'Submit Deposit'}
      </button>
    </form>
  );
};

export default DepositPage;

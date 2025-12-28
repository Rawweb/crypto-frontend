import { useEffect, useState } from 'react';
import api from '@api/axios';
import { FiCheck } from 'react-icons/fi';

/**
 * DISPLAY CONFIG (frontend controlled)
 * You can later align DB plans to these
 */
const PLAN_META = {
  STARTER: {
    tag: 'STARTER',
    description: 'Low-risk plan for beginners starting their crypto journey.',
  },
  GROWTH: {
    tag: 'GROWTH',
    description: 'Balanced plan with steady ROI. Most popular choice.',
    featured: true,
  },
  PRO: {
    tag: 'PRO',
    description: 'High-yield plan for experienced investors.',
  },
};

const InvestmentPlans = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await api.get('/investments/plans');

        // 👉 Only keep 3 plans (assumes you’ll clean DB later)
        setPlans(res.data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load plans');
      }
    };

    fetchPlans();
  }, []);

  const handleInvest = async e => {
    e.preventDefault();

    if (!selectedPlan) return;

    setStatus('submitting');
    setMessage('');

    try {
      await api.post('/investments/invest', {
        planId: selectedPlan._id,
        amount: Number(amount),
      });

      setStatus('success');
      setMessage('Investment created successfully');

      setAmount('');
      setSelectedPlan(null);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Investment failed');
    }
  };

  return (
    <div className="space-y-16">
      {/* ================= HEADER ================= */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-text-muted mb-3">
          No hidden charges
        </p>

        <h1 className="text-3xl font-semibold">Choose your investment plan</h1>

        <p className="text-sm text-text-muted mt-3">
          Select a plan that matches your risk level and earn automated ROI.
        </p>
      </div>

      {/* ================= PLANS ================= */}
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan, index) => {
          const keys = Object.keys(PLAN_META);
          const meta = PLAN_META[keys[index]] || {};
          const isFeatured = meta.featured;
          const isSelected = selectedPlan?._id === plan._id;

          return (
            <button
              key={plan._id}
              onClick={() => setSelectedPlan(plan)}
              className={`relative text-left rounded-3xl p-7 transition-all border ${
                isFeatured
                  ? 'bg-brand-primary text-black border-brand-primary scale-[1.03]'
                  : 'bg-bg-surface border-bg-elevated hover:bg-bg-elevated'
              }`}
            >
              {/* TAG */}
              <span
                className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 ${
                  isFeatured
                    ? 'bg-black/20 text-black'
                    : 'bg-bg-main text-text-muted'
                }`}
              >
                {meta.tag || plan.name.toUpperCase()}
              </span>

              {/* ROI */}
              <div className="mb-3">
                <h2 className="text-3xl font-bold">{plan.roi}%</h2>
                <p
                  className={`text-sm ${
                    isFeatured ? 'text-black/80' : 'text-text-muted'
                  }`}
                >
                  {plan.roiType} for {plan.durationDays} days
                </p>
              </div>

              {/* DESCRIPTION */}
              <p
                className={`text-sm mb-6 ${
                  isFeatured ? 'text-black/80' : 'text-text-muted'
                }`}
              >
                {meta.description}
              </p>

              {/* FEATURES */}
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  Min invest ${plan.minAmount}
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  Max invest ${plan.maxAmount}
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  Automated ROI payouts
                </li>
                <li className="flex items-center gap-2">
                  <FiCheck className="text-green-400" />
                  Capital locked till maturity
                </li>
              </ul>

              {/* CTA */}
              <div
                className={`w-full text-center py-3 rounded-xl text-sm font-semibold ${
                  isFeatured
                    ? 'bg-black text-white'
                    : isSelected
                    ? 'bg-brand-primary text-black'
                    : 'border border-bg-elevated text-text-muted'
                }`}
              >
                {isSelected ? 'Selected' : 'Get Started'}
              </div>
            </button>
          );
        })}
      </div>

      {/* ================= INVEST FORM ================= */}
      {selectedPlan && (
        <form
          onSubmit={handleInvest}
          className="max-w-md mx-auto bg-bg-surface border border-bg-elevated rounded-xl p-6 space-y-5"
        >
          <h3 className="font-semibold text-lg">
            Invest in {selectedPlan.name}
          </h3>

          <input
            type="number"
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder={`Amount (${selectedPlan.minAmount} – ${selectedPlan.maxAmount})`}
            className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2"
            required
          />

          {status !== 'idle' && (
            <p
              className={`text-sm ${
                status === 'error' ? 'text-red-400' : 'text-green-400'
              }`}
            >
              {message}
            </p>
          )}

          <button
            disabled={status === 'submitting'}
            className="w-full bg-brand-primary text-black py-2 rounded-lg font-medium hover:bg-brand-hover disabled:opacity-50"
          >
            {status === 'submitting' ? 'Processing…' : 'Confirm Investment'}
          </button>
        </form>
      )}
    </div>
  );
};

export default InvestmentPlans;

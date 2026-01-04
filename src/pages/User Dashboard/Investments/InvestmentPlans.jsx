import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api/axios';
import { FiX, FiArrowLeft } from 'react-icons/fi';
import { FaRocket, FaCrown, FaRegDotCircle } from 'react-icons/fa';
import { HiTrendingUp } from 'react-icons/hi';
import { useAuth } from '@context/AuthContext';
import SuspensionBanner from '@components/common/SuspensionBanner';

const PLAN_ORDER = ['starter', 'growth', 'pro'];

const PLAN_ICONS = {
  starter: FaRocket,
  growth: FaCrown,
  pro: HiTrendingUp,
};

const PLAN_UI = {
  starter: {
    tag: 'STARTER',
    description: 'Low-risk plan for beginners starting their crypto journey.',
  },
  growth: {
    tag: 'GROWTH',
    description: 'Balanced plan with steady ROI. Most popular choice.',
    featured: true,
  },
  pro: {
    tag: 'PRO',
    description: 'High-yield plan for experienced investors.',
  },
};

const InvestmentPlans = () => {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [wallet, setWallet] = useState(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const { isSuspended } = useAuth();

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [plansRes, walletRes] = await Promise.all([
          api.get('/investments/plans'),
          api.get('/wallet'),
        ]);

        const orderedPlans = plansRes.data
          .filter(p => p.isActive)
          .filter(p => PLAN_ORDER.includes(p.name.toLowerCase()))
          .sort(
            (a, b) =>
              PLAN_ORDER.indexOf(a.name.toLowerCase()) -
              PLAN_ORDER.indexOf(b.name.toLowerCase())
          );

        setPlans(orderedPlans);
        setWallet(walletRes.data);

        const growth = orderedPlans.find(
          p => p.name.toLowerCase() === 'growth'
        );
        if (growth) setSelectedPlan(growth);
      } catch (err) {
        console.error('Failed to load investment data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ================= DERIVED ================= */
  const isBalanceEnough =
    wallet && selectedPlan ? wallet.balance >= selectedPlan.minAmount : false;

  const expectedProfit =
    selectedPlan && amount
      ? ((amount * selectedPlan.roi) / 100).toFixed(2)
      : '0.00';

  /* ================= ACTION ================= */
  const handleInvest = async e => {
    e.preventDefault();
    setStatus('submitting');
    setMessage('');

    try {
      await api.post('/investments/invest', {
        planId: selectedPlan._id,
        amount: Number(amount),
      });

      const plansRes = await api.get('/investments/plans');
      const orderedPlans = plansRes.data
        .filter(p => PLAN_ORDER.includes(p.name.toLowerCase()))
        .sort(
          (a, b) =>
            PLAN_ORDER.indexOf(a.name.toLowerCase()) -
            PLAN_ORDER.indexOf(b.name.toLowerCase())
        );

      setPlans(orderedPlans);

      setStatus('success');
      setMessage('Investment created successfully');
      setAmount('');
      setShowModal(false);
    } catch (err) {
      setStatus('error');
      setMessage(err.response?.data?.message || 'Investment failed');
    }
  };

  // loading
  if (loading) {
    return (
      <div className="space-y-16">
        <div className="h-6 w-24 bg-bg-elevated rounded animate-pulse" />

        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="h-3 w-32 mx-auto bg-bg-elevated rounded animate-pulse" />
          <div className="h-8 w-64 mx-auto bg-bg-elevated rounded animate-pulse" />
          <div className="h-4 w-72 mx-auto bg-bg-elevated rounded animate-pulse" />
        </div>

        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-3xl p-7 bg-bg-surface border border-bg-elevated space-y-6 animate-pulse"
            >
              <div className="h-32 rounded-2xl bg-bg-elevated" />
              <div className="space-y-3">
                <div className="h-4 w-1/2 bg-bg-elevated rounded" />
                <div className="h-4 w-2/3 bg-bg-elevated rounded" />
                <div className="h-4 w-1/3 bg-bg-elevated rounded" />
              </div>
              <div className="h-10 bg-bg-elevated rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 relative">
      {/* ===== BACK BUTTON (TOP) ===== */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition"
      >
        <FiArrowLeft />
        Back
      </button>

      {/* suspended banner */}
      <SuspensionBanner />

      {/* ================= HEADER ================= */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-text-muted mb-3">
          No hidden charges
        </p>
        <h1 className="text-3xl font-semibold">Choose your investment plan</h1>
        <p className="text-sm text-text-muted mt-3">
          Select a plan that matches your risk level and earn ROI automatically.
        </p>
      </div>

      {/* ================= PLANS ================= */}
      <div
        className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
        onClick={() => setSelectedPlan(null)}
      >
        {plans.map(plan => {
          const key = plan.name.toLowerCase();
          const meta = PLAN_UI[key];
          const Icon = PLAN_ICONS[key];
          const isFeatured = meta.featured;
          const isSelected = selectedPlan?._id === plan._id;
          const isDisabled = !plan.isActive;

          return (
            <div
              key={plan._id}
              onClick={e => {
                e.stopPropagation();
                setSelectedPlan(plan);
              }}
              className={`relative cursor-pointer rounded-3xl p-7 transition-all duration-300
                ${
                  isSelected
                    ? 'scale-[1.03] ring-1 ring-bg-elevated'
                    : 'hover:scale-[1.02]'
                }
                ${
                  isFeatured
                    ? 'bg-brand-primary text-black'
                    : 'bg-bg-surface border border-bg-elevated'
                }
              `}
            >
              {/* TOP PANEL */}
              <div
                className={`rounded-2xl p-6 mb-5 ${
                  isFeatured ? 'bg-text-secondary/70' : 'bg-bg-elevated'
                }`}
              >
                <div className="flex items-center justify-between mb-5">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      isFeatured
                        ? 'bg-black/20 text-black'
                        : 'bg-bg-main text-text-muted'
                    }`}
                  >
                    {meta.tag}
                  </span>

                  <div
                    className={`p-3 rounded-full ${
                      isFeatured ? 'bg-black/10' : 'bg-bg-main'
                    }`}
                  >
                    <Icon className="text-xl" />
                  </div>
                </div>

                <div className="mb-3">
                  <h2 className="text-5xl font-bold mb-1">{plan.roi}%</h2>
                  <p className="text-sm mb-2 text-text-muted">
                    / {plan.roiType} for {plan.durationDays} days
                  </p>
                </div>

                <p className="text-sm">{meta.description}</p>
              </div>

              {/* FEATURES */}
              <ul className="space-y-3 mb-8 text-sm">
                <li className="flex gap-2 items-center">
                  <FaRegDotCircle className="text-status-success" />
                  Min invest ${plan.minAmount}
                </li>
                <li className="flex gap-2 items-center">
                  <FaRegDotCircle className="text-status-success" />
                  Max invest ${plan.maxAmount}
                </li>
                <li className="flex gap-2 items-center">
                  <FaRegDotCircle className="text-status-info" />
                  Automated ROI payouts
                </li>
                <li className="flex gap-2 items-center">
                  <FaRegDotCircle className="text-status-warning" />
                  Capital locked till maturity
                </li>
              </ul>

              {/* CTA */}
              <button
                disabled={isSuspended || isDisabled}
                onClick={e => {
                  e.stopPropagation();
                  if (isDisabled) return;
                  setShowModal(true);
                }}
                className={`w-full py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed ${
                  isFeatured
                    ? 'bg-black text-white'
                    : 'border border-bg-elevated hover:bg-brand-primary hover:text-black'
                }`}
              >
                {isDisabled ? 'Unavailable' : 'Get Started'}
              </button>
            </div>
          );
        })}
      </div>

      {/* ================= MODAL ================= */}
      {showModal && selectedPlan && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
          onClick={() => setShowModal(false)}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="bg-bg-surface rounded-xl w-full max-w-md p-6 relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-text-muted"
            >
              <FiX />
            </button>

            <h3 className="font-semibold text-lg mb-4">
              Invest in {selectedPlan.name}
            </h3>

            <form onSubmit={handleInvest} className="space-y-4">
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder={`Amount (${selectedPlan.minAmount} – ${selectedPlan.maxAmount})`}
                className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2"
                required
              />

              <div className="text-sm text-text-muted">
                Expected ROI:{' '}
                <span className="font-semibold text-text-main">
                  ${expectedProfit}
                </span>
              </div>

              {!isBalanceEnough && (
                <p className="text-sm text-status-danger">
                  Insufficient wallet balance
                </p>
              )}

              {status !== 'idle' && (
                <p
                  className={`text-sm ${
                    status === 'error'
                      ? 'text-status-danger'
                      : 'text-status-success'
                  }`}
                >
                  {message}
                </p>
              )}

              <button
                disabled={status === 'submitting' || !isBalanceEnough}
                className="w-full bg-brand-primary text-black py-2 rounded-lg font-medium disabled:opacity-50"
              >
                {status === 'submitting' ? 'Processing…' : 'Confirm Investment'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestmentPlans;

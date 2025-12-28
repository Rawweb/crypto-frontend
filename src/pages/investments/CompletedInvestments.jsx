import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api/axios';
import {
  FiCheckCircle,
  FiTrendingUp,
  FiArrowLeft,
  FiAlertCircle,
} from 'react-icons/fi';

/* ---------------- helpers ---------------- */

const formatCurrency = value =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value || 0);

/* ---------------- component ---------------- */

const CompletedInvestments = () => {
  const navigate = useNavigate();

  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await api.get('/investments/my-investments');
        const completed = res.data.filter(inv => inv.status === 'completed');
        setInvestments(completed);
      } catch (err) {
        setError('Unable to load completed investments.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  /* ---------------- derived values ---------------- */

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const totalProfit = investments.reduce(
    (sum, inv) => sum + (inv.profitEarned || 0),
    0
  );

  /* ---------------- loading ---------------- */

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 w-40 bg-bg-elevated rounded" />
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="h-20 bg-bg-elevated rounded-xl" />
          <div className="h-20 bg-bg-elevated rounded-xl" />
          <div className="h-20 bg-bg-elevated rounded-xl" />
        </div>
        <div className="h-40 bg-bg-elevated rounded-xl" />
        <div className="h-40 bg-bg-elevated rounded-xl" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition"
      >
        <FiArrowLeft />
        Back
      </button>

      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">Completed Investments</h1>
        <p className="text-sm text-text-muted mt-1">
          Finished plans and total returns earned
        </p>
      </div>

      {/* ERROR */}
      {error && (
        <div className="flex items-center gap-2 bg-red-500/10 text-red-400 text-sm p-4 rounded-lg">
          <FiAlertCircle />
          {error}
        </div>
      )}

      {/* SUMMARY */}
      {investments.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Completed Plans"
            value={investments.length}
            icon={FiCheckCircle}
          />
          <SummaryCard
            label="Total Invested"
            value={formatCurrency(totalInvested)}
            icon={FiTrendingUp}
          />
          <SummaryCard
            label="Total Profit"
            value={formatCurrency(totalProfit)}
            icon={FiTrendingUp}
          />
        </div>
      )}

      {/* EMPTY STATE */}
      {investments.length === 0 && !error && (
        <div className="bg-bg-surface border border-bg-elevated rounded-xl p-8 text-center">
          <p className="text-text-muted mb-3">
            You don’t have any completed investments yet.
          </p>
          <button
            onClick={() => navigate('/investments/active')}
            className="inline-flex items-center gap-2 bg-brand-primary text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-hover transition"
          >
            View active investments
          </button>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {investments.map(inv => (
          <div
            key={inv._id}
            onClick={() => navigate(`/investments/${inv._id}`)}
            className="bg-bg-surface border border-bg-elevated rounded-xl p-6"
          >
            {/* TOP */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-semibold">
                  {inv.planId?.name || 'Deleted plan'}
                </h3>
                <p className="text-sm text-text-muted">
                  Completed on {new Date(inv.endDate).toLocaleDateString()}
                </p>
              </div>

              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs bg-green-500/15 text-green-400">
                <FiCheckCircle />
                Completed
              </span>
            </div>

            {/* DETAILS */}
            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div>
                <p className="text-text-muted">Amount invested</p>
                <p className="font-medium">{formatCurrency(inv.amount)}</p>
              </div>

              <div>
                <p className="text-text-muted">Profit earned</p>
                <p className="font-medium">
                  {formatCurrency(inv.profitEarned)}
                </p>
              </div>

              <div>
                <p className="text-text-muted">Duration</p>
                <p className="font-medium">
                  {new Date(inv.startDate).toLocaleDateString()} –{' '}
                  {new Date(inv.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------------- components ---------------- */

const SummaryCard = ({ label, value, icon: Icon }) => (
  <div className="bg-bg-surface border border-bg-elevated rounded-xl p-5 flex items-center gap-4">
    <div className="size-10 rounded-lg bg-brand-primary/15 text-brand-primary flex items-center justify-center">
      <Icon className="size-5" />
    </div>
    <div>
      <p className="text-xs text-text-muted">{label}</p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  </div>
);

export default CompletedInvestments;

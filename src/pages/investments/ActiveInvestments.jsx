import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '@api/axios';
import {
  FiClock,
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

const calcProgress = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = Date.now();

  if (now <= start) return 0;
  if (now >= end) return 100;

  return ((now - start) / (end - start)) * 100;
};

/* ---------------- component ---------------- */

const ActiveInvestments = () => {
  const navigate = useNavigate();

  const PAGE_SIZE = 6;
  const [page, setPage] = useState(1);

  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await api.get('/investments/my-investments');
        const active = res.data.filter(inv => inv.status === 'active');
        setInvestments(active);
      } catch (err) {
        setError('Unable to load active investments.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  /* reset page if list size changes */
  useEffect(() => {
    setPage(1);
  }, [investments.length]);

  /* ---------------- derived values ---------------- */

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const totalProfit = investments.reduce(
    (sum, inv) => sum + (inv.profitEarned || 0),
    0
  );

  const totalPages = Math.ceil(investments.length / PAGE_SIZE);

  const paginatedInvestments = investments.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
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
        <h1 className="text-xl font-semibold">Active Investments</h1>
        <p className="text-sm text-text-muted mt-1">
          Your running investments and ROI progress
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
            label="Active Plans"
            value={investments.length}
            icon={FiClock}
          />
          <SummaryCard
            label="Total Invested"
            value={formatCurrency(totalInvested)}
            icon={FiTrendingUp}
          />
          <SummaryCard
            label="Profit Earned"
            value={formatCurrency(totalProfit)}
            icon={FiTrendingUp}
          />
        </div>
      )}

      {/* EMPTY STATE */}
      {investments.length === 0 && !error && (
        <div className="bg-bg-surface border border-bg-elevated rounded-xl p-8 text-center">
          <p className="text-text-muted mb-3">
            You don’t have any active investments.
          </p>
          <button
            onClick={() => navigate('/investments/invest')}
            className="inline-flex items-center gap-2 bg-brand-primary text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-hover transition"
          >
            <FiTrendingUp />
            Start investing
          </button>
        </div>
      )}

      {/* LIST */}
      <div className="space-y-4">
        {paginatedInvestments.map(inv => {
          const progress =
            inv.status === 'completed'
              ? 100
              : calcProgress(inv.startDate, inv.endDate);

          return (
            <div
              key={inv._id}
              onClick={() => navigate(`/investments/${inv._id}`)}
              className="bg-bg-surface border border-bg-elevated rounded-xl p-6 cursor-pointer hover:bg-bg-elevated transition"
            >
              {/* TOP */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-semibold">
                    {inv.planId?.name || 'Deleted plan'}
                  </h3>
                  <p className="text-sm text-text-muted">
                    Ends on {new Date(inv.endDate).toLocaleDateString()}
                  </p>
                </div>

                <span className="text-sm font-semibold text-brand-primary">
                  {formatCurrency(inv.amount)}
                </span>
              </div>

              {/* DETAILS */}
              <div className="grid gap-3 sm:grid-cols-3 text-sm">
                <div>
                  <p className="text-text-muted">Profit earned</p>
                  <p className="font-medium">
                    {formatCurrency(inv.profitEarned)}
                  </p>
                </div>

                <div>
                  <p className="text-text-muted">Next ROI</p>
                  <p className="font-medium">
                    {new Date(inv.nextProfitTime).toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-text-muted">Status</p>
                  <span className="inline-block px-2 py-0.5 rounded-md text-xs bg-green-500/15 text-green-400">
                    Active
                  </span>
                </div>
              </div>

              {/* PROGRESS */}
              <div className="mt-5">
                <div className="flex justify-between text-xs text-text-muted mb-1">
                  <span>Progress</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
                  <div
                    className="h-full bg-brand-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 pt-4">
          <button
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className="px-4 py-2 rounded-lg bg-bg-elevated text-sm disabled:opacity-40 hover:bg-bg-main"
          >
            Previous
          </button>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className="px-4 py-2 rounded-lg bg-bg-elevated text-sm disabled:opacity-40 hover:bg-bg-main"
          >
            Next
          </button>
        </div>
      )}
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

export default ActiveInvestments;

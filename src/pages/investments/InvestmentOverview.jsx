import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '@api/axios';
import {
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
  FiPlus,
  FiBarChart2,
} from 'react-icons/fi';

/* ------------------ helpers ------------------ */

const formatCurrency = value =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value || 0);

const StatusBadge = ({ status }) => {
  const styles = {
    active: 'bg-green-500/15 text-green-400',
    completed: 'bg-gray-500/15 text-gray-400',
    pending: 'bg-yellow-500/15 text-yellow-400',
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-md text-xs capitalize ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
};

/* ------------------ component ------------------ */

const InvestmentOverview = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/investments/my-investments');
        setInvestments(res.data);
      } catch (err) {
        setError('Failed to load investment data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* ------------------ derived stats ------------------ */

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);

  const totalProfit = investments.reduce(
    (sum, inv) => sum + (inv.profitEarned || 0),
    0
  );

  const activeCount = investments.filter(inv => inv.status === 'active').length;

  const completedCount = investments.filter(
    inv => inv.status === 'completed'
  ).length;

  const recentInvestments = investments.slice(0, 5);

  const stats = [
    {
      label: 'Total Invested',
      value: formatCurrency(totalInvested),
      icon: FiBarChart2,
      link: '/investments/active',
    },
    {
      label: 'Active Investments',
      value: activeCount,
      icon: FiClock,
      link: '/investments/active',
    },
    {
      label: 'Total Profit',
      value: formatCurrency(totalProfit),
      icon: FiTrendingUp,
      link: '/wallet',
    },
    {
      label: 'Completed',
      value: completedCount,
      icon: FiCheckCircle,
      link: '/investments/completed',
    },
  ];

  /* ------------------ render ------------------ */

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">Investments</h1>
          <p className="text-sm text-text-muted mt-1">
            Track performance and grow your portfolio
          </p>
        </div>

        <Link
          to="/investments/invest"
          className="inline-flex items-center gap-2 bg-brand-primary text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand-hover transition"
        >
          <FiPlus />
          New Investment
        </Link>
      </div>

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 text-red-400 text-sm p-4 rounded-lg">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {(loading ? Array(4).fill(null) : stats).map((item, idx) => {
          if (loading) {
            return (
              <div
                key={idx}
                className="bg-bg-surface border border-bg-elevated rounded-xl p-5 animate-pulse h-20"
              />
            );
          }

          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              to={item.link}
              className="bg-bg-surface border border-bg-elevated rounded-xl p-5 flex items-center gap-4 hover:bg-bg-elevated transition"
            >
              <div className="size-10 rounded-lg bg-brand-primary/15 text-brand-primary flex items-center justify-center">
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-xs text-text-muted">{item.label}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* ACTION CARDS */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link
          to="/investments/invest"
          className="group bg-bg-surface border border-bg-elevated rounded-xl p-6 transition hover:bg-bg-elevated hover:-translate-y-0.5"
        >
          <FiTrendingUp className="text-brand-primary size-6 mb-4" />
          <h3 className="font-semibold">Invest</h3>
          <p className="text-sm text-text-muted mt-1">
            Choose a plan and start earning returns
          </p>
          <span className="mt-4 inline-block text-sm text-brand-primary group-hover:underline">
            Get started →
          </span>
        </Link>

        <Link
          to="/investments/active"
          className="group bg-bg-surface border border-bg-elevated rounded-xl p-6 transition hover:bg-bg-elevated hover:-translate-y-0.5"
        >
          <FiClock className="text-brand-primary size-6 mb-4" />
          <h3 className="font-semibold">Active Investments</h3>
          <p className="text-sm text-text-muted mt-1">
            Monitor running plans and ROI progress
          </p>
          <span className="mt-4 inline-block text-sm text-brand-primary group-hover:underline">
            View active →
          </span>
        </Link>

        <Link
          to="/investments/completed"
          className="group bg-bg-surface border border-bg-elevated rounded-xl p-6 transition hover:bg-bg-elevated hover:-translate-y-0.5"
        >
          <FiCheckCircle className="text-brand-primary size-6 mb-4" />
          <h3 className="font-semibold">Completed</h3>
          <p className="text-sm text-text-muted mt-1">
            Review completed investments and profits
          </p>
          <span className="mt-4 inline-block text-sm text-brand-primary group-hover:underline">
            See history →
          </span>
        </Link>
      </div>

      {/* RECENT INVESTMENTS */}
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Investments</h3>
          <Link
            to="/investments/active"
            className="text-sm text-brand-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-text-muted">Loading investments...</p>
        ) : recentInvestments.length === 0 ? (
          <p className="text-sm text-text-muted">
            You haven’t made any investments yet.
          </p>
        ) : (
          <div className="space-y-4">
            {recentInvestments.map(inv => (
              <div
                key={inv._id}
                onClick={() => navigate(`/investments/${inv._id}`)}
                className="flex items-center justify-between border border-bg-elevated rounded-lg p-4"
              >
                <div>
                  <p className="font-medium">
                    {inv.planId?.name || 'Investment'}
                  </p>
                  <p className="text-xs text-text-muted">
                    {formatCurrency(inv.amount)}
                  </p>
                </div>

                <StatusBadge status={inv.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentOverview;

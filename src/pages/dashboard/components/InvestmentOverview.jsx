import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FiTrendingUp, FiCheckCircle, FiClock } from 'react-icons/fi';
import api from '@api/axios';

const statusMap = {
  active: {
    icon: FiTrendingUp,
    color: 'text-[color:var(--color-status-info)]',
    bg: 'bg-[color:var(--color-status-info)/10]',
  },
  completed: {
    icon: FiCheckCircle,
    color: 'text-[color:var(--color-status-success)]',
    bg: 'bg-[color:var(--color-status-success)/10]',
  },
  pending: {
    icon: FiClock,
    color: 'text-[color:var(--color-status-warning)]',
    bg: 'bg-[color:var(--color-status-warning)/10]',
  },
};

const capitalize = str =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

const InvestmentOverview = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await api.get('/investments/my-investments');
        setInvestments(res.data);
      } catch (error) {
        console.error('Failed to load investments', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  if (loading) {
    return <div className="h-48 bg-bg-elevated rounded-xl animate-pulse" />;
  }

  return (
    <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
      {/* header */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-semibold uppercase">Investments</h2>
        <Link
          to="/investments"
          className="text-sm text-brand-primary hover:border-b"
        >
          View all
        </Link>
      </div>

      {investments.length === 0 ? (
        <p className="text-sm text-text-muted">
          You have no active investments.
        </p>
      ) : (
        <ul className="space-y-3">
          {investments.slice(0, 3).map(inv => {
            const status = statusMap[inv.status] ?? {};
            const Icon = status.icon ?? FiTrendingUp;

            return (
              <li
                key={inv._id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-elevated"
              >
                {/* left */}
                <div className="flex items-center gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      status.bg ?? 'bg-bg-elevated'
                    } ${status.color ?? 'text-text-muted'}`}
                  >
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">{inv.planName}</p>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full
                        ${status.bg ?? 'bg-bg-elevated'}
                        ${status.color ?? 'text-text-muted'}
                      `}
                    >
                      {capitalize(inv.status)}
                    </span>
                  </div>
                </div>

                {/* right */}
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    ${inv.amount.toFixed(2)}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <Link
        to="/investments"
        className="block text-center mt-6 bg-bg-elevated hover:bg-brand-primary hover:text-bg-main transition-colors py-2 rounded-lg text-sm"
      >
        Invest now
      </Link>
    </div>
  );
};

export default InvestmentOverview;

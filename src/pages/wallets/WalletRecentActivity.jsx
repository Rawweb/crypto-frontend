import { useEffect, useState } from 'react';
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
import api from '@api/axios';

// status → design tokens
const statusStyles = {
  approved: {
    bg: 'bg-[color:var(--color-status-success)/10]',
    text: 'text-[color:var(--color-status-success)]',
  },
  processed: {
    bg: 'bg-[color:var(--color-status-success)/10]',
    text: 'text-[color:var(--color-status-success)]',
  },
  pending: {
    bg: 'bg-[color:var(--color-status-warning)/10]',
    text: 'text-[color:var(--color-status-warning)]',
  },
  rejected: {
    bg: 'bg-[color:var(--color-status-danger)/10]',
    text: 'text-[color:var(--color-status-danger)]',
  },
};

// helpers
const capitalize = str =>
  str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

const getRelativeTime = date => {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};

const groupByDate = items =>
  items.reduce((groups, item) => {
    const day = new Date(item.createdAt).toDateString();
    if (!groups[day]) groups[day] = [];
    groups[day].push(item);
    return groups;
  }, {});

const PAGE_SIZE = 10;

const WalletRecentActivity = () => {
  const [allActivity, setAllActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const [depositsRes, withdrawalsRes] = await Promise.all([
          api.get('/wallet/deposits'),
          api.get('/wallet/withdrawals'),
        ]);

        const combined = [
          ...depositsRes.data.map(d => ({ ...d, type: 'Deposit' })),
          ...withdrawalsRes.data.map(w => ({ ...w, type: 'Withdrawal' })),
        ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setAllActivity(combined);
      } catch (error) {
        console.error('Failed to load activity', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, []);

  if (loading) {
    return <div className="h-48 bg-bg-elevated rounded-xl" />;
  }

  const paginatedActivity = allActivity.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  const groupedActivity = groupByDate(paginatedActivity);

  const totalPages = Math.ceil(allActivity.length / PAGE_SIZE);

  return (
    <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
      <h2 className="font-semibold uppercase mb-5">
        Recent Activity
      </h2>

      {paginatedActivity.length === 0 ? (
        <p className="text-sm text-text-muted">
          No recent activity yet.
        </p>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedActivity).map(([day, items]) => (
            <div key={day}>
              {/* date divider */}
              <div className="flex items-center gap-3 mb-3">
                <div className="h-px flex-1 bg-bg-elevated" />
                <span className="text-xs text-text-muted">{day}</span>
                <div className="h-px flex-1 bg-bg-elevated" />
              </div>

              <ul className="space-y-3">
                {items.map(item => {
                  const isDeposit = item.type === 'Deposit';
                  const status = statusStyles[item.status];

                  return (
                    <li
                      key={item._id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-bg-elevated"
                    >
                      {/* left */}
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-2 rounded-full bg-bg-main ${
                            status?.bg ?? 'bg-bg-elevated'
                          } ${status?.text ?? 'text-text-muted'}`}
                        >
                          {isDeposit ? (
                            <FiArrowDownLeft className="size-5" />
                          ) : (
                            <FiArrowUpRight className="size-5" />
                          )}
                        </div>

                        <div>
                          <p className="text-sm font-semibold uppercase">
                            {item.type}
                          </p>

                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`py-0.5 px-2 text-xs rounded-full
                                ${status?.bg ?? 'bg-bg-elevated'}
                                ${status?.text ?? 'text-text-muted'}
                              `}
                            >
                              {capitalize(item.status)}
                            </span>

                            <span className="text-xs text-text-muted">
                              {getRelativeTime(item.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* right */}
                      <div className="text-right">
                        <p
                          className={`text-sm font-semibold ${
                            status?.text ?? 'text-text-muted'
                          }`}
                        >
                          {isDeposit ? '+' : '-'}$
                          {item.amount.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      )}

      {/* pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
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

export default WalletRecentActivity;

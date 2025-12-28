import { Link } from 'react-router-dom';
import { FiTrendingUp, FiClock, FiCheckCircle } from 'react-icons/fi';

const InvestmentOverview = () => {
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-semibold">Investments</h1>
        <p className="text-sm text-text-muted mt-1">
          Manage and track all your investments in one place
        </p>
      </div>

      {/* ACTION CARDS (like Wallet actions) */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link
          to="/investments/invest"
          className="bg-bg-surface border border-bg-elevated rounded-xl p-6 hover:bg-bg-elevated transition"
        >
          <FiTrendingUp className="text-brand-primary size-6 mb-3" />
          <h3 className="font-semibold">Invest</h3>
          <p className="text-sm text-text-muted mt-1">
            Choose a plan and start earning ROI
          </p>
        </Link>

        <Link
          to="/investments/active"
          className="bg-bg-surface border border-bg-elevated rounded-xl p-6 hover:bg-bg-elevated transition"
        >
          <FiClock className="text-brand-primary size-6 mb-3" />
          <h3 className="font-semibold">Active Investments</h3>
          <p className="text-sm text-text-muted mt-1">
            Track running investments and ROI progress
          </p>
        </Link>

        <Link
          to="/investments/completed"
          className="bg-bg-surface border border-bg-elevated rounded-xl p-6 hover:bg-bg-elevated transition"
        >
          <FiCheckCircle className="text-brand-primary size-6 mb-3" />
          <h3 className="font-semibold">Completed</h3>
          <p className="text-sm text-text-muted mt-1">
            View completed investments and profits earned
          </p>
        </Link>
      </div>
    </div>
  );
};

export default InvestmentOverview;

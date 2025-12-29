import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@api/axios';
import {
  FiArrowLeft,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
} from 'react-icons/fi';

/* helpers */
const formatCurrency = value =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value || 0);

const calcProgress = (start, end) => {
  const now = Date.now();
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (now <= s) return 0;
  if (now >= e) return 100;
  return ((now - s) / (e - s)) * 100;
};

const InvestmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [investment, setInvestment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestment = async () => {
      try {
        const res = await api.get(`/investments/${id}`);
        setInvestment(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvestment();
  }, [id]);

  if (loading) {
    return <div className="h-40 bg-bg-elevated rounded-xl animate-pulse" />;
  }

  if (!investment) {
    return <p className="text-text-muted">Investment not found.</p>;
  }

  const progress = calcProgress(investment.startDate, investment.endDate);

  const maxProfit = investment.amount * (investment.planId?.maxMultiplier || 3);

  return (
    <div className="space-y-8">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-text-muted"
      >
        <FiArrowLeft /> Back
      </button>

      {/* Header */}
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
        <h1 className="text-xl font-semibold mb-1">
          {investment.planId?.name || 'Investment'}
        </h1>
        <p className="text-sm text-text-muted">
          {formatCurrency(investment.amount)} invested
        </p>

        <span className="inline-flex items-center gap-1 mt-3 text-xs bg-green-500/15 text-green-400 px-2 py-0.5 rounded">
          <FiCheckCircle />
          {investment.status}
        </span>
      </div>

      {/* Progress */}
      <div className="bg-bg-surface border border-bg-elevated rounded-xl p-6">
        <div className="flex justify-between text-sm mb-2">
          <span>Progress</span>
          <span>{progress.toFixed(0)}%</span>
        </div>
        <div className="h-2 bg-bg-elevated rounded-full overflow-hidden">
          <div
            className="h-full bg-brand-primary"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-5 text-sm">
          <div>
            <p className="text-text-muted">Next ROI</p>
            <p>{new Date(investment.nextProfitTime).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-text-muted">Profit Earned</p>
            <p>{formatCurrency(investment.profitEarned)}</p>
          </div>
          <div>
            <p className="text-text-muted">Max Profit</p>
            <p>{formatCurrency(maxProfit)}</p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/investments/${id}/profits`)}
          className="px-4 py-2 border border-bg-elevated rounded-lg text-sm hover:bg-bg-elevated transition"
        >
          View Profit History
        </button>

        <button
          disabled={investment.profitEarned <= 0}
          onClick={() => navigate('/wallet')}
          className="px-4 py-2 bg-brand-primary text-black rounded-lg text-sm disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Withdraw Profit
        </button>
      </div>
    </div>
  );
};

export default InvestmentDetails;

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '@api/axios';
import { FiTrendingUp, FiArrowLeft } from 'react-icons/fi';

const ProfitHistory = () => {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await api.get('/wallet/transactions');
        setLogs(
          res.data.filter(l => l.type === 'profit' && l.investmentId === id)
        );
      } catch (err) {
        console.error('Failed to load profit history', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  if (loading) {
    return <div className="h-32 bg-bg-elevated rounded-xl animate-pulse" />;
  }

  return (
    <div className="space-y-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm text-text-muted"
      >
        <FiArrowLeft /> Back
      </button>

      <h1 className="text-xl font-semibold">Profit History</h1>

      {logs.length === 0 ? (
        <p className="text-text-muted">No profit records yet.</p>
      ) : (
        <div className="space-y-3">
          {logs.map(log => (
            <div
              key={log._id}
              className="flex justify-between items-center bg-bg-surface border border-bg-elevated p-4 rounded-lg"
            >
              <div>
                <p className="font-medium">ROI credited</p>
                <p className="text-xs text-text-muted">
                  {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>

              <span className="flex items-center gap-1 text-green-400">
                <FiTrendingUp />${log.amount.toFixed(2)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfitHistory;

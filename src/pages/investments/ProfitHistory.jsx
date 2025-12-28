import { useEffect, useState } from 'react';
import api from '@api/axios';
import { FiTrendingUp } from 'react-icons/fi';

const ProfitHistory = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await api.get('/wallet/transactions');
      setLogs(res.data.filter(l => l.type === 'profit'));
    };
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6">
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

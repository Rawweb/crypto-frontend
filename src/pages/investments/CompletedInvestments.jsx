import { useEffect, useState } from 'react';
import api from '@api/axios';

const CompletedInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await api.get('/investments/my-investments');
        setInvestments(res.data.filter(inv => inv.status === 'completed'));
      } catch (err) {
        console.error('Failed to load investments');
      } finally {
        setLoading(false);
      }
    };

    fetchInvestments();
  }, []);

  if (loading) {
    return <div className="h-40 bg-bg-elevated rounded-xl" />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Completed Investments</h1>

      {investments.length === 0 ? (
        <p className="text-text-muted">No completed investments</p>
      ) : (
        <div className="space-y-4">
          {investments.map(inv => (
            <div
              key={inv._id}
              className="bg-bg-surface border border-bg-elevated rounded-xl p-5"
            >
              <h3 className="font-semibold mb-1">{inv.planId.name}</h3>

              <div className="text-sm text-text-muted space-y-1">
                <p>Invested: ${inv.amount}</p>
                <p>Total profit: ${inv.profitEarned.toFixed(2)}</p>
                <p>Started: {new Date(inv.startDate).toLocaleDateString()}</p>
                <p>Completed: {new Date(inv.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedInvestments;

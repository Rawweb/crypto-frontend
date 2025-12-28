import { useEffect, useState } from 'react';
import api from '@api/axios';

const ActiveInvestments = () => {
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const res = await api.get('/investments/my-investments');
        setInvestments(res.data.filter(inv => inv.status === 'active'));
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
      <h1 className="text-xl font-semibold">Active Investments</h1>

      {investments.length === 0 ? (
        <p className="text-text-muted">No active investments</p>
      ) : (
        <div className="space-y-4">
          {investments.map(inv => (
            <div
              key={inv._id}
              className="bg-bg-surface border border-bg-elevated rounded-xl p-5"
            >
              <h3 className="font-semibold mb-1">{inv.planId.name}</h3>

              <div className="text-sm text-text-muted space-y-1">
                <p>Amount: ${inv.amount}</p>
                <p>Profit earned: ${inv.profitEarned.toFixed(2)}</p>
                <p>
                  Next profit: {new Date(inv.nextProfitTime).toLocaleString()}
                </p>
                <p>Ends: {new Date(inv.endDate).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveInvestments;

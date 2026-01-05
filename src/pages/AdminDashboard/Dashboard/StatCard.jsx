const StatCard = ({ label, value }) => {
  return (
    <div className="bg-bg-surface border border-bg-elevated rounded-xl p-4">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
};

export default StatCard;

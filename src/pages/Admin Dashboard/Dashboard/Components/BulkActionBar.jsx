const BulkActionBar = ({ count, onAction }) => {
  if (count === 0) return null;

  return (
    <div className="flex items-center justify-between bg-bg-surface border border-bg-elevated rounded-lg p-3">
      <span className="text-sm">{count} users selected</span>

      <div className="flex gap-2">
        <button
          onClick={() => onAction('active')}
          className="px-3 py-1 text-xs rounded bg-green-500/10 text-green-500"
        >
          Activate
        </button>

        <button
          onClick={() => onAction('suspended')}
          className="px-3 py-1 text-xs rounded bg-yellow-500/10 text-yellow-500"
        >
          Suspend
        </button>

        <button
          onClick={() => onAction('banned')}
          className="px-3 py-1 text-xs rounded bg-red-500/10 text-red-500"
        >
          Ban
        </button>
      </div>
    </div>
  );
};

export default BulkActionBar;

const ActionButtons = ({ onApprove, onReject, loading }) => {
  return (
    <div className="flex gap-2">
      <button
        disabled={loading}
        onClick={onApprove}
        className="px-3 py-1 text-xs rounded bg-status-success/10 text-status-success hover:bg-status-success/20 disabled:opacity-50"
      >
        Approve
      </button>

      <button
        disabled={loading}
        onClick={onReject}
        className="px-3 py-1 text-xs rounded bg-status-danger/10 text-status-danger hover:bg-status-danger/20 disabled:opacity-50"
      >
        Reject
      </button>
    </div>
  );
};

export default ActionButtons;

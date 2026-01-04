const Pagination = ({ page, totalPages, onChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between text-sm">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="px-3 py-1 rounded border border-bg-elevated disabled:opacity-40"
      >
        Prev
      </button>

      <span className="text-text-muted">
        Page {page} of {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="px-3 py-1 rounded border border-bg-elevated disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;

const AdminSkeleton = ({ cards = 4, tableRows = 6, showTable = true }) => {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {Array.from({ length: cards }).map((_, i) => (
          <div key={i} className="h-20 bg-bg-elevated rounded-xl" />
        ))}
      </div>

      {/* Table skeleton */}
      {showTable && (
        <div className="bg-bg-surface border border-bg-elevated rounded-xl p-4 space-y-4">
          <div className="h-4 w-40 bg-bg-elevated rounded" />

          {Array.from({ length: tableRows }).map((_, i) => (
            <div key={i} className="h-10 bg-bg-elevated rounded" />
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSkeleton;

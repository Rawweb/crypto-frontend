const AdminTable = ({ columns, data }) => {
  return (
    <div className="space-y-3">
      {/* Desktop table */}
      <div className="hidden lg:block">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-bg-elevated text-text-muted">
              {columns.map(col => (
                <th
                  key={col.key}
                  className="text-left font-medium py-3 px-2"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-bg-elevated hover:bg-bg-elevated/50"
              >
                {columns.map(col => (
                  <td key={col.key} className="py-3 px-2">
                    {col.render
                      ? col.render(row)
                      : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked rows */}
      <div className="lg:hidden space-y-3">
        {data.map((row, idx) => (
          <div
            key={idx}
            className="bg-bg-surface border border-bg-elevated rounded-xl p-4 space-y-4"
          >
            {columns.map(col => (
              <div key={col.key} className="flex flex-col justify-between gap-2">
                <span className="text-xs text-text-muted bg-bg-elevated px-2 py-1 rounded-md w-fit">
                  {col.label}
                </span>
                <span className="text-sm text-left">
                  {col.render
                    ? col.render(row)
                    : row[col.key]}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTable;

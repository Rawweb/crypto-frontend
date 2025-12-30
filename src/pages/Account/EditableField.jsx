const EditableField = ({
  label,
  name,
  value,
  editing,
  onChange,
  type = 'text',
  options,
}) => {
  return (
    <div className="space-y-1">
      <p className="text-text-muted text-sm">{label}</p>

      {editing ? (
        options ? (
          <select
            name={name}
            value={value || ''}
            onChange={onChange}
            className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option value="">Select</option>
            {options.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value || ''}
            onChange={onChange}
            className="w-full bg-bg-main border border-bg-elevated rounded-lg px-3 py-2 text-sm focus:outline-none"
          />
        )
      ) : (
        <p className="w-full border border-bg-elevated rounded-lg px-3 py-2 text-sm text-text-primary">
          {value || 'Not set'}
        </p>
      )}
    </div>
  );
};

export default EditableField;

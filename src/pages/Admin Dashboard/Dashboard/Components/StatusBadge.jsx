const styles = {
  deposit: 'bg-green-500/10 text-green-500',
  withdrawal: 'bg-yellow-500/10 text-yellow-500',
  profit: 'bg-blue-500/10 text-blue-500',
  adjustment: 'bg-purple-500/10 text-purple-500',
};

const StatusBadge = ({ type }) => {
  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium capitalize ${styles[type]}`}
    >
      {type}
    </span>
  );
};

export default StatusBadge;

const styles = {
  BTC: 'bg-orange-500/10 text-orange-500',
  ETH: 'bg-blue-500/10 text-blue-500',
  USDT: 'bg-green-500/10 text-green-500',
};

const NetworkBadge = ({ network }) => {
  if (!network) return '—';

  return (
    <span
      className={`px-2 py-1 rounded text-xs font-medium ${
        styles[network] || 'bg-bg-elevated text-text-muted'
      }`}
    >
      {network}
    </span>
  );
};

export default NetworkBadge;

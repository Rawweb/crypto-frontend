export const normalizeNetworkName = network => {
  if (!network) return null;

  // Handles: USDT_ETH, USDT_TRON, etc.
  if (network.startsWith('USDT')) return 'USDT';
  if (network.startsWith('BTC')) return 'BTC';
  if (network.startsWith('ETH')) return 'ETH';

  return network; // fallback for future types
}
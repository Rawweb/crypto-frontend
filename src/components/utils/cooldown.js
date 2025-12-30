export const getRemainingSeconds = nextAllowedAt => {
  if (!nextAllowedAt) return 0;
  const diff = new Date(nextAllowedAt).getTime() - Date.now();
  return Math.max(Math.ceil(diff / 1000), 0);
};

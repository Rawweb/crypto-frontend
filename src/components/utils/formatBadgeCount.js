export const formatBadgeCount = count => {
  if (!count || count <= 0) return null;
  if (count > 99) return '99+';
  return count.toString();
};

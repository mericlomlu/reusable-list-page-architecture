const DAY_MS = 24 * 60 * 60 * 1000;

/** Formats an ISO date as a short relative label, e.g. "3d ago" or "today". */
export function formatRelativeTime(isoDate: string, now = new Date()): string {
  const then = new Date(`${isoDate}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((today.getTime() - then.getTime()) / DAY_MS);

  if (days <= 0) return "today";
  if (days === 1) return "1d ago";
  if (days < 7) return `${days}d ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}

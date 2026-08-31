const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

/**
 * Formats an ISO datetime as a short relative label with minute/hour
 * precision, e.g. "12m ago" or "1h ago". Deployments are recent and frequent
 * enough that {@link formatRelativeTime}'s day-level granularity would show
 * "today" for everything in the last 24 hours.
 */
export function formatDeploymentRelativeTime(
  isoDateTime: string,
  now = new Date(),
): string {
  const then = new Date(isoDateTime);
  const diffMs = Math.max(0, now.getTime() - then.getTime());

  if (diffMs < MINUTE_MS) return "just now";
  if (diffMs < HOUR_MS) return `${Math.floor(diffMs / MINUTE_MS)}m ago`;
  if (diffMs < DAY_MS) return `${Math.floor(diffMs / HOUR_MS)}h ago`;
  const days = Math.floor(diffMs / DAY_MS);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.round(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.round(days / 30);
  return `${months}mo ago`;
}

export function deploymentDateRangeCutoff(
  range: "24h" | "7d" | "30d",
  now = new Date(),
): Date {
  const hours = range === "24h" ? 24 : range === "7d" ? 24 * 7 : 24 * 30;
  return new Date(now.getTime() - hours * HOUR_MS);
}

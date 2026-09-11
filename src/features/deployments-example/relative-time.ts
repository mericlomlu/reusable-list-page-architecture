const MINUTE_MS = 60 * 1000;
const HOUR_MS = 60 * MINUTE_MS;
const DAY_MS = 24 * HOUR_MS;

/**
 * Formats an ISO datetime as a short, locale-aware relative label with
 * minute/hour precision (e.g. "12m ago" / "1h ago" in English, "12dk önce" /
 * "1sa önce" in Turkish) via the platform's Intl.RelativeTimeFormat.
 * Deployments are recent and frequent enough that day-level granularity
 * would show "today" for everything in the last 24 hours.
 */
export function formatDeploymentRelativeTime(
  isoDateTime: string,
  locale: string,
  now = new Date(),
): string {
  const then = new Date(isoDateTime);
  const diffMs = Math.max(0, now.getTime() - then.getTime());
  const rtf = new Intl.RelativeTimeFormat(locale, {
    style: "narrow",
    numeric: "auto",
  });

  if (diffMs < MINUTE_MS) return rtf.format(0, "second");
  if (diffMs < HOUR_MS)
    return rtf.format(-Math.floor(diffMs / MINUTE_MS), "minute");
  if (diffMs < DAY_MS) return rtf.format(-Math.floor(diffMs / HOUR_MS), "hour");
  const days = Math.floor(diffMs / DAY_MS);
  if (days < 7) return rtf.format(-days, "day");
  const weeks = Math.round(days / 7);
  if (weeks < 5) return rtf.format(-weeks, "week");
  const months = Math.round(days / 30);
  return rtf.format(-months, "month");
}

export function deploymentDateRangeCutoff(
  range: "24h" | "7d" | "30d",
  now = new Date(),
): Date {
  const hours = range === "24h" ? 24 : range === "7d" ? 24 * 7 : 24 * 30;
  return new Date(now.getTime() - hours * HOUR_MS);
}

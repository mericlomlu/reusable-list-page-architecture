const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Formats an ISO date as a short, locale-aware relative label (e.g. "3d ago"
 * or "today" in English; "3 gün önce" / "bugün" in Turkish) using the
 * platform's Intl.RelativeTimeFormat, which handles pluralization correctly
 * per locale.
 */
export function formatRelativeTime(
  isoDate: string,
  locale: string,
  now = new Date(),
): string {
  const then = new Date(`${isoDate}T00:00:00`);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((today.getTime() - then.getTime()) / DAY_MS);
  const rtf = new Intl.RelativeTimeFormat(locale, {
    style: "narrow",
    numeric: "auto",
  });

  if (days <= 0) return rtf.format(0, "day");
  if (days < 7) return rtf.format(-days, "day");
  const weeks = Math.round(days / 7);
  if (weeks < 5) return rtf.format(-weeks, "week");
  const months = Math.round(days / 30);
  return rtf.format(-months, "month");
}

/** Confirmed permanent production origin (no custom domain is planned). */
export const PRODUCTION_SITE_URL =
  "https://reusable-list-page-architecture.vercel.app";

function stripTrailingSlashes(url: string): string {
  return url.replace(/\/+$/, "");
}

function withHttps(host: string): string {
  return /^https?:\/\//i.test(host) ? host : `https://${host}`;
}

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) {
    return stripTrailingSlashes(withHttps(explicit));
  }

  const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProductionUrl) {
    return stripTrailingSlashes(withHttps(vercelProductionUrl));
  }

  return PRODUCTION_SITE_URL;
}

/** Absolute site origin, resolved once at module load with no trailing slash. */
export const SITE_URL = resolveSiteUrl();

/**
 * Builds an absolute URL for a site-relative path (e.g. "/reference/architecture").
 * Pass `locale` to prefix the path with its locale segment (e.g. "/tr/reference/architecture"),
 * matching the app's `localePrefix: "always"` routing.
 */
export function absoluteUrl(path = "/", locale?: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const localizedPath = locale
    ? `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`
    : normalizedPath;
  return `${SITE_URL}${localizedPath}`;
}

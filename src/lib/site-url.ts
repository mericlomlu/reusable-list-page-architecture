const DEV_FALLBACK_URL = "http://localhost:3000";

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

  return DEV_FALLBACK_URL;
}

/** Absolute site origin, resolved once at module load with no trailing slash. */
export const SITE_URL = resolveSiteUrl();

/** Builds an absolute URL for a site-relative path (e.g. "/reference/architecture"). */
export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}

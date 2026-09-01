import type { Metadata } from "next";
import {
  SITE_NAME,
  SOCIAL_IMAGE_ALT,
  SOCIAL_IMAGE_PATH,
  SOCIAL_IMAGE_SIZE,
  SOCIAL_IMAGE_TYPE,
} from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";

interface RouteMetadataInput {
  /** Route title, e.g. "Components" — the root layout's title template adds the site name suffix. */
  title: string;
  description: string;
  /** Site-relative canonical path, e.g. "/examples/components". */
  path: string;
}

/**
 * Builds complete per-route metadata (title, description, canonical, Open
 * Graph, Twitter) for a non-root page.
 *
 * Next.js metadata merges shallowly: a page that only sets `title`/
 * `description` still inherits the root layout's entire `openGraph`/
 * `twitter` objects verbatim, including its title, description, and URL.
 * Every non-root page must go through this helper so it gets its own
 * complete social metadata instead of silently emitting the homepage's.
 */
export function buildRouteMetadata({
  title,
  description,
  path,
}: RouteMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const socialTitle = `${title} | ${SITE_NAME}`;

  const image = {
    url: absoluteUrl(SOCIAL_IMAGE_PATH),
    width: SOCIAL_IMAGE_SIZE.width,
    height: SOCIAL_IMAGE_SIZE.height,
    alt: SOCIAL_IMAGE_ALT,
    type: SOCIAL_IMAGE_TYPE,
  };

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      locale: "en_US",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

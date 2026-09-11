import type { MetadataRoute } from "next";
import { navigationConfig } from "@/config/navigation";
import { routing } from "@/i18n/routing";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // Every current nav item is a real, indexable page, so the sitemap reuses
  // navigationConfig instead of a parallel route list. If a future nav item
  // stops being crawlable (an anchor, an external link, a noindex route),
  // filter it out here explicitly rather than adding it silently.
  const routes = navigationConfig.flatMap((group) =>
    group.items.map((item) => item.href),
  );

  return routes.flatMap((route) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(route, locale),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.7,
      alternates: {
        languages: {
          ...Object.fromEntries(
            routing.locales.map((loc) => [loc, absoluteUrl(route, loc)]),
          ),
          "x-default": absoluteUrl(route, routing.defaultLocale),
        },
      },
    })),
  );
}

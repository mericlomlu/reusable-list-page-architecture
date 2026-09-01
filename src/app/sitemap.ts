import type { MetadataRoute } from "next";
import { navigationConfig } from "@/config/navigation";
import { absoluteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  // Every current nav item is a real, indexable page, so the sitemap reuses
  // navigationConfig instead of a parallel route list. If a future nav item
  // stops being crawlable (an anchor, an external link, a noindex route),
  // filter it out here explicitly rather than adding it silently.
  const routes = navigationConfig.flatMap((group) =>
    group.items.map((item) => item.href),
  );

  return routes.map((route) => ({
    url: absoluteUrl(route),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}

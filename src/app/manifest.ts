import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Reusable List Page Architecture",
    short_name: "List Page Architecture",
    description:
      "An interactive showcase of reusable list page patterns built with Next.js and TypeScript.",
    start_url: "/",
    display: "browser",
    background_color: "#f5f0e4",
    theme_color: "#f5f0e4",
    lang: "en",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}

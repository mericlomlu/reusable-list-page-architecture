import { absoluteUrl } from "@/lib/site-url";

const REPOSITORY_URL =
  "https://github.com/mericlomlu/reusable-list-page-architecture";

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  name: "Reusable List Page Architecture",
  description:
    "An interactive showcase of reusable list page patterns built with Next.js and TypeScript.",
  programmingLanguage: "TypeScript",
  codeRepository: REPOSITORY_URL,
  author: {
    "@type": "Person",
    name: "Meriç Lomlu",
  },
  url: absoluteUrl("/"),
};

export function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires a raw <script> tag; escaped per Next.js JSON-LD guidance.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c"),
      }}
    />
  );
}

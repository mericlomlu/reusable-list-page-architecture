import { useLocale, useTranslations } from "next-intl";
import { SITE_NAME } from "@/lib/site-config";
import { absoluteUrl } from "@/lib/site-url";

const REPOSITORY_URL =
  "https://github.com/mericlomlu/reusable-list-page-architecture";

export function StructuredData() {
  const locale = useLocale();
  const t = useTranslations("metadata");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: SITE_NAME,
    description: t("site.description"),
    programmingLanguage: "TypeScript",
    codeRepository: REPOSITORY_URL,
    author: {
      "@type": "Person",
      name: "Meriç Lomlu",
    },
    url: absoluteUrl("/", locale),
  };

  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires a raw <script> tag; escaped per Next.js JSON-LD guidance.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}

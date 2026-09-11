import { useTranslations } from "next-intl";
import {
  ArchitectureIcon,
  BuildingBlocksIcon,
  TemplatesIcon,
} from "@/components/icons/nav-icons";
import { LinkRecord } from "@/features/overview/link-record";

const REFERENCE_PAGES = [
  { key: "templates", icon: TemplatesIcon, href: "/reference/templates" },
  {
    key: "buildingBlocks",
    icon: BuildingBlocksIcon,
    href: "/reference/building-blocks",
  },
  {
    key: "architecture",
    icon: ArchitectureIcon,
    href: "/reference/architecture",
  },
] as const;

interface ReferenceCopy {
  readonly title: string;
  readonly description: string;
  readonly linkLabel: string;
}

export function ReferenceNavigation() {
  const t = useTranslations("overview.referenceNavigation");

  return (
    <section aria-labelledby="reference-nav-heading" className="mt-10">
      <h2
        id="reference-nav-heading"
        className="text-lg font-bold text-foreground"
      >
        {t("heading")}
      </h2>

      <ul className="mt-5 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {REFERENCE_PAGES.map(({ key, icon, href }) => {
          const copy = t.raw(`items.${key}`) as ReferenceCopy;
          return (
            <LinkRecord
              key={key}
              icon={icon}
              href={href}
              title={copy.title}
              description={copy.description}
              linkLabel={copy.linkLabel}
            />
          );
        })}
      </ul>
    </section>
  );
}

import { useTranslations } from "next-intl";
import {
  ComponentsIcon,
  DeploymentsIcon,
  IssuesIcon,
  PackagesIcon,
} from "@/components/icons/nav-icons";
import { LinkRecord } from "@/features/overview/link-record";

const EXAMPLES = [
  { key: "components", icon: ComponentsIcon, href: "/examples/components" },
  { key: "issues", icon: IssuesIcon, href: "/examples/issues" },
  { key: "deployments", icon: DeploymentsIcon, href: "/examples/deployments" },
  { key: "packages", icon: PackagesIcon, href: "/examples/packages" },
] as const;

interface ExampleCopy {
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly linkLabel: string;
}

export function ExampleShowcase() {
  const t = useTranslations("overview.exampleShowcase");

  return (
    <section aria-labelledby="examples-heading" className="mt-10">
      <h2 id="examples-heading" className="text-lg font-bold text-foreground">
        {t("heading")}
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {t("description")}
      </p>

      <ul className="mt-5 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {EXAMPLES.map(({ key, icon, href }) => {
          const copy = t.raw(`items.${key}`) as ExampleCopy;
          return (
            <LinkRecord
              key={key}
              icon={icon}
              href={href}
              title={copy.title}
              description={copy.description}
              tags={copy.tags}
              linkLabel={copy.linkLabel}
            />
          );
        })}
      </ul>
    </section>
  );
}

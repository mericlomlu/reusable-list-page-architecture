import { useTranslations } from "next-intl";
import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@/components/icons/list-icons";

interface CompositionColumnProps {
  heading: string;
  pathLabel: string;
  items: readonly string[];
}

function CompositionColumn({
  heading,
  pathLabel,
  items,
}: CompositionColumnProps) {
  return (
    <div className="flex-1 rounded-lg border border-border bg-card px-6 py-6">
      <h3 className="text-body font-bold text-foreground">{heading}</h3>
      <code className="mt-1 block font-mono text-caption text-muted-foreground">
        {pathLabel}
      </code>
      <ul className="mt-3 flex flex-col gap-1.5 text-body-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function CoreComposition() {
  const t = useTranslations("reference.architecture.coreComposition");
  const sharedCoreItems = t.raw("sharedCoreItems") as readonly string[];
  const pageOwnedItems = t.raw("pageOwnedItems") as readonly string[];

  return (
    <section aria-labelledby="core-composition-heading" className="mt-10">
      <h2
        id="core-composition-heading"
        className="text-lg font-bold text-foreground"
      >
        {t("heading")}
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {t("description")}
      </p>

      <div className="mt-5 flex flex-col items-stretch lg:flex-row">
        <CompositionColumn
          heading={t("sharedCoreHeading")}
          pathLabel="src/features/list-page/"
          items={sharedCoreItems}
        />
        <div
          aria-hidden="true"
          className="flex items-center justify-center py-2 lg:px-3 lg:py-0"
        >
          <ChevronDownIcon className="size-4 text-primary lg:hidden" />
          <ChevronRightIcon className="hidden size-4 text-primary lg:block" />
        </div>
        <CompositionColumn
          heading={t("pageOwnedHeading")}
          pathLabel="src/features/issues-example/"
          items={pageOwnedItems}
        />
      </div>

      <p className="mt-4 max-w-2xl text-body-sm text-foreground">
        {t("footnote")}
      </p>
    </section>
  );
}

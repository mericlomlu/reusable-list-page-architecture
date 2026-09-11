import { useTranslations } from "next-intl";

interface BoundaryPanelProps {
  heading: string;
  items: readonly string[];
}

function ServerBoundaryPanel({ heading, items }: BoundaryPanelProps) {
  return (
    <div className="flex-1 rounded-lg border border-border bg-card px-6 py-6">
      <h3 className="flex items-center gap-2 font-mono text-label font-bold tracking-wide text-foreground uppercase">
        <span
          aria-hidden="true"
          className="size-[7px] rounded-full bg-muted-foreground"
        />
        {heading}
      </h3>
      <ul className="mt-3 flex flex-col gap-1.5 text-body-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ClientBoundaryPanel({ heading, items }: BoundaryPanelProps) {
  return (
    <div className="flex-1 rounded-lg border border-border bg-card px-6 py-6">
      <h3 className="flex items-center gap-2 font-mono text-label font-bold tracking-wide text-foreground uppercase">
        <span
          aria-hidden="true"
          className="size-[7px] rounded-[2px] bg-primary"
        />
        {heading}
      </h3>
      <ul className="mt-3 flex flex-col gap-1.5 text-body-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function BoundaryPanels() {
  const t = useTranslations("reference.architecture.boundaryPanels");
  const serverOwnedItems = t.raw("serverOwnedItems") as readonly string[];
  const clientOwnedItems = t.raw("clientOwnedItems") as readonly string[];

  return (
    <section aria-labelledby="boundaries-heading" className="mt-10">
      <h2 id="boundaries-heading" className="text-lg font-bold text-foreground">
        {t("heading")}
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {t("description")}
      </p>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <ServerBoundaryPanel
          heading={t("serverOwnedHeading")}
          items={serverOwnedItems}
        />
        <ClientBoundaryPanel
          heading={t("clientOwnedHeading")}
          items={clientOwnedItems}
        />
      </div>

      <p className="mt-4 max-w-2xl text-body-sm text-foreground">
        {t("footnote")}
      </p>
    </section>
  );
}

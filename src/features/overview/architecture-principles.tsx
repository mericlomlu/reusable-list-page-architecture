import { useTranslations } from "next-intl";

interface Principle {
  readonly title: string;
  readonly description: string;
}

export function ArchitecturePrinciples() {
  const t = useTranslations("overview.architecturePrinciples");
  const principles = t.raw("items") as readonly Principle[];

  return (
    <section aria-labelledby="principles-heading" className="mt-10">
      <h2 id="principles-heading" className="text-lg font-bold text-foreground">
        {t("heading")}
      </h2>

      <ol className="mt-5 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {principles.map((principle, index) => (
          <li
            key={principle.title}
            className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4 sm:px-6"
          >
            <span
              aria-hidden="true"
              className="font-mono text-label font-bold text-primary sm:w-6 sm:shrink-0"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-body-sm text-foreground">
              <span className="font-bold">{principle.title}</span>
              {" — "}
              <span className="text-muted-foreground">
                {principle.description}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

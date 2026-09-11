import { useTranslations } from "next-intl";

export function SelectionException() {
  const t = useTranslations("reference.architecture.selectionException");
  const points = t.raw("points") as readonly string[];

  return (
    <section
      aria-labelledby="selection-exception-heading"
      className="mt-12 border-t border-border pt-8"
    >
      <h2
        id="selection-exception-heading"
        className="text-body font-bold text-foreground"
      >
        {t("heading")}
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {t("description")}
      </p>
      <ul className="mt-3 flex max-w-2xl flex-col gap-1.5 text-body-sm text-muted-foreground">
        {points.map((text) => (
          <li key={text} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-[7px] size-1 shrink-0 rounded-full bg-muted-foreground"
            />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}

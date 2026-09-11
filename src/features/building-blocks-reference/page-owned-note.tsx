import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function PageOwnedNote() {
  const t = useTranslations("reference.buildingBlocks.pageOwnedNote");

  return (
    <section
      aria-labelledby="page-owned-heading"
      className="mt-10 rounded-lg border border-border bg-card px-6 py-6"
    >
      <h2 id="page-owned-heading" className="text-lg font-bold text-foreground">
        {t("heading")}
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {t.rich("description", {
          code: (chunks) => (
            <code className="font-mono text-caption">{chunks}</code>
          ),
          templatesLink: (chunks) => (
            <Link
              href="/reference/templates"
              className="font-semibold text-foreground hover:text-primary"
            >
              {chunks}
            </Link>
          ),
        })}
      </p>
    </section>
  );
}

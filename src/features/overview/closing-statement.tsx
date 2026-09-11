import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function ClosingStatement() {
  const t = useTranslations("overview.closingStatement");

  return (
    <section aria-labelledby="closing-heading" className="mt-10">
      <div aria-hidden="true" className="mb-8 h-px bg-border" />
      <h2 id="closing-heading" className="text-lg font-bold text-foreground">
        {t("heading")}
      </h2>
      <p className="mt-2.5 max-w-2xl text-body-sm text-muted-foreground">
        {t("description")}
      </p>
      <Link
        href="/examples/components"
        className={cn(
          "mt-5",
          buttonVariants({ variant: "default", size: "default" }),
        )}
      >
        {t("cta")}
      </Link>
    </section>
  );
}

import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SITE_NAME } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const TECH_STACK = "Next.js · React · TypeScript · Tailwind CSS · shadcn/ui";

export function Hero() {
  const t = useTranslations("overview.hero");

  return (
    <header className="mb-8 flex flex-col gap-4">
      <p className="font-mono text-eyebrow text-muted-foreground uppercase tracking-wide">
        {SITE_NAME}
      </p>
      <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        {t("heading")}
      </h1>
      <p className="max-w-2xl text-base text-muted-foreground">
        {t("description")}
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Link
          href="/examples/components"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          {t("exploreExamples")}
        </Link>
        <Link
          href="/reference/architecture"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          {t("readArchitecture")}
        </Link>
      </div>

      <p className="mt-1 font-mono text-caption text-muted-foreground">
        {TECH_STACK}
      </p>
    </header>
  );
}

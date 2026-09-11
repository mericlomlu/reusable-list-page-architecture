"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("common.localeToggle");

  return (
    <ToggleGroup
      aria-label={t("label")}
      value={[locale]}
      onValueChange={(value) => {
        const [next] = value;
        if (next && next !== locale) {
          const query = searchParams.toString();
          router.replace(
            {
              pathname,
              query: query ? Object.fromEntries(searchParams) : undefined,
            },
            { locale: next },
          );
        }
      }}
      className="w-full gap-0 rounded-md border border-border bg-card p-0.5"
    >
      {routing.locales.map((code) => (
        <ToggleGroupItem
          key={code}
          value={code}
          className="flex-1 rounded-sm text-xs font-medium text-muted-foreground uppercase data-[state=on]:bg-accent data-[state=on]:font-semibold data-[state=on]:text-foreground"
        >
          {code}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

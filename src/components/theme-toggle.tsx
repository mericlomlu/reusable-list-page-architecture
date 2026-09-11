"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const THEME_VALUES = ["light", "dark", "system"] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("themeToggle");

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeTheme = mounted ? (theme ?? "system") : undefined;

  return (
    <ToggleGroup
      aria-label={t("ariaLabel")}
      value={activeTheme ? [activeTheme] : []}
      onValueChange={(value) => {
        const [next] = value;
        if (next) {
          setTheme(next);
        }
      }}
      className="w-full gap-0 rounded-md border border-border bg-card p-0.5"
    >
      {THEME_VALUES.map((value) => (
        <ToggleGroupItem
          key={value}
          value={value}
          className="flex-1 rounded-sm text-xs font-medium text-muted-foreground data-[state=on]:bg-accent data-[state=on]:font-semibold data-[state=on]:text-foreground"
        >
          {t(value)}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { GridViewIcon, ListViewIcon } from "@/components/icons/list-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ViewMode } from "@/features/list-page/types";

interface ViewSwitcherProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewSwitcher({ value, onChange }: ViewSwitcherProps) {
  const t = useTranslations("listPage.viewSwitcher");

  return (
    <ToggleGroup
      aria-label={t("ariaLabel")}
      value={[value]}
      onValueChange={(next) => {
        const [selected] = next;
        if (selected === "list" || selected === "grid") {
          onChange(selected);
        }
      }}
      className="gap-0.5 rounded-md border border-border bg-card p-[3px]"
    >
      <ToggleGroupItem
        value="list"
        aria-label={t("listView")}
        className="rounded-sm data-[state=on]:bg-accent"
      >
        <ListViewIcon className="size-[15px]" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="grid"
        aria-label={t("gridView")}
        className="rounded-sm data-[state=on]:bg-accent"
      >
        <GridViewIcon className="size-[15px]" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

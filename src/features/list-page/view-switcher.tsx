"use client";

import { GridViewIcon, ListViewIcon } from "@/components/icons/list-icons";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { ViewMode } from "@/features/list-page/types";

interface ViewSwitcherProps {
  value: ViewMode;
  onChange: (value: ViewMode) => void;
}

export function ViewSwitcher({ value, onChange }: ViewSwitcherProps) {
  return (
    <ToggleGroup
      aria-label="View"
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
        aria-label="List view"
        className="rounded-sm data-[state=on]:bg-accent"
      >
        <ListViewIcon className="size-[15px]" />
      </ToggleGroupItem>
      <ToggleGroupItem
        value="grid"
        aria-label="Grid view"
        className="rounded-sm data-[state=on]:bg-accent"
      >
        <GridViewIcon className="size-[15px]" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

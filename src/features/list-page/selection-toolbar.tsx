"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface SelectionToolbarProps {
  selectedCount: number;
  totalVisible: number;
  itemLabel: string;
  onSelectAllVisible: () => void;
  onClear: () => void;
  actions: ReactNode;
}

/**
 * Shown only while records are selected. Selection is always scoped to the
 * currently visible page, so "select all" never implies pages beyond it.
 */
export function SelectionToolbar({
  selectedCount,
  totalVisible,
  itemLabel,
  onSelectAllVisible,
  onClear,
  actions,
}: SelectionToolbarProps) {
  if (selectedCount === 0) return null;

  const allVisibleSelected = selectedCount >= totalVisible;

  return (
    <section
      aria-label="Bulk actions"
      className="mb-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5"
    >
      <p className="text-[13px] font-semibold text-foreground">
        {selectedCount} selected
      </p>
      {allVisibleSelected ? null : (
        <Button variant="link" size="sm" onClick={onSelectAllVisible}>
          Select all {totalVisible} {itemLabel} on this page
        </Button>
      )}
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        {actions}
        <Button variant="ghost" size="sm" onClick={onClear}>
          Cancel
        </Button>
      </div>
    </section>
  );
}

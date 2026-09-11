"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface SelectionToolbarProps {
  selectedCount: number;
  totalVisible: number;
  itemLabel: string;
  onSelectAllVisible: () => void;
  onClear: () => void;
  actions: ReactNode;
  pending?: boolean;
  pendingLabel?: string;
}

/**
 * Shown only while records are selected. Selection is always scoped to the
 * currently visible page, so "select all" never implies pages beyond it.
 * `pending` disables every selection-changing control so an in-flight bulk
 * action can't race with a selection change.
 */
export function SelectionToolbar({
  selectedCount,
  totalVisible,
  itemLabel,
  onSelectAllVisible,
  onClear,
  actions,
  pending = false,
  pendingLabel,
}: SelectionToolbarProps) {
  const t = useTranslations("listPage.selectionToolbar");
  if (selectedCount === 0) return null;

  const allVisibleSelected = selectedCount >= totalVisible;

  return (
    <section
      aria-label={t("ariaLabel")}
      aria-busy={pending}
      className="mb-3.5 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5"
    >
      <p className="text-body-sm font-semibold text-foreground">
        {t("selectedCount", { count: selectedCount })}
      </p>
      {pending ? (
        <output className="text-body-sm text-muted-foreground">
          {pendingLabel ?? t("pendingLabel")}
        </output>
      ) : null}
      {allVisibleSelected ? null : (
        <Button
          variant="link"
          size="sm"
          onClick={onSelectAllVisible}
          disabled={pending}
        >
          {t("selectAllOnPage", { count: totalVisible, itemLabel })}
        </Button>
      )}
      <div className="flex-1" />
      <div className="flex items-center gap-2">
        {actions}
        <Button variant="ghost" size="sm" onClick={onClear} disabled={pending}>
          {t("cancel")}
        </Button>
      </div>
    </section>
  );
}

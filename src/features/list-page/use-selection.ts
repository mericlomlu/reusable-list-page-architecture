"use client";

import { useCallback, useState } from "react";

export interface UseSelectionResult {
  readonly selectedIds: ReadonlySet<string>;
  readonly selectedCount: number;
  isSelected(id: string): boolean;
  toggle(id: string): void;
  selectAll(ids: readonly string[]): void;
  clear(): void;
}

/**
 * Client-only selection state keyed by stable record IDs. Deliberately
 * separate from URL query state — remount the owning component (e.g. via a
 * `key` derived from the active query) to reset selection when the visible
 * result set changes.
 */
export function useSelection(): UseSelectionResult {
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(
    () => new Set(),
  );

  const isSelected = useCallback(
    (id: string) => selectedIds.has(id),
    [selectedIds],
  );

  const toggle = useCallback((id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const selectAll = useCallback((ids: readonly string[]) => {
    setSelectedIds(new Set(ids));
  }, []);

  const clear = useCallback(() => setSelectedIds(new Set()), []);

  return {
    selectedIds,
    selectedCount: selectedIds.size,
    isSelected,
    toggle,
    selectAll,
    clear,
  };
}

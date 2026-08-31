import { Fragment, type ReactNode } from "react";
import type { ViewMode } from "@/features/list-page/types";

/**
 * Shared by {@link ResultsView}'s grid branch and any consumer that renders
 * its own grid `<ul>` instead of going through `ResultsView` (for example a
 * selectable list that needs a header/props shape `ResultsView` doesn't
 * support), so the two layouts can't silently drift apart.
 */
export const RESULTS_GRID_CLASS_NAME =
  "grid list-none grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3";

interface ResultsViewProps<TItem> {
  view: ViewMode;
  items: readonly TItem[];
  getItemKey: (item: TItem) => string;
  renderListItem: (item: TItem) => ReactNode;
  renderGridItem: (item: TItem) => ReactNode;
  listAriaLabel: string;
}

export function ResultsView<TItem>({
  view,
  items,
  getItemKey,
  renderListItem,
  renderGridItem,
  listAriaLabel,
}: ResultsViewProps<TItem>) {
  if (view === "grid") {
    return (
      <ul aria-label={listAriaLabel} className={RESULTS_GRID_CLASS_NAME}>
        {items.map((item) => (
          <Fragment key={getItemKey(item)}>{renderGridItem(item)}</Fragment>
        ))}
      </ul>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <ul
        aria-label={listAriaLabel}
        className="flex min-w-[640px] list-none flex-col"
      >
        {items.map((item) => (
          <Fragment key={getItemKey(item)}>{renderListItem(item)}</Fragment>
        ))}
      </ul>
    </div>
  );
}

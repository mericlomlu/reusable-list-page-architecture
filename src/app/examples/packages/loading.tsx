import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListSkeleton } from "@/features/list-page/list-states";
import {
  PACKAGE_LIST_COLUMN_COUNT,
  PACKAGE_LIST_GRID_COLUMNS,
} from "@/features/packages-example/config";

export default function PackagesLoading() {
  return (
    <ListPageShell
      eyebrow="Examples / Packages"
      title="Packages"
      description="Dependencies tracked across the workspace, with update status surfaced before it becomes a problem."
      toolbar={
        <div
          aria-hidden="true"
          className="h-9 w-full rounded-md bg-muted motion-safe:animate-pulse"
        />
      }
    >
      <ListSkeleton
        gridTemplateColumns={PACKAGE_LIST_GRID_COLUMNS}
        columnCount={PACKAGE_LIST_COLUMN_COUNT}
        label="Loading packages"
      />
    </ListPageShell>
  );
}

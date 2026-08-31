import {
  COMPONENT_LIST_COLUMN_COUNT,
  COMPONENT_LIST_GRID_COLUMNS,
} from "@/features/components-example/config";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListSkeleton } from "@/features/list-page/list-states";

export default function ComponentsLoading() {
  return (
    <ListPageShell
      eyebrow="Examples / Components"
      title="Components"
      description="Every UI primitive in the workspace's library, searchable and filterable by category, framework and status."
      toolbar={
        <div
          aria-hidden="true"
          className="h-9 w-full rounded-md bg-muted motion-safe:animate-pulse"
        />
      }
    >
      <ListSkeleton
        gridTemplateColumns={COMPONENT_LIST_GRID_COLUMNS}
        columnCount={COMPONENT_LIST_COLUMN_COUNT}
        label="Loading components"
      />
    </ListPageShell>
  );
}

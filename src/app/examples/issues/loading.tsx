import {
  ISSUE_LIST_SKELETON_COLUMN_COUNT,
  ISSUE_LIST_SKELETON_GRID_COLUMNS,
} from "@/features/issues-example/config";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListSkeleton } from "@/features/list-page/list-states";

export default function IssuesLoading() {
  return (
    <ListPageShell
      eyebrow="Examples / Issues"
      title="Issues"
      description="Track and triage work across the workspace. Select rows to change status on several issues at once."
      toolbar={
        <div
          aria-hidden="true"
          className="h-9 w-full rounded-md bg-muted motion-safe:animate-pulse"
        />
      }
    >
      <ListSkeleton
        gridTemplateColumns={ISSUE_LIST_SKELETON_GRID_COLUMNS}
        columnCount={ISSUE_LIST_SKELETON_COLUMN_COUNT}
        label="Loading issues"
      />
    </ListPageShell>
  );
}

import {
  DEPLOYMENT_LIST_COLUMN_COUNT,
  DEPLOYMENT_LIST_GRID_COLUMNS,
} from "@/features/deployments-example/config";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListSkeleton } from "@/features/list-page/list-states";

export default function DeploymentsLoading() {
  return (
    <ListPageShell
      eyebrow="Examples / Deployments"
      title="Deployments"
      description="Every build across environments, with status shown as icon and label — never color alone."
      toolbar={
        <div
          aria-hidden="true"
          className="h-9 w-full rounded-md bg-muted motion-safe:animate-pulse"
        />
      }
    >
      <ListSkeleton
        gridTemplateColumns={DEPLOYMENT_LIST_GRID_COLUMNS}
        columnCount={DEPLOYMENT_LIST_COLUMN_COUNT}
        label="Loading deployments"
      />
    </ListPageShell>
  );
}

import {
  DEPLOYMENT_LIST_GRID_COLUMNS,
  ENVIRONMENT_LABEL,
} from "@/features/deployments-example/config";
import { DeploymentStatusBadge } from "@/features/deployments-example/deployment-status";
import { formatDeploymentRelativeTime } from "@/features/deployments-example/relative-time";
import type { DeploymentRecord } from "@/features/deployments-example/types";

export function DeploymentListRow({ record }: { record: DeploymentRecord }) {
  return (
    <li
      className="grid items-center gap-4 border-t border-border bg-card px-[18px] py-4 first:border-t-0"
      style={{ gridTemplateColumns: DEPLOYMENT_LIST_GRID_COLUMNS }}
    >
      <p className="truncate font-mono text-meta text-muted-foreground">
        <span className="sr-only">Branch: </span>
        {record.branch}
      </p>
      <p className="truncate text-body text-foreground">
        {record.commitMessage}
      </p>
      <p className="text-body-sm text-muted-foreground">
        <span className="sr-only">Environment: </span>
        {ENVIRONMENT_LABEL[record.environment]}
      </p>
      <DeploymentStatusBadge status={record.status} />
      <p className="font-mono text-meta text-muted-foreground">
        <span className="sr-only">Deployed </span>
        {formatDeploymentRelativeTime(record.deployedAt)}
      </p>
    </li>
  );
}

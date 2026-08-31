import { ENVIRONMENT_LABEL } from "@/features/deployments-example/config";
import { DeploymentStatusBadge } from "@/features/deployments-example/deployment-status";
import { formatDeploymentRelativeTime } from "@/features/deployments-example/relative-time";
import type { DeploymentRecord } from "@/features/deployments-example/types";

export function DeploymentGridCard({ record }: { record: DeploymentRecord }) {
  return (
    <li className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-[18px]">
      <p className="font-mono text-meta text-muted-foreground">
        <span className="sr-only">Branch: </span>
        {record.branch}
      </p>
      <p className="text-record-title font-bold text-foreground">
        {record.commitMessage}
      </p>
      <div className="mt-1 flex items-center justify-between">
        <DeploymentStatusBadge status={record.status} />
        <p className="text-body-sm text-muted-foreground">
          <span className="sr-only">Environment: </span>
          {ENVIRONMENT_LABEL[record.environment]}
        </p>
      </div>
      <p className="font-mono text-meta text-muted-foreground">
        <span className="sr-only">Deployed </span>
        {formatDeploymentRelativeTime(record.deployedAt)}
      </p>
    </li>
  );
}

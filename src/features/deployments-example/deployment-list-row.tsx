import { useLocale, useTranslations } from "next-intl";
import { DEPLOYMENT_LIST_GRID_COLUMNS } from "@/features/deployments-example/config";
import { DeploymentStatusBadge } from "@/features/deployments-example/deployment-status";
import { formatDeploymentRelativeTime } from "@/features/deployments-example/relative-time";
import type { DeploymentRecord } from "@/features/deployments-example/types";

export function DeploymentListRow({ record }: { record: DeploymentRecord }) {
  const locale = useLocale();
  const t = useTranslations("deploymentsExample");

  return (
    <li
      className="grid items-center gap-4 border-t border-border bg-card px-[18px] py-4 first:border-t-0"
      style={{ gridTemplateColumns: DEPLOYMENT_LIST_GRID_COLUMNS }}
    >
      <p className="truncate font-mono text-meta text-muted-foreground">
        <span className="sr-only">{t("card.branchSrOnly")} </span>
        {record.branch}
      </p>
      <p className="truncate text-body text-foreground">
        {record.commitMessage}
      </p>
      <p className="text-body-sm text-muted-foreground">
        <span className="sr-only">{t("card.environmentSrOnly")} </span>
        {t(`filters.environment.${record.environment}`)}
      </p>
      <DeploymentStatusBadge status={record.status} />
      <p className="font-mono text-meta text-muted-foreground">
        <span className="sr-only">{t("card.deployedSrOnly")} </span>
        {formatDeploymentRelativeTime(record.deployedAt, locale)}
      </p>
    </li>
  );
}

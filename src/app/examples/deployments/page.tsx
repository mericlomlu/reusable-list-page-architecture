import { redirect } from "next/navigation";
import { DEPLOYMENT_LIST_QUERY_CONFIG } from "@/features/deployments-example/config";
import { DeploymentsResults } from "@/features/deployments-example/deployments-results";
import { DeploymentsToolbar } from "@/features/deployments-example/deployments-toolbar";
import { queryDeployments } from "@/features/deployments-example/query-service";
import type {
  DeploymentFilterKey,
  DeploymentSortKey,
} from "@/features/deployments-example/types";
import { parseDemoState } from "@/features/list-page/demo-state";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { PaginationControls } from "@/features/list-page/pagination-controls";
import {
  buildListQueryString,
  parseListQuery,
  toSearchParams,
} from "@/features/list-page/query-state";

export default async function DeploymentsPage(
  props: PageProps<"/examples/deployments">,
) {
  const rawSearchParams = await props.searchParams;
  const searchParams = toSearchParams(rawSearchParams);
  const demoState = parseDemoState(searchParams);
  const query = parseListQuery<DeploymentSortKey, DeploymentFilterKey>(
    searchParams,
    DEPLOYMENT_LIST_QUERY_CONFIG,
  );
  const { records, total, page } = await queryDeployments(query, demoState);

  const buildHref = (targetPage: number) =>
    `/examples/deployments${buildListQueryString(
      { ...query, page: targetPage },
      DEPLOYMENT_LIST_QUERY_CONFIG,
    )}`;

  if (page !== query.page) {
    redirect(buildHref(page));
  }

  return (
    <ListPageShell
      eyebrow="Examples / Deployments"
      title="Deployments"
      description="Every build across environments, with status shown as icon and label — never color alone."
      toolbar={<DeploymentsToolbar />}
      pagination={
        <PaginationControls
          page={page}
          pageSize={DEPLOYMENT_LIST_QUERY_CONFIG.pageSize}
          total={total}
          buildHref={buildHref}
          itemLabel="deployments"
        />
      }
    >
      <DeploymentsResults records={records} query={{ ...query, page }} />
    </ListPageShell>
  );
}

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
import { buildRouteMetadata } from "@/lib/metadata";

export async function generateMetadata(
  props: PageProps<"/[locale]/examples/deployments">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    title: t("deploymentsPage.title"),
    description: t("deploymentsPage.description"),
    path: "/examples/deployments",
    locale,
    socialImageAlt: t("site.socialImageAlt"),
  });
}

export default async function DeploymentsPage(
  props: PageProps<"/[locale]/examples/deployments">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "deploymentsExample" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

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
      eyebrow={tMeta("deploymentsPage.eyebrow")}
      title={tMeta("deploymentsPage.title")}
      description={tMeta("deploymentsPage.description")}
      toolbar={<DeploymentsToolbar />}
      pagination={
        <PaginationControls
          page={page}
          pageSize={DEPLOYMENT_LIST_QUERY_CONFIG.pageSize}
          total={total}
          buildHref={buildHref}
          itemLabel={t("itemLabel")}
        />
      }
    >
      <DeploymentsResults records={records} query={{ ...query, page }} />
    </ListPageShell>
  );
}

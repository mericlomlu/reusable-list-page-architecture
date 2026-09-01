import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { parseDemoState } from "@/features/list-page/demo-state";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { PaginationControls } from "@/features/list-page/pagination-controls";
import {
  buildListQueryString,
  parseListQuery,
  toSearchParams,
} from "@/features/list-page/query-state";
import { PACKAGE_LIST_QUERY_CONFIG } from "@/features/packages-example/config";
import { PackagesResults } from "@/features/packages-example/packages-results";
import { PackagesToolbar } from "@/features/packages-example/packages-toolbar";
import { queryPackages } from "@/features/packages-example/query-service";
import type {
  PackageFilterKey,
  PackageSortKey,
} from "@/features/packages-example/types";
import { buildRouteMetadata } from "@/lib/metadata";

const PAGE_DESCRIPTION =
  "Dependencies tracked across the workspace, with update status surfaced before it becomes a problem.";

export const metadata: Metadata = buildRouteMetadata({
  title: "Packages",
  description: PAGE_DESCRIPTION,
  path: "/examples/packages",
});

export default async function PackagesPage(
  props: PageProps<"/examples/packages">,
) {
  const rawSearchParams = await props.searchParams;
  const searchParams = toSearchParams(rawSearchParams);
  const demoState = parseDemoState(searchParams);
  const query = parseListQuery<PackageSortKey, PackageFilterKey>(
    searchParams,
    PACKAGE_LIST_QUERY_CONFIG,
  );
  const { records, total, page } = await queryPackages(query, demoState);

  const buildHref = (targetPage: number) =>
    `/examples/packages${buildListQueryString(
      { ...query, page: targetPage },
      PACKAGE_LIST_QUERY_CONFIG,
    )}`;

  if (page !== query.page) {
    redirect(buildHref(page));
  }

  return (
    <ListPageShell
      eyebrow="Examples / Packages"
      title="Packages"
      description={PAGE_DESCRIPTION}
      toolbar={<PackagesToolbar />}
      pagination={
        <PaginationControls
          page={page}
          pageSize={PACKAGE_LIST_QUERY_CONFIG.pageSize}
          total={total}
          buildHref={buildHref}
          itemLabel="packages"
        />
      }
    >
      <PackagesResults records={records} query={{ ...query, page }} />
    </ListPageShell>
  );
}

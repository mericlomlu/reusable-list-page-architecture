import { redirect } from "next/navigation";
import { ComponentsResults } from "@/features/components-example/components-results";
import { ComponentsToolbar } from "@/features/components-example/components-toolbar";
import { COMPONENT_LIST_QUERY_CONFIG } from "@/features/components-example/config";
import { queryComponents } from "@/features/components-example/query-service";
import type {
  ComponentFilterKey,
  ComponentSortKey,
} from "@/features/components-example/types";
import { parseDemoState } from "@/features/list-page/demo-state";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { PaginationControls } from "@/features/list-page/pagination-controls";
import {
  buildListQueryString,
  parseListQuery,
  toSearchParams,
} from "@/features/list-page/query-state";

export default async function ComponentsPage(
  props: PageProps<"/examples/components">,
) {
  const rawSearchParams = await props.searchParams;
  const searchParams = toSearchParams(rawSearchParams);
  const demoState = parseDemoState(searchParams);
  const query = parseListQuery<ComponentSortKey, ComponentFilterKey>(
    searchParams,
    COMPONENT_LIST_QUERY_CONFIG,
  );
  const { records, total, page } = await queryComponents(query, demoState);

  const buildHref = (targetPage: number) =>
    `/examples/components${buildListQueryString(
      { ...query, page: targetPage },
      COMPONENT_LIST_QUERY_CONFIG,
    )}`;

  if (page !== query.page) {
    redirect(buildHref(page));
  }

  return (
    <ListPageShell
      eyebrow="Examples / Components"
      title="Components"
      description="Every UI primitive in the workspace's library, searchable and filterable by category, framework and status."
      toolbar={<ComponentsToolbar />}
      pagination={
        <PaginationControls
          page={page}
          pageSize={COMPONENT_LIST_QUERY_CONFIG.pageSize}
          total={total}
          buildHref={buildHref}
          itemLabel="components"
        />
      }
    >
      <ComponentsResults records={records} query={{ ...query, page }} />
    </ListPageShell>
  );
}

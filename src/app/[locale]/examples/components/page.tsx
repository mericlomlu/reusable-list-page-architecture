import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
import { buildRouteMetadata } from "@/lib/metadata";

export async function generateMetadata(
  props: PageProps<"/[locale]/examples/components">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    title: t("componentsPage.title"),
    description: t("componentsPage.description"),
    path: "/examples/components",
    locale,
    socialImageAlt: t("site.socialImageAlt"),
  });
}

export default async function ComponentsPage(
  props: PageProps<"/[locale]/examples/components">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "componentsExample" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

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
      eyebrow={tMeta("componentsPage.eyebrow")}
      title={tMeta("componentsPage.title")}
      description={tMeta("componentsPage.description")}
      toolbar={<ComponentsToolbar />}
      pagination={
        <PaginationControls
          page={page}
          pageSize={COMPONENT_LIST_QUERY_CONFIG.pageSize}
          total={total}
          buildHref={buildHref}
          itemLabel={t("itemLabel")}
        />
      }
    >
      <ComponentsResults records={records} query={{ ...query, page }} />
    </ListPageShell>
  );
}

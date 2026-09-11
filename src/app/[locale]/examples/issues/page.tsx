import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ISSUE_LIST_QUERY_CONFIG } from "@/features/issues-example/config";
import { IssuesResults } from "@/features/issues-example/issues-results";
import { IssuesToolbar } from "@/features/issues-example/issues-toolbar";
import { queryIssues } from "@/features/issues-example/query-service";
import type {
  IssueFilterKey,
  IssueSortKey,
} from "@/features/issues-example/types";
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
  props: PageProps<"/[locale]/examples/issues">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    title: t("issuesPage.title"),
    description: t("issuesPage.description"),
    path: "/examples/issues",
    locale,
    socialImageAlt: t("site.socialImageAlt"),
  });
}

export default async function IssuesPage(
  props: PageProps<"/[locale]/examples/issues">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "issuesExample" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const rawSearchParams = await props.searchParams;
  const searchParams = toSearchParams(rawSearchParams);
  const demoState = parseDemoState(searchParams);
  const query = parseListQuery<IssueSortKey, IssueFilterKey>(
    searchParams,
    ISSUE_LIST_QUERY_CONFIG,
  );
  const { records, total, page } = await queryIssues(query, demoState);

  const buildHref = (targetPage: number) =>
    `/examples/issues${buildListQueryString(
      { ...query, page: targetPage },
      ISSUE_LIST_QUERY_CONFIG,
    )}`;

  if (page !== query.page) {
    redirect(buildHref(page));
  }

  return (
    <ListPageShell
      eyebrow={tMeta("issuesPage.eyebrow")}
      title={tMeta("issuesPage.title")}
      description={tMeta("issuesPage.description")}
      toolbar={<IssuesToolbar />}
      pagination={
        <PaginationControls
          page={page}
          pageSize={ISSUE_LIST_QUERY_CONFIG.pageSize}
          total={total}
          buildHref={buildHref}
          itemLabel={t("itemLabel")}
        />
      }
    >
      <IssuesResults records={records} query={{ ...query, page }} />
    </ListPageShell>
  );
}

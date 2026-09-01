import type { Metadata } from "next";
import { redirect } from "next/navigation";
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

const PAGE_DESCRIPTION =
  "Track and triage work across the workspace. Select rows to change status on several issues at once.";

export const metadata: Metadata = {
  title: "Issues",
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/examples/issues" },
};

export default async function IssuesPage(props: PageProps<"/examples/issues">) {
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
      eyebrow="Examples / Issues"
      title="Issues"
      description={PAGE_DESCRIPTION}
      toolbar={<IssuesToolbar />}
      pagination={
        <PaginationControls
          page={page}
          pageSize={ISSUE_LIST_QUERY_CONFIG.pageSize}
          total={total}
          buildHref={buildHref}
          itemLabel="issues"
        />
      }
    >
      <IssuesResults records={records} query={{ ...query, page }} />
    </ListPageShell>
  );
}

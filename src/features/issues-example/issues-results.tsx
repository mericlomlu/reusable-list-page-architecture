import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  ASSIGNEE_OPTIONS,
  ISSUE_LIST_QUERY_CONFIG,
  LABEL_OPTIONS,
  PRIORITY_OPTIONS,
  STATUS_OPTIONS,
} from "@/features/issues-example/config";
import { IssueBoard } from "@/features/issues-example/issue-board";
import type {
  IssueFilterKey,
  IssueRecord,
  IssueSortKey,
} from "@/features/issues-example/types";
import {
  type ActiveFilterPill,
  ActiveFilters,
} from "@/features/list-page/active-filters";
import { ListEmptyState } from "@/features/list-page/list-states";
import {
  buildListQueryString,
  emptyFilterValues,
} from "@/features/list-page/query-state";
import type { FilterOption, ParsedListQuery } from "@/features/list-page/types";
import { cn } from "@/lib/utils";

const ISSUES_PATH = "/examples/issues";

const FILTER_OPTIONS: Record<IssueFilterKey, readonly FilterOption[]> = {
  status: STATUS_OPTIONS,
  priority: PRIORITY_OPTIONS,
  label: LABEL_OPTIONS,
  assignee: ASSIGNEE_OPTIONS,
};

interface IssuesResultsProps {
  records: readonly IssueRecord[];
  query: ParsedListQuery<IssueSortKey, IssueFilterKey>;
}

export function IssuesResults({ records, query }: IssuesResultsProps) {
  const pills: ActiveFilterPill[] = [];
  for (const key of ISSUE_LIST_QUERY_CONFIG.filterKeys) {
    for (const value of query.filters[key]) {
      const label =
        FILTER_OPTIONS[key].find((option) => option.value === value)?.label ??
        value;
      const nextFilters = {
        ...query.filters,
        [key]: query.filters[key].filter((entry) => entry !== value),
      };
      pills.push({
        key: `${key}:${value}`,
        label,
        href: `${ISSUES_PATH}${buildListQueryString(
          { ...query, filters: nextFilters, page: 1 },
          ISSUE_LIST_QUERY_CONFIG,
        )}`,
      });
    }
  }

  const hasActiveFilters = pills.length > 0;
  const isFiltered = hasActiveFilters || query.search.length > 0;
  const resetAllHref = `${ISSUES_PATH}${buildListQueryString(
    {
      ...query,
      search: "",
      filters: emptyFilterValues(ISSUE_LIST_QUERY_CONFIG.filterKeys),
      page: 1,
    },
    ISSUE_LIST_QUERY_CONFIG,
  )}`;
  const clearFiltersHref = `${ISSUES_PATH}${buildListQueryString(
    {
      ...query,
      filters: emptyFilterValues(ISSUE_LIST_QUERY_CONFIG.filterKeys),
      page: 1,
    },
    ISSUE_LIST_QUERY_CONFIG,
  )}`;

  // Selection is local UI state, intentionally kept out of the URL. Keying
  // the board on the parts of the query that change the visible result set
  // (not `view`, which only changes presentation) forces a clean remount —
  // and a fresh selection — whenever search, filters, sort, or page change.
  const resultSetKey = JSON.stringify({
    search: query.search,
    filters: query.filters,
    sort: query.sort,
    page: query.page,
  });

  return (
    <>
      <ActiveFilters pills={pills} clearHref={clearFiltersHref} />
      {records.length === 0 ? (
        <ListEmptyState
          title={isFiltered ? "No issues match these filters" : "No issues yet"}
          description={
            isFiltered
              ? "Try removing a filter or searching a different term."
              : "Issues will appear here once the workspace has entries."
          }
          action={
            isFiltered ? (
              <Link
                href={resetAllHref}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Clear all filters
              </Link>
            ) : undefined
          }
        />
      ) : (
        <IssueBoard key={resultSetKey} records={records} view={query.view} />
      )}
    </>
  );
}

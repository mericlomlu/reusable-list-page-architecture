import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import {
  ASSIGNEE_FILTER_VALUES,
  ASSIGNEES,
  ISSUE_LIST_QUERY_CONFIG,
  LABEL_VALUES,
  PRIORITY_VALUES,
  STATUS_VALUES,
  UNASSIGNED_FILTER_VALUE,
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
import type { ParsedListQuery } from "@/features/list-page/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const ISSUES_PATH = "/examples/issues";

const ASSIGNEE_NAME_BY_ID = new Map(
  ASSIGNEES.map((assignee) => [assignee.id, assignee.name]),
);

const FILTER_VALUES: Record<IssueFilterKey, readonly string[]> = {
  status: STATUS_VALUES,
  priority: PRIORITY_VALUES,
  label: LABEL_VALUES,
  assignee: ASSIGNEE_FILTER_VALUES,
};

interface IssuesResultsProps {
  records: readonly IssueRecord[];
  query: ParsedListQuery<IssueSortKey, IssueFilterKey>;
}

export function IssuesResults({ records, query }: IssuesResultsProps) {
  const t = useTranslations("issuesExample");

  function resolveFilterLabel(key: IssueFilterKey, value: string): string {
    if (!FILTER_VALUES[key].includes(value)) return value;
    if (key === "label") return value;
    if (key === "assignee") {
      return value === UNASSIGNED_FILTER_VALUE
        ? t("filters.unassigned")
        : (ASSIGNEE_NAME_BY_ID.get(value) ?? value);
    }
    return t(`filters.${key}.${value}`);
  }

  const pills: ActiveFilterPill[] = [];
  for (const key of ISSUE_LIST_QUERY_CONFIG.filterKeys) {
    for (const value of query.filters[key]) {
      const label = resolveFilterLabel(key, value);
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
          title={
            isFiltered
              ? t("results.emptyFiltered.title")
              : t("results.emptyDefault.title")
          }
          description={
            isFiltered
              ? t("results.emptyFiltered.description")
              : t("results.emptyDefault.description")
          }
          action={
            isFiltered ? (
              <Link
                href={resetAllHref}
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                {t("results.clearAllFilters")}
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

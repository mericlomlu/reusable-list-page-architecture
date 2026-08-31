import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  BRANCH_OPTIONS,
  DATE_RANGE_OPTIONS,
  DEPLOYMENT_LIST_QUERY_CONFIG,
  ENVIRONMENT_OPTIONS,
  STATUS_OPTIONS,
} from "@/features/deployments-example/config";
import { DeploymentGridCard } from "@/features/deployments-example/deployment-grid-card";
import { DeploymentListRow } from "@/features/deployments-example/deployment-list-row";
import type {
  DeploymentFilterKey,
  DeploymentRecord,
  DeploymentSortKey,
} from "@/features/deployments-example/types";
import {
  type ActiveFilterPill,
  ActiveFilters,
} from "@/features/list-page/active-filters";
import { ListEmptyState } from "@/features/list-page/list-states";
import {
  buildListQueryString,
  emptyFilterValues,
} from "@/features/list-page/query-state";
import { ResultsView } from "@/features/list-page/results-view";
import type { FilterOption, ParsedListQuery } from "@/features/list-page/types";
import { cn } from "@/lib/utils";

const DEPLOYMENTS_PATH = "/examples/deployments";

const FILTER_OPTIONS: Record<DeploymentFilterKey, readonly FilterOption[]> = {
  status: STATUS_OPTIONS,
  environment: ENVIRONMENT_OPTIONS,
  branch: BRANCH_OPTIONS,
  dateRange: DATE_RANGE_OPTIONS,
};

interface DeploymentsResultsProps {
  records: readonly DeploymentRecord[];
  query: ParsedListQuery<DeploymentSortKey, DeploymentFilterKey>;
}

export function DeploymentsResults({
  records,
  query,
}: DeploymentsResultsProps) {
  const pills: ActiveFilterPill[] = [];
  for (const key of DEPLOYMENT_LIST_QUERY_CONFIG.filterKeys) {
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
        href: `${DEPLOYMENTS_PATH}${buildListQueryString(
          { ...query, filters: nextFilters, page: 1 },
          DEPLOYMENT_LIST_QUERY_CONFIG,
        )}`,
      });
    }
  }

  const hasActiveFilters = pills.length > 0;
  const isFiltered = hasActiveFilters || query.search.length > 0;
  const resetAllHref = `${DEPLOYMENTS_PATH}${buildListQueryString(
    {
      ...query,
      search: "",
      filters: emptyFilterValues(DEPLOYMENT_LIST_QUERY_CONFIG.filterKeys),
      page: 1,
    },
    DEPLOYMENT_LIST_QUERY_CONFIG,
  )}`;
  const clearFiltersHref = `${DEPLOYMENTS_PATH}${buildListQueryString(
    {
      ...query,
      filters: emptyFilterValues(DEPLOYMENT_LIST_QUERY_CONFIG.filterKeys),
      page: 1,
    },
    DEPLOYMENT_LIST_QUERY_CONFIG,
  )}`;

  return (
    <>
      <ActiveFilters pills={pills} clearHref={clearFiltersHref} />
      {records.length === 0 ? (
        <ListEmptyState
          title={
            isFiltered
              ? "No deployments match these filters"
              : "No deployments yet"
          }
          description={
            isFiltered
              ? "Try removing a filter or widening the date range."
              : "Deployments will appear here once the workspace has builds."
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
        <ResultsView
          view={query.view}
          items={records}
          getItemKey={(record) => record.id}
          renderListItem={(record) => <DeploymentListRow record={record} />}
          renderGridItem={(record) => <DeploymentGridCard record={record} />}
          listAriaLabel="Deployments"
        />
      )}
    </>
  );
}

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
import {
  DEPENDENCY_TYPE_OPTIONS,
  PACKAGE_LIST_QUERY_CONFIG,
  UPDATE_STATUS_OPTIONS,
} from "@/features/packages-example/config";
import { PackageGridCard } from "@/features/packages-example/package-grid-card";
import { PackageListRow } from "@/features/packages-example/package-list-row";
import type {
  PackageFilterKey,
  PackageRecord,
  PackageSortKey,
} from "@/features/packages-example/types";
import { cn } from "@/lib/utils";

const PACKAGES_PATH = "/examples/packages";

const FILTER_OPTIONS: Record<PackageFilterKey, readonly FilterOption[]> = {
  dependencyType: DEPENDENCY_TYPE_OPTIONS,
  updateStatus: UPDATE_STATUS_OPTIONS,
};

interface PackagesResultsProps {
  records: readonly PackageRecord[];
  query: ParsedListQuery<PackageSortKey, PackageFilterKey>;
}

export function PackagesResults({ records, query }: PackagesResultsProps) {
  const pills: ActiveFilterPill[] = [];
  for (const key of PACKAGE_LIST_QUERY_CONFIG.filterKeys) {
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
        href: `${PACKAGES_PATH}${buildListQueryString(
          { ...query, filters: nextFilters, page: 1 },
          PACKAGE_LIST_QUERY_CONFIG,
        )}`,
      });
    }
  }

  const hasActiveFilters = pills.length > 0;
  const isFiltered = hasActiveFilters || query.search.length > 0;
  const resetAllHref = `${PACKAGES_PATH}${buildListQueryString(
    {
      ...query,
      search: "",
      filters: emptyFilterValues(PACKAGE_LIST_QUERY_CONFIG.filterKeys),
      page: 1,
    },
    PACKAGE_LIST_QUERY_CONFIG,
  )}`;
  const clearFiltersHref = `${PACKAGES_PATH}${buildListQueryString(
    {
      ...query,
      filters: emptyFilterValues(PACKAGE_LIST_QUERY_CONFIG.filterKeys),
      page: 1,
    },
    PACKAGE_LIST_QUERY_CONFIG,
  )}`;

  return (
    <>
      <ActiveFilters pills={pills} clearHref={clearFiltersHref} />
      {records.length === 0 ? (
        <ListEmptyState
          title={
            isFiltered
              ? "No packages match these filters"
              : "No packages tracked yet"
          }
          description={
            isFiltered
              ? "Try removing a filter or searching a different package name."
              : "Packages will appear here once dependencies are added to the workspace."
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
          renderListItem={(record) => <PackageListRow record={record} />}
          renderGridItem={(record) => <PackageGridCard record={record} />}
          listAriaLabel="Packages"
        />
      )}
    </>
  );
}

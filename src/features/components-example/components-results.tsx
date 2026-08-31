import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ComponentGridCard } from "@/features/components-example/component-grid-card";
import { ComponentListRow } from "@/features/components-example/component-list-row";
import {
  CATEGORY_OPTIONS,
  COMPONENT_LIST_QUERY_CONFIG,
  FRAMEWORK_OPTIONS,
  STATUS_OPTIONS,
} from "@/features/components-example/config";
import type {
  ComponentFilterKey,
  ComponentRecord,
  ComponentSortKey,
} from "@/features/components-example/types";
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

const COMPONENTS_PATH = "/examples/components";

const FILTER_OPTIONS: Record<ComponentFilterKey, readonly FilterOption[]> = {
  category: CATEGORY_OPTIONS,
  framework: FRAMEWORK_OPTIONS,
  status: STATUS_OPTIONS,
};

interface ComponentsResultsProps {
  records: readonly ComponentRecord[];
  query: ParsedListQuery<ComponentSortKey, ComponentFilterKey>;
}

export function ComponentsResults({ records, query }: ComponentsResultsProps) {
  const pills: ActiveFilterPill[] = [];
  for (const key of COMPONENT_LIST_QUERY_CONFIG.filterKeys) {
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
        href: `${COMPONENTS_PATH}${buildListQueryString(
          { ...query, filters: nextFilters, page: 1 },
          COMPONENT_LIST_QUERY_CONFIG,
        )}`,
      });
    }
  }

  const hasActiveFilters = pills.length > 0;
  const isFiltered = hasActiveFilters || query.search.length > 0;
  const clearFiltersHref = `${COMPONENTS_PATH}${buildListQueryString(
    {
      ...query,
      filters: emptyFilterValues(COMPONENT_LIST_QUERY_CONFIG.filterKeys),
      page: 1,
    },
    COMPONENT_LIST_QUERY_CONFIG,
  )}`;
  const resetAllHref = `${COMPONENTS_PATH}${buildListQueryString(
    {
      ...query,
      search: "",
      filters: emptyFilterValues(COMPONENT_LIST_QUERY_CONFIG.filterKeys),
      page: 1,
    },
    COMPONENT_LIST_QUERY_CONFIG,
  )}`;

  return (
    <>
      <ActiveFilters pills={pills} clearHref={clearFiltersHref} />
      {records.length === 0 ? (
        <ListEmptyState
          title={
            isFiltered
              ? "No components match these filters"
              : "No components yet"
          }
          description={
            isFiltered
              ? "Try removing a filter or searching a different term."
              : "Components will appear here once the library has entries."
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
          renderListItem={(record) => <ComponentListRow record={record} />}
          renderGridItem={(record) => <ComponentGridCard record={record} />}
          listAriaLabel="Components"
        />
      )}
    </>
  );
}

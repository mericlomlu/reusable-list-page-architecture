import { useTranslations } from "next-intl";
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
import type { ParsedListQuery } from "@/features/list-page/types";
import {
  DEPENDENCY_TYPE_VALUES,
  PACKAGE_LIST_QUERY_CONFIG,
  UPDATE_STATUS_VALUES,
} from "@/features/packages-example/config";
import { PackageGridCard } from "@/features/packages-example/package-grid-card";
import { PackageListRow } from "@/features/packages-example/package-list-row";
import type {
  PackageFilterKey,
  PackageRecord,
  PackageSortKey,
} from "@/features/packages-example/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const PACKAGES_PATH = "/examples/packages";

const FILTER_VALUES: Record<PackageFilterKey, readonly string[]> = {
  dependencyType: DEPENDENCY_TYPE_VALUES,
  updateStatus: UPDATE_STATUS_VALUES,
};

interface PackagesResultsProps {
  records: readonly PackageRecord[];
  query: ParsedListQuery<PackageSortKey, PackageFilterKey>;
}

export function PackagesResults({ records, query }: PackagesResultsProps) {
  const t = useTranslations("packagesExample");
  const pills: ActiveFilterPill[] = [];
  for (const key of PACKAGE_LIST_QUERY_CONFIG.filterKeys) {
    for (const value of query.filters[key]) {
      const label = FILTER_VALUES[key].includes(value)
        ? t(`filters.${key}.${value}`)
        : value;
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
        <ResultsView
          view={query.view}
          items={records}
          getItemKey={(record) => record.id}
          renderListItem={(record) => <PackageListRow record={record} />}
          renderGridItem={(record) => <PackageGridCard record={record} />}
          listAriaLabel={t("results.listAriaLabel")}
        />
      )}
    </>
  );
}

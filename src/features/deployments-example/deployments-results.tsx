import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import {
  DATE_RANGE_VALUES,
  DEPLOYMENT_LIST_QUERY_CONFIG,
  ENVIRONMENT_VALUES,
  STATUS_VALUES,
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
import type { ParsedListQuery } from "@/features/list-page/types";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const DEPLOYMENTS_PATH = "/examples/deployments";

const TRANSLATABLE_FILTER_VALUES: Record<
  Exclude<DeploymentFilterKey, "branch">,
  readonly string[]
> = {
  status: STATUS_VALUES,
  environment: ENVIRONMENT_VALUES,
  dateRange: DATE_RANGE_VALUES,
};

interface DeploymentsResultsProps {
  records: readonly DeploymentRecord[];
  query: ParsedListQuery<DeploymentSortKey, DeploymentFilterKey>;
}

export function DeploymentsResults({
  records,
  query,
}: DeploymentsResultsProps) {
  const t = useTranslations("deploymentsExample");

  function resolveFilterLabel(key: DeploymentFilterKey, value: string): string {
    if (key === "branch") return value;
    return TRANSLATABLE_FILTER_VALUES[key].includes(value)
      ? t(`filters.${key}.${value}`)
      : value;
  }

  const pills: ActiveFilterPill[] = [];
  for (const key of DEPLOYMENT_LIST_QUERY_CONFIG.filterKeys) {
    for (const value of query.filters[key]) {
      const label = resolveFilterLabel(key, value);
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
          renderListItem={(record) => <DeploymentListRow record={record} />}
          renderGridItem={(record) => <DeploymentGridCard record={record} />}
          listAriaLabel={t("results.listAriaLabel")}
        />
      )}
    </>
  );
}

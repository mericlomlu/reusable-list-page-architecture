"use client";

import { useTranslations } from "next-intl";
import {
  BRANCHES,
  DATE_RANGE_VALUES,
  DEPLOYMENT_LIST_QUERY_CONFIG,
  ENVIRONMENT_VALUES,
  SORT_VALUES,
  STATUS_VALUES,
} from "@/features/deployments-example/config";
import type {
  DeploymentFilterKey,
  DeploymentSortKey,
} from "@/features/deployments-example/types";
import { SearchField } from "@/features/list-page/search-field";
import { SingleSelectFilter } from "@/features/list-page/single-select-filter";
import { SortMenu } from "@/features/list-page/sort-menu";
import { useListQueryState } from "@/features/list-page/use-list-query-state";
import { ViewSwitcher } from "@/features/list-page/view-switcher";

const BRANCH_OPTIONS = BRANCHES.map((branch) => ({
  value: branch,
  label: branch,
}));

export function DeploymentsToolbar() {
  const t = useTranslations("deploymentsExample");
  const { query, setSearch, setSort, setView, setSingleFilter } =
    useListQueryState<DeploymentSortKey, DeploymentFilterKey>(
      DEPLOYMENT_LIST_QUERY_CONFIG,
    );

  const statusOptions = STATUS_VALUES.map((value) => ({
    value,
    label: t(`filters.status.${value}`),
  }));
  const environmentOptions = ENVIRONMENT_VALUES.map((value) => ({
    value,
    label: t(`filters.environment.${value}`),
  }));
  const dateRangeOptions = DATE_RANGE_VALUES.map((value) => ({
    value,
    label: t(`filters.dateRange.${value}`),
  }));
  const sortOptions = SORT_VALUES.map((value) => ({
    value,
    label: t(`sort.${value}`),
  }));

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <SearchField
        label={t("toolbar.searchLabel")}
        placeholder={t("toolbar.searchPlaceholder")}
        value={query.search}
        onChange={setSearch}
      />
      <SingleSelectFilter
        label={t("filters.statusLabel")}
        options={statusOptions}
        value={query.filters.status[0]}
        onChange={(value) => setSingleFilter("status", value)}
      />
      <SingleSelectFilter
        label={t("filters.environmentLabel")}
        options={environmentOptions}
        value={query.filters.environment[0]}
        onChange={(value) => setSingleFilter("environment", value)}
      />
      <SingleSelectFilter
        label={t("filters.branchLabel")}
        options={BRANCH_OPTIONS}
        value={query.filters.branch[0]}
        onChange={(value) => setSingleFilter("branch", value)}
      />
      <SingleSelectFilter
        label={t("filters.dateLabel")}
        options={dateRangeOptions}
        value={query.filters.dateRange[0]}
        onChange={(value) => setSingleFilter("dateRange", value)}
      />
      <div className="flex-1" />
      <SortMenu options={sortOptions} value={query.sort} onChange={setSort} />
      <ViewSwitcher value={query.view} onChange={setView} />
    </div>
  );
}

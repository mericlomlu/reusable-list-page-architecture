"use client";

import {
  BRANCH_OPTIONS,
  DATE_RANGE_OPTIONS,
  DEPLOYMENT_LIST_QUERY_CONFIG,
  ENVIRONMENT_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
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

export function DeploymentsToolbar() {
  const { query, setSearch, setSort, setView, setSingleFilter } =
    useListQueryState<DeploymentSortKey, DeploymentFilterKey>(
      DEPLOYMENT_LIST_QUERY_CONFIG,
    );

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <SearchField
        label="Search deployments"
        placeholder="Search branch or commit…"
        value={query.search}
        onChange={setSearch}
      />
      <SingleSelectFilter
        label="Status"
        options={STATUS_OPTIONS}
        value={query.filters.status[0]}
        onChange={(value) => setSingleFilter("status", value)}
      />
      <SingleSelectFilter
        label="Environment"
        options={ENVIRONMENT_OPTIONS}
        value={query.filters.environment[0]}
        onChange={(value) => setSingleFilter("environment", value)}
      />
      <SingleSelectFilter
        label="Branch"
        options={BRANCH_OPTIONS}
        value={query.filters.branch[0]}
        onChange={(value) => setSingleFilter("branch", value)}
      />
      <SingleSelectFilter
        label="Date"
        options={DATE_RANGE_OPTIONS}
        value={query.filters.dateRange[0]}
        onChange={(value) => setSingleFilter("dateRange", value)}
      />
      <div className="flex-1" />
      <SortMenu options={SORT_OPTIONS} value={query.sort} onChange={setSort} />
      <ViewSwitcher value={query.view} onChange={setView} />
    </div>
  );
}

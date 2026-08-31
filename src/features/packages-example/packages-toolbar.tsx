"use client";

import { SearchField } from "@/features/list-page/search-field";
import { SingleSelectFilter } from "@/features/list-page/single-select-filter";
import { SortMenu } from "@/features/list-page/sort-menu";
import { useListQueryState } from "@/features/list-page/use-list-query-state";
import { ViewSwitcher } from "@/features/list-page/view-switcher";
import {
  DEPENDENCY_TYPE_OPTIONS,
  PACKAGE_LIST_QUERY_CONFIG,
  SORT_OPTIONS,
  UPDATE_STATUS_OPTIONS,
} from "@/features/packages-example/config";
import type {
  PackageFilterKey,
  PackageSortKey,
} from "@/features/packages-example/types";

export function PackagesToolbar() {
  const { query, setSearch, setSort, setView, setSingleFilter } =
    useListQueryState<PackageSortKey, PackageFilterKey>(
      PACKAGE_LIST_QUERY_CONFIG,
    );

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <SearchField
        label="Search packages"
        placeholder="Search packages…"
        value={query.search}
        onChange={setSearch}
      />
      <SingleSelectFilter
        label="Dependency"
        options={DEPENDENCY_TYPE_OPTIONS}
        value={query.filters.dependencyType[0]}
        onChange={(value) => setSingleFilter("dependencyType", value)}
      />
      <SingleSelectFilter
        label="Updates"
        options={UPDATE_STATUS_OPTIONS}
        value={query.filters.updateStatus[0]}
        onChange={(value) => setSingleFilter("updateStatus", value)}
      />
      <div className="flex-1" />
      <SortMenu options={SORT_OPTIONS} value={query.sort} onChange={setSort} />
      <ViewSwitcher value={query.view} onChange={setView} />
    </div>
  );
}

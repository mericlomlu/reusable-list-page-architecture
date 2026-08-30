"use client";

import {
  CATEGORY_OPTIONS,
  COMPONENT_LIST_QUERY_CONFIG,
  FRAMEWORK_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
} from "@/features/components-example/config";
import type {
  ComponentFilterKey,
  ComponentSortKey,
} from "@/features/components-example/types";
import { MultiSelectFilter } from "@/features/list-page/multi-select-filter";
import { SearchField } from "@/features/list-page/search-field";
import { SingleSelectFilter } from "@/features/list-page/single-select-filter";
import { SortMenu } from "@/features/list-page/sort-menu";
import { useListQueryState } from "@/features/list-page/use-list-query-state";
import { ViewSwitcher } from "@/features/list-page/view-switcher";

export function ComponentsToolbar() {
  const {
    query,
    setSearch,
    setSort,
    setView,
    setSingleFilter,
    toggleMultiFilter,
  } = useListQueryState<ComponentSortKey, ComponentFilterKey>(
    COMPONENT_LIST_QUERY_CONFIG,
  );

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <SearchField
        label="Search components"
        placeholder="Search components…"
        value={query.search}
        onChange={setSearch}
      />
      <SingleSelectFilter
        label="Category"
        options={CATEGORY_OPTIONS}
        value={query.filters.category[0]}
        onChange={(value) => setSingleFilter("category", value)}
      />
      <MultiSelectFilter
        label="Framework"
        options={FRAMEWORK_OPTIONS}
        selectedValues={query.filters.framework}
        onToggle={(value) => toggleMultiFilter("framework", value)}
      />
      <SingleSelectFilter
        label="Status"
        options={STATUS_OPTIONS}
        value={query.filters.status[0]}
        onChange={(value) => setSingleFilter("status", value)}
      />
      <div className="flex-1" />
      <SortMenu options={SORT_OPTIONS} value={query.sort} onChange={setSort} />
      <ViewSwitcher value={query.view} onChange={setView} />
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import {
  CATEGORY_VALUES,
  COMPONENT_LIST_QUERY_CONFIG,
  FRAMEWORK_VALUES,
  SORT_VALUES,
  STATUS_VALUES,
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
  const t = useTranslations("componentsExample");
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

  const categoryOptions = CATEGORY_VALUES.map((value) => ({
    value,
    label: t(`filters.category.${value}`),
  }));
  const frameworkOptions = FRAMEWORK_VALUES.map((value) => ({
    value,
    label: t(`filters.framework.${value}`),
  }));
  const statusOptions = STATUS_VALUES.map((value) => ({
    value,
    label: t(`filters.status.${value}`),
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
        label={t("filters.categoryLabel")}
        options={categoryOptions}
        value={query.filters.category[0]}
        onChange={(value) => setSingleFilter("category", value)}
      />
      <MultiSelectFilter
        label={t("filters.frameworkLabel")}
        options={frameworkOptions}
        selectedValues={query.filters.framework}
        onToggle={(value) => toggleMultiFilter("framework", value)}
      />
      <SingleSelectFilter
        label={t("filters.statusLabel")}
        options={statusOptions}
        value={query.filters.status[0]}
        onChange={(value) => setSingleFilter("status", value)}
      />
      <div className="flex-1" />
      <SortMenu options={sortOptions} value={query.sort} onChange={setSort} />
      <ViewSwitcher value={query.view} onChange={setView} />
    </div>
  );
}

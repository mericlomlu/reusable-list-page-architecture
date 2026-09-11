"use client";

import { useTranslations } from "next-intl";
import { SearchField } from "@/features/list-page/search-field";
import { SingleSelectFilter } from "@/features/list-page/single-select-filter";
import { SortMenu } from "@/features/list-page/sort-menu";
import { useListQueryState } from "@/features/list-page/use-list-query-state";
import { ViewSwitcher } from "@/features/list-page/view-switcher";
import {
  DEPENDENCY_TYPE_VALUES,
  PACKAGE_LIST_QUERY_CONFIG,
  SORT_VALUES,
  UPDATE_STATUS_VALUES,
} from "@/features/packages-example/config";
import type {
  PackageFilterKey,
  PackageSortKey,
} from "@/features/packages-example/types";

export function PackagesToolbar() {
  const t = useTranslations("packagesExample");
  const { query, setSearch, setSort, setView, setSingleFilter } =
    useListQueryState<PackageSortKey, PackageFilterKey>(
      PACKAGE_LIST_QUERY_CONFIG,
    );

  const dependencyTypeOptions = DEPENDENCY_TYPE_VALUES.map((value) => ({
    value,
    label: t(`filters.dependencyType.${value}`),
  }));
  const updateStatusOptions = UPDATE_STATUS_VALUES.map((value) => ({
    value,
    label: t(`filters.updateStatus.${value}`),
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
        label={t("filters.dependencyLabel")}
        options={dependencyTypeOptions}
        value={query.filters.dependencyType[0]}
        onChange={(value) => setSingleFilter("dependencyType", value)}
      />
      <SingleSelectFilter
        label={t("filters.updatesLabel")}
        options={updateStatusOptions}
        value={query.filters.updateStatus[0]}
        onChange={(value) => setSingleFilter("updateStatus", value)}
      />
      <div className="flex-1" />
      <SortMenu options={sortOptions} value={query.sort} onChange={setSort} />
      <ViewSwitcher value={query.view} onChange={setView} />
    </div>
  );
}

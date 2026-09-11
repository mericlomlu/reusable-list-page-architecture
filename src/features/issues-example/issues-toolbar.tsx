"use client";

import { useTranslations } from "next-intl";
import {
  ASSIGNEE_FILTER_VALUES,
  ASSIGNEES,
  ISSUE_LIST_QUERY_CONFIG,
  LABEL_VALUES,
  PRIORITY_VALUES,
  SORT_VALUES,
  STATUS_VALUES,
  UNASSIGNED_FILTER_VALUE,
} from "@/features/issues-example/config";
import type {
  IssueFilterKey,
  IssueSortKey,
} from "@/features/issues-example/types";
import { SearchField } from "@/features/list-page/search-field";
import { SingleSelectFilter } from "@/features/list-page/single-select-filter";
import { SortMenu } from "@/features/list-page/sort-menu";
import { useListQueryState } from "@/features/list-page/use-list-query-state";
import { ViewSwitcher } from "@/features/list-page/view-switcher";

const ASSIGNEE_NAME_BY_ID = new Map(
  ASSIGNEES.map((assignee) => [assignee.id, assignee.name]),
);

export function IssuesToolbar() {
  const t = useTranslations("issuesExample");
  const { query, setSearch, setSort, setView, setSingleFilter } =
    useListQueryState<IssueSortKey, IssueFilterKey>(ISSUE_LIST_QUERY_CONFIG);

  const statusOptions = STATUS_VALUES.map((value) => ({
    value,
    label: t(`filters.status.${value}`),
  }));
  const priorityOptions = PRIORITY_VALUES.map((value) => ({
    value,
    label: t(`filters.priority.${value}`),
  }));
  const labelOptions = LABEL_VALUES.map((value) => ({ value, label: value }));
  const assigneeOptions = ASSIGNEE_FILTER_VALUES.map((value) => ({
    value,
    label:
      value === UNASSIGNED_FILTER_VALUE
        ? t("filters.unassigned")
        : (ASSIGNEE_NAME_BY_ID.get(value) ?? value),
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
        label={t("filters.priorityLabel")}
        options={priorityOptions}
        value={query.filters.priority[0]}
        onChange={(value) => setSingleFilter("priority", value)}
      />
      <SingleSelectFilter
        label={t("filters.labelLabel")}
        options={labelOptions}
        value={query.filters.label[0]}
        onChange={(value) => setSingleFilter("label", value)}
      />
      <SingleSelectFilter
        label={t("filters.assigneeLabel")}
        options={assigneeOptions}
        value={query.filters.assignee[0]}
        onChange={(value) => setSingleFilter("assignee", value)}
      />
      <div className="flex-1" />
      <SortMenu options={sortOptions} value={query.sort} onChange={setSort} />
      <ViewSwitcher value={query.view} onChange={setView} />
    </div>
  );
}

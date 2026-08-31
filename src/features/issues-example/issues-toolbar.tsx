"use client";

import {
  ASSIGNEE_OPTIONS,
  ISSUE_LIST_QUERY_CONFIG,
  LABEL_OPTIONS,
  PRIORITY_OPTIONS,
  SORT_OPTIONS,
  STATUS_OPTIONS,
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

export function IssuesToolbar() {
  const { query, setSearch, setSort, setView, setSingleFilter } =
    useListQueryState<IssueSortKey, IssueFilterKey>(ISSUE_LIST_QUERY_CONFIG);

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <SearchField
        label="Search issues"
        placeholder="Search issues…"
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
        label="Priority"
        options={PRIORITY_OPTIONS}
        value={query.filters.priority[0]}
        onChange={(value) => setSingleFilter("priority", value)}
      />
      <SingleSelectFilter
        label="Label"
        options={LABEL_OPTIONS}
        value={query.filters.label[0]}
        onChange={(value) => setSingleFilter("label", value)}
      />
      <SingleSelectFilter
        label="Assignee"
        options={ASSIGNEE_OPTIONS}
        value={query.filters.assignee[0]}
        onChange={(value) => setSingleFilter("assignee", value)}
      />
      <div className="flex-1" />
      <SortMenu options={SORT_OPTIONS} value={query.sort} onChange={setSort} />
      <ViewSwitcher value={query.view} onChange={setView} />
    </div>
  );
}

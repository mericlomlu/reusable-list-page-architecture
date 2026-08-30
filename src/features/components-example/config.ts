import type {
  ComponentFilterKey,
  ComponentSortKey,
} from "@/features/components-example/types";
import type {
  FilterOption,
  ListQueryConfig,
  SortOption,
} from "@/features/list-page/types";

export const COMPONENT_PAGE_SIZE = 8;

export const COMPONENT_LIST_GRID_COLUMNS =
  "minmax(160px,220px) 1fr 110px 120px 90px";
export const COMPONENT_LIST_COLUMN_COUNT = 5;

export const CATEGORY_OPTIONS: readonly FilterOption[] = [
  { value: "forms", label: "Forms" },
  { value: "navigation", label: "Navigation" },
  { value: "feedback", label: "Feedback" },
  { value: "data-display", label: "Data Display" },
  { value: "overlays", label: "Overlays" },
];

export const FRAMEWORK_OPTIONS: readonly FilterOption[] = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

export const STATUS_OPTIONS: readonly FilterOption[] = [
  { value: "stable", label: "Stable" },
  { value: "beta", label: "Beta" },
  { value: "deprecated", label: "Deprecated" },
];

export const SORT_OPTIONS: readonly SortOption<ComponentSortKey>[] = [
  { value: "updated", label: "Updated" },
  { value: "name", label: "Name" },
  { value: "status", label: "Status" },
];

export const COMPONENT_LIST_QUERY_CONFIG: ListQueryConfig<
  ComponentSortKey,
  ComponentFilterKey
> = {
  defaultSort: "updated",
  sortValues: SORT_OPTIONS.map((option) => option.value),
  defaultView: "list",
  filterKeys: ["category", "framework", "status"],
  singleValueFilterKeys: ["category", "status"],
  pageSize: COMPONENT_PAGE_SIZE,
};

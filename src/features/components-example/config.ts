import type {
  ComponentCategory,
  ComponentFilterKey,
  ComponentFramework,
  ComponentSortKey,
  ComponentStatus,
} from "@/features/components-example/types";
import type { ListQueryConfig } from "@/features/list-page/types";

export const COMPONENT_PAGE_SIZE = 8;

export const COMPONENT_LIST_GRID_COLUMNS =
  "minmax(160px,220px) 1fr 110px 120px 90px";
export const COMPONENT_LIST_COLUMN_COUNT = 5;

/**
 * Filter/sort values, kept separate from their display labels: labels are
 * locale-dependent and resolved at render time via the "componentsExample"
 * message namespace, while these value lists stay stable for query-string
 * matching and `ListQueryConfig`.
 */
export const CATEGORY_VALUES: readonly ComponentCategory[] = [
  "forms",
  "navigation",
  "feedback",
  "data-display",
  "overlays",
];

export const FRAMEWORK_VALUES: readonly ComponentFramework[] = [
  "react",
  "vue",
  "svelte",
  "angular",
];

export const STATUS_VALUES: readonly ComponentStatus[] = [
  "stable",
  "beta",
  "deprecated",
];

export const SORT_VALUES: readonly ComponentSortKey[] = [
  "updated",
  "name",
  "status",
];

export const COMPONENT_LIST_QUERY_CONFIG: ListQueryConfig<
  ComponentSortKey,
  ComponentFilterKey
> = {
  defaultSort: "updated",
  sortValues: SORT_VALUES,
  defaultView: "list",
  filterKeys: ["category", "framework", "status"],
  singleValueFilterKeys: ["category", "status"],
  pageSize: COMPONENT_PAGE_SIZE,
};

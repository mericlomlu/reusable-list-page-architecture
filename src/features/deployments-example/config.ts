import type {
  DeploymentEnvironment,
  DeploymentFilterKey,
  DeploymentSortKey,
} from "@/features/deployments-example/types";
import type {
  FilterOption,
  ListQueryConfig,
  SortOption,
} from "@/features/list-page/types";

export const DEPLOYMENT_PAGE_SIZE = 8;

export const DEPLOYMENT_LIST_GRID_COLUMNS = "150px 1fr 130px 130px 110px";
export const DEPLOYMENT_LIST_COLUMN_COUNT = 5;

export const STATUS_OPTIONS: readonly FilterOption[] = [
  { value: "ready", label: "Ready" },
  { value: "building", label: "Building" },
  { value: "failed", label: "Failed" },
];

export const ENVIRONMENT_OPTIONS: readonly FilterOption[] = [
  { value: "production", label: "Production" },
  { value: "preview", label: "Preview" },
  { value: "staging", label: "Staging" },
];

export const ENVIRONMENT_LABEL: Record<DeploymentEnvironment, string> = {
  production: "Production",
  preview: "Preview",
  staging: "Staging",
};

export const BRANCHES: readonly string[] = [
  "main",
  "feat/bulk-actions",
  "fix/sort-menu",
  "feat/view-switcher",
  "chore/deps",
  "fix/pagination-edge-case",
  "feat/filter-panel-mobile",
  "docs/query-state-guide",
];

export const BRANCH_OPTIONS: readonly FilterOption[] = BRANCHES.map(
  (branch) => ({ value: branch, label: branch }),
);

export const DATE_RANGE_OPTIONS: readonly FilterOption[] = [
  { value: "24h", label: "Last 24 hours" },
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
];

export const SORT_OPTIONS: readonly SortOption<DeploymentSortKey>[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export const DEPLOYMENT_LIST_QUERY_CONFIG: ListQueryConfig<
  DeploymentSortKey,
  DeploymentFilterKey
> = {
  defaultSort: "newest",
  sortValues: SORT_OPTIONS.map((option) => option.value),
  defaultView: "list",
  filterKeys: ["status", "environment", "branch", "dateRange"],
  singleValueFilterKeys: ["status", "environment", "branch", "dateRange"],
  pageSize: DEPLOYMENT_PAGE_SIZE,
};

import type {
  DeploymentDateRange,
  DeploymentEnvironment,
  DeploymentFilterKey,
  DeploymentSortKey,
  DeploymentStatus,
} from "@/features/deployments-example/types";
import type { ListQueryConfig } from "@/features/list-page/types";

export const DEPLOYMENT_PAGE_SIZE = 8;

export const DEPLOYMENT_LIST_GRID_COLUMNS = "150px 1fr 130px 130px 110px";
export const DEPLOYMENT_LIST_COLUMN_COUNT = 5;

/**
 * Filter/sort values, kept separate from their display labels: labels are
 * locale-dependent and resolved at render time via the "deploymentsExample"
 * message namespace, while these value lists stay stable for query-string
 * matching and `ListQueryConfig`. `BRANCHES` are left untranslated by
 * design — they're technical branch names, not UI copy.
 */
export const STATUS_VALUES: readonly DeploymentStatus[] = [
  "ready",
  "building",
  "failed",
];

export const ENVIRONMENT_VALUES: readonly DeploymentEnvironment[] = [
  "production",
  "preview",
  "staging",
];

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

export const DATE_RANGE_VALUES: readonly DeploymentDateRange[] = [
  "24h",
  "7d",
  "30d",
];

export const SORT_VALUES: readonly DeploymentSortKey[] = ["newest", "oldest"];

export const DEPLOYMENT_LIST_QUERY_CONFIG: ListQueryConfig<
  DeploymentSortKey,
  DeploymentFilterKey
> = {
  defaultSort: "newest",
  sortValues: SORT_VALUES,
  defaultView: "list",
  filterKeys: ["status", "environment", "branch", "dateRange"],
  singleValueFilterKeys: ["status", "environment", "branch", "dateRange"],
  pageSize: DEPLOYMENT_PAGE_SIZE,
};

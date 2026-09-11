import type { ListQueryConfig } from "@/features/list-page/types";
import type {
  PackageDependencyType,
  PackageFilterKey,
  PackageSortKey,
  PackageUpdateStatus,
} from "@/features/packages-example/types";

export const PACKAGE_PAGE_SIZE = 8;

export const PACKAGE_LIST_GRID_COLUMNS = "1fr 90px 130px 150px";
export const PACKAGE_LIST_COLUMN_COUNT = 4;

/**
 * Filter/sort values, kept separate from their display labels: labels are
 * locale-dependent and resolved at render time via the "packagesExample"
 * message namespace, while these value lists stay stable for query-string
 * matching and `ListQueryConfig`.
 */
export const DEPENDENCY_TYPE_VALUES: readonly PackageDependencyType[] = [
  "dependency",
  "devDependency",
];

export const UPDATE_STATUS_VALUES: readonly PackageUpdateStatus[] = [
  "up-to-date",
  "minor-update",
  "outdated",
];

export const SORT_VALUES: readonly PackageSortKey[] = [
  "version",
  "name",
  "updateStatus",
];

export const PACKAGE_LIST_QUERY_CONFIG: ListQueryConfig<
  PackageSortKey,
  PackageFilterKey
> = {
  defaultSort: "version",
  sortValues: SORT_VALUES,
  defaultView: "list",
  filterKeys: ["dependencyType", "updateStatus"],
  singleValueFilterKeys: ["dependencyType", "updateStatus"],
  pageSize: PACKAGE_PAGE_SIZE,
};

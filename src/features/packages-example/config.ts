import type {
  FilterOption,
  ListQueryConfig,
  SortOption,
} from "@/features/list-page/types";
import type {
  PackageDependencyType,
  PackageFilterKey,
  PackageSortKey,
  PackageUpdateStatus,
} from "@/features/packages-example/types";

export const PACKAGE_PAGE_SIZE = 8;

export const PACKAGE_LIST_GRID_COLUMNS = "1fr 90px 130px 150px";
export const PACKAGE_LIST_COLUMN_COUNT = 4;

export const DEPENDENCY_TYPE_LABEL: Record<PackageDependencyType, string> = {
  dependency: "Runtime dependency",
  devDependency: "Dev dependency",
};

export const DEPENDENCY_TYPE_OPTIONS: readonly FilterOption[] = [
  { value: "dependency", label: "Runtime" },
  { value: "devDependency", label: "Dev" },
];

export const UPDATE_STATUS_LABEL: Record<PackageUpdateStatus, string> = {
  "up-to-date": "Up to date",
  "minor-update": "Minor update",
  outdated: "Outdated",
};

export const UPDATE_STATUS_OPTIONS: readonly FilterOption[] = [
  { value: "up-to-date", label: "Up to date" },
  { value: "minor-update", label: "Minor update" },
  { value: "outdated", label: "Outdated" },
];

export const SORT_OPTIONS: readonly SortOption<PackageSortKey>[] = [
  { value: "version", label: "Version" },
  { value: "name", label: "Name" },
  { value: "updateStatus", label: "Update status" },
];

export const PACKAGE_LIST_QUERY_CONFIG: ListQueryConfig<
  PackageSortKey,
  PackageFilterKey
> = {
  defaultSort: "version",
  sortValues: SORT_OPTIONS.map((option) => option.value),
  defaultView: "list",
  filterKeys: ["dependencyType", "updateStatus"],
  singleValueFilterKeys: ["dependencyType", "updateStatus"],
  pageSize: PACKAGE_PAGE_SIZE,
};

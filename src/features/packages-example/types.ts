export type PackageDependencyType = "dependency" | "devDependency";

export type PackageUpdateStatus = "up-to-date" | "minor-update" | "outdated";

export type PackageSortKey = "version" | "name" | "updateStatus";

export type PackageFilterKey = "dependencyType" | "updateStatus";

export interface PackageRecord {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly version: string;
  readonly dependencyType: PackageDependencyType;
  readonly updateStatus: PackageUpdateStatus;
}

export type DeploymentStatus = "ready" | "building" | "failed";

export type DeploymentEnvironment = "production" | "preview" | "staging";

export type DeploymentDateRange = "24h" | "7d" | "30d";

export type DeploymentSortKey = "newest" | "oldest";

export type DeploymentFilterKey =
  | "status"
  | "environment"
  | "branch"
  | "dateRange";

export interface DeploymentRecord {
  readonly id: string;
  readonly branch: string;
  readonly commitMessage: string;
  readonly environment: DeploymentEnvironment;
  readonly status: DeploymentStatus;
  /** ISO datetime (not just a date) — deployments need minute/hour precision. */
  readonly deployedAt: string;
}

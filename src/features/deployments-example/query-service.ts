import { DEPLOYMENT_LIST_QUERY_CONFIG } from "@/features/deployments-example/config";
import { DEPLOYMENT_MOCK_RECORDS } from "@/features/deployments-example/mock-data";
import { deploymentDateRangeCutoff } from "@/features/deployments-example/relative-time";
import type {
  DeploymentDateRange,
  DeploymentFilterKey,
  DeploymentRecord,
  DeploymentSortKey,
} from "@/features/deployments-example/types";
import {
  type DemoState,
  simulateLatency,
} from "@/features/list-page/demo-state";
import type { ParsedListQuery } from "@/features/list-page/types";

export interface DeploymentsQueryResult {
  readonly records: readonly DeploymentRecord[];
  readonly total: number;
  /** The page actually served, clamped to the last valid page. */
  readonly page: number;
}

const BASE_LATENCY_MS = 250;
const LOADING_DEMO_LATENCY_MS = 1600;

const VALID_DATE_RANGES: ReadonlySet<string> = new Set(["24h", "7d", "30d"]);

function isDeploymentDateRange(
  value: string | undefined,
): value is DeploymentDateRange {
  return value !== undefined && VALID_DATE_RANGES.has(value);
}

/**
 * Reusable query engine for the Deployments example: filters, sorts, and
 * paginates the mock dataset from an already-parsed list query. Shared by
 * the `/api/deployments` Route Handler and the `/examples/deployments`
 * Server Component so both call the same logic instead of the page fetching
 * its own API route.
 */
export async function queryDeployments(
  query: ParsedListQuery<DeploymentSortKey, DeploymentFilterKey>,
  demoState: DemoState,
): Promise<DeploymentsQueryResult> {
  await simulateLatency(
    demoState === "loading" ? LOADING_DEMO_LATENCY_MS : BASE_LATENCY_MS,
  );

  if (demoState === "error") {
    throw new Error("Failed to load deployments.");
  }

  if (demoState === "empty") {
    return { records: [], total: 0, page: 1 };
  }

  const search = query.search.toLowerCase();
  const dateRange = isDeploymentDateRange(query.filters.dateRange[0])
    ? query.filters.dateRange[0]
    : undefined;
  const dateCutoff = dateRange
    ? deploymentDateRangeCutoff(dateRange)
    : undefined;

  const filtered = DEPLOYMENT_MOCK_RECORDS.filter((record) => {
    const matchesSearch =
      search.length === 0 ||
      record.branch.toLowerCase().includes(search) ||
      record.commitMessage.toLowerCase().includes(search);
    const matchesStatus =
      query.filters.status.length === 0 ||
      query.filters.status.includes(record.status);
    const matchesEnvironment =
      query.filters.environment.length === 0 ||
      query.filters.environment.includes(record.environment);
    const matchesBranch =
      query.filters.branch.length === 0 ||
      query.filters.branch.includes(record.branch);
    const matchesDateRange =
      !dateCutoff || new Date(record.deployedAt) >= dateCutoff;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesEnvironment &&
      matchesBranch &&
      matchesDateRange
    );
  });

  const sorted = sortDeployments(filtered, query.sort);

  const pageCount = Math.max(
    1,
    Math.ceil(sorted.length / DEPLOYMENT_LIST_QUERY_CONFIG.pageSize),
  );
  const page = Math.min(query.page, pageCount);

  const start = (page - 1) * DEPLOYMENT_LIST_QUERY_CONFIG.pageSize;
  const pageRecords = sorted.slice(
    start,
    start + DEPLOYMENT_LIST_QUERY_CONFIG.pageSize,
  );

  return { records: pageRecords, total: sorted.length, page };
}

function sortDeployments(
  records: readonly DeploymentRecord[],
  sort: DeploymentSortKey,
): DeploymentRecord[] {
  const sorted = [...records];
  if (sort === "oldest") {
    return sorted.sort((a, b) => a.deployedAt.localeCompare(b.deployedAt));
  }
  return sorted.sort((a, b) => b.deployedAt.localeCompare(a.deployedAt));
}

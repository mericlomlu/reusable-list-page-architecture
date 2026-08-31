import {
  type DemoState,
  simulateLatency,
} from "@/features/list-page/demo-state";
import type { ParsedListQuery } from "@/features/list-page/types";
import { PACKAGE_LIST_QUERY_CONFIG } from "@/features/packages-example/config";
import { PACKAGE_MOCK_RECORDS } from "@/features/packages-example/mock-data";
import type {
  PackageFilterKey,
  PackageRecord,
  PackageSortKey,
  PackageUpdateStatus,
} from "@/features/packages-example/types";
import { compareVersions } from "@/features/packages-example/version";

export interface PackagesQueryResult {
  readonly records: readonly PackageRecord[];
  readonly total: number;
  /** The page actually served, clamped to the last valid page. */
  readonly page: number;
}

const BASE_LATENCY_MS = 250;
const LOADING_DEMO_LATENCY_MS = 1600;

const UPDATE_STATUS_URGENCY: Record<PackageUpdateStatus, number> = {
  outdated: 0,
  "minor-update": 1,
  "up-to-date": 2,
};

/**
 * Reusable query engine for the Packages example: filters, sorts, and
 * paginates the mock dataset from an already-parsed list query. Shared by
 * the `/api/packages` Route Handler and the `/examples/packages` Server
 * Component so both call the same logic instead of the page fetching its
 * own API route.
 */
export async function queryPackages(
  query: ParsedListQuery<PackageSortKey, PackageFilterKey>,
  demoState: DemoState,
): Promise<PackagesQueryResult> {
  await simulateLatency(
    demoState === "loading" ? LOADING_DEMO_LATENCY_MS : BASE_LATENCY_MS,
  );

  if (demoState === "error") {
    throw new Error("Failed to load packages.");
  }

  if (demoState === "empty") {
    return { records: [], total: 0, page: 1 };
  }

  const search = query.search.toLowerCase();

  const filtered = PACKAGE_MOCK_RECORDS.filter((record) => {
    const matchesSearch =
      search.length === 0 ||
      record.name.toLowerCase().includes(search) ||
      record.description.toLowerCase().includes(search);
    const matchesDependencyType =
      query.filters.dependencyType.length === 0 ||
      query.filters.dependencyType.includes(record.dependencyType);
    const matchesUpdateStatus =
      query.filters.updateStatus.length === 0 ||
      query.filters.updateStatus.includes(record.updateStatus);

    return matchesSearch && matchesDependencyType && matchesUpdateStatus;
  });

  const sorted = sortPackages(filtered, query.sort);

  const pageCount = Math.max(
    1,
    Math.ceil(sorted.length / PACKAGE_LIST_QUERY_CONFIG.pageSize),
  );
  const page = Math.min(query.page, pageCount);

  const start = (page - 1) * PACKAGE_LIST_QUERY_CONFIG.pageSize;
  const pageRecords = sorted.slice(
    start,
    start + PACKAGE_LIST_QUERY_CONFIG.pageSize,
  );

  return { records: pageRecords, total: sorted.length, page };
}

function sortPackages(
  records: readonly PackageRecord[],
  sort: PackageSortKey,
): PackageRecord[] {
  const sorted = [...records];
  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "updateStatus":
      return sorted.sort(
        (a, b) =>
          UPDATE_STATUS_URGENCY[a.updateStatus] -
            UPDATE_STATUS_URGENCY[b.updateStatus] ||
          a.name.localeCompare(b.name),
      );
    default:
      return sorted.sort((a, b) => compareVersions(b.version, a.version));
  }
}

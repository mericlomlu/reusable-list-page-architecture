import {
  ISSUE_LIST_QUERY_CONFIG,
  UNASSIGNED_FILTER_VALUE,
} from "@/features/issues-example/config";
import { ISSUE_MOCK_RECORDS } from "@/features/issues-example/mock-data";
import type {
  IssueFilterKey,
  IssueRecord,
  IssueSortKey,
} from "@/features/issues-example/types";
import {
  type DemoState,
  simulateLatency,
} from "@/features/list-page/demo-state";
import type { ParsedListQuery } from "@/features/list-page/types";

export interface IssuesQueryResult {
  readonly records: readonly IssueRecord[];
  readonly total: number;
  /** The page actually served, clamped to the last valid page. */
  readonly page: number;
}

const BASE_LATENCY_MS = 250;
const LOADING_DEMO_LATENCY_MS = 1600;

/**
 * Reusable query engine for the Issues example: filters, sorts, and
 * paginates the mock dataset from an already-parsed list query. Shared by
 * the `/api/issues` Route Handler and the `/examples/issues` Server
 * Component so both call the same logic instead of the page fetching its
 * own API route.
 */
export async function queryIssues(
  query: ParsedListQuery<IssueSortKey, IssueFilterKey>,
  demoState: DemoState,
): Promise<IssuesQueryResult> {
  await simulateLatency(
    demoState === "loading" ? LOADING_DEMO_LATENCY_MS : BASE_LATENCY_MS,
  );

  if (demoState === "error") {
    throw new Error("Failed to load issues.");
  }

  if (demoState === "empty") {
    return { records: [], total: 0, page: 1 };
  }

  const search = query.search.toLowerCase();

  const filtered = ISSUE_MOCK_RECORDS.filter((record) => {
    const matchesSearch =
      search.length === 0 ||
      record.title.toLowerCase().includes(search) ||
      String(record.number).includes(search);
    const matchesStatus =
      query.filters.status.length === 0 ||
      query.filters.status.includes(record.status);
    const matchesPriority =
      query.filters.priority.length === 0 ||
      query.filters.priority.includes(record.priority);
    const matchesLabel =
      query.filters.label.length === 0 ||
      query.filters.label.includes(record.label);
    const matchesAssignee =
      query.filters.assignee.length === 0 ||
      query.filters.assignee.includes(
        record.assignee?.id ?? UNASSIGNED_FILTER_VALUE,
      );

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesLabel &&
      matchesAssignee
    );
  });

  const sorted = sortIssues(filtered, query.sort);

  const pageCount = Math.max(
    1,
    Math.ceil(sorted.length / ISSUE_LIST_QUERY_CONFIG.pageSize),
  );
  const page = Math.min(query.page, pageCount);

  const start = (page - 1) * ISSUE_LIST_QUERY_CONFIG.pageSize;
  const pageRecords = sorted.slice(
    start,
    start + ISSUE_LIST_QUERY_CONFIG.pageSize,
  );

  return { records: pageRecords, total: sorted.length, page };
}

function sortIssues(
  records: readonly IssueRecord[],
  sort: IssueSortKey,
): IssueRecord[] {
  const sorted = [...records];
  if (sort === "created") {
    return sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  return sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

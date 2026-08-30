import { COMPONENT_LIST_QUERY_CONFIG } from "@/features/components-example/config";
import { COMPONENT_MOCK_RECORDS } from "@/features/components-example/mock-data";
import type {
  ComponentFilterKey,
  ComponentRecord,
  ComponentSortKey,
} from "@/features/components-example/types";
import {
  type DemoState,
  simulateLatency,
} from "@/features/list-page/demo-state";
import type { ParsedListQuery } from "@/features/list-page/types";

export interface ComponentsQueryResult {
  readonly records: readonly ComponentRecord[];
  readonly total: number;
  /** The page actually served, clamped to the last valid page. */
  readonly page: number;
}

const BASE_LATENCY_MS = 250;
const LOADING_DEMO_LATENCY_MS = 1600;

/**
 * Reusable query engine for the Components example: filters, sorts, and
 * paginates the mock dataset from an already-parsed list query. Shared by
 * the `/api/components` Route Handler and the `/examples/components`
 * Server Component so both call the same logic instead of the page
 * fetching its own API route.
 */
export async function queryComponents(
  query: ParsedListQuery<ComponentSortKey, ComponentFilterKey>,
  demoState: DemoState,
): Promise<ComponentsQueryResult> {
  await simulateLatency(
    demoState === "loading" ? LOADING_DEMO_LATENCY_MS : BASE_LATENCY_MS,
  );

  if (demoState === "error") {
    throw new Error("Failed to load components.");
  }

  if (demoState === "empty") {
    return { records: [], total: 0, page: 1 };
  }

  const search = query.search.toLowerCase();

  const filtered = COMPONENT_MOCK_RECORDS.filter((record) => {
    const matchesSearch =
      search.length === 0 ||
      record.name.toLowerCase().includes(search) ||
      record.description.toLowerCase().includes(search);
    const matchesCategory =
      query.filters.category.length === 0 ||
      query.filters.category.includes(record.category);
    const matchesFramework =
      query.filters.framework.length === 0 ||
      query.filters.framework.includes(record.framework);
    const matchesStatus =
      query.filters.status.length === 0 ||
      query.filters.status.includes(record.status);

    return (
      matchesSearch && matchesCategory && matchesFramework && matchesStatus
    );
  });

  const sorted = sortComponents(filtered, query.sort);

  const pageCount = Math.max(
    1,
    Math.ceil(sorted.length / COMPONENT_LIST_QUERY_CONFIG.pageSize),
  );
  const page = Math.min(query.page, pageCount);

  const start = (page - 1) * COMPONENT_LIST_QUERY_CONFIG.pageSize;
  const pageRecords = sorted.slice(
    start,
    start + COMPONENT_LIST_QUERY_CONFIG.pageSize,
  );

  return { records: pageRecords, total: sorted.length, page };
}

function sortComponents(
  records: readonly ComponentRecord[],
  sort: ComponentSortKey,
): ComponentRecord[] {
  const sorted = [...records];
  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "status":
      return sorted.sort(
        (a, b) =>
          a.status.localeCompare(b.status) || a.name.localeCompare(b.name),
      );
    default:
      return sorted.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
}

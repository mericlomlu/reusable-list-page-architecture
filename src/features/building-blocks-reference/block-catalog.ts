export type BlockBoundary =
  | "Server Component"
  | "Shared Component"
  | "Client Component"
  | "Client Hook"
  | "Universal";

export interface BuildingBlockEntry {
  readonly name: string;
  readonly boundary: BlockBoundary;
}

export interface BuildingBlockCategory {
  readonly id: string;
  readonly blocks: readonly BuildingBlockEntry[];
}

/**
 * Structural data only — `name` doubles as the key into the
 * "reference.buildingBlocks.categories.<id>.blocks" message namespace,
 * which holds each block's locale-dependent `summary`/`consumers` prose.
 * Category `title`/`description`/`previewLabel` live in the same
 * namespace under "categories.<id>".
 */
export const STRUCTURE_RESULTS_CATEGORY: BuildingBlockCategory = {
  id: "structure-results",
  blocks: [
    { name: "ListPageShell", boundary: "Shared Component" },
    { name: "ResultsView", boundary: "Server Component" },
    { name: "formatRelativeTime", boundary: "Universal" },
  ],
};

export const QUERY_NAVIGATION_CATEGORY: BuildingBlockCategory = {
  id: "query-navigation",
  blocks: [
    { name: "Query types", boundary: "Universal" },
    { name: "parseListQuery / buildListQueryString", boundary: "Universal" },
    { name: "useListQueryState", boundary: "Client Hook" },
  ],
};

export const CONTROLS_CATEGORY: BuildingBlockCategory = {
  id: "controls",
  blocks: [
    { name: "SearchField", boundary: "Client Component" },
    { name: "SingleSelectFilter", boundary: "Client Component" },
    { name: "MultiSelectFilter", boundary: "Client Component" },
    { name: "SortMenu", boundary: "Client Component" },
    { name: "ViewSwitcher", boundary: "Client Component" },
  ],
};

export const PAGINATION_FILTERS_CATEGORY: BuildingBlockCategory = {
  id: "pagination-filters",
  blocks: [
    { name: "PaginationControls", boundary: "Server Component" },
    { name: "ActiveFilters", boundary: "Server Component" },
  ],
};

export const SELECTION_CATEGORY: BuildingBlockCategory = {
  id: "selection-bulk-actions",
  blocks: [
    { name: "useSelection", boundary: "Client Hook" },
    { name: "SelectionToolbar", boundary: "Client Component" },
  ],
};

export const SYSTEM_STATES_CATEGORY: BuildingBlockCategory = {
  id: "system-states",
  blocks: [
    { name: "ListSkeleton", boundary: "Server Component" },
    { name: "ListEmptyState", boundary: "Server Component" },
    { name: "ListErrorState", boundary: "Shared Component" },
    { name: "useDemoErrorRecovery", boundary: "Client Hook" },
    { name: "DemoState helpers", boundary: "Universal" },
  ],
};

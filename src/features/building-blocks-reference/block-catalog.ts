export type BlockBoundary =
  | "Server Component"
  | "Client Component"
  | "Client Hook"
  | "Universal";

export interface BuildingBlockEntry {
  readonly name: string;
  readonly boundary: BlockBoundary;
  readonly summary: string;
  readonly consumers: string;
}

export interface BuildingBlockCategory {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly previewLabel: string;
  readonly blocks: readonly BuildingBlockEntry[];
}

export const STRUCTURE_RESULTS_CATEGORY: BuildingBlockCategory = {
  id: "structure-results",
  title: "Structure & Results",
  description:
    "The two blocks that give every list page its outer shape and render its records, without knowing anything about what a record contains.",
  previewLabel:
    "Preview: a schematic page shell with a toolbar strip, two result rows, and a pagination strip.",
  blocks: [
    {
      name: "ListPageShell",
      boundary: "Server Component",
      summary:
        "Page-level layout: a title/description header, a slot for the page's own toolbar, the results as children, and an optional pagination slot.",
      consumers:
        "every example page (Components, Issues, Deployments, Packages)",
    },
    {
      name: "ResultsView",
      boundary: "Server Component",
      summary:
        "Switches between the list and grid layout for a set of items, generic over the item type and delegating each item's markup back to the page through renderListItem and renderGridItem.",
      consumers:
        "Components, Deployments, and Packages results components — Issues renders its own selectable table instead, reusing the exported RESULTS_GRID_CLASS_NAME constant to keep its grid breakpoints identical",
    },
  ],
};

export const QUERY_NAVIGATION_CATEGORY: BuildingBlockCategory = {
  id: "query-navigation",
  title: "Query & Navigation",
  description:
    "The single parsing boundary that turns URL search params into typed list state and back, plus the client hook that writes to it.",
  previewLabel:
    "Preview: a URL bar showing search, sort, and page query parameters.",
  blocks: [
    {
      name: "Query types",
      boundary: "Universal",
      summary:
        "ViewMode, SortOption, FilterOption, FilterValues, ListQueryConfig, and ParsedListQuery type every example's URL state the same way, so a new example only supplies its own sort keys and filter keys.",
      consumers: "every example's config, query service, and toolbar",
    },
    {
      name: "parseListQuery / buildListQueryString",
      boundary: "Universal",
      summary:
        "parseListQuery reads a URLSearchParams into a ParsedListQuery against a page's ListQueryConfig; buildListQueryString does the reverse. toSearchParams and emptyFilterValues support that same boundary from a Server Component's searchParams object and an empty-state default.",
      consumers:
        "every example's page.tsx, route.ts, and useListQueryState — always against the same config",
    },
    {
      name: "useListQueryState",
      boundary: "Client Hook",
      summary:
        "Reads the current URL with useSearchParams and exposes setSearch, setSort, setView, setSingleFilter, and toggleMultiFilter — each one pushes or replaces a query string built by buildListQueryString. Pagination links are rendered server-side instead, so paging is intentionally not part of this hook.",
      consumers: "each example's toolbar client component",
    },
  ],
};

export const CONTROLS_CATEGORY: BuildingBlockCategory = {
  id: "controls",
  title: "Search, Filters, Sorting & Views",
  description:
    "The interactive controls a page-owned toolbar composes together; each one only knows how to read and report one piece of query state.",
  previewLabel:
    "Preview: a toolbar strip with a search field, an applied filter, a sort control, and a list/grid view toggle.",
  blocks: [
    {
      name: "SearchField",
      boundary: "Client Component",
      summary:
        "Debounced text input (300ms default) with a leading search icon; keeps its own draft state so keystrokes don't push a URL update on every character.",
      consumers: "every example's toolbar",
    },
    {
      name: "SingleSelectFilter",
      boundary: "Client Component",
      summary:
        "A filter that holds at most one value, rendered as a dropdown with a radio group; the trigger always shows the current selection as plain text.",
      consumers: "every example's toolbar",
    },
    {
      name: "MultiSelectFilter",
      boundary: "Client Component",
      summary:
        'A filter that holds several values at once, rendered as a checkbox popover; the trigger label collapses to "N selected" once more than one value is applied.',
      consumers: "Components' framework filter, currently its only consumer",
    },
    {
      name: "SortMenu",
      boundary: "Client Component",
      summary:
        "Single dropdown for a page's sort options, generic over the sort key; the active option is always shown as text on the trigger, never an icon alone.",
      consumers: "every example's toolbar",
    },
    {
      name: "ViewSwitcher",
      boundary: "Client Component",
      summary: "Two-option toggle group between list view and grid view.",
      consumers: "every example's toolbar",
    },
  ],
};

export const PAGINATION_FILTERS_CATEGORY: BuildingBlockCategory = {
  id: "pagination-filters",
  title: "Pagination & Active Filters",
  description:
    "Server-rendered blocks that read query state back out as plain links, so paging and clearing a filter both work without client JavaScript.",
  previewLabel:
    "Preview: numbered pagination controls next to a removable filter pill.",
  blocks: [
    {
      name: "PaginationControls",
      boundary: "Server Component",
      summary:
        'Numbered page links plus Prev/Next, paired with a "Showing 1–20 of 84" range label. Every link is a real Link built from a page-supplied buildHref, and the current page keeps aria-current="page".',
      consumers: "every example page",
    },
    {
      name: "ActiveFilters",
      boundary: "Server Component",
      summary:
        'Renders one removable pill per applied filter plus a "Clear all" link, from a list of ActiveFilterPill objects the page builds itself; renders nothing once no filter is active.',
      consumers: "every example's results component",
    },
  ],
};

export const SELECTION_CATEGORY: BuildingBlockCategory = {
  id: "selection-bulk-actions",
  title: "Selection & Bulk Actions",
  description:
    "Client-only selection state and the toolbar that surfaces it, kept deliberately outside the shareable URL state above.",
  previewLabel:
    'Preview: a selection header reading "2 selected" with a page-owned bulk action next to it.',
  blocks: [
    {
      name: "useSelection",
      boundary: "Client Hook",
      summary:
        "Client-only selection state keyed by record id — selectedIds, selectedCount, isSelected, toggle, selectAll, removeMany, clear. A page remounts it, typically via a key derived from the active query, to reset selection when the result set changes.",
      consumers: "Issues, currently the only example with row selection",
    },
    {
      name: "SelectionToolbar",
      boundary: "Client Component",
      summary:
        'Appears once selectedCount is above zero; shows the count, a "Select all N on this page" action while some visible rows are unchecked, and a page-owned actions slot for the actual bulk operations. A pending flag disables selection changes while a bulk action is in flight.',
      consumers: "Issues",
    },
  ],
};

export const SYSTEM_STATES_CATEGORY: BuildingBlockCategory = {
  id: "system-states",
  title: "Loading, Empty, Error & Demo-State Recovery",
  description:
    "The shared presentation for every state a list can be in, plus the recovery hook and query parameter every mock endpoint uses to simulate them on demand.",
  previewLabel:
    "Preview: a loading skeleton bar, a no-results indicator, and a retry indicator stacked together.",
  blocks: [
    {
      name: "ListSkeleton",
      boundary: "Server Component",
      summary:
        "Fixed-height placeholder rows shaped by a page-supplied gridTemplateColumns and columnCount, so the loading state matches the real row layout and nothing shifts when data arrives.",
      consumers: "every example's loading.tsx",
    },
    {
      name: "ListEmptyState",
      boundary: "Server Component",
      summary:
        'Icon, one-sentence title and description, and an optional action; a results component supplies its own copy to distinguish "no data at all" from "no results for these filters."',
      consumers: "every example's results component",
    },
    {
      name: "ListErrorState",
      boundary: "Server Component",
      summary:
        "Same shape as the empty state, styled for failure, with a required action — always the retry button driven by useDemoErrorRecovery.",
      consumers: "every example's error.tsx",
    },
    {
      name: "useDemoErrorRecovery",
      boundary: "Client Hook",
      summary:
        "Shared by every error.tsx. Clears the ?demoState=error query param to recover from a simulated failure and re-renders once the URL confirms it's gone, or calls the page's own retry() for a genuine thrown error.",
      consumers: "every example's error.tsx",
    },
    {
      name: "DemoState helpers",
      boundary: "Universal",
      summary:
        "DemoState and parseDemoState read an explicit ?demoState= query parameter (default, loading, empty, or error) that every mock Route Handler and example page accepts, so any state can be previewed without special tooling; simulateLatency adds an artificial delay to a Route Handler response.",
      consumers: "every /api/* route and example page.tsx",
    },
  ],
};

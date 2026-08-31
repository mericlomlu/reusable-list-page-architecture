import type {
  IssueAssignee,
  IssueFilterKey,
  IssueSortKey,
  IssueStatus,
} from "@/features/issues-example/types";
import type {
  FilterOption,
  ListQueryConfig,
  SortOption,
} from "@/features/list-page/types";

export const ISSUE_PAGE_SIZE = 8;

export const ASSIGNEES: readonly IssueAssignee[] = [
  { id: "nora-vance", name: "Nora Vance", initials: "NV" },
  { id: "idris-cole", name: "Idris Cole", initials: "IC" },
  { id: "priya-shah", name: "Priya Shah", initials: "PS" },
  { id: "owen-baxter", name: "Owen Baxter", initials: "OB" },
];

export const UNASSIGNED_FILTER_VALUE = "unassigned";

export const STATUS_OPTIONS: readonly FilterOption[] = [
  { value: "open", label: "Open" },
  { value: "in_progress", label: "In Progress" },
  { value: "closed", label: "Closed" },
];

export const PRIORITY_OPTIONS: readonly FilterOption[] = [
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export const LABEL_OPTIONS: readonly FilterOption[] = [
  { value: "bug", label: "bug" },
  { value: "enhancement", label: "enhancement" },
  { value: "ux", label: "ux" },
  { value: "content", label: "content" },
  { value: "docs", label: "docs" },
  { value: "performance", label: "performance" },
];

export const ASSIGNEE_OPTIONS: readonly FilterOption[] = [
  { value: UNASSIGNED_FILTER_VALUE, label: "Unassigned" },
  ...ASSIGNEES.map((assignee) => ({
    value: assignee.id,
    label: assignee.name,
  })),
];

export const SORT_OPTIONS: readonly SortOption<IssueSortKey>[] = [
  { value: "updated", label: "Updated" },
  { value: "created", label: "Created" },
];

export const ISSUE_LIST_QUERY_CONFIG: ListQueryConfig<
  IssueSortKey,
  IssueFilterKey
> = {
  defaultSort: "updated",
  sortValues: SORT_OPTIONS.map((option) => option.value),
  defaultView: "list",
  filterKeys: ["status", "priority", "label", "assignee"],
  singleValueFilterKeys: ["status", "priority", "label", "assignee"],
  pageSize: ISSUE_PAGE_SIZE,
};

export const BULK_STATUS_ACTIONS: readonly {
  readonly status: IssueStatus;
  readonly label: string;
}[] = [
  { status: "open", label: "Open" },
  { status: "in_progress", label: "In Progress" },
  { status: "closed", label: "Closed" },
];

const VALID_ISSUE_STATUSES: ReadonlySet<string> = new Set(
  BULK_STATUS_ACTIONS.map((action) => action.status),
);

export function isIssueStatus(value: string): value is IssueStatus {
  return VALID_ISSUE_STATUSES.has(value);
}

export const ISSUE_LIST_SKELETON_GRID_COLUMNS = "1fr 96px 84px 96px 60px 84px";
export const ISSUE_LIST_SKELETON_COLUMN_COUNT = 6;

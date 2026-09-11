import type {
  IssueAssignee,
  IssueFilterKey,
  IssueLabel,
  IssuePriority,
  IssueSortKey,
  IssueStatus,
} from "@/features/issues-example/types";
import type { ListQueryConfig } from "@/features/list-page/types";

export const ISSUE_PAGE_SIZE = 8;

export const ASSIGNEES: readonly IssueAssignee[] = [
  { id: "nora-vance", name: "Nora Vance", initials: "NV" },
  { id: "idris-cole", name: "Idris Cole", initials: "IC" },
  { id: "priya-shah", name: "Priya Shah", initials: "PS" },
  { id: "owen-baxter", name: "Owen Baxter", initials: "OB" },
];

export const UNASSIGNED_FILTER_VALUE = "unassigned";

/**
 * Filter/sort values, kept separate from their display labels: labels are
 * locale-dependent and resolved at render time via the "issuesExample"
 * message namespace, while these value lists stay stable for query-string
 * matching and `ListQueryConfig`. `LABEL_VALUES` are left untranslated by
 * design — they mirror the same tag words rendered directly on issue
 * records (mock data), so translating only the filter side would desync
 * from the record chips.
 */
export const STATUS_VALUES: readonly IssueStatus[] = [
  "open",
  "in_progress",
  "closed",
];

export const PRIORITY_VALUES: readonly IssuePriority[] = [
  "high",
  "medium",
  "low",
];

export const LABEL_VALUES: readonly IssueLabel[] = [
  "bug",
  "enhancement",
  "ux",
  "content",
  "docs",
  "performance",
];

export const ASSIGNEE_FILTER_VALUES: readonly string[] = [
  UNASSIGNED_FILTER_VALUE,
  ...ASSIGNEES.map((assignee) => assignee.id),
];

export const SORT_VALUES: readonly IssueSortKey[] = ["updated", "created"];

export const ISSUE_LIST_QUERY_CONFIG: ListQueryConfig<
  IssueSortKey,
  IssueFilterKey
> = {
  defaultSort: "updated",
  sortValues: SORT_VALUES,
  defaultView: "list",
  filterKeys: ["status", "priority", "label", "assignee"],
  singleValueFilterKeys: ["status", "priority", "label", "assignee"],
  pageSize: ISSUE_PAGE_SIZE,
};

export const BULK_STATUS_VALUES: readonly IssueStatus[] = [
  "open",
  "in_progress",
  "closed",
];

const VALID_ISSUE_STATUSES: ReadonlySet<string> = new Set(BULK_STATUS_VALUES);

export function isIssueStatus(value: string): value is IssueStatus {
  return VALID_ISSUE_STATUSES.has(value);
}

// Widths mirror the real table's columns in issue-table.tsx: checkbox (w-11),
// issue (flexible), status (w-28), priority (w-24), label (w-28), assignee
// (w-16), updated (w-24).
export const ISSUE_LIST_SKELETON_GRID_COLUMNS =
  "44px 1fr 112px 96px 112px 64px 96px";
export const ISSUE_LIST_SKELETON_COLUMN_COUNT = 7;

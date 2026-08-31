export type IssueStatus = "open" | "in_progress" | "closed";

export type IssuePriority = "high" | "medium" | "low";

export type IssueLabel =
  | "bug"
  | "enhancement"
  | "ux"
  | "content"
  | "docs"
  | "performance";

export type IssueSortKey = "updated" | "created";

export type IssueFilterKey = "status" | "priority" | "label" | "assignee";

export interface IssueAssignee {
  readonly id: string;
  readonly name: string;
  readonly initials: string;
}

export interface IssueRecord {
  readonly id: string;
  readonly number: number;
  readonly title: string;
  readonly status: IssueStatus;
  readonly priority: IssuePriority;
  readonly label: IssueLabel;
  readonly assignee: IssueAssignee | null;
  readonly createdAt: string;
  readonly updatedAt: string;
}

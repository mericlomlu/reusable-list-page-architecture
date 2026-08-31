import type { IssueAssignee } from "@/features/issues-example/types";

export function AssigneeAvatar({
  assignee,
}: {
  assignee: IssueAssignee | null;
}) {
  if (!assignee) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full border border-dashed border-border text-[9.5px] font-semibold text-muted-foreground">
        <span className="sr-only">Unassigned</span>
        <span aria-hidden="true">—</span>
      </span>
    );
  }

  return (
    <span
      title={assignee.name}
      className="inline-flex size-6 items-center justify-center rounded-full bg-secondary text-[10.5px] font-bold text-secondary-foreground"
    >
      <span className="sr-only">Assignee: </span>
      {assignee.initials}
    </span>
  );
}

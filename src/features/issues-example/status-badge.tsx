import type { IssueStatus } from "@/features/issues-example/types";
import { cn } from "@/lib/utils";

const STATUS_LABEL: Record<IssueStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  closed: "Closed",
};

const STATUS_DOT_CLASS: Record<IssueStatus, string> = {
  open: "bg-destructive",
  in_progress: "bg-warning",
  closed: "bg-success",
};

export function StatusBadge({ status }: { status: IssueStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-foreground">
      <span
        aria-hidden="true"
        className={cn("size-[7px] rounded-full", STATUS_DOT_CLASS[status])}
      />
      {STATUS_LABEL[status]}
    </span>
  );
}

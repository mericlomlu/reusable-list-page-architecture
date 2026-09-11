import { useTranslations } from "next-intl";
import type { IssueStatus } from "@/features/issues-example/types";
import { cn } from "@/lib/utils";

const STATUS_DOT_CLASS: Record<IssueStatus, string> = {
  open: "bg-destructive",
  in_progress: "bg-warning",
  closed: "bg-success",
};

export function StatusBadge({ status }: { status: IssueStatus }) {
  const t = useTranslations("issuesExample.filters.status");

  return (
    <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-foreground">
      <span
        aria-hidden="true"
        className={cn("size-[7px] rounded-full", STATUS_DOT_CLASS[status])}
      />
      {t(status)}
    </span>
  );
}

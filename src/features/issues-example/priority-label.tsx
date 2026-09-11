import { useTranslations } from "next-intl";
import type { IssuePriority } from "@/features/issues-example/types";
import { cn } from "@/lib/utils";

const PRIORITY_DOT_CLASS: Record<IssuePriority, string> = {
  high: "bg-destructive",
  medium: "bg-warning",
  low: "bg-muted-foreground",
};

export function PriorityLabel({ priority }: { priority: IssuePriority }) {
  const t = useTranslations("issuesExample.filters.priority");

  return (
    <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-foreground">
      <span
        aria-hidden="true"
        className={cn("size-[7px] rounded-full", PRIORITY_DOT_CLASS[priority])}
      />
      {t(priority)}
    </span>
  );
}

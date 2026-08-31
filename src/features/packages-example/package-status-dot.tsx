import { UPDATE_STATUS_LABEL } from "@/features/packages-example/config";
import type { PackageUpdateStatus } from "@/features/packages-example/types";
import { cn } from "@/lib/utils";

const STATUS_DOT_CLASS: Record<PackageUpdateStatus, string> = {
  "up-to-date": "bg-success",
  "minor-update": "bg-warning",
  outdated: "bg-destructive",
};

export function PackageStatusDot({ status }: { status: PackageUpdateStatus }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-foreground">
      <span
        aria-hidden="true"
        className={cn("size-[7px] rounded-full", STATUS_DOT_CLASS[status])}
      />
      {UPDATE_STATUS_LABEL[status]}
    </span>
  );
}

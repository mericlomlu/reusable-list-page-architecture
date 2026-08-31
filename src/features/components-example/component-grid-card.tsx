import { StatusDot } from "@/features/components-example/status-dot";
import type { ComponentRecord } from "@/features/components-example/types";
import { formatRelativeTime } from "@/features/list-page/format-relative-time";

export function ComponentGridCard({ record }: { record: ComponentRecord }) {
  return (
    <li className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-[18px]">
      <p className="text-record-title font-bold text-foreground">
        {record.name}
      </p>
      <p className="text-body-sm leading-relaxed text-muted-foreground">
        {record.description}
      </p>
      <div className="mt-1 flex items-center justify-between">
        <StatusDot status={record.status} />
        <p className="font-mono text-meta text-muted-foreground">
          <span className="sr-only">Updated </span>
          {formatRelativeTime(record.updatedAt)}
        </p>
      </div>
    </li>
  );
}

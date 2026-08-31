"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { AssigneeAvatar } from "@/features/issues-example/assignee-avatar";
import { PriorityLabel } from "@/features/issues-example/priority-label";
import { StatusBadge } from "@/features/issues-example/status-badge";
import type { IssueRecord } from "@/features/issues-example/types";
import { formatRelativeTime } from "@/features/list-page/format-relative-time";

interface IssueGridCardProps {
  record: IssueRecord;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function IssueGridCard({
  record,
  selected,
  onToggle,
  disabled = false,
}: IssueGridCardProps) {
  return (
    <li className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-[18px]">
      <div className="flex items-start justify-between gap-2">
        <p className="text-[15px] font-bold text-foreground">{record.title}</p>
        <Checkbox
          checked={selected}
          onCheckedChange={onToggle}
          disabled={disabled}
          aria-label={`Select issue #${record.number}: ${record.title}`}
          className="mt-0.5 shrink-0"
        />
      </div>
      <p className="font-mono text-[11.5px] text-muted-foreground">
        #{record.number}
      </p>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <StatusBadge status={record.status} />
        <PriorityLabel priority={record.priority} />
        <span className="inline-flex rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          {record.label}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <AssigneeAvatar assignee={record.assignee} />
        <p className="font-mono text-[11.5px] text-muted-foreground">
          <span className="sr-only">Updated </span>
          {formatRelativeTime(record.updatedAt)}
        </p>
      </div>
    </li>
  );
}

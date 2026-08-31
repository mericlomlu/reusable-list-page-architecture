"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { AssigneeAvatar } from "@/features/issues-example/assignee-avatar";
import { PriorityLabel } from "@/features/issues-example/priority-label";
import { StatusBadge } from "@/features/issues-example/status-badge";
import type { IssueRecord } from "@/features/issues-example/types";
import { formatRelativeTime } from "@/features/list-page/format-relative-time";
import { cn } from "@/lib/utils";

interface IssueRowProps {
  record: IssueRecord;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

export function IssueRow({
  record,
  selected,
  onToggle,
  disabled = false,
}: IssueRowProps) {
  return (
    <tr
      aria-selected={selected}
      className={cn(
        "border-t border-border first:border-t-0",
        selected && "bg-primary/5",
      )}
    >
      <td className="px-3 py-3 align-top">
        <Checkbox
          checked={selected}
          onCheckedChange={onToggle}
          disabled={disabled}
          aria-label={`Select issue #${record.number}: ${record.title}`}
        />
      </td>
      <td className="px-3 py-3 align-top">
        <p className="text-[14px] font-bold text-foreground">{record.title}</p>
        <p className="mt-0.5 font-mono text-[11.5px] text-muted-foreground">
          #{record.number}
        </p>
      </td>
      <td className="px-3 py-3 align-top">
        <StatusBadge status={record.status} />
      </td>
      <td className="px-3 py-3 align-top">
        <PriorityLabel priority={record.priority} />
      </td>
      <td className="px-3 py-3 align-top">
        <span className="inline-flex rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          {record.label}
        </span>
      </td>
      <td className="px-3 py-3 align-top">
        <AssigneeAvatar assignee={record.assignee} />
      </td>
      <td className="px-3 py-3 align-top font-mono text-[11.5px] text-muted-foreground">
        <span className="sr-only">Updated </span>
        {formatRelativeTime(record.updatedAt)}
      </td>
    </tr>
  );
}

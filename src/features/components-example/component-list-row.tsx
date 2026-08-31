import { COMPONENT_LIST_GRID_COLUMNS } from "@/features/components-example/config";
import { StatusDot } from "@/features/components-example/status-dot";
import type { ComponentRecord } from "@/features/components-example/types";
import { formatRelativeTime } from "@/features/list-page/format-relative-time";

const FRAMEWORK_LABEL: Record<ComponentRecord["framework"], string> = {
  react: "React",
  vue: "Vue",
  svelte: "Svelte",
  angular: "Angular",
};

export function ComponentListRow({ record }: { record: ComponentRecord }) {
  return (
    <li
      className="grid items-center gap-4 border-t border-border bg-card px-[18px] py-4 first:border-t-0"
      style={{ gridTemplateColumns: COMPONENT_LIST_GRID_COLUMNS }}
    >
      <p className="text-record-title font-bold text-foreground">
        {record.name}
      </p>
      <p className="truncate text-body-sm text-muted-foreground">
        {record.description}
      </p>
      <StatusDot status={record.status} />
      <p className="font-mono text-xs text-muted-foreground">
        <span className="sr-only">Framework: </span>
        {FRAMEWORK_LABEL[record.framework]}
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        <span className="sr-only">Updated </span>
        {formatRelativeTime(record.updatedAt)}
      </p>
    </li>
  );
}

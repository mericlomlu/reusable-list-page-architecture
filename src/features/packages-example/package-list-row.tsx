import {
  DEPENDENCY_TYPE_LABEL,
  PACKAGE_LIST_GRID_COLUMNS,
} from "@/features/packages-example/config";
import { PackageStatusDot } from "@/features/packages-example/package-status-dot";
import type { PackageRecord } from "@/features/packages-example/types";

export function PackageListRow({ record }: { record: PackageRecord }) {
  return (
    <li
      className="grid items-center gap-4 border-t border-border bg-card px-[18px] py-4 first:border-t-0"
      style={{ gridTemplateColumns: PACKAGE_LIST_GRID_COLUMNS }}
    >
      <div className="min-w-0">
        <p className="truncate font-mono text-record-title font-bold text-foreground">
          {record.name}
        </p>
        <p className="mt-0.5 truncate text-body-sm text-muted-foreground">
          {record.description}
        </p>
      </div>
      <p className="font-mono text-meta text-muted-foreground">
        <span className="sr-only">Version: </span>
        {record.version}
      </p>
      <p className="text-body-sm text-muted-foreground">
        {DEPENDENCY_TYPE_LABEL[record.dependencyType]}
      </p>
      <PackageStatusDot status={record.updateStatus} />
    </li>
  );
}

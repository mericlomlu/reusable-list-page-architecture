import type { ReactNode } from "react";
import { ErrorIcon, SearchIcon } from "@/components/icons/list-icons";

const SKELETON_ROW_KEYS = [
  "skeleton-row-a",
  "skeleton-row-b",
  "skeleton-row-c",
  "skeleton-row-d",
  "skeleton-row-e",
  "skeleton-row-f",
  "skeleton-row-g",
  "skeleton-row-h",
] as const;

const SKELETON_COLUMN_KEYS = [
  "col-a",
  "col-b",
  "col-c",
  "col-d",
  "col-e",
  "col-f",
  "col-g",
] as const;

interface ListSkeletonProps {
  gridTemplateColumns: string;
  columnCount: number;
  rows?: number;
  label: string;
}

export function ListSkeleton({
  gridTemplateColumns,
  columnCount,
  rows = 6,
  label,
}: ListSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className="overflow-x-auto rounded-lg border border-border"
    >
      <span className="sr-only">{label}</span>
      <div className="flex min-w-[640px] flex-col">
        {SKELETON_ROW_KEYS.slice(0, rows).map((key) => (
          <div
            key={key}
            className="grid items-center gap-4 border-t border-border bg-card px-[18px] py-4 first:border-t-0"
            style={{ gridTemplateColumns }}
          >
            {SKELETON_COLUMN_KEYS.slice(0, columnCount).map(
              (columnKey, columnPosition) => (
                <div
                  key={`${key}-${columnKey}`}
                  className="h-3 rounded bg-muted"
                  style={{ width: columnPosition === 0 ? "70%" : "55%" }}
                />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function ListEmptyState({
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2.5 rounded-lg border border-border bg-card px-6 py-16 text-center">
      <SearchIcon className="size-8 text-muted-foreground" strokeWidth={1.3} />
      <p className="mt-1.5 text-record-title font-bold text-foreground">
        {title}
      </p>
      <p className="max-w-[340px] text-body text-muted-foreground">
        {description}
      </p>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

interface ErrorStateProps {
  title: string;
  description: string;
  action: ReactNode;
}

export function ListErrorState({
  title,
  description,
  action,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-2.5 rounded-lg border border-destructive/30 bg-destructive/5 px-6 py-16 text-center"
    >
      <ErrorIcon className="size-8 text-destructive" strokeWidth={1.3} />
      <p className="mt-1.5 text-record-title font-bold text-foreground">
        {title}
      </p>
      <p className="max-w-[340px] text-body text-muted-foreground">
        {description}
      </p>
      <div className="mt-2">{action}</div>
    </div>
  );
}

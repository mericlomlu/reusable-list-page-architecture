import { CheckIcon, SearchIcon } from "@/components/icons/list-icons";
import { CloseIcon } from "@/components/icons/nav-icons";
import { cn } from "@/lib/utils";

export function StructurePreview() {
  return (
    <div className="flex flex-col gap-2 rounded-md border border-border bg-background p-2.5">
      <div className="h-2.5 w-2/3 rounded bg-muted" />
      <div className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-2">
        <div className="h-2 w-full rounded bg-muted" />
        <div className="h-2 w-4/5 rounded bg-muted" />
      </div>
      <div className="h-2 w-1/3 self-end rounded bg-muted" />
    </div>
  );
}

export function QueryPreview() {
  return (
    <div className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2.5 py-2 font-mono text-[10.5px] text-muted-foreground">
      <SearchIcon className="size-3 shrink-0" />
      <span className="truncate">
        ?search=chart&amp;sort=updated&amp;page=2
      </span>
    </div>
  );
}

export function ControlsPreview() {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <div className="flex items-center gap-1 rounded-md border border-border bg-background px-2 py-1.5 text-caption text-muted-foreground">
        <SearchIcon className="size-2.5 shrink-0" />
        Search…
      </div>
      <div className="rounded-md border border-primary/40 bg-primary/10 px-2 py-1.5 text-caption font-semibold text-foreground">
        Framework: React
      </div>
      <div className="rounded-md border border-border bg-background px-2 py-1.5 text-caption text-foreground">
        Sort: Updated
      </div>
      <div className="rounded-md border border-border bg-background px-2 py-1.5 text-caption text-foreground">
        List
      </div>
    </div>
  );
}

export function PaginationFiltersPreview() {
  return (
    <div className="flex flex-col gap-2.5">
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 py-1 pr-1.5 pl-2.5 text-caption text-foreground">
        Category: Forms
        <CloseIcon className="size-2.5 text-primary" />
      </span>
      <div className="flex gap-1">
        <span className="rounded-md border border-border bg-background px-2 py-1 text-caption text-muted-foreground">
          Prev
        </span>
        <span className="rounded-md border border-primary bg-primary px-2 py-1 text-caption font-bold text-primary-foreground">
          1
        </span>
        <span className="rounded-md border border-border bg-background px-2 py-1 text-caption text-foreground">
          2
        </span>
      </div>
    </div>
  );
}

export function SelectionCategoryPreview() {
  return (
    <div className="flex items-center gap-3 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-caption font-semibold text-foreground">
      <span>2 selected</span>
      <span className="flex-1" />
      <span className="hidden sm:inline">Select all 24</span>
      <span className="flex items-center gap-1">
        <CheckIcon className="size-2.5" strokeWidth={2.4} />
        Change status
      </span>
    </div>
  );
}

const SYSTEM_STATE_ROWS = [
  { label: "Loading rows…", tone: "muted" },
  { label: "No results", tone: "muted" },
  { label: "Couldn't load — Retry", tone: "danger" },
] as const;

export function SystemStatesPreview() {
  return (
    <div className="flex flex-col gap-1.5">
      {SYSTEM_STATE_ROWS.map((row) => (
        <div
          key={row.label}
          className={cn(
            "rounded-md border px-2.5 py-1.5 text-caption",
            row.tone === "danger"
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-border bg-background text-muted-foreground",
          )}
        >
          {row.label}
        </div>
      ))}
    </div>
  );
}

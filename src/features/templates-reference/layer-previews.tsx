import { CheckIcon } from "@/components/icons/list-icons";
import { cn } from "@/lib/utils";

const BASIC_LIST_PREVIEW_ROWS = [
  { name: "react", version: "19.2.8" },
  { name: "next", version: "16.3.3" },
  { name: "next-themes", version: "0.4.6" },
] as const;

export function BasicListPreview() {
  return (
    <>
      {BASIC_LIST_PREVIEW_ROWS.map((row) => (
        <div
          key={row.name}
          className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-body-sm text-foreground"
        >
          <span>{row.name}</span>
          <span className="font-mono text-caption text-muted-foreground">
            {row.version}
          </span>
        </div>
      ))}
    </>
  );
}

const SEARCH_FILTERS_PREVIEW_ROWS = [
  { name: "Command palette", statusLabel: "Stable", statusClass: "bg-success" },
  { name: "Date range picker", statusLabel: "Beta", statusClass: "bg-warning" },
] as const;

export function SearchFiltersPreview() {
  return (
    <>
      <div className="flex gap-1.5">
        <div className="flex-1 rounded-md border border-border bg-card px-2.5 py-1.5 text-caption text-muted-foreground">
          Search components…
        </div>
        <div className="rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1.5 text-caption font-semibold text-foreground">
          Category: Forms
        </div>
      </div>
      {SEARCH_FILTERS_PREVIEW_ROWS.map((row) => (
        <div
          key={row.name}
          className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2 text-body-sm text-foreground"
        >
          <span>{row.name}</span>
          <span className="inline-flex items-center gap-1.5 text-caption font-semibold">
            <span className={cn("size-[7px] rounded-full", row.statusClass)} />
            {row.statusLabel}
          </span>
        </div>
      ))}
    </>
  );
}

const SELECTION_PREVIEW_TITLES = [
  "Bulk close should ask for confirmation",
  "Empty state copy reads the same everywhere",
] as const;

export function SelectionPreview() {
  return (
    <>
      <div className="flex items-center gap-3 rounded-md border border-primary/30 bg-primary/10 px-3 py-2 text-caption font-semibold text-foreground">
        <span>2 selected</span>
        <span className="flex-1" />
        <span>Change status</span>
      </div>
      {SELECTION_PREVIEW_TITLES.map((title) => (
        <div
          key={title}
          className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-body-sm text-foreground"
        >
          <span className="flex size-3.5 shrink-0 items-center justify-center rounded-[3px] bg-primary text-primary-foreground">
            <CheckIcon className="size-2.5" strokeWidth={2.4} />
          </span>
          <span className="truncate">{title}</span>
        </div>
      ))}
    </>
  );
}

const STATES_PREVIEW_WIDTHS = ["85%", "60%", "72%"] as const;

export function StatesPreview() {
  return (
    <div className="flex flex-col gap-2.5 rounded-md border border-border bg-card px-3 py-3.5">
      {STATES_PREVIEW_WIDTHS.map((width) => (
        <div
          key={width}
          style={{ width }}
          className="h-2.5 rounded bg-muted motion-safe:animate-pulse"
        />
      ))}
    </div>
  );
}

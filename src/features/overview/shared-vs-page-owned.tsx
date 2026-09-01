import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@/components/icons/list-icons";

const SHARED_CORE: readonly string[] = [
  "Query parsing and serialization",
  "Search, filters, sorting, and views",
  "Results layout and pagination",
  "Active filters",
  "Selection primitives",
  "Loading, empty, and error states",
];

const PAGE_OWNED: readonly string[] = [
  "Types and mock records",
  "Query configuration and service",
  "Toolbar composition",
  "Rows, cards, and domain presentation",
  "Bulk-action behavior where applicable",
];

interface CompositionColumnProps {
  heading: string;
  pathLabel: string;
  items: readonly string[];
}

function CompositionColumn({
  heading,
  pathLabel,
  items,
}: CompositionColumnProps) {
  return (
    <div className="flex-1 rounded-lg border border-border bg-card px-6 py-6">
      <h3 className="text-body font-bold text-foreground">{heading}</h3>
      <code className="mt-1 block font-mono text-caption text-muted-foreground">
        {pathLabel}
      </code>
      <ul className="mt-3 flex flex-col gap-1.5 text-body-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function SharedVsPageOwned() {
  return (
    <section aria-labelledby="shared-vs-page-owned-heading" className="mt-10">
      <h2
        id="shared-vs-page-owned-heading"
        className="text-lg font-bold text-foreground"
      >
        Shared core vs. page-owned code
      </h2>

      <div className="mt-5 flex flex-col items-stretch lg:flex-row">
        <CompositionColumn
          heading="Shared core"
          pathLabel="src/features/list-page/"
          items={SHARED_CORE}
        />
        <div
          aria-hidden="true"
          className="flex items-center justify-center py-2 lg:px-3 lg:py-0"
        >
          <ChevronDownIcon className="size-4 text-primary lg:hidden" />
          <ChevronRightIcon className="hidden size-4 text-primary lg:block" />
        </div>
        <CompositionColumn
          heading="Page-owned feature"
          pathLabel="src/features/issues-example/"
          items={PAGE_OWNED}
        />
      </div>

      <p className="mt-4 max-w-2xl text-body-sm text-foreground">
        Features compose the shared core without modifying it.
      </p>
    </section>
  );
}

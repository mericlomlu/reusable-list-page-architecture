const SERVER_OWNED: readonly string[] = [
  "Parse search params",
  "Query mock data",
  "Redirect invalid pages",
  "Render results",
  "Render pagination links",
  "Render active-filter removal links",
];

const CLIENT_OWNED: readonly string[] = [
  "Draft search input",
  "Filter, sort, and view controls",
  "Selection state",
  "Bulk-action pending state",
  "Error recovery interaction",
];

interface BoundaryPanelProps {
  heading: string;
  items: readonly string[];
}

function ServerBoundaryPanel({ heading, items }: BoundaryPanelProps) {
  return (
    <div className="flex-1 rounded-lg border border-border bg-card px-6 py-6">
      <h3 className="flex items-center gap-2 font-mono text-label font-bold tracking-wide text-foreground uppercase">
        <span
          aria-hidden="true"
          className="size-[7px] rounded-full bg-muted-foreground"
        />
        {heading}
      </h3>
      <ul className="mt-3 flex flex-col gap-1.5 text-body-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function ClientBoundaryPanel({ heading, items }: BoundaryPanelProps) {
  return (
    <div className="flex-1 rounded-lg border border-border bg-card px-6 py-6">
      <h3 className="flex items-center gap-2 font-mono text-label font-bold tracking-wide text-foreground uppercase">
        <span
          aria-hidden="true"
          className="size-[7px] rounded-[2px] bg-primary"
        />
        {heading}
      </h3>
      <ul className="mt-3 flex flex-col gap-1.5 text-body-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function BoundaryPanels() {
  return (
    <section aria-labelledby="boundaries-heading" className="mt-10">
      <h2 id="boundaries-heading" className="text-lg font-bold text-foreground">
        Server and client boundaries
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        Most of a list page is plain server rendering. Client Components only
        take over at the points where a person is actively interacting.
      </p>

      <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-stretch">
        <ServerBoundaryPanel heading="Server-owned" items={SERVER_OWNED} />
        <ClientBoundaryPanel heading="Client-owned" items={CLIENT_OWNED} />
      </div>

      <p className="mt-4 max-w-2xl text-body-sm text-foreground">
        Client Components stay at interaction boundaries; list data is not
        fetched again by the page in the browser.
      </p>
    </section>
  );
}

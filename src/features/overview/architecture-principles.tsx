interface Principle {
  readonly title: string;
  readonly description: string;
}

const PRINCIPLES: readonly Principle[] = [
  {
    title: "URL as state",
    description:
      "Search, filters, sorting, view, and pagination remain shareable and restorable.",
  },
  {
    title: "Server-first results",
    description:
      "Pages parse the URL, call domain query services directly, and render results on the server.",
  },
  {
    title: "Focused client boundaries",
    description:
      "Client Components handle interactive controls, temporary selection, bulk-action state, and recovery.",
  },
  {
    title: "One domain query function",
    description:
      "Each page and its mock Route Handler reuse the same configuration and query service.",
  },
  {
    title: "Explicit system states",
    description:
      "Loading, empty, filtered-empty, and error behavior are part of the architecture rather than afterthoughts.",
  },
];

export function ArchitecturePrinciples() {
  return (
    <section aria-labelledby="principles-heading" className="mt-10">
      <h2 id="principles-heading" className="text-lg font-bold text-foreground">
        Designed around durable boundaries
      </h2>

      <ol className="mt-5 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {PRINCIPLES.map((principle, index) => (
          <li
            key={principle.title}
            className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-baseline sm:gap-4 sm:px-6"
          >
            <span
              aria-hidden="true"
              className="font-mono text-label font-bold text-primary sm:w-6 sm:shrink-0"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-body-sm text-foreground">
              <span className="font-bold">{principle.title}</span>
              {" — "}
              <span className="text-muted-foreground">
                {principle.description}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

import Link from "next/link";

export function PageOwnedNote() {
  return (
    <section
      aria-labelledby="page-owned-heading"
      className="mt-10 rounded-lg border border-border bg-card px-6 py-6"
    >
      <h2 id="page-owned-heading" className="text-lg font-bold text-foreground">
        What stays page-owned
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        Item renderers (list rows, grid cards), query services, mock data,
        filter option lists, and the toolbar that wires the controls above
        together all live in each example&apos;s own feature folder — for
        instance{" "}
        <code className="font-mono text-caption">
          src/features/components-example/
        </code>{" "}
        — never in the shared{" "}
        <code className="font-mono text-caption">src/features/list-page/</code>{" "}
        core. This page catalogs the primitives on their own; how they compose
        into a page is{" "}
        <Link
          href="/reference/templates"
          className="font-semibold text-foreground hover:text-primary"
        >
          Templates
        </Link>
        .
      </p>
    </section>
  );
}

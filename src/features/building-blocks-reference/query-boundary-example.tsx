import { CodeFigure } from "@/features/reference-ui/code-figure";

const QUERY_BOUNDARY_EXAMPLE = `// src/app/examples/snapshots/page.tsx (Server Component)
const searchParams = toSearchParams(await props.searchParams);
const query = parseListQuery<SnapshotSortKey, SnapshotFilterKey>(
  searchParams,
  SNAPSHOT_LIST_QUERY_CONFIG,
);

// src/app/api/snapshots/route.ts (Route Handler)
const searchParams = new URL(request.url).searchParams;
const query = parseListQuery<SnapshotSortKey, SnapshotFilterKey>(
  searchParams,
  SNAPSHOT_LIST_QUERY_CONFIG,
);

// src/features/snapshots-example/snapshots-toolbar.tsx (Client Component)
const { query, setSort } = useListQueryState<
  SnapshotSortKey,
  SnapshotFilterKey
>(SNAPSHOT_LIST_QUERY_CONFIG);`;

export function QueryBoundaryExample() {
  return (
    <section aria-labelledby="query-boundary-heading" className="mt-10">
      <h2
        id="query-boundary-heading"
        className="text-lg font-bold text-foreground"
      >
        One config, three call sites
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        A fictional Snapshots example passes the exact same{" "}
        <code className="font-mono text-caption">ListQueryConfig</code> to
        parseListQuery from a Server Component, a Route Handler, and (through
        useListQueryState) a Client Component — so the three never disagree
        about what the URL means.
      </p>
      <div className="mt-5">
        <CodeFigure
          caption="src/features/snapshots-example/query-config.ts consumed from three boundaries"
          code={QUERY_BOUNDARY_EXAMPLE}
        />
      </div>
    </section>
  );
}

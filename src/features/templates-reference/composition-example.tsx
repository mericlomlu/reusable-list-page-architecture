const PAGE_EXAMPLE = `export default async function WidgetsPage(
  props: PageProps<"/examples/widgets">,
) {
  const searchParams = toSearchParams(await props.searchParams);
  const demoState = parseDemoState(searchParams);
  const query = parseListQuery<WidgetSortKey, WidgetFilterKey>(
    searchParams,
    WIDGET_LIST_QUERY_CONFIG,
  );
  const { records, total, page } = await queryWidgets(query, demoState);

  const buildHref = (target: number) =>
    "/examples/widgets" +
    buildListQueryString(
      { ...query, page: target },
      WIDGET_LIST_QUERY_CONFIG,
    );

  if (page !== query.page) {
    redirect(buildHref(page));
  }

  return (
    <ListPageShell
      title="Widgets"
      toolbar={<WidgetsToolbar />}
      pagination={
        <PaginationControls
          page={page}
          pageSize={WIDGET_LIST_QUERY_CONFIG.pageSize}
          total={total}
          buildHref={buildHref}
          itemLabel="widgets"
        />
      }
    >
      <ResultsView
        view={query.view}
        items={records}
        getItemKey={(record) => record.id}
        renderListItem={(record) => <WidgetListRow record={record} />}
        renderGridItem={(record) => <WidgetGridCard record={record} />}
        listAriaLabel="Widgets"
      />
    </ListPageShell>
  );
}`;

const TOOLBAR_EXAMPLE = `"use client";

export function WidgetsToolbar() {
  const { query, setSearch, setSort, setView, setSingleFilter } =
    useListQueryState<WidgetSortKey, WidgetFilterKey>(
      WIDGET_LIST_QUERY_CONFIG,
    );

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <SearchField
        label="Search widgets"
        placeholder="Search widgets…"
        value={query.search}
        onChange={setSearch}
      />
      <SingleSelectFilter
        label="Status"
        options={STATUS_OPTIONS}
        value={query.filters.status[0]}
        onChange={(value) => setSingleFilter("status", value)}
      />
      <div className="flex-1" />
      <SortMenu options={SORT_OPTIONS} value={query.sort} onChange={setSort} />
      <ViewSwitcher value={query.view} onChange={setView} />
    </div>
  );
}`;

interface CodeFigureProps {
  caption: string;
  code: string;
}

function CodeFigure({ caption, code }: CodeFigureProps) {
  return (
    <figure className="m-0 min-w-0">
      <figcaption className="mb-2 font-mono text-label font-bold tracking-wider text-muted-foreground uppercase">
        {caption}
      </figcaption>
      <pre
        // biome-ignore lint/a11y/noNoninteractiveTabindex: makes this horizontally-scrollable code sample keyboard-focusable so its overflow content is reachable without a mouse (WCAG SC 2.1.1).
        tabIndex={0}
        className="overflow-x-auto rounded-lg border border-border bg-card px-4 py-3.5 text-caption leading-relaxed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <code className="font-mono text-foreground">{code}</code>
      </pre>
    </figure>
  );
}

export function CompositionExample() {
  return (
    <section aria-labelledby="composition-heading" className="mt-10">
      <h2
        id="composition-heading"
        className="text-lg font-bold text-foreground"
      >
        How a page composes them
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        A fictional Widgets example, built the way every real example is: a
        Server Component page parses the URL once and renders the shared shell,
        while a narrow Client Component toolbar owns the interactive controls
        and writes back to that same URL.
      </p>
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <CodeFigure
          caption="Server Component — src/app/examples/widgets/page.tsx"
          code={PAGE_EXAMPLE}
        />
        <CodeFigure
          caption="Client Component — src/features/widgets-example/widgets-toolbar.tsx"
          code={TOOLBAR_EXAMPLE}
        />
      </div>
    </section>
  );
}

import { PageContainer } from "@/components/layout/page-container";
import { CompositionExample } from "@/features/templates-reference/composition-example";
import {
  BasicListPreview,
  SearchFiltersPreview,
  SelectionPreview,
  StatesPreview,
} from "@/features/templates-reference/layer-previews";
import { TemplateLayerCard } from "@/features/templates-reference/template-layer-card";

export default function TemplatesPage() {
  return (
    <PageContainer>
      <header className="mb-8 flex flex-col gap-1.5">
        <p className="font-mono text-eyebrow text-muted-foreground uppercase tracking-wide">
          Reference / Templates
        </p>
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-[28px]">
          Templates
        </h1>
        <p className="max-w-xl text-sm text-muted-foreground">
          Four composition layers, from a bare list to a fully-stateful page.
          Every example route in this project builds on some or all of them.
        </p>
      </header>

      <section aria-labelledby="layers-heading">
        <h2 id="layers-heading" className="text-lg font-bold text-foreground">
          Composition layers
        </h2>
        <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
          Each layer adds a small set of building blocks from{" "}
          <code className="font-mono text-caption">
            src/features/list-page/
          </code>{" "}
          on top of the one before it.
        </p>

        <div className="mt-5 flex flex-col gap-4">
          <TemplateLayerCard
            title="Basic List"
            description="ListPageShell composed with ResultsView and PaginationControls only — no toolbar, no filters, no client state. Every other layer is this same shell with more passed into its toolbar prop and children."
            buildingBlocks={[
              "ListPageShell",
              "ResultsView",
              "PaginationControls",
            ]}
            example={{
              label: "Packages layers search and two filters on top",
              href: "/examples/packages",
            }}
            previewLabel="Preview: three dependency rows showing a package name and version, with no search or filter controls."
          >
            <BasicListPreview />
          </TemplateLayerCard>

          <TemplateLayerCard
            title="Search & Filters"
            description="A page-owned toolbar composes SearchField, SingleSelectFilter or MultiSelectFilter, SortMenu, and ViewSwitcher, then calls useListQueryState once. Every keystroke, filter toggle, sort change, and view switch reads and writes the same URL, so the browser back button and a copied link always restore the same list."
            buildingBlocks={[
              "SearchField",
              "SingleSelectFilter",
              "MultiSelectFilter",
              "SortMenu",
              "ViewSwitcher",
              "useListQueryState",
            ]}
            example={{
              label: "Components combines a single and a multi-value filter",
              href: "/examples/components",
            }}
            previewLabel="Preview: a search field, an applied category filter, and two component rows each showing a status dot and label."
          >
            <SearchFiltersPreview />
          </TemplateLayerCard>

          <TemplateLayerCard
            title="Selection & Bulk Actions"
            description="Adds row-level selection that is deliberately kept out of the URL — it's page state, not shareable list state. SelectionToolbar appears once anything is checked and exposes page-owned bulk actions; the page renders its own selectable rows since checkbox wiring doesn't fit ResultsView's render-prop shape."
            buildingBlocks={["useSelection", "SelectionToolbar"]}
            example={{
              label: "Issues is the only example that needs it",
              href: "/examples/issues",
            }}
            previewLabel="Preview: a selection toolbar reading 2 selected with a Change status action, above two checked issue rows."
          >
            <SelectionPreview />
          </TemplateLayerCard>

          <TemplateLayerCard
            title="System States"
            description="Every example implements a loading.tsx and error.tsx route segment with ListSkeleton, ListErrorState, and useDemoErrorRecovery, plus an empty and filtered-empty branch inside its own results component using ListEmptyState. Route Handlers accept an explicit demoState query parameter so every state can be previewed without special tooling."
            buildingBlocks={[
              "ListSkeleton",
              "ListEmptyState",
              "ListErrorState",
              "useDemoErrorRecovery",
            ]}
            example={{
              label: "Try appending ?demoState=error to Deployments",
              href: "/examples/deployments?demoState=error",
            }}
            previewLabel="Preview: three loading skeleton bars of varying width."
          >
            <StatesPreview />
          </TemplateLayerCard>
        </div>
      </section>

      <CompositionExample />
    </PageContainer>
  );
}

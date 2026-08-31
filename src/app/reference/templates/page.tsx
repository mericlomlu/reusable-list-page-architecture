import { PageContainer } from "@/components/layout/page-container";
import { ReferencePageHeader } from "@/features/reference-ui/reference-page-header";
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
      <ReferencePageHeader
        eyebrow="Reference / Templates"
        title="Templates"
        description="Four composition layers, from a bare list to a fully-stateful page. Every example route in this project builds on some or all of them."
      />

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
            description="ListPageShell composed with ResultsView and PaginationControls. toolbar is a required prop, but a basic composition can pass it null or minimal content — every other layer just puts more into that same slot and into children."
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
            description="A page-owned toolbar composes SearchField, SingleSelectFilter or MultiSelectFilter, SortMenu, and ViewSwitcher, then calls useListQueryState once. Debounced search replaces the current URL entry, while filter, sort, view, and pagination changes each push a new, navigable one — so the back button and a copied link still restore the right list."
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
            description="Adds row-level selection that is deliberately kept out of the URL — it's page state, not shareable list state. SelectionToolbar appears once anything is checked and exposes page-owned bulk actions; the page renders its own selectable table because ResultsView doesn't model table headers, select-all, or indeterminate selection."
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

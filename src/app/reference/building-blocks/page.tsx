import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import {
  CONTROLS_CATEGORY,
  PAGINATION_FILTERS_CATEGORY,
  QUERY_NAVIGATION_CATEGORY,
  SELECTION_CATEGORY,
  STRUCTURE_RESULTS_CATEGORY,
  SYSTEM_STATES_CATEGORY,
} from "@/features/building-blocks-reference/block-catalog";
import { BlockCatalogSection } from "@/features/building-blocks-reference/block-catalog-section";
import {
  ControlsPreview,
  PaginationFiltersPreview,
  QueryPreview,
  SelectionCategoryPreview,
  StructurePreview,
  SystemStatesPreview,
} from "@/features/building-blocks-reference/category-previews";
import { PageOwnedNote } from "@/features/building-blocks-reference/page-owned-note";
import { QueryBoundaryExample } from "@/features/building-blocks-reference/query-boundary-example";
import { ReferencePageHeader } from "@/features/reference-ui/reference-page-header";
import { ReferenceSummary } from "@/features/reference-ui/reference-summary";
import { buildRouteMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildRouteMetadata({
  title: "Building Blocks",
  description:
    "Every reusable primitive in src/features/list-page/ on its own — what it renders and which examples use it.",
  path: "/reference/building-blocks",
});

export default function BuildingBlocksPage() {
  return (
    <PageContainer>
      <ReferencePageHeader
        eyebrow="Reference / Building Blocks"
        title="Building Blocks"
        description={
          <>
            Templates shows how these compose into four layers. This page turns
            that around: every primitive in{" "}
            <code className="font-mono text-caption">
              src/features/list-page/
            </code>{" "}
            on its own — what it renders, whether it&apos;s a Server Component,
            a Client Component, or a client hook, and which examples actually
            use it.
          </>
        }
      />

      <ReferenceSummary
        paragraphs={[
          "The shared list-page core owns the repeatable mechanics: typed URL parsing and serialization, search and filter controls, sorting, view switching, result layouts, pagination, active-filter links, selection primitives, and system states.",
          "Each feature keeps its domain decisions outside that core—record types, mock data, filter options, query services, toolbar composition, rows, cards, status presentation, and bulk behavior. New examples compose these primitives without changing their underlying implementation.",
        ]}
      />

      <BlockCatalogSection category={STRUCTURE_RESULTS_CATEGORY}>
        <StructurePreview />
      </BlockCatalogSection>

      <BlockCatalogSection category={QUERY_NAVIGATION_CATEGORY}>
        <QueryPreview />
      </BlockCatalogSection>

      <BlockCatalogSection category={CONTROLS_CATEGORY}>
        <ControlsPreview />
      </BlockCatalogSection>

      <BlockCatalogSection category={PAGINATION_FILTERS_CATEGORY}>
        <PaginationFiltersPreview />
      </BlockCatalogSection>

      <BlockCatalogSection category={SELECTION_CATEGORY}>
        <SelectionCategoryPreview />
      </BlockCatalogSection>

      <BlockCatalogSection category={SYSTEM_STATES_CATEGORY}>
        <SystemStatesPreview />
      </BlockCatalogSection>

      <QueryBoundaryExample />

      <PageOwnedNote />
    </PageContainer>
  );
}

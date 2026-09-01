import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { ApiParityDiagram } from "@/features/architecture-reference/api-parity-diagram";
import { BoundaryPanels } from "@/features/architecture-reference/boundary-panels";
import { CoreComposition } from "@/features/architecture-reference/core-composition";
import { PipelineSteps } from "@/features/architecture-reference/pipeline-steps";
import { PrimaryFlowDiagram } from "@/features/architecture-reference/primary-flow-diagram";
import { SelectionException } from "@/features/architecture-reference/selection-exception";
import { ReferencePageHeader } from "@/features/reference-ui/reference-page-header";
import { ReferenceSummary } from "@/features/reference-ui/reference-summary";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "A URL-driven list-page system with one parsing boundary, server-rendered results, and page-owned domain logic.",
  alternates: { canonical: "/reference/architecture" },
};

export default function ArchitecturePage() {
  return (
    <PageContainer>
      <ReferencePageHeader
        eyebrow="Reference / Architecture"
        title="Architecture"
        description="A URL-driven list-page system with one parsing boundary, server-rendered results, focused client controls, and page-owned domain logic."
      />

      <ReferenceSummary
        paragraphs={[
          "The URL is the shareable source of truth for search, filters, sorting, view, and pagination. Server Components parse that state, call a page-owned query service, and render the resulting records; focused Client Components only update the URL or manage temporary interaction state.",
          "Each page and its mock Route Handler reuse the same query configuration and domain query function. Selection is the deliberate exception: it stays local to the client because it is temporary UI state rather than shareable list state.",
        ]}
      />

      <PrimaryFlowDiagram />
      <BoundaryPanels />
      <CoreComposition />
      <PipelineSteps />
      <ApiParityDiagram />
      <SelectionException />
    </PageContainer>
  );
}

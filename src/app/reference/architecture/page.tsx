import { PageContainer } from "@/components/layout/page-container";
import { ApiParityDiagram } from "@/features/architecture-reference/api-parity-diagram";
import { BoundaryPanels } from "@/features/architecture-reference/boundary-panels";
import { CoreComposition } from "@/features/architecture-reference/core-composition";
import { PipelineSteps } from "@/features/architecture-reference/pipeline-steps";
import { PrimaryFlowDiagram } from "@/features/architecture-reference/primary-flow-diagram";
import { SelectionException } from "@/features/architecture-reference/selection-exception";
import { ReferencePageHeader } from "@/features/reference-ui/reference-page-header";

export default function ArchitecturePage() {
  return (
    <PageContainer>
      <ReferencePageHeader
        eyebrow="Reference / Architecture"
        title="Architecture"
        description="A URL-driven list-page system with one parsing boundary, server-rendered results, focused client controls, and page-owned domain logic."
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

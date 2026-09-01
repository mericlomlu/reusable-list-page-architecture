import { PageContainer } from "@/components/layout/page-container";
import { ArchitecturePrinciples } from "@/features/overview/architecture-principles";
import { ClosingStatement } from "@/features/overview/closing-statement";
import { ExampleShowcase } from "@/features/overview/example-showcase";
import { Hero } from "@/features/overview/hero";
import { ReferenceNavigation } from "@/features/overview/reference-navigation";
import { SharedVsPageOwned } from "@/features/overview/shared-vs-page-owned";
import { ReferenceSummary } from "@/features/reference-ui/reference-summary";

export default function OverviewPage() {
  return (
    <PageContainer>
      <Hero />
      <ReferenceSummary
        paragraphs={[
          "The project separates repeatable list mechanics from domain-specific presentation. URL parsing, controls, result layouts, pagination, selection primitives, and system states live in a shared core, while each feature owns its records, filters, query service, toolbar composition, and renderers.",
          "Four examples prove the boundary with different data shapes and interaction needs. The accompanying reference pages explain how the pieces compose, what each primitive does, and how data moves between the URL, Server Components, Client Components, and mock Route Handlers.",
        ]}
      />
      <ExampleShowcase />
      <SharedVsPageOwned />
      <ArchitecturePrinciples />
      <ReferenceNavigation />
      <ClosingStatement />
    </PageContainer>
  );
}

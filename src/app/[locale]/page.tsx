import { useTranslations } from "next-intl";
import { PageContainer } from "@/components/layout/page-container";
import { ArchitecturePrinciples } from "@/features/overview/architecture-principles";
import { ClosingStatement } from "@/features/overview/closing-statement";
import { ExampleShowcase } from "@/features/overview/example-showcase";
import { Hero } from "@/features/overview/hero";
import { ReferenceNavigation } from "@/features/overview/reference-navigation";
import { SharedVsPageOwned } from "@/features/overview/shared-vs-page-owned";
import { StructuredData } from "@/features/overview/structured-data";
import { ReferenceSummary } from "@/features/reference-ui/reference-summary";

export default function OverviewPage() {
  const t = useTranslations("overview.summary");

  return (
    <PageContainer>
      <StructuredData />
      <Hero />
      <ReferenceSummary paragraphs={[t("paragraph1"), t("paragraph2")]} />
      <ExampleShowcase />
      <SharedVsPageOwned />
      <ArchitecturePrinciples />
      <ReferenceNavigation />
      <ClosingStatement />
    </PageContainer>
  );
}

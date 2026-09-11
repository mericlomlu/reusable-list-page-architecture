import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageContainer } from "@/components/layout/page-container";
import { ApiParityDiagram } from "@/features/architecture-reference/api-parity-diagram";
import { BoundaryPanels } from "@/features/architecture-reference/boundary-panels";
import { CoreComposition } from "@/features/architecture-reference/core-composition";
import { PipelineSteps } from "@/features/architecture-reference/pipeline-steps";
import { PrimaryFlowDiagram } from "@/features/architecture-reference/primary-flow-diagram";
import { SelectionException } from "@/features/architecture-reference/selection-exception";
import { ReferencePageHeader } from "@/features/reference-ui/reference-page-header";
import { ReferenceSummary } from "@/features/reference-ui/reference-summary";
import { buildRouteMetadata } from "@/lib/metadata";

export async function generateMetadata(
  props: PageProps<"/[locale]/reference/architecture">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    title: t("architecturePage.title"),
    description: t("architecturePage.description"),
    path: "/reference/architecture",
    locale,
    socialImageAlt: t("site.socialImageAlt"),
  });
}

export default async function ArchitecturePage(
  props: PageProps<"/[locale]/reference/architecture">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const t = await getTranslations({
    locale,
    namespace: "reference.architecture",
  });

  return (
    <PageContainer>
      <ReferencePageHeader
        eyebrow={tMeta("architecturePage.eyebrow")}
        title={tMeta("architecturePage.title")}
        description={tMeta("architecturePage.description")}
      />

      <ReferenceSummary
        paragraphs={[t("summaryParagraph1"), t("summaryParagraph2")]}
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

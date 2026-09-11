import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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

export async function generateMetadata(
  props: PageProps<"/[locale]/reference/building-blocks">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    title: t("buildingBlocksPage.title"),
    description: t("buildingBlocksPage.description"),
    path: "/reference/building-blocks",
    locale,
    socialImageAlt: t("site.socialImageAlt"),
  });
}

export default async function BuildingBlocksPage(
  props: PageProps<"/[locale]/reference/building-blocks">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const t = await getTranslations({
    locale,
    namespace: "reference.buildingBlocks",
  });

  return (
    <PageContainer>
      <ReferencePageHeader
        eyebrow={tMeta("buildingBlocksPage.eyebrow")}
        title={tMeta("buildingBlocksPage.title")}
        description={t.rich("pageDescription", {
          code: (chunks) => (
            <code className="font-mono text-caption">{chunks}</code>
          ),
        })}
      />

      <ReferenceSummary
        paragraphs={[t("summaryParagraph1"), t("summaryParagraph2")]}
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

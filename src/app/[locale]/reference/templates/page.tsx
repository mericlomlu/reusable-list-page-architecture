import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageContainer } from "@/components/layout/page-container";
import { ReferencePageHeader } from "@/features/reference-ui/reference-page-header";
import { ReferenceSummary } from "@/features/reference-ui/reference-summary";
import { CompositionExample } from "@/features/templates-reference/composition-example";
import {
  BasicListPreview,
  SearchFiltersPreview,
  SelectionPreview,
  StatesPreview,
} from "@/features/templates-reference/layer-previews";
import { TemplateLayerCard } from "@/features/templates-reference/template-layer-card";
import { buildRouteMetadata } from "@/lib/metadata";

export async function generateMetadata(
  props: PageProps<"/[locale]/reference/templates">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    title: t("templatesPage.title"),
    description: t("templatesPage.description"),
    path: "/reference/templates",
    locale,
    socialImageAlt: t("site.socialImageAlt"),
  });
}

export default async function TemplatesPage(
  props: PageProps<"/[locale]/reference/templates">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const tMeta = await getTranslations({ locale, namespace: "metadata" });
  const t = await getTranslations({ locale, namespace: "reference.templates" });

  return (
    <PageContainer>
      <ReferencePageHeader
        eyebrow={tMeta("templatesPage.eyebrow")}
        title={tMeta("templatesPage.title")}
        description={tMeta("templatesPage.description")}
      />

      <ReferenceSummary
        paragraphs={[t("summaryParagraph1"), t("summaryParagraph2")]}
      />

      <section aria-labelledby="layers-heading">
        <h2 id="layers-heading" className="text-lg font-bold text-foreground">
          {t("layersHeading")}
        </h2>
        <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
          {t.rich("layersDescription", {
            code: (chunks) => (
              <code className="font-mono text-caption">{chunks}</code>
            ),
          })}
        </p>

        <div className="mt-5 flex flex-col gap-4">
          <TemplateLayerCard
            title={t("layers.basicList.title")}
            description={t("layers.basicList.description")}
            buildingBlocks={[
              "ListPageShell",
              "ResultsView",
              "PaginationControls",
            ]}
            example={{
              label: t("layers.basicList.exampleLabel"),
              href: "/examples/packages",
            }}
            previewLabel={t("layers.basicList.previewLabel")}
          >
            <BasicListPreview />
          </TemplateLayerCard>

          <TemplateLayerCard
            title={t("layers.searchFilters.title")}
            description={t("layers.searchFilters.description")}
            buildingBlocks={[
              "SearchField",
              "SingleSelectFilter",
              "MultiSelectFilter",
              "SortMenu",
              "ViewSwitcher",
              "useListQueryState",
            ]}
            example={{
              label: t("layers.searchFilters.exampleLabel"),
              href: "/examples/components",
            }}
            previewLabel={t("layers.searchFilters.previewLabel")}
          >
            <SearchFiltersPreview />
          </TemplateLayerCard>

          <TemplateLayerCard
            title={t("layers.selection.title")}
            description={t("layers.selection.description")}
            buildingBlocks={["useSelection", "SelectionToolbar"]}
            example={{
              label: t("layers.selection.exampleLabel"),
              href: "/examples/issues",
            }}
            previewLabel={t("layers.selection.previewLabel")}
          >
            <SelectionPreview />
          </TemplateLayerCard>

          <TemplateLayerCard
            title={t("layers.systemStates.title")}
            description={t("layers.systemStates.description")}
            buildingBlocks={[
              "ListSkeleton",
              "ListEmptyState",
              "ListErrorState",
              "useDemoErrorRecovery",
            ]}
            example={{
              label: t("layers.systemStates.exampleLabel"),
              href: "/examples/deployments?demoState=error",
            }}
            previewLabel={t("layers.systemStates.previewLabel")}
          >
            <StatesPreview />
          </TemplateLayerCard>
        </div>
      </section>

      <CompositionExample />
    </PageContainer>
  );
}

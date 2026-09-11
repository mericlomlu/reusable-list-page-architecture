import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { parseDemoState } from "@/features/list-page/demo-state";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { PaginationControls } from "@/features/list-page/pagination-controls";
import {
  buildListQueryString,
  parseListQuery,
  toSearchParams,
} from "@/features/list-page/query-state";
import { PACKAGE_LIST_QUERY_CONFIG } from "@/features/packages-example/config";
import { PackagesResults } from "@/features/packages-example/packages-results";
import { PackagesToolbar } from "@/features/packages-example/packages-toolbar";
import { queryPackages } from "@/features/packages-example/query-service";
import type {
  PackageFilterKey,
  PackageSortKey,
} from "@/features/packages-example/types";
import { buildRouteMetadata } from "@/lib/metadata";

export async function generateMetadata(
  props: PageProps<"/[locale]/examples/packages">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return buildRouteMetadata({
    title: t("packagesPage.title"),
    description: t("packagesPage.description"),
    path: "/examples/packages",
    locale,
    socialImageAlt: t("site.socialImageAlt"),
  });
}

export default async function PackagesPage(
  props: PageProps<"/[locale]/examples/packages">,
) {
  const { locale } = await props.params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "packagesExample" });
  const tMeta = await getTranslations({ locale, namespace: "metadata" });

  const rawSearchParams = await props.searchParams;
  const searchParams = toSearchParams(rawSearchParams);
  const demoState = parseDemoState(searchParams);
  const query = parseListQuery<PackageSortKey, PackageFilterKey>(
    searchParams,
    PACKAGE_LIST_QUERY_CONFIG,
  );
  const { records, total, page } = await queryPackages(query, demoState);

  const buildHref = (targetPage: number) =>
    `/examples/packages${buildListQueryString(
      { ...query, page: targetPage },
      PACKAGE_LIST_QUERY_CONFIG,
    )}`;

  if (page !== query.page) {
    redirect(buildHref(page));
  }

  return (
    <ListPageShell
      eyebrow={tMeta("packagesPage.eyebrow")}
      title={tMeta("packagesPage.title")}
      description={tMeta("packagesPage.description")}
      toolbar={<PackagesToolbar />}
      pagination={
        <PaginationControls
          page={page}
          pageSize={PACKAGE_LIST_QUERY_CONFIG.pageSize}
          total={total}
          buildHref={buildHref}
          itemLabel={t("itemLabel")}
        />
      }
    >
      <PackagesResults records={records} query={{ ...query, page }} />
    </ListPageShell>
  );
}

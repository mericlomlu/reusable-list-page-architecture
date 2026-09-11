import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "@/i18n/routing";

async function loadMessages(locale: string) {
  const [
    common,
    nav,
    themeToggle,
    listPage,
    componentsExample,
    issuesExample,
    deploymentsExample,
    packagesExample,
    overview,
    metadata,
    referenceArchitecture,
    referenceBuildingBlocks,
    referenceTemplates,
    referenceSummary,
  ] = await Promise.all([
    import(`../../messages/${locale}/common.json`),
    import(`../../messages/${locale}/nav.json`),
    import(`../../messages/${locale}/themeToggle.json`),
    import(`../../messages/${locale}/listPage.json`),
    import(`../../messages/${locale}/componentsExample.json`),
    import(`../../messages/${locale}/issuesExample.json`),
    import(`../../messages/${locale}/deploymentsExample.json`),
    import(`../../messages/${locale}/packagesExample.json`),
    import(`../../messages/${locale}/overview.json`),
    import(`../../messages/${locale}/metadata.json`),
    import(`../../messages/${locale}/reference/architecture.json`),
    import(`../../messages/${locale}/reference/buildingBlocks.json`),
    import(`../../messages/${locale}/reference/templates.json`),
    import(`../../messages/${locale}/reference/summary.json`),
  ]);

  return {
    common: common.default,
    nav: nav.default,
    themeToggle: themeToggle.default,
    listPage: listPage.default,
    componentsExample: componentsExample.default,
    issuesExample: issuesExample.default,
    deploymentsExample: deploymentsExample.default,
    packagesExample: packagesExample.default,
    overview: overview.default,
    metadata: metadata.default,
    reference: {
      architecture: referenceArchitecture.default,
      buildingBlocks: referenceBuildingBlocks.default,
      templates: referenceTemplates.default,
      summary: referenceSummary.default,
    },
  };
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessages(locale),
  };
});

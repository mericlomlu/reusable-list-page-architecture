import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { routing } from "@/i18n/routing";
import { ibmPlexMono, manrope } from "@/lib/fonts";
import { SITE_NAME } from "@/lib/site-config";
import { absoluteUrl, SITE_URL } from "@/lib/site-url";
import "../globals.css";

const OPEN_GRAPH_LOCALE: Record<string, string> = {
  en: "en_US",
  tr: "tr_TR",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: LayoutProps<"/[locale]">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const description = t("site.description");
  const languages = Object.fromEntries(
    routing.locales.map((loc) => [loc, absoluteUrl("/", loc)]),
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description,
    applicationName: SITE_NAME,
    authors: [{ name: "Meriç Lomlu", url: "https://github.com/mericlomlu" }],
    creator: "Meriç Lomlu",
    keywords: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "App Router",
      "list page architecture",
      "URL state",
    ],
    alternates: {
      canonical: absoluteUrl("/", locale),
      languages: {
        ...languages,
        "x-default": absoluteUrl("/", routing.defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      url: absoluteUrl("/", locale),
      siteName: SITE_NAME,
      title: SITE_NAME,
      description,
      locale:
        OPEN_GRAPH_LOCALE[locale] ?? OPEN_GRAPH_LOCALE[routing.defaultLocale],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_NAME,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e4" },
    { media: "(prefers-color-scheme: dark)", color: "#211d19" },
  ],
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "common" });

  return (
    <html
      lang={locale}
      className={`${manrope.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:border focus:border-border focus:bg-popover focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg"
            >
              {t("skipToContent")}
            </a>
            <div className="flex min-h-screen flex-col md:flex-row">
              <AppSidebar />
              <div className="flex min-w-0 flex-1 flex-col">
                <MobileNav />
                <main id="main-content" className="flex-1">
                  {children}
                </main>
              </div>
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

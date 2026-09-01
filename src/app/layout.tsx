import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ibmPlexMono, manrope } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

const SITE_NAME = "Reusable List Page Architecture";
const SITE_DESCRIPTION =
  "An interactive showcase of reusable list page patterns built with Next.js and TypeScript.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
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
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f0e4" },
    { media: "(prefers-color-scheme: dark)", color: "#211d19" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
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
            Skip to content
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
      </body>
    </html>
  );
}

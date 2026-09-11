"use client";

import { useTranslations } from "next-intl";
import { Suspense, useState } from "react";
import { LogoMark, MenuIcon } from "@/components/icons/nav-icons";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { LocaleToggle } from "@/components/locale-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link } from "@/i18n/navigation";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("common");

  return (
    <header className="flex items-center justify-between border-b border-border px-4 py-3 md:hidden">
      <Link
        href="/"
        className="flex items-center gap-2"
        onClick={() => setOpen(false)}
      >
        <LogoMark
          className="size-5 shrink-0 text-foreground"
          aria-hidden="true"
        />
        <span className="text-wordmark font-bold tracking-tight text-foreground">
          Reusable List
        </span>
      </Link>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              className="size-11"
              aria-label={t("openNavigation")}
            />
          }
        >
          <MenuIcon aria-hidden="true" className="size-4" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-72 gap-0 p-0"
          closeLabel={t("sheetClose")}
        >
          <SheetHeader className="border-b border-border">
            <SheetTitle>{t("navigationTitle")}</SheetTitle>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
          <div className="flex gap-2 border-t border-border p-4">
            <ThemeToggle />
            <Suspense fallback={null}>
              <LocaleToggle />
            </Suspense>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

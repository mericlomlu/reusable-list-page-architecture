"use client";

import Link from "next/link";
import { useState } from "react";
import { LogoMark, MenuIcon } from "@/components/icons/nav-icons";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  const [open, setOpen] = useState(false);

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
              aria-label="Open navigation"
            />
          }
        >
          <MenuIcon aria-hidden="true" className="size-4" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 gap-0 p-0">
          <SheetHeader className="border-b border-border">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            <SidebarNav onNavigate={() => setOpen(false)} />
          </div>
          <div className="border-t border-border p-4">
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}

import Link from "next/link";
import { LogoMark } from "@/components/icons/nav-icons";
import { SidebarNav } from "@/components/layout/sidebar-nav";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppSidebar() {
  return (
    <aside className="hidden w-62 shrink-0 flex-col gap-6 border-r border-border px-4 py-6 md:flex">
      <Link href="/" className="flex items-center gap-2.5 px-2">
        <LogoMark
          className="size-5 shrink-0 text-foreground"
          aria-hidden="true"
        />
        <span className="flex flex-col leading-tight">
          <span className="text-wordmark font-bold tracking-tight text-foreground">
            Reusable List
          </span>
          <span className="font-mono text-subtitle text-muted-foreground">
            Page Architecture
          </span>
        </span>
      </Link>
      <div className="min-h-0 flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
      <ThemeToggle />
    </aside>
  );
}

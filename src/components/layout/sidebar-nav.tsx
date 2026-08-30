"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isNavItemActive, navigationConfig } from "@/config/navigation";
import { cn } from "@/lib/utils";

interface SidebarNavProps {
  onNavigate?: () => void;
}

export function SidebarNav({ onNavigate }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6">
      {navigationConfig.map((group) => (
        <div key={group.id}>
          {group.label ? (
            <div className="mb-1.5 px-3 text-label font-bold tracking-wider text-muted-foreground uppercase">
              {group.label}
            </div>
          ) : null}
          <nav
            aria-label={group.label ?? "Primary"}
            className="flex flex-col gap-0.5"
          >
            {group.items.map((item) => {
              const active = isNavItemActive(pathname, item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                    active && "bg-accent font-semibold text-foreground",
                  )}
                >
                  <Icon
                    aria-hidden="true"
                    className={cn(
                      "size-4 shrink-0",
                      active ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ))}
    </div>
  );
}

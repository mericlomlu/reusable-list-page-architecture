import Link from "next/link";
import type { ReactNode } from "react";
import { MoreHorizontalIcon } from "@/components/icons/list-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
  page: number;
  pageSize: number;
  total: number;
  buildHref: (page: number) => string;
  itemLabel: string;
}

function getPageNumbers(
  page: number,
  pageCount: number,
): (number | "ellipsis")[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, pageCount, page]);
  if (page > 1) pages.add(page - 1);
  if (page < pageCount) pages.add(page + 1);

  const sorted = [...pages].sort((a, b) => a - b);
  const withEllipses: (number | "ellipsis")[] = [];
  for (let index = 0; index < sorted.length; index += 1) {
    const current = sorted[index];
    withEllipses.push(current);
    const next = sorted[index + 1];
    if (next !== undefined && next - current > 1) {
      withEllipses.push("ellipsis");
    }
  }
  return withEllipses;
}

export function PaginationControls({
  page,
  pageSize,
  total,
  buildHref,
  itemLabel,
}: PaginationControlsProps) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const rangeStart = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const rangeEnd = Math.min(total, page * pageSize);
  const pageNumbers = getPageNumbers(page, pageCount);

  return (
    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
      <p aria-live="polite" className="text-caption text-muted-foreground">
        {total === 0
          ? `No ${itemLabel} to show`
          : `Showing ${rangeStart}–${rangeEnd} of ${total} ${itemLabel}`}
      </p>
      <nav aria-label="Pagination" className="flex items-center gap-1">
        <PageLink
          href={buildHref(Math.max(1, page - 1))}
          disabled={page <= 1}
          label="Previous page"
        >
          Prev
        </PageLink>
        {pageNumbers.map((entry, index) =>
          entry === "ellipsis" ? (
            <span
              key={`ellipsis-${pageNumbers[index - 1]}`}
              aria-hidden="true"
              className="flex size-8 items-center justify-center text-muted-foreground"
            >
              <MoreHorizontalIcon className="size-3.5" />
            </span>
          ) : (
            <PageLink
              key={entry}
              href={buildHref(entry)}
              isCurrent={entry === page}
              label={`Page ${entry}`}
            >
              {entry}
            </PageLink>
          ),
        )}
        <PageLink
          href={buildHref(Math.min(pageCount, page + 1))}
          disabled={page >= pageCount}
          label="Next page"
        >
          Next
        </PageLink>
      </nav>
    </div>
  );
}

interface PageLinkProps {
  href: string;
  label: string;
  disabled?: boolean;
  isCurrent?: boolean;
  children: ReactNode;
}

function PageLink({
  href,
  label,
  disabled,
  isCurrent,
  children,
}: PageLinkProps) {
  const className = cn(
    buttonVariants({ variant: isCurrent ? "default" : "outline", size: "sm" }),
    "min-w-8",
    disabled && "pointer-events-none opacity-40",
  );

  if (disabled) {
    return (
      <button type="button" disabled aria-label={label} className={className}>
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      aria-current={isCurrent ? "page" : undefined}
      scroll={false}
      className={className}
    >
      {children}
    </Link>
  );
}

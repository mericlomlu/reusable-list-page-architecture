import Link from "next/link";
import { CloseIcon } from "@/components/icons/nav-icons";

export interface ActiveFilterPill {
  readonly key: string;
  readonly label: string;
  readonly href: string;
}

interface ActiveFiltersProps {
  pills: readonly ActiveFilterPill[];
  clearHref: string;
}

export function ActiveFilters({ pills, clearHref }: ActiveFiltersProps) {
  if (pills.length === 0) return null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-2">
      {pills.map((pill) => (
        <span
          key={pill.key}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 py-1 pr-1.5 pl-2.5 text-[12.5px] text-foreground"
        >
          {pill.label}
          <Link
            href={pill.href}
            scroll={false}
            className="-m-1 rounded-full p-1.5 text-primary hover:bg-primary/15 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
          >
            <CloseIcon className="size-2.5" />
            <span className="sr-only">Remove {pill.label} filter</span>
          </Link>
        </span>
      ))}
      <Link
        href={clearHref}
        scroll={false}
        className="text-[12.5px] text-muted-foreground underline decoration-muted-foreground/50 underline-offset-2 hover:text-foreground"
      >
        Clear all
      </Link>
    </div>
  );
}

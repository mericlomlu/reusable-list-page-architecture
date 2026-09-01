import Link from "next/link";
import type { IconComponent } from "@/components/icons/icon";
import { ChevronRightIcon } from "@/components/icons/list-icons";

interface LinkRecordProps {
  icon: IconComponent;
  title: string;
  description: string;
  tags?: readonly string[];
  linkLabel: string;
  href: string;
}

export function LinkRecord({
  icon: Icon,
  title,
  description,
  tags,
  linkLabel,
  href,
}: LinkRecordProps) {
  return (
    <li className="flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-6">
      <div className="flex gap-3.5">
        <span
          aria-hidden="true"
          className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-background"
        >
          <Icon className="size-4 text-primary" />
        </span>
        <div className="flex flex-col gap-1.5">
          <h3 className="text-record-title font-bold text-foreground">
            {title}
          </h3>
          <p className="max-w-xl text-body-sm text-muted-foreground">
            {description}
          </p>
          {tags && tags.length > 0 ? (
            <ul
              aria-label="Capabilities"
              className="mt-1 flex flex-wrap gap-1.5"
            >
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md border border-border px-2 py-1 font-mono text-label text-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <Link
        href={href}
        className="inline-flex w-fit shrink-0 items-center gap-1 text-body-sm font-semibold text-foreground hover:text-primary sm:pl-4"
      >
        {linkLabel}
        <ChevronRightIcon className="size-3" />
      </Link>
    </li>
  );
}

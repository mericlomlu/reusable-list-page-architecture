import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRightIcon } from "@/components/icons/list-icons";
import { DecorativePreviewFigure } from "@/features/reference-ui/decorative-preview-figure";

interface TemplateExampleLink {
  readonly label: string;
  readonly href: string;
}

interface TemplateLayerCardProps {
  title: string;
  description: string;
  buildingBlocks: readonly string[];
  example?: TemplateExampleLink;
  previewLabel: string;
  children: ReactNode;
}

export function TemplateLayerCard({
  title,
  description,
  buildingBlocks,
  example,
  previewLabel,
  children,
}: TemplateLayerCardProps) {
  return (
    <article className="grid overflow-hidden rounded-lg border border-border sm:grid-cols-[1fr_minmax(220px,320px)]">
      <div className="flex flex-col gap-3.5 bg-card px-6 py-6">
        <h3 className="text-record-title font-bold text-foreground">{title}</h3>
        <p className="text-body-sm text-muted-foreground">{description}</p>
        <ul
          aria-label="Building blocks used"
          className="flex flex-wrap gap-1.5"
        >
          {buildingBlocks.map((name) => (
            <li
              key={name}
              className="rounded-md border border-border px-2 py-1 font-mono text-label text-foreground"
            >
              {name}
            </li>
          ))}
        </ul>
        {example ? (
          <Link
            href={example.href}
            className="mt-1 inline-flex w-fit items-center gap-1 text-body-sm font-semibold text-foreground hover:text-primary"
          >
            {example.label}
            <ChevronRightIcon className="size-3" />
          </Link>
        ) : null}
      </div>
      <DecorativePreviewFigure
        label={previewLabel}
        className="border-t border-border bg-background sm:border-t-0 sm:border-l"
      >
        {children}
      </DecorativePreviewFigure>
    </article>
  );
}

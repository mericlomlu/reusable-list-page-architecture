import type { ReactNode } from "react";
import type { BuildingBlockCategory } from "@/features/building-blocks-reference/block-catalog";
import { BuildingBlockRow } from "@/features/building-blocks-reference/building-block-row";
import { DecorativePreviewFigure } from "@/features/reference-ui/decorative-preview-figure";

interface BlockCatalogSectionProps {
  category: BuildingBlockCategory;
  children: ReactNode;
}

export function BlockCatalogSection({
  category,
  children,
}: BlockCatalogSectionProps) {
  const headingId = `${category.id}-heading`;

  return (
    <section aria-labelledby={headingId} className="mt-10 first:mt-0">
      <h2 id={headingId} className="text-lg font-bold text-foreground">
        {category.title}
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {category.description}
      </p>
      <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_220px]">
        <ul className="list-none overflow-hidden rounded-lg border border-border">
          {category.blocks.map((block) => (
            <BuildingBlockRow key={block.name} {...block} />
          ))}
        </ul>
        <DecorativePreviewFigure
          label={category.previewLabel}
          className="rounded-lg border border-border bg-card"
        >
          {children}
        </DecorativePreviewFigure>
      </div>
    </section>
  );
}

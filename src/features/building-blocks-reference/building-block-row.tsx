import { useTranslations } from "next-intl";
import type { BlockBoundary } from "@/features/building-blocks-reference/block-catalog";
import { BoundaryTag } from "@/features/building-blocks-reference/boundary-tag";

interface BuildingBlockRowProps {
  name: string;
  boundary: BlockBoundary;
  summary: string;
  consumers: string;
}

export function BuildingBlockRow({
  name,
  boundary,
  summary,
  consumers,
}: BuildingBlockRowProps) {
  const t = useTranslations("reference.buildingBlocks");

  return (
    <li className="flex flex-col gap-1.5 border-t border-border px-4 py-3.5 first:border-t-0 sm:grid sm:grid-cols-[200px_1fr] sm:gap-4">
      <div className="flex items-start justify-between gap-2 sm:flex-col sm:items-start sm:justify-start sm:gap-1.5">
        <span className="font-mono text-body-sm font-bold text-foreground">
          {name}
        </span>
        <BoundaryTag boundary={boundary} />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-body-sm text-muted-foreground">{summary}</p>
        <p className="text-caption text-muted-foreground">
          {t("usedByLabel", { consumers })}
        </p>
      </div>
    </li>
  );
}

import type { BlockBoundary } from "@/features/building-blocks-reference/block-catalog";
import { cn } from "@/lib/utils";

const BOUNDARY_DOT_CLASS_NAME: Record<BlockBoundary, string> = {
  "Server Component": "bg-muted-foreground",
  "Shared Component": "bg-muted-foreground",
  "Client Component": "bg-primary",
  "Client Hook": "bg-primary",
  Universal: "bg-muted-foreground",
};

interface BoundaryTagProps {
  boundary: BlockBoundary;
}

export function BoundaryTag({ boundary }: BoundaryTagProps) {
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-label font-bold tracking-wider text-muted-foreground uppercase">
      <span
        aria-hidden="true"
        className={cn(
          "size-[6px] rounded-full",
          BOUNDARY_DOT_CLASS_NAME[boundary],
        )}
      />
      {boundary}
    </span>
  );
}

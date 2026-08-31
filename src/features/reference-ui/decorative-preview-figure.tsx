import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DecorativePreviewFigureProps {
  label: string;
  className?: string;
  children: ReactNode;
}

export function DecorativePreviewFigure({
  label,
  className,
  children,
}: DecorativePreviewFigureProps) {
  return (
    <figure
      className={cn(
        "m-0 flex flex-col justify-center gap-2 px-5 py-5",
        className,
      )}
    >
      <figcaption className="sr-only">{label}</figcaption>
      <div aria-hidden="true" className="flex flex-col gap-2">
        {children}
      </div>
    </figure>
  );
}

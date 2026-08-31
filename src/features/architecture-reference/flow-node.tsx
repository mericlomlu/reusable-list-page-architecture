import { cn } from "@/lib/utils";

interface FlowNodeProps {
  label: string;
  description?: string;
  emphasis?: boolean;
  muted?: boolean;
  className?: string;
}

/** A single rectangular node in an architecture-flow diagram. */
export function FlowNode({
  label,
  description,
  emphasis = false,
  muted = false,
  className,
}: FlowNodeProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-1 rounded-md border px-4 py-3.5",
        muted ? "bg-background" : "bg-card",
        emphasis ? "border-primary/40" : "border-border",
        className,
      )}
    >
      <p className="font-mono text-label font-bold tracking-wide text-foreground uppercase">
        {label}
      </p>
      {description ? (
        <p className="text-caption text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}

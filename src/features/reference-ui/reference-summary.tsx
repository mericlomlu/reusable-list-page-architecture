interface ReferenceSummaryProps {
  summary: string;
}

export function ReferenceSummary({ summary }: ReferenceSummaryProps) {
  return (
    <aside
      aria-label="TL;DR"
      className="mb-10 flex flex-col gap-1 rounded-lg border border-border bg-card px-6 py-4 sm:flex-row sm:items-baseline sm:gap-3"
    >
      <span
        aria-hidden="true"
        className="shrink-0 font-mono text-eyebrow uppercase tracking-wide text-muted-foreground"
      >
        TL;DR
      </span>
      <p className="text-body-sm text-foreground">{summary}</p>
    </aside>
  );
}

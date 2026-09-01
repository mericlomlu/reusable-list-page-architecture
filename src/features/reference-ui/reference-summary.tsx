interface ReferenceSummaryProps {
  summary: string;
}

export function ReferenceSummary({ summary }: ReferenceSummaryProps) {
  return (
    <section
      aria-labelledby="tldr-heading"
      className="mb-10 border-b border-border pb-8"
    >
      <h2 id="tldr-heading" className="text-lg font-bold text-foreground">
        TL;DR
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {summary}
      </p>
    </section>
  );
}

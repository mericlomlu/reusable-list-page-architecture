interface ReferenceSummaryProps {
  paragraphs: readonly [string, string];
}

export function ReferenceSummary({ paragraphs }: ReferenceSummaryProps) {
  const [firstParagraph, secondParagraph] = paragraphs;

  return (
    <section
      aria-labelledby="tldr-heading"
      className="mb-10 border-b border-border pb-8"
    >
      <h2 id="tldr-heading" className="text-lg font-bold text-foreground">
        TL;DR
      </h2>
      <div className="mt-1.5 flex max-w-2xl flex-col gap-3 text-body-sm text-muted-foreground">
        <p>{firstParagraph}</p>
        <p>{secondParagraph}</p>
      </div>
    </section>
  );
}

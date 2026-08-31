const SELECTION_POINTS: readonly string[] = [
  "Selection is local client state, kept out of the URL.",
  "It resets whenever the search, filters, sort, or page changes — switching between list and grid view does not reset it.",
  "Select-all is scoped to the issues visible on the current page.",
  "A successful bulk status update applies locally, without a full data refetch — nothing is persisted server-side.",
  "A failed update leaves the current selection in place so it can be retried.",
];

export function SelectionException() {
  return (
    <section
      aria-labelledby="selection-exception-heading"
      className="mt-12 border-t border-border pt-8"
    >
      <h2
        id="selection-exception-heading"
        className="text-body font-bold text-foreground"
      >
        Selection is a deliberate exception
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        Issues is the only example with row selection, and it intentionally
        breaks from the URL-first rule above.
      </p>
      <ul className="mt-3 flex max-w-2xl flex-col gap-1.5 text-body-sm text-muted-foreground">
        {SELECTION_POINTS.map((text) => (
          <li key={text} className="flex gap-2">
            <span
              aria-hidden="true"
              className="mt-[7px] size-1 shrink-0 rounded-full bg-muted-foreground"
            />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}

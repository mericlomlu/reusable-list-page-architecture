const PIPELINE_STEPS: readonly string[] = [
  "Parse and normalize URL state",
  "Search and filter records",
  "Sort the filtered set",
  "Paginate the sorted set",
  "Return records and pagination metadata",
  "Redirect when the requested page exceeds the valid range",
];

export function PipelineSteps() {
  return (
    <section aria-labelledby="pipeline-heading" className="mt-10">
      <h2 id="pipeline-heading" className="text-lg font-bold text-foreground">
        Data-processing pipeline
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        Each page-owned query service runs the parsed query through the same six
        steps, in order, whether it's called from a Server Component or a Route
        Handler.
      </p>

      <ol className="mt-5 flex flex-col divide-y divide-border rounded-lg border border-border bg-card lg:flex-row lg:divide-x lg:divide-y-0">
        {PIPELINE_STEPS.map((step, index) => (
          <li key={step} className="flex flex-1 flex-col gap-1.5 px-4 py-4">
            <span
              aria-hidden="true"
              className="font-mono text-label font-bold text-primary"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-body-sm text-foreground">{step}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

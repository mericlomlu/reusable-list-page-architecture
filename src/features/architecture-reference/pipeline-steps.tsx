const PIPELINE_STEPS: readonly string[] = [
  "Parse and normalize URL state",
  "Search and filter records",
  "Sort the filtered set",
  "Clamp the requested page to a valid range",
  "Paginate the sorted set and return the served page",
  "Compare the served page to the requested page, then redirect if they differ",
];

export function PipelineSteps() {
  return (
    <section aria-labelledby="pipeline-heading" className="mt-10">
      <h2 id="pipeline-heading" className="text-lg font-bold text-foreground">
        Data-processing pipeline
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        A page request runs through six steps, in order. The middle four run
        inside the page-owned query service — shared by the matching Route
        Handler — and only the page performs the final step, comparing the
        served page to the requested one and redirecting when they differ.
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

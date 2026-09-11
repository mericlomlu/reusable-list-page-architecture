import { useTranslations } from "next-intl";

export function PipelineSteps() {
  const t = useTranslations("reference.architecture.pipelineSteps");
  const steps = t.raw("steps") as readonly string[];

  return (
    <section aria-labelledby="pipeline-heading" className="mt-10">
      <h2 id="pipeline-heading" className="text-lg font-bold text-foreground">
        {t("heading")}
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {t("description")}
      </p>

      <ol className="mt-5 flex flex-col divide-y divide-border rounded-lg border border-border bg-card lg:flex-row lg:divide-x lg:divide-y-0">
        {steps.map((step, index) => (
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

import { useTranslations } from "next-intl";
import { Fragment } from "react";
import { FlowConnector } from "@/features/architecture-reference/flow-connector";
import { FlowNode } from "@/features/architecture-reference/flow-node";

interface FlowStep {
  readonly label: string;
  readonly description: string;
}

interface FlowRowProps {
  steps: readonly FlowStep[];
  muted?: boolean;
}

function FlowRow({ steps, muted = false }: FlowRowProps) {
  return (
    <ol className="flex flex-col lg:flex-row lg:items-stretch">
      {steps.map((step, index) => (
        <Fragment key={step.label}>
          <li className="flex flex-1">
            <FlowNode
              label={step.label}
              description={step.description}
              emphasis={index === 0}
              muted={muted}
              className="w-full"
            />
          </li>
          {index < steps.length - 1 ? <FlowConnector /> : null}
        </Fragment>
      ))}
    </ol>
  );
}

export function PrimaryFlowDiagram() {
  const t = useTranslations("reference.architecture.primaryFlow");
  const serverFlow = t.raw("serverFlow") as readonly FlowStep[];
  const clientFlow = t.raw("clientFlow") as readonly FlowStep[];
  const annotations = t.raw("annotations") as readonly string[];

  return (
    <section
      aria-labelledby="primary-flow-heading"
      className="mt-10 first:mt-0"
    >
      <h2
        id="primary-flow-heading"
        className="text-lg font-bold text-foreground"
      >
        {t("heading")}
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        {t.rich("description", {
          code: (chunks) => <span className="font-mono">{chunks}</span>,
        })}
      </p>

      <div className="mt-5">
        <FlowRow steps={serverFlow} />
      </div>

      <div className="mt-6 rounded-md border border-dashed border-border px-4 py-4 lg:max-w-xl">
        <p className="mb-3 font-mono text-label font-bold tracking-wide text-muted-foreground uppercase">
          {t("clientPathLabel")}
        </p>
        <FlowRow steps={clientFlow} muted />
        <p className="mt-3 text-caption text-muted-foreground">
          {t.rich("feedsBack", {
            code: (chunks) => (
              <span className="font-mono text-foreground">{chunks}</span>
            ),
          })}
        </p>
      </div>

      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {annotations.map((text) => (
          <li
            key={text}
            className="flex gap-2 text-body-sm text-muted-foreground"
          >
            <span
              aria-hidden="true"
              className="mt-[7px] size-1 shrink-0 rounded-full bg-primary"
            />
            {text}
          </li>
        ))}
      </ul>
    </section>
  );
}

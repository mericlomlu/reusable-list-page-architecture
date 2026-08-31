import { Fragment } from "react";
import { FlowConnector } from "@/features/architecture-reference/flow-connector";
import { FlowNode } from "@/features/architecture-reference/flow-node";

interface FlowStep {
  readonly label: string;
  readonly description: string;
}

const SERVER_FLOW: readonly FlowStep[] = [
  {
    label: "URL Search Params",
    description:
      "Search, filters, sort, view, and page all live in the query string.",
  },
  {
    label: "Shared Query Parser",
    description:
      "parseListQuery() turns raw params into one typed, defaulted query object.",
  },
  {
    label: "Page-Owned Query Service",
    description:
      "Each example's own query-service.ts filters, sorts, and paginates its records.",
  },
  {
    label: "Server-Rendered Results",
    description:
      "The Server Component renders the records, pagination links, and active-filter links.",
  },
];

const CLIENT_FLOW: readonly FlowStep[] = [
  {
    label: "Search / Filters / Sort / View",
    description: "The page-owned toolbar reads the current query from the URL.",
  },
  {
    label: "useListQueryState",
    description:
      "Builds the next query string from that same parser and config.",
  },
  {
    label: "Updated URL",
    description:
      "Navigating to it re-renders the server flow above with the new query.",
  },
];

const ANNOTATIONS: readonly string[] = [
  "URL is the shareable source of truth for the whole list.",
  "The same query config is used by the page, the Route Handler, and the client toolbar.",
  "Search replaces the current URL entry; filters, sort, view, and pagination each push a new, navigable one.",
  "Filtering always runs before sorting, and sorting always runs before pagination.",
];

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
  return (
    <section
      aria-labelledby="primary-flow-heading"
      className="mt-10 first:mt-0"
    >
      <h2
        id="primary-flow-heading"
        className="text-lg font-bold text-foreground"
      >
        Request-to-render flow
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        An example page (<span className="font-mono">page.tsx</span>) pulls its
        list state from the URL and pushes it through the same two steps below
        before rendering results on the server.
      </p>

      <div className="mt-5">
        <FlowRow steps={SERVER_FLOW} />
      </div>

      <div className="mt-6 rounded-md border border-dashed border-border px-4 py-4 lg:max-w-xl">
        <p className="mb-3 font-mono text-label font-bold tracking-wide text-muted-foreground uppercase">
          Client interaction path
        </p>
        <FlowRow steps={CLIENT_FLOW} muted />
        <p className="mt-3 text-caption text-muted-foreground">
          Feeds back into{" "}
          <span className="font-mono text-foreground">URL Search Params</span>{" "}
          at the top of this diagram.
        </p>
      </div>

      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {ANNOTATIONS.map((text) => (
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

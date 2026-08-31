import { ChevronDownIcon } from "@/components/icons/list-icons";
import { FlowNode } from "@/features/architecture-reference/flow-node";

export function ApiParityDiagram() {
  return (
    <section aria-labelledby="api-parity-heading" className="mt-10">
      <h2 id="api-parity-heading" className="text-lg font-bold text-foreground">
        API parity
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        An example page and its mock Route Handler are two entry points into the
        same query logic, not two independent implementations of it.
      </p>

      <div className="mt-5 max-w-xl">
        <div className="grid grid-cols-2 gap-4">
          <FlowNode label="page.tsx" description="Server Component" />
          <FlowNode label="route.ts" description="Route Handler" />
        </div>
        <div aria-hidden="true" className="grid grid-cols-2">
          <div className="flex justify-center py-1">
            <ChevronDownIcon className="size-4 text-primary" />
          </div>
          <div className="flex justify-center py-1">
            <ChevronDownIcon className="size-4 text-primary" />
          </div>
        </div>
        <FlowNode
          label="query-service.ts"
          description="Filters, sorts, and paginates the mock dataset"
          emphasis
        />
      </div>

      <p className="mt-4 max-w-2xl text-body-sm text-foreground">
        The page does not fetch its own Route Handler. Both entry points reuse
        the same domain query function directly.
      </p>
    </section>
  );
}

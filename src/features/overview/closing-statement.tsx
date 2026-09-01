import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ClosingStatement() {
  return (
    <section aria-labelledby="closing-heading" className="mt-10">
      <div aria-hidden="true" className="mb-8 h-px bg-border" />
      <h2 id="closing-heading" className="text-lg font-bold text-foreground">
        Built to demonstrate engineering decisions, not just screens.
      </h2>
      <p className="mt-2.5 max-w-2xl text-body-sm text-muted-foreground">
        The mock data and Route Handlers keep the project self-contained. The
        reusable boundaries, accessible interactions, responsive behavior, and
        explicit trade-offs are the actual product being demonstrated.
      </p>
      <Link
        href="/examples/components"
        className={cn(
          "mt-5",
          buttonVariants({ variant: "default", size: "default" }),
        )}
      >
        Start with Components
      </Link>
    </section>
  );
}

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const TECH_STACK = "Next.js · React · TypeScript · Tailwind CSS · shadcn/ui";

export function Hero() {
  return (
    <header className="mb-8 flex flex-col gap-4">
      <p className="font-mono text-eyebrow text-muted-foreground uppercase tracking-wide">
        Reusable List Page Architecture
      </p>
      <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
        One list-page system. Four distinct product surfaces.
      </h1>
      <p className="max-w-2xl text-base text-muted-foreground">
        An interactive showcase of URL-driven search, filtering, sorting,
        pagination, view switching, selection, bulk actions, and explicit system
        states—built from one reusable Next.js architecture.
      </p>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <Link
          href="/examples/components"
          className={cn(buttonVariants({ variant: "default", size: "lg" }))}
        >
          Explore examples
        </Link>
        <Link
          href="/reference/architecture"
          className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
        >
          Read the architecture
        </Link>
      </div>

      <p className="mt-1 font-mono text-caption text-muted-foreground">
        {TECH_STACK}
      </p>
    </header>
  );
}

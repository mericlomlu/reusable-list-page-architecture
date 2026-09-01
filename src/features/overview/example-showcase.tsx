import {
  ComponentsIcon,
  DeploymentsIcon,
  IssuesIcon,
  PackagesIcon,
} from "@/components/icons/nav-icons";
import { LinkRecord } from "@/features/overview/link-record";

const EXAMPLES = [
  {
    key: "components",
    icon: ComponentsIcon,
    title: "Components",
    description:
      "A component catalog with multi-value framework filtering, category and status filters, sorting, pagination, and list/grid views.",
    tags: ["Multi-select filters", "List and grid", "Active filters"],
    linkLabel: "Open Components",
    href: "/examples/components",
  },
  {
    key: "issues",
    icon: IssuesIcon,
    title: "Issues",
    description:
      "An issue tracker that extends the shared foundation with semantic table rendering, row selection, select-all, and demo-only bulk status actions.",
    tags: ["Row selection", "Bulk actions", "Failure recovery"],
    linkLabel: "Open Issues",
    href: "/examples/issues",
  },
  {
    key: "deployments",
    icon: DeploymentsIcon,
    title: "Deployments",
    description:
      "A deployment history with environment, branch, status, and date-range filtering plus domain-specific status and relative-time presentation.",
    tags: ["Date range", "Status filters", "Domain formatting"],
    linkLabel: "Open Deployments",
    href: "/examples/deployments",
  },
  {
    key: "packages",
    icon: PackagesIcon,
    title: "Packages",
    description:
      "A dependency inventory with package-specific version ordering, dependency-type filtering, update status, and reusable list/grid rendering.",
    tags: ["Version sorting", "Update status", "List and grid"],
    linkLabel: "Open Packages",
    href: "/examples/packages",
  },
] as const;

export function ExampleShowcase() {
  return (
    <section aria-labelledby="examples-heading" className="mt-10">
      <h2 id="examples-heading" className="text-lg font-bold text-foreground">
        Four examples, one foundation
      </h2>
      <p className="mt-1.5 max-w-2xl text-body-sm text-muted-foreground">
        Each route reuses the same list-page architecture while keeping its
        domain decisions local.
      </p>

      <ul className="mt-5 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {EXAMPLES.map(({ key, ...example }) => (
          <LinkRecord key={key} {...example} />
        ))}
      </ul>
    </section>
  );
}

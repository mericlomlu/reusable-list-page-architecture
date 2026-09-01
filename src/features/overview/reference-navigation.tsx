import {
  ArchitectureIcon,
  BuildingBlocksIcon,
  TemplatesIcon,
} from "@/components/icons/nav-icons";
import { LinkRecord } from "@/features/overview/link-record";

const REFERENCE_PAGES = [
  {
    key: "templates",
    icon: TemplatesIcon,
    title: "Templates",
    description:
      "See how the primitives compose into progressively richer list-page patterns.",
    linkLabel: "View Templates",
    href: "/reference/templates",
  },
  {
    key: "building-blocks",
    icon: BuildingBlocksIcon,
    title: "Building Blocks",
    description:
      "Inspect the shared components, hooks, functions, types, boundaries, and real consumers.",
    linkLabel: "View Building Blocks",
    href: "/reference/building-blocks",
  },
  {
    key: "architecture",
    icon: ArchitectureIcon,
    title: "Architecture",
    description:
      "Follow the request-to-render flow, server/client responsibilities, query pipeline, and selection exception.",
    linkLabel: "View Architecture",
    href: "/reference/architecture",
  },
] as const;

export function ReferenceNavigation() {
  return (
    <section aria-labelledby="reference-nav-heading" className="mt-10">
      <h2
        id="reference-nav-heading"
        className="text-lg font-bold text-foreground"
      >
        Read the system from three angles
      </h2>

      <ul className="mt-5 flex flex-col divide-y divide-border rounded-lg border border-border bg-card">
        {REFERENCE_PAGES.map(({ key, ...entry }) => (
          <LinkRecord key={key} {...entry} />
        ))}
      </ul>
    </section>
  );
}

import {
  ArchitectureIcon,
  BuildingBlocksIcon,
  ComponentsIcon,
  DeploymentsIcon,
  IssuesIcon,
  type NavIconComponent,
  OverviewIcon,
  PackagesIcon,
  TemplatesIcon,
} from "@/components/icons/nav-icons";

export interface NavItem {
  /** Key into the "nav" message namespace's `items` object. */
  readonly labelKey: string;
  readonly href: string;
  readonly icon: NavIconComponent;
}

export interface NavGroup {
  readonly id: string;
  /** Key into the "nav" message namespace's `groups` object. */
  readonly labelKey?: string;
  readonly items: readonly NavItem[];
}

export const navigationConfig: readonly NavGroup[] = [
  {
    id: "overview",
    items: [{ labelKey: "items.overview", href: "/", icon: OverviewIcon }],
  },
  {
    id: "examples",
    labelKey: "groups.examples",
    items: [
      {
        labelKey: "items.components",
        href: "/examples/components",
        icon: ComponentsIcon,
      },
      { labelKey: "items.issues", href: "/examples/issues", icon: IssuesIcon },
      {
        labelKey: "items.deployments",
        href: "/examples/deployments",
        icon: DeploymentsIcon,
      },
      {
        labelKey: "items.packages",
        href: "/examples/packages",
        icon: PackagesIcon,
      },
    ],
  },
  {
    id: "reference",
    labelKey: "groups.reference",
    items: [
      {
        labelKey: "items.templates",
        href: "/reference/templates",
        icon: TemplatesIcon,
      },
      {
        labelKey: "items.buildingBlocks",
        href: "/reference/building-blocks",
        icon: BuildingBlocksIcon,
      },
      {
        labelKey: "items.architecture",
        href: "/reference/architecture",
        icon: ArchitectureIcon,
      },
    ],
  },
];

export function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

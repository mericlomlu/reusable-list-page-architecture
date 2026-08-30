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
  readonly label: string;
  readonly href: string;
  readonly icon: NavIconComponent;
}

export interface NavGroup {
  readonly id: string;
  readonly label?: string;
  readonly items: readonly NavItem[];
}

export const navigationConfig: readonly NavGroup[] = [
  {
    id: "overview",
    items: [{ label: "Overview", href: "/", icon: OverviewIcon }],
  },
  {
    id: "examples",
    label: "Examples",
    items: [
      {
        label: "Components",
        href: "/examples/components",
        icon: ComponentsIcon,
      },
      { label: "Issues", href: "/examples/issues", icon: IssuesIcon },
      {
        label: "Deployments",
        href: "/examples/deployments",
        icon: DeploymentsIcon,
      },
      { label: "Packages", href: "/examples/packages", icon: PackagesIcon },
    ],
  },
  {
    id: "reference",
    label: "Reference",
    items: [
      { label: "Templates", href: "/reference/templates", icon: TemplatesIcon },
      {
        label: "Building Blocks",
        href: "/reference/building-blocks",
        icon: BuildingBlocksIcon,
      },
      {
        label: "Architecture",
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

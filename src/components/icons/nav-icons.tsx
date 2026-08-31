import type { SVGProps } from "react";
import { createStrokeIcon, type IconComponent } from "@/components/icons/icon";

export type NavIconComponent = IconComponent;

export const OverviewIcon = createStrokeIcon(
  <>
    <rect x={2} y={2} width={12} height={12} rx={2} />
    <path d="M2 6h12" />
  </>,
);

export const ComponentsIcon = createStrokeIcon(
  <>
    <rect x={2} y={2} width={5} height={12} rx={1} />
    <rect x={9} y={2} width={5} height={5} rx={1} />
    <rect x={9} y={9} width={5} height={5} rx={1} />
  </>,
);

export const IssuesIcon = createStrokeIcon(
  <>
    <circle cx={8} cy={8} r={6} />
    <path d="M8 5v4" />
    <circle cx={8} cy={11.2} r={0.4} fill="currentColor" stroke="none" />
  </>,
);

export const DeploymentsIcon = createStrokeIcon(
  <>
    <path d="M8 2v8M8 2l-2.6 2.6M8 2l2.6 2.6" />
    <rect x={3} y={11} width={10} height={3} rx={1} />
  </>,
);

export const PackagesIcon = createStrokeIcon(
  <>
    <path d="M8 2l6 3.2v5.6L8 14 2 10.8V5.2z" />
    <path d="M2 5.2L8 8l6-2.8M8 8v6" />
  </>,
);

export const TemplatesIcon = createStrokeIcon(
  <>
    <rect x={2} y={2} width={12} height={12} rx={1.5} />
    <path d="M2 6h12M7.5 6v8" />
  </>,
);

export const BuildingBlocksIcon = createStrokeIcon(
  <>
    <rect x={2} y={2} width={5} height={5} rx={1} />
    <rect x={9} y={2} width={5} height={5} rx={1} />
    <rect x={2} y={9} width={5} height={5} rx={1} />
    <rect x={9} y={9} width={5} height={5} rx={1} />
  </>,
);

export const ArchitectureIcon = createStrokeIcon(
  <>
    <circle cx={4} cy={4} r={1.8} />
    <circle cx={12} cy={4} r={1.8} />
    <circle cx={8} cy={12} r={1.8} />
    <path d="M4 5.8L8 10.2M12 5.8L8 10.2" />
  </>,
);

export const MenuIcon = createStrokeIcon(
  <path d="M2 4.5h12M2 8h12M2 11.5h12" />,
);

export const CloseIcon = createStrokeIcon(
  <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />,
);

export function LogoMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" {...props}>
      <rect x={2} y={3} width={16} height={3} rx={1.5} fill="currentColor" />
      <rect
        x={2}
        y={8.5}
        width={16}
        height={3}
        rx={1.5}
        className="fill-primary"
      />
      <rect x={2} y={14} width={10} height={3} rx={1.5} fill="currentColor" />
    </svg>
  );
}

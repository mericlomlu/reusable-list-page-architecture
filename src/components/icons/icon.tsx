import type { ReactElement, SVGProps } from "react";

export type IconComponent = (props: SVGProps<SVGSVGElement>) => ReactElement;

export function createStrokeIcon(
  paths: ReactElement,
  viewBox = "0 0 16 16",
): IconComponent {
  return function StrokeIcon(props: SVGProps<SVGSVGElement>) {
    return (
      <svg
        viewBox={viewBox}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {paths}
      </svg>
    );
  };
}

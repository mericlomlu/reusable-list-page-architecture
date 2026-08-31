import { createStrokeIcon } from "@/components/icons/icon";

export const SearchIcon = createStrokeIcon(
  <>
    <circle cx={7} cy={7} r={5} />
    <path d="M11 11l3.5 3.5" />
  </>,
);

export const ChevronDownIcon = createStrokeIcon(<path d="M4 6l4 4 4-4" />);

export const ChevronRightIcon = createStrokeIcon(
  <path d="M6 3.5L10 8l-4 4.5" />,
);

export const CheckIcon = createStrokeIcon(<path d="M3.5 8.2l3 3L12.5 5" />);

export const MinusIcon = createStrokeIcon(<path d="M3.5 8h9" />);

export const SortIcon = createStrokeIcon(
  <path d="M8 3v10M8 13l-3-3M8 13l3-3" />,
);

export const ListViewIcon = createStrokeIcon(
  <path d="M2 4h12M2 8h12M2 12h12" />,
);

export const GridViewIcon = createStrokeIcon(
  <>
    <rect x={2} y={2} width={5} height={5} />
    <rect x={9} y={2} width={5} height={5} />
    <rect x={2} y={9} width={5} height={5} />
    <rect x={9} y={9} width={5} height={5} />
  </>,
);

export const MoreHorizontalIcon = createStrokeIcon(
  <>
    <circle cx={4} cy={8} r={0.6} fill="currentColor" stroke="none" />
    <circle cx={8} cy={8} r={0.6} fill="currentColor" stroke="none" />
    <circle cx={12} cy={8} r={0.6} fill="currentColor" stroke="none" />
  </>,
);

export const ErrorIcon = createStrokeIcon(
  <>
    <circle cx={8} cy={8} r={6} />
    <path d="M8 5.5v3.5M8 11.2v.2" />
  </>,
);

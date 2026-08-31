import {
  ChevronDownIcon,
  ChevronRightIcon,
} from "@/components/icons/list-icons";

/**
 * Decorative connector between two {@link FlowNode}s. Rendered as its own
 * `aria-hidden` list item inside the diagram's `<ol>` so assistive tech sees
 * only the real node sequence, not the arrows joining them.
 */
export function FlowConnector() {
  return (
    <li
      aria-hidden="true"
      className="flex shrink-0 flex-col items-center justify-center gap-0.5 py-0.5 lg:flex-row lg:gap-1 lg:px-1 lg:py-0"
    >
      <span className="h-3 w-px bg-border lg:h-px lg:w-3" />
      <ChevronDownIcon className="size-3 shrink-0 text-primary lg:hidden" />
      <ChevronRightIcon className="hidden size-3 shrink-0 text-primary lg:block" />
      <span className="h-3 w-px bg-border lg:h-px lg:w-3" />
    </li>
  );
}

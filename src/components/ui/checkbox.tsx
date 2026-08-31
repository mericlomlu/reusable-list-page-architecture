"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { CheckIcon, MinusIcon } from "@/components/icons/list-icons";
import { cn } from "@/lib/utils";

const CHECKBOX_LAYOUT_CLASS =
  "peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none after:absolute after:-inset-x-3 after:-inset-y-2";
const CHECKBOX_FIELD_LABEL_CLASS =
  "group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input group-has-[:focus-visible]/field-label:data-checked:border-primary";
const CHECKBOX_STATE_CLASS =
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50";
const CHECKBOX_INVALID_CLASS =
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40";
const CHECKBOX_CHECKED_CLASS =
  "dark:bg-input/30 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground data-indeterminate:border-primary data-indeterminate:bg-primary data-indeterminate:text-primary-foreground dark:data-checked:bg-primary dark:data-indeterminate:bg-primary";

function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        CHECKBOX_LAYOUT_CLASS,
        CHECKBOX_FIELD_LABEL_CLASS,
        CHECKBOX_STATE_CLASS,
        CHECKBOX_INVALID_CLASS,
        CHECKBOX_CHECKED_CLASS,
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="group/indicator grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon className="group-data-indeterminate/indicator:hidden" />
        <MinusIcon className="hidden group-data-indeterminate/indicator:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };

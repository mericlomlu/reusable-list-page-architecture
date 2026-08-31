import { Input as InputPrimitive } from "@base-ui/react/input";
import type * as React from "react";

import { cn } from "@/lib/utils";

const INPUT_LAYOUT_CLASS =
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none md:text-sm dark:bg-input/30";
const INPUT_FILE_CLASS =
  "file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground";
const INPUT_FOCUS_CLASS =
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";
const INPUT_DISABLED_CLASS =
  "disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:disabled:bg-input/80";
const INPUT_INVALID_CLASS =
  "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        INPUT_LAYOUT_CLASS,
        INPUT_FILE_CLASS,
        INPUT_FOCUS_CLASS,
        INPUT_DISABLED_CLASS,
        INPUT_INVALID_CLASS,
        className,
      )}
      {...props}
    />
  );
}

export { Input };

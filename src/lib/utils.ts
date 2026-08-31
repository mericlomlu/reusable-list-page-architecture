import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge's default config only recognizes the built-in font-size
// scale (text-xs, text-sm, ...). Without this, it misclassifies our custom
// text-* theme tokens (globals.css @theme) as text-color utilities and
// drops them when combined with an actual text-{color} class.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "wordmark",
        "eyebrow",
        "label",
        "subtitle",
        "record-title",
        "body",
        "body-sm",
        "caption",
        "meta",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

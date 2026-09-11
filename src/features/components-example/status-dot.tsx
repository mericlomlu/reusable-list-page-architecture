import { useTranslations } from "next-intl";
import type { ComponentStatus } from "@/features/components-example/types";
import { cn } from "@/lib/utils";

const STATUS_DOT_CLASS: Record<ComponentStatus, string> = {
  stable: "bg-success",
  beta: "bg-warning",
  deprecated: "bg-destructive",
};

export function StatusDot({ status }: { status: ComponentStatus }) {
  const t = useTranslations("componentsExample.filters.status");

  return (
    <span className="inline-flex items-center gap-1.5 text-caption font-semibold text-foreground">
      <span
        aria-hidden="true"
        className={cn("size-[7px] rounded-full", STATUS_DOT_CLASS[status])}
      />
      {t(status)}
    </span>
  );
}

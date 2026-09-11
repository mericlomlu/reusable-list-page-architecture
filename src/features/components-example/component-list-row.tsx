import { useLocale, useTranslations } from "next-intl";
import { COMPONENT_LIST_GRID_COLUMNS } from "@/features/components-example/config";
import { StatusDot } from "@/features/components-example/status-dot";
import type { ComponentRecord } from "@/features/components-example/types";
import { formatRelativeTime } from "@/features/list-page/format-relative-time";

export function ComponentListRow({ record }: { record: ComponentRecord }) {
  const locale = useLocale();
  const t = useTranslations("componentsExample");

  return (
    <li
      className="grid items-center gap-4 border-t border-border bg-card px-[18px] py-4 first:border-t-0"
      style={{ gridTemplateColumns: COMPONENT_LIST_GRID_COLUMNS }}
    >
      <p className="text-record-title font-bold text-foreground">
        {record.name}
      </p>
      <p className="truncate text-body-sm text-muted-foreground">
        {record.description}
      </p>
      <StatusDot status={record.status} />
      <p className="font-mono text-xs text-muted-foreground">
        <span className="sr-only">{t("card.frameworkSrOnly")} </span>
        {t(`filters.framework.${record.framework}`)}
      </p>
      <p className="font-mono text-xs text-muted-foreground">
        <span className="sr-only">{t("card.updatedSrOnly")} </span>
        {formatRelativeTime(record.updatedAt, locale)}
      </p>
    </li>
  );
}

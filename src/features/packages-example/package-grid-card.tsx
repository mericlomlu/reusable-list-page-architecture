import { useTranslations } from "next-intl";
import { PackageStatusDot } from "@/features/packages-example/package-status-dot";
import type { PackageRecord } from "@/features/packages-example/types";

export function PackageGridCard({ record }: { record: PackageRecord }) {
  const t = useTranslations("packagesExample.card");

  return (
    <li className="flex flex-col gap-2.5 rounded-lg border border-border bg-card p-[18px]">
      <div className="flex items-start justify-between gap-3">
        <p className="truncate font-mono text-record-title font-bold text-foreground">
          {record.name}
        </p>
        <p className="shrink-0 font-mono text-meta text-muted-foreground">
          <span className="sr-only">{t("versionSrOnly")} </span>
          {record.version}
        </p>
      </div>
      <p className="text-body-sm text-muted-foreground">{record.description}</p>
      <div className="mt-1 flex items-center justify-between">
        <PackageStatusDot status={record.updateStatus} />
        <p className="text-body-sm text-muted-foreground">
          {t(`dependencyType.${record.dependencyType}`)}
        </p>
      </div>
    </li>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { Checkbox } from "@/components/ui/checkbox";
import { IssueRow } from "@/features/issues-example/issue-row";
import type { IssueRecord } from "@/features/issues-example/types";

interface IssueTableProps {
  records: readonly IssueRecord[];
  isSelected: (id: string) => boolean;
  onToggle: (id: string) => void;
  allSelected: boolean;
  someSelected: boolean;
  onToggleAll: () => void;
  disabled?: boolean;
}

export function IssueTable({
  records,
  isSelected,
  onToggle,
  allSelected,
  someSelected,
  onToggleAll,
  disabled = false,
}: IssueTableProps) {
  const t = useTranslations("issuesExample");

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full min-w-[760px] border-collapse text-left">
        <caption className="sr-only">{t("results.listAriaLabel")}</caption>
        <thead>
          <tr className="border-b border-border bg-muted/50 font-mono text-label font-bold tracking-wide text-muted-foreground uppercase">
            <th scope="col" className="w-11 px-3 py-2.5">
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={onToggleAll}
                disabled={disabled}
                aria-label={
                  allSelected
                    ? t("table.deselectAllOnPage")
                    : t("table.selectAllOnPage")
                }
              />
            </th>
            <th scope="col" className="px-3 py-2.5">
              {t("table.columns.issue")}
            </th>
            <th scope="col" className="w-28 px-3 py-2.5">
              {t("table.columns.status")}
            </th>
            <th scope="col" className="w-24 px-3 py-2.5">
              {t("table.columns.priority")}
            </th>
            <th scope="col" className="w-28 px-3 py-2.5">
              {t("table.columns.label")}
            </th>
            <th scope="col" className="w-16 px-3 py-2.5">
              {t("table.columns.assignee")}
            </th>
            <th scope="col" className="w-24 px-3 py-2.5">
              {t("table.columns.updated")}
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <IssueRow
              key={record.id}
              record={record}
              selected={isSelected(record.id)}
              onToggle={() => onToggle(record.id)}
              disabled={disabled}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

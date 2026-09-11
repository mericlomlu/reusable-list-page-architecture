import { useTranslations } from "next-intl";
import type { IssueAssignee } from "@/features/issues-example/types";

export function AssigneeAvatar({
  assignee,
}: {
  assignee: IssueAssignee | null;
}) {
  const t = useTranslations("issuesExample.assignee");

  if (!assignee) {
    return (
      <span className="inline-flex size-6 items-center justify-center rounded-full border border-dashed border-border text-[9.5px] font-semibold text-muted-foreground">
        <span className="sr-only">{t("unassignedSrOnly")}</span>
        <span aria-hidden="true">—</span>
      </span>
    );
  }

  return (
    <span
      title={assignee.name}
      className="inline-flex size-6 items-center justify-center rounded-full bg-secondary text-[10.5px] font-bold text-secondary-foreground"
    >
      <span className="sr-only">{t("assigneeSrOnly")} </span>
      {assignee.initials}
    </span>
  );
}

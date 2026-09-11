import { useTranslations } from "next-intl";
import {
  ISSUE_LIST_SKELETON_COLUMN_COUNT,
  ISSUE_LIST_SKELETON_GRID_COLUMNS,
} from "@/features/issues-example/config";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListSkeleton } from "@/features/list-page/list-states";

export default function IssuesLoading() {
  const tMeta = useTranslations("metadata.issuesPage");
  const t = useTranslations("issuesExample");

  return (
    <ListPageShell
      eyebrow={tMeta("eyebrow")}
      title={tMeta("title")}
      description={tMeta("description")}
      toolbar={
        <div
          aria-hidden="true"
          className="h-9 w-full rounded-md bg-muted motion-safe:animate-pulse"
        />
      }
    >
      <ListSkeleton
        gridTemplateColumns={ISSUE_LIST_SKELETON_GRID_COLUMNS}
        columnCount={ISSUE_LIST_SKELETON_COLUMN_COUNT}
        label={t("loadingLabel")}
      />
    </ListPageShell>
  );
}

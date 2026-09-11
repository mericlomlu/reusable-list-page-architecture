import { useTranslations } from "next-intl";
import {
  COMPONENT_LIST_COLUMN_COUNT,
  COMPONENT_LIST_GRID_COLUMNS,
} from "@/features/components-example/config";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListSkeleton } from "@/features/list-page/list-states";

export default function ComponentsLoading() {
  const tMeta = useTranslations("metadata.componentsPage");
  const t = useTranslations("componentsExample");

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
        gridTemplateColumns={COMPONENT_LIST_GRID_COLUMNS}
        columnCount={COMPONENT_LIST_COLUMN_COUNT}
        label={t("loadingLabel")}
      />
    </ListPageShell>
  );
}

import { useTranslations } from "next-intl";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListSkeleton } from "@/features/list-page/list-states";
import {
  PACKAGE_LIST_COLUMN_COUNT,
  PACKAGE_LIST_GRID_COLUMNS,
} from "@/features/packages-example/config";

export default function PackagesLoading() {
  const tMeta = useTranslations("metadata.packagesPage");
  const t = useTranslations("packagesExample");

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
        gridTemplateColumns={PACKAGE_LIST_GRID_COLUMNS}
        columnCount={PACKAGE_LIST_COLUMN_COUNT}
        label={t("loadingLabel")}
      />
    </ListPageShell>
  );
}

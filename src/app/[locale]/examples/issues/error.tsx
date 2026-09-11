"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListErrorState } from "@/features/list-page/list-states";
import { useDemoErrorRecovery } from "@/features/list-page/use-demo-error-recovery";

export default function IssuesError({
  reset,
  retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  retry: () => void;
}) {
  const { handleRetry } = useDemoErrorRecovery({ reset, retry });
  const tMeta = useTranslations("metadata.issuesPage");
  const t = useTranslations("issuesExample");

  return (
    <ListPageShell
      eyebrow={tMeta("eyebrow")}
      title={tMeta("title")}
      description={tMeta("description")}
      toolbar={<div aria-hidden="true" className="h-9" />}
    >
      <ListErrorState
        title={t("error.title")}
        description={t("error.description")}
        action={<Button onClick={handleRetry}>{t("error.retry")}</Button>}
      />
    </ListPageShell>
  );
}

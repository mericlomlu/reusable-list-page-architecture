"use client";

import { Button } from "@/components/ui/button";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListErrorState } from "@/features/list-page/list-states";
import { useDemoErrorRecovery } from "@/features/list-page/use-demo-error-recovery";

export default function PackagesError({
  reset,
  retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  retry: () => void;
}) {
  const { handleRetry } = useDemoErrorRecovery({ reset, retry });

  return (
    <ListPageShell
      eyebrow="Examples / Packages"
      title="Packages"
      description="Dependencies tracked across the workspace, with update status surfaced before it becomes a problem."
      toolbar={<div aria-hidden="true" className="h-9" />}
    >
      <ListErrorState
        title="Couldn't load packages"
        description="Something went wrong while loading the package list. Try again."
        action={<Button onClick={handleRetry}>Retry</Button>}
      />
    </ListPageShell>
  );
}

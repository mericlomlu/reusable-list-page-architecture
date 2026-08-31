"use client";

import { Button } from "@/components/ui/button";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListErrorState } from "@/features/list-page/list-states";
import { useDemoErrorRecovery } from "@/features/list-page/use-demo-error-recovery";

export default function ComponentsError({
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
      eyebrow="Examples / Components"
      title="Components"
      description="Every UI primitive in the workspace's library, searchable and filterable by category, framework and status."
      toolbar={<div aria-hidden="true" className="h-9" />}
    >
      <ListErrorState
        title="Couldn't load components"
        description="Something went wrong while loading the component list. Try again."
        action={<Button onClick={handleRetry}>Retry</Button>}
      />
    </ListPageShell>
  );
}

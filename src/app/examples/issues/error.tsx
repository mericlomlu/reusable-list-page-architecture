"use client";

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

  return (
    <ListPageShell
      eyebrow="Examples / Issues"
      title="Issues"
      description="Track and triage work across the workspace. Select rows to change status on several issues at once."
      toolbar={<div aria-hidden="true" className="h-9" />}
    >
      <ListErrorState
        title="Couldn't load issues"
        description="Something went wrong while loading the issue list. Try again."
        action={<Button onClick={handleRetry}>Retry</Button>}
      />
    </ListPageShell>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListErrorState } from "@/features/list-page/list-states";
import { useDemoErrorRecovery } from "@/features/list-page/use-demo-error-recovery";

export default function DeploymentsError({
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
      eyebrow="Examples / Deployments"
      title="Deployments"
      description="Every build across environments, with status shown as icon and label — never color alone."
      toolbar={<div aria-hidden="true" className="h-9" />}
    >
      <ListErrorState
        title="Couldn't load deployments"
        description="Something went wrong while loading the deployment list. Try again."
        action={<Button onClick={handleRetry}>Retry</Button>}
      />
    </ListPageShell>
  );
}

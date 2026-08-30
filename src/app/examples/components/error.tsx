"use client";

import { Button } from "@/components/ui/button";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListErrorState } from "@/features/list-page/list-states";

export default function ComponentsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ListPageShell
      eyebrow="Examples / Components"
      title="Components"
      description="Every UI primitive in the workspace's library, searchable and filterable by category, framework and status."
      toolbar={<div aria-hidden="true" className="h-9" />}
    >
      <ListErrorState
        title="Couldn't load components"
        description="The request to the component API failed. Check your connection and try again."
        action={<Button onClick={reset}>Retry</Button>}
      />
    </ListPageShell>
  );
}

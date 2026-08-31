"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ListPageShell } from "@/features/list-page/list-page-shell";
import { ListErrorState } from "@/features/list-page/list-states";

export default function ComponentsError({
  reset,
  retry,
}: {
  error: Error & { digest?: string };
  reset: () => void;
  retry: () => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSimulatedError = searchParams.get("demoState") === "error";
  const clearingSimulatedError = useRef(false);

  useEffect(() => {
    // router.replace() below already re-fetches this segment against the
    // new URL (it's dynamic on searchParams), but it only clears the query
    // string — it can't itself unmount this boundary, since Next only
    // auto-resets error boundaries on a pathname change, not a search-param
    // one. Call reset() (not retry(), which would re-fetch a second time)
    // once the URL confirms `demoState=error` is gone, rather than
    // immediately after replace(), so it re-renders against the fresh data
    // instead of racing the still-in-flight navigation.
    if (clearingSimulatedError.current && !isSimulatedError) {
      clearingSimulatedError.current = false;
      reset();
    }
  }, [isSimulatedError, reset]);

  function handleRetry() {
    if (isSimulatedError) {
      const params = new URLSearchParams(searchParams);
      params.delete("demoState");
      const queryString = params.toString();
      clearingSimulatedError.current = true;
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
      return;
    }
    // A genuine error needs the segment re-fetched, not just re-rendered —
    // reset() alone would hand back the same already-thrown output.
    retry();
  }

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

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface UseDemoErrorRecoveryOptions {
  reset: () => void;
  retry: () => void;
  demoStateParam?: string;
}

/**
 * Shared by every example's `error.tsx`. A simulated error (`?demoState=error`)
 * and a genuine thrown error need different recovery paths: clearing the query
 * param re-fetches clean data, so recovery is just removing it from the URL,
 * while a genuine error needs the segment itself re-fetched via `retry()`.
 *
 * `router.replace()` re-fetches this segment against the new URL (it's
 * dynamic on searchParams), but it only clears the query string — it can't
 * itself unmount the error boundary, since Next only auto-resets error
 * boundaries on a pathname change, not a search-param one. `reset()` (not
 * `retry()`, which would re-fetch a second time) is called once the URL
 * confirms the param is gone, rather than immediately after `replace()`, so
 * it re-renders against the fresh data instead of racing the still-in-flight
 * navigation.
 */
export function useDemoErrorRecovery({
  reset,
  retry,
  demoStateParam = "demoState",
}: UseDemoErrorRecoveryOptions): { handleRetry: () => void } {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isSimulatedError = searchParams.get(demoStateParam) === "error";
  const clearingSimulatedError = useRef(false);

  useEffect(() => {
    if (clearingSimulatedError.current && !isSimulatedError) {
      clearingSimulatedError.current = false;
      reset();
    }
  }, [isSimulatedError, reset]);

  function handleRetry() {
    if (isSimulatedError) {
      const params = new URLSearchParams(searchParams);
      params.delete(demoStateParam);
      const queryString = params.toString();
      clearingSimulatedError.current = true;
      router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
        scroll: false,
      });
      return;
    }
    retry();
  }

  return { handleRetry };
}

export type DemoState = "default" | "loading" | "empty" | "error";

const DEMO_STATES: readonly DemoState[] = [
  "default",
  "loading",
  "empty",
  "error",
];

export function isDemoState(value: unknown): value is DemoState {
  return (
    typeof value === "string" &&
    (DEMO_STATES as readonly string[]).includes(value)
  );
}

/**
 * Reads an optional demo-state query parameter (`demoState` by default)
 * mock Route Handlers expose for testing loading/empty/error UI. Not part
 * of the shareable list query state — normal URLs never carry it. Pass a
 * different `paramName` to expose a second, independent demo toggle (for
 * example a bulk-action endpoint that shouldn't share the list's own
 * `demoState`).
 */
export function parseDemoState(
  searchParams: URLSearchParams,
  paramName = "demoState",
): DemoState {
  const value = searchParams.get(paramName);
  return isDemoState(value) ? value : "default";
}

export function simulateLatency(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

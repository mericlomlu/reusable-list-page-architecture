export type DemoState = "default" | "loading" | "empty" | "error";

const DEMO_STATES: readonly DemoState[] = [
  "default",
  "loading",
  "empty",
  "error",
];

/**
 * Reads the optional `demoState` query parameter mock Route Handlers expose
 * for testing loading/empty/error UI. Not part of the shareable list query
 * state — normal URLs never carry it.
 */
export function parseDemoState(searchParams: URLSearchParams): DemoState {
  const value = searchParams.get("demoState");
  return (DEMO_STATES as readonly string[]).includes(value ?? "")
    ? (value as DemoState)
    : "default";
}

export function simulateLatency(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

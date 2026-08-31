import type { IssueStatus } from "@/features/issues-example/types";

export interface BulkUpdateStatusResult {
  readonly updatedIds: readonly string[];
}

function isBulkUpdateStatusResult(
  value: unknown,
): value is BulkUpdateStatusResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "updatedIds" in value &&
    Array.isArray((value as { updatedIds: unknown }).updatedIds) &&
    (value as { updatedIds: unknown[] }).updatedIds.every(
      (id) => typeof id === "string",
    )
  );
}

/**
 * Calls the demo-only bulk status endpoint. `simulateFailure` is a
 * client-driven override (never a shareable URL parameter) so the failure
 * state can be exercised without breaking the list's own demo states.
 */
export async function bulkUpdateIssueStatus(
  ids: readonly string[],
  status: IssueStatus,
  simulateFailure = false,
): Promise<BulkUpdateStatusResult> {
  const response = await fetch("/api/issues/bulk", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ids,
      status,
      demoState: simulateFailure ? "error" : undefined,
    }),
  });

  const body: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      body &&
      typeof body === "object" &&
      "error" in body &&
      typeof body.error === "string"
        ? body.error
        : "Failed to update issues.";
    throw new Error(message);
  }

  if (!isBulkUpdateStatusResult(body)) {
    throw new Error("Received an unexpected response while updating issues.");
  }

  return body;
}

import type { IssueStatus } from "@/features/issues-example/types";

export interface BulkUpdateStatusResult {
  readonly updatedIds: readonly string[];
}

export type BulkUpdateIssuesErrorCode =
  | "bulk_failed"
  | "invalid_request"
  | "malformed_response";

/**
 * Locale-agnostic by design: this runs outside the `[locale]` route segment
 * (the mock API route it calls has no request-scoped locale), so it carries
 * a stable reason code rather than a message. The calling Client Component
 * maps the code to translated copy where it's displayed.
 */
export class BulkUpdateIssuesError extends Error {
  readonly code: BulkUpdateIssuesErrorCode;

  constructor(code: BulkUpdateIssuesErrorCode) {
    super(code);
    this.name = "BulkUpdateIssuesError";
    this.code = code;
  }
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

function isErrorCode(value: unknown): value is BulkUpdateIssuesErrorCode {
  return (
    value === "bulk_failed" ||
    value === "invalid_request" ||
    value === "malformed_response"
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
    const code =
      body &&
      typeof body === "object" &&
      "code" in body &&
      isErrorCode(body.code)
        ? body.code
        : "bulk_failed";
    throw new BulkUpdateIssuesError(code);
  }

  if (!isBulkUpdateStatusResult(body)) {
    throw new BulkUpdateIssuesError("malformed_response");
  }

  return body;
}

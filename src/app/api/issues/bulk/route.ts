import { NextResponse } from "next/server";
import { isIssueStatus } from "@/features/issues-example/config";
import { isDemoState, simulateLatency } from "@/features/list-page/demo-state";

const BULK_LATENCY_MS = 400;

interface BulkStatusRequestBody {
  readonly ids?: unknown;
  readonly status?: unknown;
  readonly demoState?: unknown;
}

/**
 * Demo-only bulk status update. Nothing is persisted — a successful response
 * only tells the client which IDs to reflect locally until the list is
 * refetched from the unmodified mock dataset.
 */
export async function POST(request: Request) {
  const body = (await request
    .json()
    .catch(() => null)) as BulkStatusRequestBody | null;

  await simulateLatency(BULK_LATENCY_MS);

  if (isDemoState(body?.demoState) && body.demoState === "error") {
    return NextResponse.json(
      { error: "Couldn't update the selected issues. Try again." },
      { status: 500 },
    );
  }

  const ids = Array.isArray(body?.ids)
    ? body.ids.filter((id): id is string => typeof id === "string")
    : [];
  const status = typeof body?.status === "string" ? body.status : undefined;

  if (ids.length === 0 || !status || !isIssueStatus(status)) {
    return NextResponse.json(
      { error: "Select at least one issue and a valid status." },
      { status: 400 },
    );
  }

  return NextResponse.json({ updatedIds: ids });
}

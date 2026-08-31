import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { DEPLOYMENT_LIST_QUERY_CONFIG } from "@/features/deployments-example/config";
import { queryDeployments } from "@/features/deployments-example/query-service";
import { parseDemoState } from "@/features/list-page/demo-state";
import { parseListQuery } from "@/features/list-page/query-state";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const demoState = parseDemoState(searchParams);
  const query = parseListQuery(searchParams, DEPLOYMENT_LIST_QUERY_CONFIG);

  try {
    const result = await queryDeployments(query, demoState);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load deployments.",
      },
      { status: 500 },
    );
  }
}

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { parseDemoState } from "@/features/list-page/demo-state";
import { parseListQuery } from "@/features/list-page/query-state";
import { PACKAGE_LIST_QUERY_CONFIG } from "@/features/packages-example/config";
import { queryPackages } from "@/features/packages-example/query-service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const demoState = parseDemoState(searchParams);
  const query = parseListQuery(searchParams, PACKAGE_LIST_QUERY_CONFIG);

  try {
    const result = await queryPackages(query, demoState);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load packages.",
      },
      { status: 500 },
    );
  }
}

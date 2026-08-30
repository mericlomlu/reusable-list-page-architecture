import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { COMPONENT_LIST_QUERY_CONFIG } from "@/features/components-example/config";
import { queryComponents } from "@/features/components-example/query-service";
import { parseDemoState } from "@/features/list-page/demo-state";
import { parseListQuery } from "@/features/list-page/query-state";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const demoState = parseDemoState(searchParams);
  const query = parseListQuery(searchParams, COMPONENT_LIST_QUERY_CONFIG);

  try {
    const result = await queryComponents(query, demoState);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to load components.",
      },
      { status: 500 },
    );
  }
}

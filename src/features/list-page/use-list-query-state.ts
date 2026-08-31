"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import {
  buildListQueryString,
  parseListQuery,
} from "@/features/list-page/query-state";
import type {
  ListQueryConfig,
  ParsedListQuery,
  ViewMode,
} from "@/features/list-page/types";

export interface UseListQueryStateResult<
  TSortKey extends string,
  TFilterKey extends string,
> {
  readonly query: ParsedListQuery<TSortKey, TFilterKey>;
  readonly setSearch: (value: string) => void;
  readonly setSort: (value: TSortKey) => void;
  readonly setView: (value: ViewMode) => void;
  readonly setSingleFilter: (
    key: TFilterKey,
    value: string | undefined,
  ) => void;
  readonly toggleMultiFilter: (key: TFilterKey, value: string) => void;
}

/**
 * Client-side companion to the shared parsing boundary in `query-state.ts`.
 * Reads the current URL, and pushes updated query strings for the
 * interactive toolbar controls (search, filters, sort, view). Pagination
 * and filter-removal links are rendered server-side as plain hrefs, so
 * they intentionally live outside this hook.
 */
export function useListQueryState<
  TSortKey extends string,
  TFilterKey extends string,
>(
  config: ListQueryConfig<TSortKey, TFilterKey>,
): UseListQueryStateResult<TSortKey, TFilterKey> {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = useMemo(
    () => parseListQuery<TSortKey, TFilterKey>(searchParams, config),
    [searchParams, config],
  );

  const navigate = useCallback(
    (
      next: ParsedListQuery<TSortKey, TFilterKey>,
      mode: "push" | "replace" = "push",
    ) => {
      const href = `${pathname}${buildListQueryString(next, config)}`;
      if (mode === "replace") {
        router.replace(href, { scroll: false });
      } else {
        router.push(href, { scroll: false });
      }
    },
    [pathname, router, config],
  );

  const setSearch = useCallback(
    // Each keystroke commits a new URL once debounced upstream; replacing
    // rather than pushing keeps that from flooding browser history with
    // one entry per debounced update.
    (value: string) =>
      navigate({ ...query, search: value, page: 1 }, "replace"),
    [navigate, query],
  );

  const setSort = useCallback(
    (value: TSortKey) => navigate({ ...query, sort: value, page: 1 }),
    [navigate, query],
  );

  const setView = useCallback(
    (value: ViewMode) => navigate({ ...query, view: value }),
    [navigate, query],
  );

  const setSingleFilter = useCallback(
    (key: TFilterKey, value: string | undefined) => {
      navigate({
        ...query,
        filters: { ...query.filters, [key]: value ? [value] : [] },
        page: 1,
      });
    },
    [navigate, query],
  );

  const toggleMultiFilter = useCallback(
    (key: TFilterKey, value: string) => {
      const current = query.filters[key];
      const next = current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value];
      navigate({
        ...query,
        filters: { ...query.filters, [key]: next },
        page: 1,
      });
    },
    [navigate, query],
  );

  return {
    query,
    setSearch,
    setSort,
    setView,
    setSingleFilter,
    toggleMultiFilter,
  };
}

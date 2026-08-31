import type {
  FilterValues,
  ListQueryConfig,
  ParsedListQuery,
  ViewMode,
} from "@/features/list-page/types";

/** Builds a `{ [key]: value }` record from a list of keys and a mapper. */
function mapFilterKeys<TFilterKey extends string, TValue>(
  filterKeys: readonly TFilterKey[],
  mapper: (key: TFilterKey) => TValue,
): Record<TFilterKey, TValue> {
  const result = {} as Record<TFilterKey, TValue>;
  for (const key of filterKeys) {
    result[key] = mapper(key);
  }
  return result;
}

/**
 * Single parsing boundary for list-page URL state. Accepts anything
 * URLSearchParams-shaped so the same parser serves both the server
 * `searchParams` prop (via {@link toSearchParams}) and the client
 * `useSearchParams()` hook.
 */
export function parseListQuery<
  TSortKey extends string,
  TFilterKey extends string,
>(
  searchParams: URLSearchParams,
  config: ListQueryConfig<TSortKey, TFilterKey>,
): ParsedListQuery<TSortKey, TFilterKey> {
  const search = searchParams.get("search")?.trim() ?? "";

  const sortParam = searchParams.get("sort");
  const sort = (config.sortValues as readonly string[]).includes(
    sortParam ?? "",
  )
    ? (sortParam as TSortKey)
    : config.defaultSort;

  const view: ViewMode =
    searchParams.get("view") === "grid" ? "grid" : config.defaultView;

  const pageParam = Number.parseInt(searchParams.get("page") ?? "", 10);
  const page = Number.isFinite(pageParam) && pageParam > 1 ? pageParam : 1;

  const filters = mapFilterKeys(config.filterKeys, (key) => {
    const values = searchParams.getAll(key);
    return config.singleValueFilterKeys?.includes(key)
      ? values.slice(0, 1)
      : values;
  });

  return { search, filters, sort, view, page };
}

export function buildListQueryString<
  TSortKey extends string,
  TFilterKey extends string,
>(
  query: ParsedListQuery<TSortKey, TFilterKey>,
  config: ListQueryConfig<TSortKey, TFilterKey>,
): string {
  const params = new URLSearchParams();

  if (query.search) {
    params.set("search", query.search);
  }

  for (const key of config.filterKeys) {
    for (const value of query.filters[key]) {
      params.append(key, value);
    }
  }

  if (query.sort !== config.defaultSort) {
    params.set("sort", query.sort);
  }
  if (query.view !== config.defaultView) {
    params.set("view", query.view);
  }
  if (query.page > 1) {
    params.set("page", String(query.page));
  }

  const queryString = params.toString();
  return queryString ? `?${queryString}` : "";
}

/** Normalizes a Next.js server `searchParams` object into `URLSearchParams`. */
export function toSearchParams(
  raw: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      for (const entry of value) params.append(key, entry);
    } else {
      params.append(key, value);
    }
  }
  return params;
}

export function emptyFilterValues<TFilterKey extends string>(
  filterKeys: readonly TFilterKey[],
): FilterValues<TFilterKey> {
  return mapFilterKeys(filterKeys, () => []);
}

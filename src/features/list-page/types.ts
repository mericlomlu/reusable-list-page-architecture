export type ViewMode = "list" | "grid";

export interface SortOption<TSortKey extends string> {
  readonly value: TSortKey;
  readonly label: string;
}

export interface FilterOption {
  readonly value: string;
  readonly label: string;
}

export type FilterValues<TFilterKey extends string> = Readonly<
  Record<TFilterKey, readonly string[]>
>;

export interface ListQueryConfig<
  TSortKey extends string,
  TFilterKey extends string,
> {
  readonly defaultSort: TSortKey;
  readonly sortValues: readonly TSortKey[];
  readonly defaultView: ViewMode;
  readonly filterKeys: readonly TFilterKey[];
  /** Filter keys that hold at most one value; extra URL values are dropped. */
  readonly singleValueFilterKeys?: readonly TFilterKey[];
  readonly pageSize: number;
}

export interface ParsedListQuery<
  TSortKey extends string,
  TFilterKey extends string,
> {
  readonly search: string;
  readonly filters: FilterValues<TFilterKey>;
  readonly sort: TSortKey;
  readonly view: ViewMode;
  readonly page: number;
}

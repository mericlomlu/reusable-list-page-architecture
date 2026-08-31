export type ComponentCategory =
  | "forms"
  | "navigation"
  | "feedback"
  | "data-display"
  | "overlays";

export type ComponentFramework = "react" | "vue" | "svelte" | "angular";

export type ComponentStatus = "stable" | "beta" | "deprecated";

export type ComponentSortKey = "updated" | "name" | "status";

export type ComponentFilterKey = "category" | "framework" | "status";

export interface ComponentRecord {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly category: ComponentCategory;
  readonly framework: ComponentFramework;
  readonly status: ComponentStatus;
  readonly updatedAt: string;
}

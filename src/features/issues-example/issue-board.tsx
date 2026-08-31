"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon } from "@/components/icons/nav-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { bulkUpdateIssueStatus } from "@/features/issues-example/bulk-actions";
import { BULK_STATUS_ACTIONS } from "@/features/issues-example/config";
import { IssueGridCard } from "@/features/issues-example/issue-grid-card";
import { IssueTable } from "@/features/issues-example/issue-table";
import type { IssueRecord, IssueStatus } from "@/features/issues-example/types";
import { parseDemoState } from "@/features/list-page/demo-state";
import { RESULTS_GRID_CLASS_NAME } from "@/features/list-page/results-view";
import { SelectionToolbar } from "@/features/list-page/selection-toolbar";
import type { ViewMode } from "@/features/list-page/types";
import { useSelection } from "@/features/list-page/use-selection";

interface IssueBoardProps {
  records: readonly IssueRecord[];
  view: ViewMode;
}

interface Feedback {
  readonly type: "success" | "error";
  readonly message: string;
}

export function IssueBoard({ records, view }: IssueBoardProps) {
  const selection = useSelection();
  const searchParams = useSearchParams();
  const simulateBulkFailure =
    parseDemoState(searchParams, "bulkDemoState") === "error";

  const [statusOverrides, setStatusOverrides] = useState<
    Readonly<Record<string, IssueStatus>>
  >({});
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [pending, setPending] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);

  // The control that started the bulk action is disabled (and, on success,
  // often unmounted along with the whole selection toolbar) by the time this
  // fires, so move focus to the outcome instead of leaving it dropped.
  useEffect(() => {
    if (feedback) {
      feedbackRef.current?.focus();
    }
  }, [feedback]);

  const effectiveRecords = records.map((record) =>
    statusOverrides[record.id]
      ? { ...record, status: statusOverrides[record.id] }
      : record,
  );

  const visibleIds = records.map((record) => record.id);
  const allSelected =
    selection.selectedCount > 0 && selection.selectedCount >= visibleIds.length;
  const someSelected = selection.selectedCount > 0 && !allSelected;

  async function applyBulkStatus(status: IssueStatus) {
    if (pending) return;

    const ids = [...selection.selectedIds];
    if (ids.length === 0) return;

    setPending(true);
    setFeedback(null);
    try {
      const result = await bulkUpdateIssueStatus(
        ids,
        status,
        simulateBulkFailure,
      );
      setStatusOverrides((current) => {
        const next = { ...current };
        for (const id of result.updatedIds) next[id] = status;
        return next;
      });
      setFeedback({
        type: "success",
        message: `Updated status for ${result.updatedIds.length} ${
          result.updatedIds.length === 1 ? "issue" : "issues"
        } (demo only — not saved).`,
      });
      selection.removeMany(result.updatedIds);
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Couldn't update the selected issues.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {feedback ? (
        <div
          ref={feedbackRef}
          tabIndex={-1}
          role={feedback.type === "error" ? "alert" : "status"}
          // Not cn(): tailwind-merge misclassifies the custom text-body-sm
          // font-size token as a text-color utility and drops the adjacent
          // text-destructive/text-foreground class.
          className={[
            "mb-3.5 flex items-center justify-between gap-3 rounded-lg border px-4 py-2.5 text-body-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
            feedback.type === "error"
              ? "border-destructive/30 bg-destructive/5 text-destructive"
              : "border-success/30 bg-success/10 text-foreground",
          ].join(" ")}
        >
          {feedback.message}
          <button
            type="button"
            onClick={() => setFeedback(null)}
            className="-m-1 shrink-0 rounded-full p-1.5 text-current hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring"
          >
            <CloseIcon className="size-3" />
            <span className="sr-only">Dismiss</span>
          </button>
        </div>
      ) : null}
      <SelectionToolbar
        selectedCount={selection.selectedCount}
        totalVisible={visibleIds.length}
        itemLabel="issues"
        onSelectAllVisible={() => selection.selectAll(visibleIds)}
        onClear={selection.clear}
        pending={pending}
        actions={
          <>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" size="sm" disabled={pending}>
                    Change status
                  </Button>
                }
              />
              <DropdownMenuContent align="end">
                {BULK_STATUS_ACTIONS.map((action) => (
                  <DropdownMenuItem
                    key={action.status}
                    onClick={() => applyBulkStatus(action.status)}
                  >
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              size="sm"
              disabled={pending}
              onClick={() => applyBulkStatus("closed")}
            >
              Close issues
            </Button>
          </>
        }
      />
      <p aria-live="polite" className="sr-only">
        {selection.selectedCount} of {visibleIds.length} issues selected
      </p>
      {view === "grid" ? (
        <ul aria-label="Issues" className={RESULTS_GRID_CLASS_NAME}>
          {effectiveRecords.map((record) => (
            <IssueGridCard
              key={record.id}
              record={record}
              selected={selection.isSelected(record.id)}
              onToggle={() => selection.toggle(record.id)}
              disabled={pending}
            />
          ))}
        </ul>
      ) : (
        <IssueTable
          records={effectiveRecords}
          isSelected={selection.isSelected}
          onToggle={selection.toggle}
          allSelected={allSelected}
          someSelected={someSelected}
          onToggleAll={() => {
            if (allSelected) {
              selection.clear();
            } else {
              selection.selectAll(visibleIds);
            }
          }}
          disabled={pending}
        />
      )}
    </>
  );
}

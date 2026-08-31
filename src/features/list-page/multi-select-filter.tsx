"use client";

import { ChevronDownIcon } from "@/components/icons/list-icons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { FilterOption } from "@/features/list-page/types";

interface MultiSelectFilterProps {
  label: string;
  allLabel?: string;
  options: readonly FilterOption[];
  selectedValues: readonly string[];
  onToggle: (value: string) => void;
}

export function MultiSelectFilter({
  label,
  allLabel = "All",
  options,
  selectedValues,
  onToggle,
}: MultiSelectFilterProps) {
  const triggerLabel =
    selectedValues.length === 0
      ? allLabel
      : selectedValues.length === 1
        ? (options.find((option) => option.value === selectedValues[0])
            ?.label ?? allLabel)
        : `${selectedValues.length} selected`;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            className="font-normal text-foreground"
            aria-label={`${label} filter, ${triggerLabel === allLabel ? "no filter applied" : triggerLabel}`}
          >
            {label}: {triggerLabel}
            <ChevronDownIcon className="size-3 text-muted-foreground" />
          </Button>
        }
      />
      <PopoverContent align="start" className="w-52 p-2.5">
        <p className="px-1.5 pb-2 font-mono text-label font-bold tracking-wider text-muted-foreground uppercase">
          {label}
        </p>
        <div className="flex flex-col gap-1">
          {options.map((option) => {
            const checkboxId = `${label}-${option.value}`;
            return (
              <label
                key={option.value}
                htmlFor={checkboxId}
                className="flex items-center gap-2 rounded-md px-1.5 py-1.5 text-body text-foreground hover:bg-accent"
              >
                <Checkbox
                  id={checkboxId}
                  checked={selectedValues.includes(option.value)}
                  onCheckedChange={() => onToggle(option.value)}
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
}

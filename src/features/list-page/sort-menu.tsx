"use client";

import { SortIcon } from "@/components/icons/list-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SortOption } from "@/features/list-page/types";

interface SortMenuProps<TSortKey extends string> {
  options: readonly SortOption<TSortKey>[];
  value: TSortKey;
  onChange: (value: TSortKey) => void;
}

export function SortMenu<TSortKey extends string>({
  options,
  value,
  onChange,
}: SortMenuProps<TSortKey>) {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? "";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="font-normal text-foreground">
            Sort: {selectedLabel}
            <SortIcon className="size-3 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => onChange(next as TSortKey)}
        >
          {options.map((option) => (
            <DropdownMenuRadioItem key={option.value} value={option.value}>
              {option.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

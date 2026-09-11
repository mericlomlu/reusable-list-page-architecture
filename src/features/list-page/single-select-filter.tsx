"use client";

import { useTranslations } from "next-intl";
import { ChevronDownIcon } from "@/components/icons/list-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FilterOption } from "@/features/list-page/types";

interface SingleSelectFilterProps {
  label: string;
  allLabel?: string;
  options: readonly FilterOption[];
  value: string | undefined;
  onChange: (value: string | undefined) => void;
}

export function SingleSelectFilter({
  label,
  allLabel,
  options,
  value,
  onChange,
}: SingleSelectFilterProps) {
  const t = useTranslations("listPage.singleSelectFilter");
  const resolvedAllLabel = allLabel ?? t("allLabel");
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? resolvedAllLabel;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" className="font-normal text-foreground">
            {label}: {selectedLabel}
            <ChevronDownIcon className="size-3 text-muted-foreground" />
          </Button>
        }
      />
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={value ?? ""}
          onValueChange={(next) => onChange(next === "" ? undefined : next)}
        >
          <DropdownMenuRadioItem value="">
            {resolvedAllLabel}
          </DropdownMenuRadioItem>
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

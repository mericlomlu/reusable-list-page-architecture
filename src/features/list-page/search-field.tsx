"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "@/components/icons/list-icons";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface SearchFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
  className?: string;
}

export function SearchField({
  label,
  placeholder,
  value,
  onChange,
  debounceMs = 300,
  className,
}: SearchFieldProps) {
  const [draft, setDraft] = useState(value);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    setDraft(value);
  }, [value]);

  useEffect(() => {
    if (draft === value) return;
    const timeout = setTimeout(() => onChangeRef.current(draft), debounceMs);
    return () => clearTimeout(timeout);
  }, [draft, value, debounceMs]);

  return (
    <div
      className={cn(
        "flex min-w-[220px] max-w-[320px] flex-1 items-center gap-2 rounded-md border border-border bg-card px-3 py-[9px] has-[:focus-visible]:border-ring has-[:focus-visible]:ring-3 has-[:focus-visible]:ring-ring/50",
        className,
      )}
    >
      <SearchIcon className="size-[15px] shrink-0 text-muted-foreground" />
      <Input
        aria-label={label}
        placeholder={placeholder}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        className="h-auto border-none bg-transparent p-0 text-[13.5px] shadow-none focus-visible:ring-0"
      />
    </div>
  );
}

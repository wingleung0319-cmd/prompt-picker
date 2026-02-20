"use client";

import * as React from "react";
import { ChevronDown, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

export type MultiSelectOption = { value: string; label: string };

export interface MultiSelectProps {
  /** Options: value = stored value (e.g. English for prompt), label = display text (e.g. Chinese) */
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  searchPlaceholder?: string;
  noResultsText?: string;
  /** When multiple items selected, e.g. (n) => `已選 ${n} 項` */
  selectedCountLabel?: (n: number) => string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  searchPlaceholder = "Search...",
  noResultsText = "No results.",
  selectedCountLabel,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!search.trim()) return options;
    const s = search.toLowerCase();
    return options.filter(
      (o) =>
        o.label.toLowerCase().includes(s) || o.value.toLowerCase().includes(s)
    );
  }, [options, search]);

  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const selectedLabels = React.useMemo(
    () =>
      value.map(
        (v) => options.find((o) => o.value === v)?.label ?? v
      ),
    [value, options]
  );

  const clearSelection = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([]);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn("w-full min-w-0", className)}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between font-normal h-auto min-h-10 py-2",
              !value.length && "text-muted-foreground"
            )}
            title={value.length > 0 ? selectedLabels.join(" / ") : undefined}
          >
            <span className="truncate text-left flex-1">
              {value.length > 0
                ? value.length === 1
                  ? selectedLabels[0]
                  : selectedCountLabel
                    ? selectedCountLabel(value.length)
                    : `${value.length} selected`
                : placeholder}
            </span>
            <span className="flex shrink-0 gap-1">
              {value.length > 0 && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={clearSelection}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      clearSelection(e as unknown as React.MouseEvent);
                    }
                  }}
                  className="rounded p-0.5 hover:bg-muted"
                  aria-label="Clear"
                >
                  <X className="h-3.5 w-3.5" />
                </span>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </span>
          </Button>
          {value.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1.5 text-xs text-muted-foreground">
              {selectedLabels.map((label, i) => (
                <span
                  key={value[i]}
                  className="inline-block max-w-full break-words rounded bg-muted/70 px-1.5 py-0.5"
                >
                  {label}
                </span>
              ))}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] min-w-[280px] p-0" align="start">
        <div className="p-2 border-b border-border">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
        <div className="max-h-[280px] overflow-auto p-1">
          {filtered.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted-foreground">
              {noResultsText}
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-x-2 gap-y-1">
              {filtered.map((option) => (
                <label
                  key={option.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-1.5 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground min-w-0",
                    value.includes(option.value) && "bg-accent/50"
                  )}
                >
                  <Checkbox
                    checked={value.includes(option.value)}
                    onCheckedChange={() => toggle(option.value)}
                    className="shrink-0 mt-0.5"
                  />
                  <span className="break-words min-w-0">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}

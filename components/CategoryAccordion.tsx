"use client";

import * as React from "react";
import { MultiSelect } from "@/components/MultiSelect";
import {
  getVocabularyOptions,
  categoryLabels,
  CATEGORY_KEYS,
  type CategoryKey,
} from "@/data/vocabularies";
import { useLocale } from "@/components/LocaleProvider";
import { translations } from "@/lib/i18n";
import type { Selections } from "@/lib/promptBuilder";

export interface CategoryAccordionProps {
  selections: Selections;
  onSelectionsChange: (s: Selections) => void;
}

export function CategoryAccordion({
  selections,
  onSelectionsChange,
}: CategoryAccordionProps) {
  const { locale } = useLocale();
  const t = translations[locale];

  const updateCategory = React.useCallback(
    (key: CategoryKey, value: string[]) => {
      onSelectionsChange({ ...selections, [key]: value });
    },
    [selections, onSelectionsChange]
  );

  return (
    <div className="w-full grid grid-cols-3 gap-x-2 gap-y-3">
      {CATEGORY_KEYS.map((key) => {
        const label = categoryLabels[key][locale];
        const options = getVocabularyOptions(key, locale);
        const value = selections[key] ?? [];

        return (
          <div key={key} className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center shrink-0">
              <span className="font-medium text-sm">{label}</span>
              {value.length > 0 && (
                <span className="ml-1.5 text-xs text-muted-foreground font-normal">
                  ({value.length})
                </span>
              )}
            </div>
            <MultiSelect
              options={options}
              value={value}
              onChange={(v) => updateCategory(key, v)}
              placeholder={t.selectPlaceholder}
              searchPlaceholder={t.searchPlaceholder}
              noResultsText={t.noResults}
              selectedCountLabel={t.selectedCount}
            />
          </div>
        );
      })}
    </div>
  );
}

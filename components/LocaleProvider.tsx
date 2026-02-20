"use client";

import * as React from "react";
import type { Locale } from "@/lib/i18n";

const STORAGE_KEY = "ai-prompt-generator-locale";

const LocaleContext = React.createContext<{
  locale: Locale;
  setLocale: React.Dispatch<React.SetStateAction<Locale>>;
} | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = React.useState<Locale>("en");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "zh" || stored === "en") setLocaleState(stored);
    } catch {
      // ignore
    }
  }, []);

  const setLocale = React.useCallback(
    (updater: React.SetStateAction<Locale>) => {
      setLocaleState((prev) => {
        const next = typeof updater === "function" ? updater(prev) : updater;
        if (typeof window !== "undefined") {
          localStorage.setItem(STORAGE_KEY, next);
        }
        return next;
      });
    },
    []
  );

  React.useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, locale);
  }, [locale, mounted]);

  const value = React.useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}

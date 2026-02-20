"use client";

import { useTheme } from "@/components/ThemeProvider";
import { useLocale } from "@/components/LocaleProvider";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n";
import { translations } from "@/lib/i18n";

export function Header() {
  const { theme, setTheme, resolved } = useTheme();
  const { locale, setLocale } = useLocale();
  const t = translations[locale];

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const toggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "zh" : "en"));
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <h1 className="text-lg font-semibold tracking-tight md:text-xl">
          {t.appTitle}
        </h1>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleLocale}
            title={locale === "en" ? "繁體中文" : "English"}
            className="gap-1.5"
          >
            <Languages className="h-4 w-4" />
            <span className="text-xs font-medium hidden sm:inline">
              {locale === "en" ? "中" : "EN"}
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={cycleTheme}
            title={
              theme === "system"
                ? "System"
                : theme === "dark"
                  ? "Dark"
                  : "Light"
            }
            className="relative"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute inset-0 m-auto h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

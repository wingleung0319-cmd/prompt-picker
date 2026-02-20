"use client";

import { useLocale } from "@/components/LocaleProvider";
import { translations } from "@/lib/i18n";

export function Footer() {
  const { locale } = useLocale();
  const t = translations[locale];

  return (
    <footer className="border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          {t.copyright}
        </p>
      </div>
    </footer>
  );
}

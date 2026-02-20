"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const AD_CLIENT = "ca-pub-3225610684507655";

export interface AdBannerProps {
  adSlot?: string;
  format?: "horizontal" | "rectangle" | "auto";
  className?: string;
}

export function AdBanner({
  adSlot,
  format = "auto",
  className,
}: AdBannerProps) {
  const adRef = React.useRef<HTMLModElement>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    if (adRef.current && typeof window !== "undefined") {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "flex justify-center items-center my-6 py-4",
        className
      )}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={format === "auto" ? "auto" : undefined}
        data-full-width-responsive={format === "auto" ? "true" : undefined}
      />
    </div>
  );
}

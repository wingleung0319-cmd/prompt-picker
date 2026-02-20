"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/** 鏡頭轉盤 Icon：按一下隨機跳轉一個視角。Circle + tick marks like a camera/aperture dial. */
export function CameraDialIcon({
  className,
  ...props
}: React.SVGAttributes<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("[&_svg]:shrink-0", className)}
      aria-hidden
      {...props}
    >
      {/* Outer ring (dial rim) */}
      <circle cx="12" cy="12" r="9" />
      {/* Tick marks at 12 positions (like lens aperture ring) */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const innerR = 7;
        const outerR = 9;
        const x1 = 12 + innerR * Math.sin(angle);
        const y1 = 12 - innerR * Math.cos(angle);
        const x2 = 12 + outerR * Math.sin(angle);
        const y2 = 12 - outerR * Math.cos(angle);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
      })}
      {/* Center dot / lens indicator */}
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

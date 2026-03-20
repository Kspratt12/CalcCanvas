"use client";

import { useEffect } from "react";

interface AdPlacementProps {
  slot?: string;
  format: "leaderboard" | "rectangle" | "in-article" | "sidebar";
}

const sizeMap: Record<AdPlacementProps["format"], { width: number; height: number }> = {
  leaderboard: { width: 728, height: 90 },
  rectangle: { width: 300, height: 250 },
  "in-article": { width: 468, height: 60 },
  sidebar: { width: 160, height: 600 },
};

export default function AdPlacement({ slot = "default", format }: AdPlacementProps) {
  const size = sizeMap[format];

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded yet — ignore
    }
  }, []);

  return (
    <div className="flex justify-center py-4">
      <ins
        className="adsbygoogle"
        style={{ display: "inline-block", width: size.width, height: size.height, maxWidth: "100%" }}
        data-ad-client="ca-pub-7094912649355027"
        data-ad-slot={slot}
      />
    </div>
  );
}

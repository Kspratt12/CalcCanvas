"use client";

import { useEffect, useRef, useState } from "react";

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
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const adsbygoogle = (window as any).adsbygoogle;
      if (adsbygoogle) {
        adsbygoogle.push({});
        setAdLoaded(true);
      }
    } catch {
      // AdSense not loaded yet
    }
  }, []);

  // Don't render empty space if ads aren't loaded
  if (!adLoaded) return null;

  return (
    <div className="flex justify-center py-4">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "inline-block", width: size.width, height: size.height, maxWidth: "100%" }}
        data-ad-client="ca-pub-7094912649355027"
        data-ad-slot={slot}
      />
    </div>
  );
}

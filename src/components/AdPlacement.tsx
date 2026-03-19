"use client";

/*
 * AdPlacement — reusable ad zone for Google AdSense
 *
 * To activate ads, replace the placeholder below with your AdSense code:
 *   1. Set your AdSense publisher ID in data-ad-client (e.g. "ca-pub-XXXXXXXXXXXXXXXX")
 *   2. Set the ad slot ID via the `slot` prop
 *   3. Remove the placeholder <div> and uncomment the <ins> tag
 */

interface AdPlacementProps {
  slot?: string;
  format: "leaderboard" | "rectangle" | "in-article" | "sidebar";
}

const sizeMap: Record<AdPlacementProps["format"], { width: number; height: number; label: string }> = {
  leaderboard: { width: 728, height: 90, label: "728 x 90" },
  rectangle: { width: 300, height: 250, label: "300 x 250" },
  "in-article": { width: 468, height: 60, label: "468 x 60" },
  sidebar: { width: 160, height: 600, label: "160 x 600" },
};

export default function AdPlacement({ slot = "default", format }: AdPlacementProps) {
  const size = sizeMap[format];

  return (
    <div className="flex justify-center py-4">
      {/* Development placeholder — replace with AdSense <ins> tag in production */}
      <div
        className="flex items-center justify-center rounded border border-dashed border-slate-300 bg-slate-100 text-xs text-slate-400"
        style={{ width: size.width, height: size.height, maxWidth: "100%" }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
        data-ad-slot={slot}
        data-ad-format={format}
      >
        Ad &middot; {size.label}
      </div>

      {/*
        Production AdSense code — uncomment and fill in your IDs:

        <ins
          className="adsbygoogle"
          style={{ display: "inline-block", width: size.width, height: size.height }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
        />
      */}
    </div>
  );
}

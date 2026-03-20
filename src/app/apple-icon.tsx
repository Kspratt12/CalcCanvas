import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2563eb",
          borderRadius: 36,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <span style={{ fontSize: 72, fontWeight: 800, color: "white", lineHeight: 1 }}>CC</span>
          <span style={{ fontSize: 16, fontWeight: 600, color: "#93c5fd", lineHeight: 1 }}>CALC</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

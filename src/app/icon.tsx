import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 10,
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <span
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: "white",
            lineHeight: 1,
            letterSpacing: -1,
          }}
        >
          CC
        </span>
      </div>
    ),
    { ...size }
  );
}

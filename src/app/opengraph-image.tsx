import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "CalcCanvas — Free Online Calculators & Tools";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 800,
              color: "#2563eb",
            }}
          >
            CC
          </div>
          <span style={{ fontSize: 56, fontWeight: 800, color: "white" }}>
            CalcCanvas
          </span>
        </div>
        <span style={{ fontSize: 28, color: "#bfdbfe", fontWeight: 500 }}>
          Free Online Calculators &amp; Tools
        </span>
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 40,
          }}
        >
          {["Financial", "Health", "Math", "Text", "Developer", "Everyday"].map(
            (cat) => (
              <div
                key={cat}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.15)",
                  color: "white",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                {cat}
              </div>
            )
          )}
        </div>
        <span style={{ fontSize: 20, color: "#93c5fd", marginTop: 32 }}>
          37 tools &bull; 100% free &bull; No sign-up required
        </span>
      </div>
    ),
    { ...size }
  );
}

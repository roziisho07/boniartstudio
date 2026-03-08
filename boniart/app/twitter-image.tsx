import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px",
        color: "#171717",
        background:
          "radial-gradient(circle at 80% 10%, #f5f5f4 0%, #ffffff 50%), linear-gradient(130deg, #f9fafb 0%, #ffffff 100%)",
        border: "1px solid #e5e7eb",
        fontFamily: "Georgia, Times New Roman, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 18,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#6b7280",
        }}
      >
        Artist Portfolio
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div
          style={{
            fontSize: 76,
            lineHeight: 1,
            fontWeight: 500,
            letterSpacing: "-0.02em",
          }}
        >
          SHAHID HASSAN BONI
        </div>
        <div
          style={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: 30,
            color: "#4b5563",
          }}
        >
          Paintings, Exhibitions, News & CV
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: 24,
            color: "#374151",
          }}
        >
          shahidhassanboni.com
        </div>
        <div style={{ width: 120, height: 1, background: "#9ca3af" }} />
      </div>
    </div>,
    {
      ...size,
    },
  );
}

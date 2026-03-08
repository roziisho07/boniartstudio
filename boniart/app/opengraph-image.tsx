import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
          "radial-gradient(circle at 20% 20%, #f5f5f4 0%, #ffffff 40%), linear-gradient(120deg, #fafaf9 0%, #ffffff 55%, #f3f4f6 100%)",
        border: "1px solid #e5e7eb",
        fontFamily: "Georgia, Times New Roman, serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: 18,
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "#6b7280",
        }}
      >
        <span>Portfolio</span>
        <span style={{ width: 70, height: 1, background: "#9ca3af" }} />
        <span>Pakistan</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div
          style={{
            fontSize: 78,
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
          Visual Artist | Art Teacher
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
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
        <div
          style={{
            width: 140,
            height: 140,
            borderRadius: "999px",
            border: "1px solid #d1d5db",
            background:
              "radial-gradient(circle at 30% 30%, #ffffff 0%, #e5e7eb 70%)",
          }}
        />
      </div>
    </div>,
    {
      ...size,
    },
  );
}

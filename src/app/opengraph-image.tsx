import { ImageResponse } from "next/og";

export const alt = "Memberridge Coffee — Roasted with Purpose. Shared with Passion.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#2A1B14",
          color: "#FAF8F5",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="44" viewBox="0 0 32 22" fill="none" stroke="#C99846" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 17 L10 5 L15.5 12 L21 3 L30 17" />
            <path d="M6.5 20.5 H25.5" opacity="0.55" />
          </svg>
          <div style={{ fontSize: 34, letterSpacing: 2 }}>MEMBERRIDGE COFFEE</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2 }}>Roasted with Purpose.</div>
          <div style={{ fontSize: 84, lineHeight: 1.05, letterSpacing: -2, color: "#C99846" }}>Shared with Passion.</div>
        </div>
        <div style={{ fontSize: 24, color: "rgba(247,243,236,0.7)", letterSpacing: 4 }}>
          SMALL-BATCH SPECIALTY COFFEE · PORTLAND, OREGON
        </div>
      </div>
    ),
    size
  );
}

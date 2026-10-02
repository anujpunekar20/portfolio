import { ImageResponse } from "next/og";

export const alt = "Anuj Punekar — Full-stack developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: "#0a0a0a",
        color: "#f0f0f0",
        border: "8px solid #c160ef",
      }}
    >
      <div style={{ fontSize: 40, color: "#c160ef" }}>{"// PORTFOLIO"}</div>
      <div style={{ fontSize: 96, fontWeight: 700, marginTop: 16 }}>
        Anuj Punekar
      </div>
      <div style={{ fontSize: 40, color: "#888888", marginTop: 16 }}>
        Full-stack developer with a knack for video games.
      </div>
    </div>,
    size,
  );
}

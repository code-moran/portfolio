import { ImageResponse } from "next/og";

export const alt = "Titus Njiru — Systems Development Consultant";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(145deg, #0f172a 0%, #164e63 55%, #083344 100%)",
          color: "#f8fafc",
          padding: "64px",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#67e8f9",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: 700,
          }}
        >
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", fontSize: 72, lineHeight: 1.05, fontWeight: 700 }}>
            Titus Njiru
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 34,
              lineHeight: 1.35,
              color: "#e2e8f0",
              maxWidth: 920,
              fontFamily: "Arial, Helvetica, sans-serif",
            }}
          >
            Systems Development Consultant building reliable web, mobile, and data products.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 24,
            color: "#cbd5e1",
          }}
        >
          <span>Nairobi, Kenya</span>
          <span>titusnjiru.com</span>
        </div>
      </div>
    ),
    size,
  );
}

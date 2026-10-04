import { ImageResponse } from "next/og";

export const alt = "Apuração em Belém, eleições 2026: votos do TSE em tempo real";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Cartão sem números: ele fica guardado em redes sociais e um placar velho enganaria.
export default function Image() {
  return new ImageResponse(
    (
      <div style={{ background: "#000", color: "#fff", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 34, color: "#EDAE00", letterSpacing: 6, textTransform: "uppercase", fontWeight: 700 }}>
          Eleições 2026 · 1º turno · ao vivo
        </div>
        <div style={{ fontSize: 150, fontWeight: 900, lineHeight: 0.95, marginTop: 24, letterSpacing: -4 }}>
          Apuração em Belém
        </div>
        <div style={{ fontSize: 40, color: "#d4d4d8", marginTop: 36 }}>
          Presidente, governador, senador e deputados, com dados do TSE
        </div>
        <div style={{ display: "flex", marginTop: 48, height: 12, width: 520, background: "#27272a" }}>
          <div style={{ width: "72%", background: "#EDAE00" }} />
        </div>
        <div style={{ fontSize: 28, color: "#a1a1aa", marginTop: 40 }}>mfelippe.com.br/apuracao-belem</div>
      </div>
    ),
    { ...size }
  );
}

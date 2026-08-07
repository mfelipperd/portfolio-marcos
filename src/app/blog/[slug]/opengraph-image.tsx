import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/blog";

export const alt = "Marcos Felippe - Blog";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  const title = post?.title ?? "Blog";
  const tag = post?.tags?.[0];

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "sans-serif",
          color: "white",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "32px",
            fontWeight: "700",
            letterSpacing: "2px",
            textTransform: "uppercase",
            opacity: 0.6,
          }}
        >
          M.Felippe · Blog
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {tag && (
            <div
              style={{
                display: "flex",
                fontSize: "28px",
                fontWeight: "600",
                letterSpacing: "3px",
                textTransform: "uppercase",
                opacity: 0.5,
                marginBottom: "24px",
              }}
            >
              {tag}
            </div>
          )}
          <div
            style={{
              display: "flex",
              fontSize: "64px",
              fontWeight: "800",
              lineHeight: 1.15,
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

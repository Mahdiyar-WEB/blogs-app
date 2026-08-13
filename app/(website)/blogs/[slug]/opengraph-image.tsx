import { ImageResponse } from "next/og";
import postServices from "api/postServices";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await postServices.getPostBySlug(slug);

  const fontData = await fetch(
    new URL(
      "/fonts/Vazirmatn-Bold.ttf",
      process.env.NEXT_PUBLIC_BASE_URL,
    ),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      dir="rtl"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "60px",
        background:
          "linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f97316 100%)",
        color: "#ffffff",
        fontFamily: "Vazirmatn",
      }}
    >
      {/* Category */}
      <div
        style={{
          display: "flex",
          fontSize: 30,
          fontWeight: 700,
          color: "#ffffff",
          opacity: 0.9,
          marginBottom: 24,
        }}
      >
        {post.category?.title || "بلاگیتو"}
      </div>

      {/* Title */}
      <div
        style={{
          display: "flex",
          fontSize: 58,
          lineHeight: 1.4,
          fontWeight: 700,
          maxWidth: "1080px",
          color: "#ffffff",
          direction: "rtl",
          textAlign: "right",
        }}
      >
        {post.title}
      </div>

      {/* Website */}
      <div
        style={{
          display: "flex",
          fontSize: 25,
          marginTop: 30,
          color: "#ffffff",
          opacity: 0.85,
          direction: "ltr",
        }}
      >
        belagito.ir
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Vazirmatn",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
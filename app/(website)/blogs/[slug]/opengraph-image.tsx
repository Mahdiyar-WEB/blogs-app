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

  if (!post.coverImageUrl) {
    throw new Error("Post cover image not found");
  }

  // استفاده از Next.js Image Optimizer
  const imageUrl = new URL(
    "/_next/image",
    process.env.NEXT_PUBLIC_BASE_URL,
  );

  imageUrl.searchParams.set("url", post.coverImageUrl);
  imageUrl.searchParams.set("w", "1200");
  imageUrl.searchParams.set("q", "75");

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        position: "relative",
        background: "#0f172a",
      }}
    >
      <img
        src={imageUrl.toString()}
        alt={post.title}
        width="1200"
        height="630"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />

      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(0,0,0,.85), rgba(0,0,0,.3))",
        }}
      />

      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "60px",
          color: "#fff",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Category */}
        <div
          style={{
            fontSize: 28,
            opacity: 0.85,
            marginBottom: 20,
          }}
        >
          {post.category?.title || "بلاگیتو"}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            lineHeight: 1.2,
            fontWeight: 700,
            maxWidth: "1000px",
          }}
        >
          {post.title}
        </div>

        {/* Website */}
        <div
          style={{
            fontSize: 24,
            marginTop: 24,
            opacity: 0.8,
          }}
        >
          belagito.ir
        </div>
      </div>
    </div>,
    size,
  );
}
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import postServices from "api/postServices";
import RelatedPosts from "../_components/RelatedPosts";
import PostComments from "../_components/PostComments";
import ReadingProgress from "../_components/ReadingProgress";
import ShareRail from "../_components/ShareRail";
import Image from "next/image";
import BreadCrumbs from "components/BreadCrumbs";
import toPersianDigits from "utils/toPersianDigits";
import PostBody from "./PostBody";
import truncateText from "utils/truncateText";

async function getCachedPost(slug) {
  "use cache";
  cacheLife("minutes");
  return await postServices.getPostBySlug(slug);
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = (await getCachedPost(slug)) || { title: "", briefText: "" };
  return { title: post.title, description: post.briefText };
}

const formatJalaliDate = (isoDate) => {
  try {
    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(isoDate));
  } catch {
    return "";
  }
};

const SinglePostContent = async ({ params }) => {
  const { slug } = await params;
  let post;
  try {
    post = await getCachedPost(slug);
  } catch (error) {
    notFound();
  }

  const publishDate = formatJalaliDate(post.createdAt);

  return (
    <main className="w-11/12 mx-auto 2xl:max-w-screen-2xl">
      <ReadingProgress targetId="post-article" />

      <BreadCrumbs slugTitle={post.title} />

      {/* Hero with title overlay */}
      <div className="relative mt-4 pb-4 sm:pb-6">
        <section className="relative rounded-2xl lg:rounded-[2rem] overflow-hidden border border-secondary-200 shadow-[0_8px_20px_-8px_rgba(15,23,42,0.25)]">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] lg:aspect-[21/9] w-full">
            <Image
              className="object-cover object-center"
              fill
              quality={100}
              priority
              alt={post.title}
              placeholder="blur"
              blurDataURL={post.coverImageBlurDataURL}
              src={post.coverImageUrl}
            />
            {/* readability gradient — only bottom third, not whole image */}
            <div className="absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* top row: category + date */}
            <div className="absolute top-4 inset-x-4 lg:top-6 lg:inset-x-6 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-primary-900/90 backdrop-blur-sm px-3 py-1 text-[11px] lg:text-xs font-medium text-white">
                {post.category.title}
              </span>

              {publishDate && (
                <span className="inline-flex items-center gap-1 rounded-full bg-black/40 backdrop-blur-sm px-3 py-1 text-[11px] lg:text-xs font-medium text-white/85">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="size-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
                      clipRule="evenodd"
                    />
                  </svg>

                  {publishDate}
                </span>
              )}
            </div>

            {/* content pinned to bottom of image */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 lg:p-10 pt-10 sm:pt-14 lg:pt-20 space-y-2 lg:space-y-3 bg-gradient-to-t from-black/70 via-black/40 to-transparent backdrop-blur-[2px]">
              <h1 className="text-xl sm:text-2xl lg:text-4xl font-bold text-white leading-snug lg:leading-tight max-w-3xl drop-shadow-sm">
                {truncateText(post.title, 50)}
              </h1>
              <p className="text-xs sm:text-sm lg:text-base text-white/75 max-w-xl line-clamp-2">
                {truncateText(post.briefText, 50)}
              </p>

              <div className="flex items-center gap-3 pt-2 lg:pt-3">
                <Image
                  alt={post.author?.name || "deleted-account"}
                  width={32}
                  height={32}
                  className={`rounded-full shrink-0 h-10 w-10 ${!post.author?.avatarUrl ? "bg-white" : "ring-2 ring-white/70 object-cover object-center"}`}
                  src={post.author?.avatarUrl || "/avatar.svg"}
                  placeholder={post?.author?.avatarUrl ? "blur" : "empty"}
                  blurDataURL={post?.author?.avatarBlurDataURL}
                />
                <span className="text-white text-xs sm:text-sm font-medium">
                  {post.author?.name || "حساب حذف شده"}
                </span>

                <span className="w-1 h-1 rounded-full bg-white/50" />

                <span className="flex items-center gap-1 text-white/70 text-xs sm:text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-3.5 h-3.5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6l4 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                  {toPersianDigits(post.readingTime)} دقیقه مطالعه
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Article body */}
      <section
        id="post-article"
        className="bg-white shadow-md border border-secondary-100 rounded-2xl mb-12 overflow-hidden"
      >
        <PostBody html={post.text} />

        <div className="flex items-center justify-between gap-4 border-t border-secondary-100 px-5 sm:px-8 lg:px-12 py-4 bg-secondary-50/60">
          <span className="text-xs sm:text-sm text-secondary-500">
            این مقاله رو دوست داشتی؟ به اشتراک بذار
          </span>
          <ShareRail title={post.title} />
        </div>
      </section>

      {post.related.length > 0 && <RelatedPosts posts={post.related} />}
      <PostComments post={post} />
    </main>
  );
};

export default SinglePostContent;

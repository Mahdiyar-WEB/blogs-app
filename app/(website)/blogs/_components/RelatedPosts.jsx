import Image from "next/image";
import Link from "next/link";
import React from "react";

const RelatedPosts = ({ posts }) => {
  return (
    <section className="mt-5 mb-10">
      <div className="flex items-center gap-2 mb-5">
        <span className="w-1.5 h-6 rounded-full bg-primary-600" />
        <p className="text-xl font-bold text-secondary-800">پست های مرتبط</p>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {posts.map(
          ({
            _id,
            slug,
            title,
            author,
            coverImageUrl,
            coverImageBlurDataURL,
          }) => {
            return (
              <div
                key={_id}
                className="col-span-12 md:col-span-4 lg:col-span-3 bg-white border border-secondary-200 shadow-sm hover:shadow-lg rounded-2xl overflow-hidden transition-all duration-300 ease-out"
              >
                <Link
                  href={`/blogs/${slug}`}
                  className="relative block aspect-video h-44 overflow-hidden"
                >
                  <Image
                    fill
                    quality={75}
                    alt={title}
                    sizes="100%"
                    placeholder="blur"
                    blurDataURL={coverImageBlurDataURL}
                    src={coverImageUrl}
                    className="object-cover object-center hover:scale-110 transition-all duration-300 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </Link>

                <div className="p-3">
                  <Link
                    href={`/blogs/${slug}`}
                    className="font-semibold text-secondary-800 hover:text-primary-700 transition-colors block mb-3"
                  >
                    {title}
                  </Link>

                  <div className="flex justify-between items-center pt-3 border-t border-secondary-100">
                    <div className="flex justify-center items-center gap-2">
                      <Image
                        alt={author?.name}
                        className={
                          author?.avatarUrl &&
                          "rounded-full ring-1 ring-secondary-300"
                        }
                        width={28}
                        height={28}
                        src={author?.avatarUrl || "/avatar.svg"}
                        placeholder={author?.avatarUrl ? "blur" : "empty"}
                        blurDataURL={author?.avatarBlurDataURL}
                      />
                      <span className="font-medium text-sm text-secondary-600">
                        {author?.name}
                      </span>
                    </div>
                    <Link
                      href={`/blogs/${slug}`}
                      className="rounded-lg bg-primary-700 px-3 py-1.5 hover:bg-primary-800 transition-all text-xs font-medium duration-200 ease-out text-white"
                    >
                      مشاهده
                    </Link>
                  </div>
                </div>
              </div>
            );
          },
        )}
      </div>
    </section>
  );
};

export default RelatedPosts;

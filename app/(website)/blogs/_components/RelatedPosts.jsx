import Image from "next/image";
import Link from "next/link";
import React from "react";

const RelatedPosts = ({ posts }) => {
  return (
    <section className="mt-5">
      <p className="text-xl font-semibold">پست های مرتبط:</p>
      <div className="grid grid-cols-12 gap-5 mt-5">
        {posts.map(({ _id, slug, title, author, coverImageUrl }) => {
          return (
            <div
              key={_id}
              className="col-span-12 md:col-span-4 lg:col-span-3 border border-secondary-200 shadow-md rounded-t-lg rounded-b-md"
            >
              <Link
                href={`/blogs/${slug}`}
                className="relative aspect-video h-44 rounded-t-lg overflow-hidden"
              >
                <Image
                  fill
                  quality={75}
                  alt={title}
                  sizes="100%"
                  src={coverImageUrl}
                  className="object-cover object-center hover:scale-110 transition-all duration-200 ease-out"
                />
              </Link>
              {/* title */}
              <Link
                href={`/blogs/${slug}`}
                className="font-semibold px-2 mt-4 w-fit"
              >
                {title}
              </Link>

              <div className="flex justify-between items-center px-2 py-4">
                {/* author */}
                <div className="flex justify-center  items-center gap-2">
                  <Image
                    alt={author?.name}
                    className={
                      author?.avatarUrl &&
                      "rounded-full ring-1 ring-secondary-300"
                    }
                    width={30}
                    height={30}
                    src={author?.avatarUrl || "/avatar.svg"}
                  />
                  <span className="font-medium text-sm">{author?.name}</span>
                </div>
                <Link
                  href={`/blogs/${slug}`}
                  className="rounded-md bg-primary-800 px-2 py-1 hover:bg-primary-900 transition-all text-sm duration-200 ease-out text-white"
                >
                  <span>مشاهده</span>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedPosts;

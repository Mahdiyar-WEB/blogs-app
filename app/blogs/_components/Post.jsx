import ButtonIcon from "components/ButtonIcon";
import toPersianDigits from "utils/toPersianDigits";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Post = ({
  title,
  coverImageUrl,
  slug,
  author,
  readingTime,
  commentsCount,
  isBookmarked,
}) => {
  const slugURL = `/blogs/${slug}`;
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-4 border rounded-lg shadow-md ">
      <Link
        href={slugURL}
        className="relative aspect-video h-56 rounded-t-lg overflow-hidden"
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
      {/* body */}
      <div className="mt-5 pb-4 px-3">
        {/* title */}
        <Link href={slugURL} className="text-secondary-700 font-semibold">
          {title}
        </Link>
        {/* content */}
        <div className="flex justify-between items-center mt-3">
          {/* author */}
          <div className="flex justify-center items-center gap-2">
            <Image
              alt={author?.name}
              className="rounded-full ring-1 ring-secondary-300"
              width={30}
              height={30}
              src={author?.avatarUrl}
            />
            <span>{author?.name}</span>
          </div>
          {/* reading time */}
          <div className="flex justify-center items-center gap-1 text-sm">
            <div className="flex gap-1 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4 stroke-secondary-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>خواندن:</span>
            </div>
            <p className="flex gap-1">
              <span>{toPersianDigits(readingTime)}</span>
              <span>دقیقه</span>
            </p>
          </div>
        </div>
        {/* interactions */}
        <div className="flex justify-between mt-6 ">
          <Link
            href={slugURL}
            className="flex items-center gap-1 rounded-md bg-primary-800 px-2 py-1 hover:bg-primary-900 transition-all duration-200 ease-out text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-5"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
                clipRule="evenodd"
              />
            </svg>
            <span>مشاهده</span>
          </Link>
          <div className="flex gap-3">
            {/* comments */}
            <ButtonIcon variant="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
                />
              </svg>
              <span>{toPersianDigits(commentsCount)}</span>
            </ButtonIcon>
            {/* like */}
            <ButtonIcon variant="red">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </ButtonIcon>
            {/* bookmark */}
            <ButtonIcon variant="primary">
              {!isBookmarked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m3 3 1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 0 1 1.743-1.342 48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664 19.5 19.5"
                  />
                </svg>
              )}
            </ButtonIcon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;

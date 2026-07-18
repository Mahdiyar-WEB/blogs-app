"use client";

import toPersianDigits from "utils/toPersianDigits";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import postServices from "api/postServices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useUser } from "context/UserContext";
import truncateText from "utils/truncateText";

const Post = ({
  title,
  coverImageUrl,
  coverImageBlurDataURL = "",
  slug,
  author,
  readingTime,
  commentsCount,
  likesCount,
  isBookmarked,
  _id,
  isLiked,
  index = 0,
}) => {
  const router = useRouter();
  const { user } = useUser();

  const likePostHandler = async (id) => {
    if (!user) {
      router.push("/login");
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    try {
      const { data } = await postServices.likePost(id);
      router.refresh();
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const bookmarkPostHandler = async (id) => {
    if (!user) {
      router.push("/login");
      toast.error("لطفا وارد حساب کاربری خود شوید");
      return;
    }
    try {
      const { data } = await postServices.bookmarkPost(id);
      router.refresh();
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  const slugURL = `/blogs/${slug}`;

  return (
    <motion.div
      className="group relative col-span-12 lg:col-span-4"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.2) }}
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="relative overflow-hidden rounded-xl border border-secondary-200 bg-white shadow-sm transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-primary-300 group-hover:shadow-[0_16px_40px_rgba(74,109,255,0.12)]">
        <Link
          href={slugURL}
          className="relative block aspect-video h-56 overflow-hidden rounded-t-lg"
        >
          <Image
            fill
            quality={75}
            alt={title}
            placeholder="blur"
            blurDataURL={coverImageBlurDataURL}
            sizes="100%"
            src={coverImageUrl}
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        </Link>

        <div className="mt-5 pb-4 px-3">
          <Link href={slugURL} className="text-secondary-700 font-semibold">
            {truncateText(title,20)}
          </Link>

          <div className="flex justify-between items-center mt-3">
            <div className="flex justify-center items-center gap-2">
              <div className="relative w-8 h-8 ">
                <Image
                  alt={author?.name || "deleted-account"}
                  className={`${author?.avatarUrl ? "rounded-full ring-1 ring-secondary-300" : ""} object-cover object-center`}
                  fill
                  src={author?.avatarUrl || "/avatar.svg"}
                  placeholder={author?.avatarUrl ? "blur" : "empty"}
                  blurDataURL={author?.avatarBlurDataURL}
                />
              </div>
              <span>{author?.name || "حساب حذف شده"}</span>
            </div>

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

          <div className="flex justify-between items-center mt-6">
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

            <div className="flex items-center bg-white border border-secondary-200 rounded-lg overflow-hidden">
              <button
                type="button"
                className="flex items-center justify-center gap-x-1 px-2.5 py-1.5 h-full text-sm bg-white text-secondary-500 hover:bg-secondary-500 hover:text-white transition-all duration-300 ease-out [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-inherit"
              >
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
              </button>

              <span className="w-px h-4 bg-secondary-200 shrink-0" />

              <button
                type="button"
                onClick={() => likePostHandler(_id)}
                className="flex items-center justify-center gap-x-1 px-2.5 py-1.5 h-full text-sm bg-white text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 ease-out [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-inherit"
              >
                {isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                  </svg>
                )}
                <span>{toPersianDigits(likesCount)}</span>
              </button>

              <span className="w-px h-4 bg-secondary-200 shrink-0" />

              <button
                type="button"
                onClick={() => bookmarkPostHandler(_id)}
                className="flex items-center justify-center gap-x-1 px-2.5 py-1.5 h-full text-xs bg-white text-primary-700 hover:bg-primary-700 hover:text-white transition-all duration-300 ease-out [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-inherit"
              >
                {isBookmarked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                      clipRule="evenodd"
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
                      d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Post;

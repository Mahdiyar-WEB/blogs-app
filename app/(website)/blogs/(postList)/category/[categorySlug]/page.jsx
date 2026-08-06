import { cookies } from "next/headers";
import React from "react";
import Post from "../../../_components/Post";
import postServices from "api/postServices";
import generateSSRCookies from "utils/generateSSRCookies";
import Image from "next/image";
import queryString from "query-string";
import toPersianDigits from "utils/toPersianDigits";
import Pagination from "components/Pagination";

export async function generateMetadata({ params }) {
  const { categorySlug } = await params;
  return { title: categorySlug };
}

const CategorySlug = async ({ params, searchParams }) => {
  const cookieStore = await cookies();
  const { categorySlug } = await params;
  const options = await searchParams;
  const { posts, totalPages } = await postServices.getPostsByCategory(
    categorySlug,
    queryString.stringify(options),
    generateSSRCookies(cookieStore),
  );

  return (
    <div className="grid grid-cols-12 gap-5">
      {options?.search && (
        <>
          {posts.length === 0 ? (
            <p className="col-span-12 font-medium flex gap-1">
              <span>پستی برای جستجوی</span>
              <span className="text-primary-700 font-semibold">
                &quot;{options?.search}&quot;
              </span>
              <span>پیدا نشد!</span>
            </p>
          ) : (
            <p className="col-span-12 font-medium flex gap-1">
              <span>{toPersianDigits(posts?.length)}</span>
              <span>پست بر اساس جستجوی</span>
              <span className="text-primary-700 font-semibold">
                &quot;{options?.search}&quot;
              </span>
              <span>پیدا شد</span>
            </p>
          )}
        </>
      )}
      {!!posts.length === false ? (
        <div className="col-span-12 flex flex-col items-center justify-center">
          <Image
            width={500}
            height={500}
            src="/no-blogs.webp"
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRgoBAABXRUJQVlA4WAoAAAAQAAAADQAACQAAQUxQSGoAAAABcFpt27LcuEZ3iLoAdLpHZtBMZwBtHBbgkMjeIJKI7pDdvh0iYgL4NXvtBin/g8XufDZpRmU/rt7r7zUrBTIv4coHNET3NKhbe8EtDebKWHCJQKjUFnQiEIyVN4vFYrGchm0g15v8fz0AVlA4IHoAAABQAgCdASoOAAoAAgA0JbACdAYul2w2vCjc4AAA/Nj6mtzioQ79IW299pVH2o8B6fNMxo2CD+Tc2jKz6rxV8jGp0LsqJSITd3ty2jJ0PirkcKnX7TQYQKR5OEwPyKcK+O+XHpK8i/dZvSi/L7QGqBf+DKf6mg8dg/jgAA=="
            sizes="100%"
            quality={100}
            alt="no blogs in this category"
          />
          <h1 className="font-semibold text-2xl">متاسفانه پستی پیدا نشد!</h1>
        </div>
      ) : (
        posts.map((post) => <Post key={post._id} {...post} />)
      )}
      <div className="my-5 col-span-12">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default CategorySlug;

import { cookies } from "next/headers";
import React from "react";
import Post from "../../../_components/Post";
import postServices from "api/postServices";
import generateSSRCookies from "utils/generateSSRCookies";
import Image from "next/image";
import queryString from "query-string";
import toPersianDigits from "utils/toPersianDigits";

const CategorySlug = async ({ params, searchParams }) => {
  const cookieStore = await cookies();
  const { categorySlug } = await params;
  const options = await searchParams;
  let posts = [];
  try {
    posts = await postServices.getPostsByCategory(
      categorySlug,
      queryString.stringify(options),
      generateSSRCookies(cookieStore),
    );
  } catch (error) {}

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
            src="/no-blogs.png"
            sizes="100%"
            quality={100}
            alt="no blogs in this category"
          />
          <h1 className="font-semibold text-2xl">متاسفانه پستی پیدا نشد!</h1>
        </div>
      ) : (
        posts.map((post, id) => <Post key={id} {...post} />)
      )}
    </div>
  );
};

export default CategorySlug;

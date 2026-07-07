import React, { Suspense } from "react";
import PostsInformation from "../../_components/PostsInformation";
import SearchBox from "components/SearchBox";
import queryString from "query-string";
import postServices from "api/postServices";
import { cookies } from "next/headers";
import generateSSRCookies from "utils/generateSSRCookies";
import Pagination from "components/Pagination";
import Link from "next/link";
import BreadCrumbs from "components/BreadCrumbs";

const page = async ({ searchParams }) => {
  const query = queryString.stringify(await searchParams);
  const cookieStore = await cookies();
  const { totalPages } = await postServices.getAllPosts(
    generateSSRCookies(cookieStore),
    query,
  );
  return (
    <main className="md:p-7">
      <div className="flex justify-between items-baseline">
        <BreadCrumbs />
        <Link
          href="/profile/blogs/create"
          className="border md:hidden w-fit ms-auto mb-2 gap-1 items-center bg-primary-800 text-sm text-secondary-0 px-2 rounded-md py-2 flex"
        >
          <span>ایجاد پست</span>
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <Suspense>
          <SearchBox />
        </Suspense>
        <Link
          href="/profile/blogs/create"
          className="border md:flex gap-1 items-center bg-primary-800 text-secondary-0 px-4 rounded-md py-2 hidden"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>

          <span>ایجاد پست</span>
        </Link>
      </div>
      <PostsInformation fetchQueries={query} />
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default page;

import React, { Suspense } from "react";
import PostsInformation from "../../_components/PostsInformation";
import SearchBox from "components/SearchBox";
import queryString from "query-string";
import postServices from "api/postServices";
import { cookies } from "next/headers";
import generateSSRCookies from "utils/generateSSRCookies";
import Pagination from "components/Pagination";

const page = async ({ searchParams }) => {
  const query = queryString.stringify(await searchParams);
  const cookieStore = await cookies();
  const { totalPages } = await postServices.getAllPosts(
    generateSSRCookies(cookieStore),
    query,
  );
  return (
    <main className="p-5">
      <Suspense>
        <SearchBox />
      </Suspense>
      <PostsInformation fetchQueries={query} />
      <Pagination totalPages={totalPages} />
    </main>
  );
};

export default page;

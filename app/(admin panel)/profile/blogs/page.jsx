import React, { Suspense } from "react";
import PostsInformation from "../../_components/PostsInformation";
import SearchBox from "components/SearchBox";
import queryString from "query-string";

const page = async ({ searchParams }) => {
  const query = queryString.stringify(await searchParams);
  return (
    <main className="p-5">
      <Suspense>
        <SearchBox />
      </Suspense>
      <PostsInformation fetchQueries={query} />
    </main>
  );
};

export default page;

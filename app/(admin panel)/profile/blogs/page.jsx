import React, { Suspense } from "react";
import PostsInformation from "../../_components/PostsInformation";
import SearchBox from "components/SearchBox";

const page = () => {
  return (
    <main className="p-5">
      <Suspense>
        <SearchBox />
      </Suspense>
      <PostsInformation />
    </main>
  );
};

export default page;

import React, { Suspense } from "react";
import PostsInformation from "../_components/PostsInformation";
import CardWrapper from "../_components/CardWrapper";
import CardWrapperLoading from "../_components/CardWrapperLoading";

const page = () => {
  return (
    <main className="p-7">
      {/* report section */}
      <h3 className="col-span-12 font-medium text-xl mb-5">اطلاعات سایت</h3>
      <Suspense fallback={<CardWrapperLoading />}>
        <CardWrapper />
      </Suspense>
      {/* posts information section */}
      <h3 className="font-medium text-xl mb-5">آخرین پست ها</h3>
      <PostsInformation
        fetchQueries="sort=latest&limit=5"
        title="آخرین پست ها"
      />
    </main>
  );
};

export default page;

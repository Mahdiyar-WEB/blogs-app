import React, { Suspense } from "react";
import PostsInformation from "../_components/PostsInformation";
import CardWrapper from "../_components/CardWrapper";
import CardWrapperLoading from "../_components/CardWrapperLoading";

const page = () => {
  return (
    <div className="space-y-8">
      {/* report section */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-secondary-900">اطلاعات سایت</h2>
          <p className="mt-1 text-sm text-secondary-500">
            خلاصه وضعیت کاربران، محتوا و تعاملات
          </p>
        </div>
        <Suspense fallback={<CardWrapperLoading />}>
          <CardWrapper />
        </Suspense>
      </section>

      {/* posts information section */}
      <section>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-secondary-900">آخرین پست ها</h2>
          <p className="mt-1 text-sm text-secondary-500">
            جدیدترین محتوای ثبت شده در سایت
          </p>
        </div>
        <PostsInformation
          fetchQueries="sort=latest&limit=5"
          title="آخرین پست ها"
        />
      </section>
    </div>
  );
};

export default page;

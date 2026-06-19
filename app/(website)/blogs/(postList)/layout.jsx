import React, { Suspense } from "react";
import CategoryList from "../_components/CategoryList";
import CategoryListLoading from "../_components/CategoryListLoading";
import PostsLoading from "../_components/PostsLoading";
import SearchBox from "../_components/SearchBox";
import BlogsSort from "../_components/BlogsSort";

const Layout = ({ children }) => {
  return (
    <main className="w-11/12 mx-auto 2xl:max-w-screen-2xl">
      <div className="grid grid-cols-12 md:gap-x-8">
        <aside className="col-span-12 md:col-span-4 mb-5 xl:col-span-3 border p-5 rounded-xl shadow-md h-fit">
          <h2 className="text-secondary-600 text-md xl:text-xl mb-5 font-semibold flex items-center gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <span>دسته بندی ها:</span>
          </h2>
          <Suspense fallback={<CategoryListLoading />}>
            <CategoryList />
          </Suspense>
        </aside>
        <section className="col-span-12 md:col-span-8 xl:col-span-9">
          <div className="flex gap-3">
            <Suspense fallback={null}>
              <SearchBox />
            </Suspense>
            <Suspense fallback={null}>
              <BlogsSort />
            </Suspense>
          </div>
          <Suspense fallback={<PostsLoading />}>{children}</Suspense>
          <div className="mt-5">pagination</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;

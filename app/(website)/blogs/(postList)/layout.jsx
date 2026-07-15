import React, { Suspense } from "react";
import CategoryList from "../_components/CategoryList";
import CategoryListLoading from "../_components/CategoryListLoading";
import PostsLoading from "../_components/PostsLoading";
import SearchBox from "components/SearchBox";
import BlogsSort from "../_components/BlogsSort";
import DelayedFallback from "components/ui/DelayFallback";

const Layout = ({ children }) => {
  return (
    <main className="w-11/12 mx-auto 2xl:max-w-screen-2xl">
      <div className="grid grid-cols-12 md:gap-x-8">
        <aside className="hidden md:grid col-span-12 md:col-span-4 mb-5 xl:col-span-3 border p-5 rounded-xl shadow-md h-fit bg-white">
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
            <span>دسته‌بندی ها:</span>
          </h2>
          <Suspense
            fallback={
              <DelayedFallback delay={250}>
                <CategoryListLoading />
              </DelayedFallback>
            }
          >
            <CategoryList />
          </Suspense>
        </aside>
        <div className="md:hidden relative mb-2 col-span-12">
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2 pe-14">
            <Suspense>
              <CategoryList mobile />
            </Suspense>
          </div>

          <div className="pointer-events-none absolute left-0 -top-1 h-full w-14 bg-gradient-to-l from-transparent to-white flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-secondary-400 animate-[hint_3s_infinite]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </div>
        </div>
        <section className="col-span-12 md:col-span-8 xl:col-span-9">
          <div className="flex flex-col-reverse md:flex-row gap-3">
            <Suspense fallback={null}>
              <SearchBox />
            </Suspense>
            <Suspense fallback={null}>
              <BlogsSort />
            </Suspense>
          </div>
          <Suspense
            fallback={
              <DelayedFallback delay={450}>
                <PostsLoading />
              </DelayedFallback>
            }
          >
            {children}
          </Suspense>
        </section>
      </div>
    </main>
  );
};

export default Layout;

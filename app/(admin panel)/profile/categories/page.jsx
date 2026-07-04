import categoryServices from "api/categoryServices";
import Pagination from "components/Pagination";
import SearchBox from "components/SearchBox";
import Link from "next/link";
import React, { Suspense } from "react";
import CategoriesInformation from "../../_components/CategoriesInformation";
import queryString from "query-string";
import BreadCrumbs from "components/BreadCrumbs";

const CategoriesPage = async ({ searchParams }) => {
  const query = queryString.stringify(await searchParams);
  const { data } = await categoryServices.getAllCategories(query);

  return (
    <main className="p-7">
      <div className="flex justify-between items-baseline">
        <BreadCrumbs />
        <Link
          href="/profile/categories/create"
          className="border md:hidden w-fit ms-auto mb-2 gap-1 items-center bg-primary-800 text-sm text-secondary-0 px-2 rounded-md py-2 flex"
        >
          <span>ایجاد دسته‌بندی</span>
        </Link>
      </div>
      <div className="flex justify-between items-center">
        <Suspense>
          <SearchBox />
        </Suspense>
        <Link
          href="/profile/categories/create"
          className="border hidden md:flex gap-1 items-center bg-primary-800 text-secondary-0 px-4 rounded-md py-2"
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

          <span>ایجاد دسته‌بندی</span>
        </Link>
      </div>
      <CategoriesInformation fetchQueries={query} />
      <Pagination totalPages={data.totalPages} />
    </main>
  );
};

export default CategoriesPage;

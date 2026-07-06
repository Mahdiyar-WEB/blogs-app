"use client";
import React from "react";
import toPersianDigits from "utils/toPersianDigits";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const Pagination = ({ totalPages }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const page = Number(searchParams.get("page") || 1);

  const paginationHandler = (action) => {
    const pageValue = action === "increase" ? page + 1 : page - 1;

    const newParams = new URLSearchParams(searchParams.toString());

    if (pageValue > 1) {
      newParams.set("page", String(pageValue));
    } else {
      newParams.delete("page");
    }

    router.push(`${pathname}?${newParams}`);
  };

  return (
    <div className="flex justify-center items-center gap-3 w-fit mx-auto px-5 py-2 rounded-xl shadow-md bg-white border border-secondary-100">
      <p className="flex gap-1">
        <span>صفحه:</span>
        <span>{toPersianDigits(page)}</span>
      </p>
      <button
        disabled={page <= 1}
        onClick={() => paginationHandler("decrease")}
        className="flex items-center gap-px border border-secondary-200 text-sm py-1 pe-2 ps-1 rounded-md text-secondary-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
        <span>قبلی</span>
      </button>
      <button
        disabled={page >= totalPages}
        onClick={() => paginationHandler("increase")}
        className="flex items-center gap-px border border-secondary-200 text-sm py-1 ps-2 pe-1 rounded-md text-secondary-500"
      >
        <span>بعدی</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;

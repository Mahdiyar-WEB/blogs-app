"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const searchValue = e.target.search.value;
    const newParams = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      newParams.set("search", searchValue);
    } else {
      newParams.delete("search");
    }
    router.push(`${pathname}?${newParams}`);
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="mb-5 w-full md:w-1/2 xl:w-1/3 h-11 flex gap-2 justify-between bg-white/50 px-3 py-2 border border-secondary-200 rounded-lg shadow-md"
    >
      <input
        type="text"
        name="search"
        placeholder="جستجو ..."
        className="w-full bg-inherit outline-none border-none"
      />
      <button type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 stroke-secondary-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBox;

"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SearchBox = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeSearch = searchParams.get("search");

  const [search, setSearch] = useState(activeSearch || "");

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const searchValue = e.target.search.value.trim();

    const newParams = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      newParams.set("search", searchValue);
      newParams.set("page", 1);
    } else {
      newParams.delete("search");
      newParams.delete("page");
    }

    router.push(`${pathname}?${newParams.toString()}`);
  };

  const removeSearchHandler = () => {
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.delete("search");
    newParams.delete("page");

    setSearch("");

    const queryString = newParams.toString();

    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  useEffect(() => {
    return () => {
      setSearch("");
    };
  }, []);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="mb-5 w-full md:w-1/2 xl:w-1/3 h-11 flex items-center gap-2 justify-between bg-white px-3 py-2 border border-secondary-200 rounded-lg shadow-md"
    >
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="جستجو ..."
        className="w-full bg-white/0 outline-none border-none"
      />

      <div className="flex items-center gap-2">
        {activeSearch && (
          <div className="flex items-center gap-1 rounded-md bg-primary-100 text-primary-900 px-2 py-1 text-xs whitespace-nowrap">
            <span>{activeSearch}</span>

            <button
              type="button"
              onClick={removeSearchHandler}
              className="hover:text-red-500 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

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
      </div>
    </form>
  );
};

export default SearchBox;

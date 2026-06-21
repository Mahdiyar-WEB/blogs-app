"use client";
import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Select from "components/Select";

const sortOptions = [
  {
    label: "تاریخ ایجاد (جدید ترین)",
    value: "latest",
  },
  {
    label: "تاریخ ایجاد (قدیمی ترین)",
    value: "earliest",
  },
  {
    label: "محبوبیت",
    value: "popular",
  },
  {
    label: "زمان مطالعه (نزولی)",
    value: "time_desc",
  },
  {
    label: "زمان مطالعه (صعودی)",
    value: "time_asc",
  },
];

const BlogsSort = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <div className="h-11 w-full md:w-1/2 xl:w-1/3 flex justify-between bg-white/50 border border-secondary-200 rounded-lg shadow-md">
      <Select
        onChange={(e) => {
          router.push(
            pathname + "?" + createQueryString("sort", e.target.value),
          );
        }}
        value={searchParams.get("sort") || "latest"}
        options={sortOptions}
      />
    </div>
  );
};
export default BlogsSort;

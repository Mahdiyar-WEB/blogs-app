import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="my-20 container">
      <h1 className="text-center text-xl md:text-3xl font-bold text-secondary-800">
        پستی که دنبالش بودی پیدا نشد! 😢
      </h1>
      <Link
        href="/blogs"
        className="w-fit flex text-primary-700 font-medium mx-auto justify-center items-center px-3 py-2 border border-primary-400 rounded-xl gap-2 mt-10"
      >
        <ArrowRightIcon className="size-6" />
        <span>بازگشت به صفحه پست ها</span>
      </Link>
    </main>
  );
};

export default NotFound;

"use client";
import useMoveBack from "@/hooks/useMoveBack";
import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const NotFound = () => {
  const moveBack = useMoveBack();
  return (
    <main className="my-20 container">
      <h1 className="text-center text-xl md:text-3xl font-bold text-secondary-800">
        صفحه ای که دنبالش بودی پیدا نشد! 😢
      </h1>
      <button className="flex text-primary-700 font-medium mx-auto justify-center items-center px-3 py-2 border border-primary-400 rounded-xl gap-2 mt-10" onClick={moveBack}>
        <ArrowRightIcon className="size-6" />
        <span>بازگشت به صفحه قبل</span>
      </button>
    </main>
  );
};

export default NotFound;

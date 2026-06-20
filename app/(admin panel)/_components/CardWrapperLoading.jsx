import Card from "components/Card";
import React from "react";

const CardWrapperLoading = () => {
  return (
    <section className="grid grid-cols-12 gap-8 mb-10 animate-pulse">
      <div className="col-span-12 md:col-span-6 xl:col-span-4 px-6 py-4 space-y-5 border rounded-lg bg-secondary-0">
        <p className="flex gap-2 items-center font-semibold">
          <span className="w-8 h-8 rounded-full bg-secondary-300"></span>
          <span className="w-20 h-6 rounded-md bg-secondary-300"></span>
        </p>
        <div className="flex items-center justify-center py-12 rounded-lg border bg-secondary-300"></div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-4 px-6 py-4 space-y-5 border rounded-lg bg-secondary-0">
        <p className="flex gap-2 items-center font-semibold">
          <span className="w-8 h-8 rounded-full bg-secondary-300"></span>
          <span className="w-20 h-6 rounded-md bg-secondary-300"></span>
        </p>
        <div className="flex items-center justify-center py-12 rounded-lg border bg-secondary-300"></div>
      </div>
      <div className="col-span-12 md:col-span-6 xl:col-span-4 px-6 py-4 space-y-5 border rounded-lg bg-secondary-0">
        <p className="flex gap-2 items-center font-semibold">
          <span className="w-8 h-8 rounded-full bg-secondary-300"></span>
          <span className="w-20 h-6 rounded-md bg-secondary-300"></span>
        </p>
        <div className="flex items-center justify-center py-12 rounded-lg border bg-secondary-300"></div>
      </div>
    </section>
  );
};

export default CardWrapperLoading;

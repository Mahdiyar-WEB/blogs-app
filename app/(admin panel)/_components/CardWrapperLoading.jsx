import React from "react";

function CardSkeleton() {
  return (
    <div className="col-span-12 rounded-2xl border border-secondary-200 bg-white p-5 shadow-sm md:col-span-6 xl:col-span-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="h-12 w-12 rounded-2xl bg-secondary-200" />
          <span className="space-y-2">
            <span className="block h-4 w-24 rounded-lg bg-secondary-200" />
            <span className="block h-3 w-32 rounded-lg bg-secondary-100" />
          </span>
        </div>
        <span className="h-5 w-5 rounded-md bg-secondary-100" />
      </div>
      <span className="mt-6 block h-9 w-20 rounded-xl bg-secondary-200" />
    </div>
  );
}

const CardWrapperLoading = () => {
  return (
    <section className="mb-8 grid animate-pulse grid-cols-12 gap-5 lg:gap-6">
      {Array.from({ length: 3 }).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </section>
  );
};

export default CardWrapperLoading;

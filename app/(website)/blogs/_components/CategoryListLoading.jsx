import React from "react";

const CategoryListLoading = ({ mobile = false }) => {
  if (mobile) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center gap-2 overflow-x-auto px-1 scrollbar-hide">
          <div className="h-12 w-16 shrink-0 rounded-xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-12 w-24 shrink-0 rounded-xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-12 w-20 shrink-0 rounded-xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-12 w-28 shrink-0 rounded-xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-12 w-22 shrink-0 rounded-xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-12 w-24 shrink-0 rounded-xl bg-secondary-200 dark:bg-secondary-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-pulse px-1 space-y-3">
      <div className="h-8 w-full rounded-md bg-secondary-200 dark:bg-secondary-700" />
      <div className="h-8 w-full rounded-md bg-secondary-200 dark:bg-secondary-700" />
      <div className="h-8 w-full rounded-md bg-secondary-200 dark:bg-secondary-700" />
      <div className="h-8 w-full rounded-md bg-secondary-200 dark:bg-secondary-700" />
      <div className="h-8 w-full rounded-md bg-secondary-200 dark:bg-secondary-700" />
      <div className="h-8 w-full rounded-md bg-secondary-200 dark:bg-secondary-700" />
      <div className="h-8 w-full rounded-md bg-secondary-200 dark:bg-secondary-700" />
      <div className="h-8 w-full rounded-md bg-secondary-200 dark:bg-secondary-700" />
      <div className="h-8 w-full rounded-md bg-secondary-200 dark:bg-secondary-700" />
    </div>
  );
};

export default CategoryListLoading;

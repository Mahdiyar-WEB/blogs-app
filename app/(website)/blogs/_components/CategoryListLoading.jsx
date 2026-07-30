import React from "react";

const CategoryListLoading = ({ mobile = false }) => {
  if (mobile) {
    return (
      <div className="animate-pulse">
        <div className="flex items-center gap-2 overflow-x-auto px-1 scrollbar-hide">
          <div className="h-9 w-12 shrink-0 rounded-2xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-9 w-12 shrink-0 rounded-2xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-9 w-12 shrink-0 rounded-2xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-9 w-12 shrink-0 rounded-2xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-9 w-12 shrink-0 rounded-2xl bg-secondary-200 dark:bg-secondary-700" />
          <div className="h-9 w-12 shrink-0 rounded-2xl bg-secondary-200 dark:bg-secondary-700" />
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

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const CategoryItem = ({ path, text, mobile = false, prefetch = true }) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  if (mobile) {
    return (
      <Link
        href={path}
        prefetch={prefetch}
        className={[
          "flex items-center rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200",
          isActive
            ? "bg-primary-50 text-primary-700 border border-primary-200 shadow-sm"
            : "bg-white text-secondary-700 border border-secondary-100 hover:bg-secondary-50 hover:border-secondary-200",
        ].join(" ")}
      >
        <span className="truncate">{text}</span>
      </Link>
    );
  }

  return (
    <Link
      href={path}
      prefetch={prefetch}
      className={[
        "group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-200 border",
        isActive
          ? "bg-primary-50/90 border-primary-200 text-primary-700 shadow-sm"
          : "bg-white border-transparent text-secondary-800 hover:bg-secondary-50 hover:border-secondary-200 hover:text-primary-600",
      ].join(" ")}
    >
      <span className="truncate text-[15px] font-medium">{text}</span>

      <span
        className={[
          "h-1.5 w-1.5 rounded-full transition-all duration-200",
          isActive
            ? "bg-primary-500"
            : "bg-secondary-300 group-hover:bg-primary-300",
        ].join(" ")}
      />
    </Link>
  );
};

export default CategoryItem;

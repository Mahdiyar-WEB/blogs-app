"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const NavLink = ({
  path = "/",
  text,
  className,
  listOption = false,
  mobile = false,
  prefetch = "auto",
}) => {
  const pathName = usePathname();
  const active = pathName === path;
  return (
    <Link
      prefetch={prefetch}
      className={`font-medium transition-all duration-200 ease-out ${listOption && "px-2 py-1 hover:ps-3"} ${mobile && `shrink-0 rounded-full border px-4 py-2 text-sm whitespace-nowrap `}
    ${
      active && listOption
        ? "text-white bg-primary-900 rounded-md"
        : active && mobile
          ? "bg-primary-900 text-white border-primary-900"
          : active
            ? "text-primary-900"
            : mobile
              ? "bg-white border-secondary-200 text-secondary-600 hover:border-secondary-300"
              : "text-secondary-400 hover:text-secondary-900"
    }
    ${className || ""}
  `}
      href={path}
    >
      {text}
    </Link>
  );
};

export default React.memo(NavLink);

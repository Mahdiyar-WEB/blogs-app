"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const NavLink = ({
  path='/',
  text,
  className,
  listOption = false,
  prefetch = "auto",
}) => {
  const pathName = usePathname();
  return (
    <Link
      prefetch={prefetch}
      className={`font-medium  transition-all duration-200 ease-out ${
        listOption && "px-2 py-1 hover:ps-3"
      } ${
        pathName === path && listOption
          ? "text-white bg-primary-900 rounded-md"
          : pathName === path && !listOption
            ? "text-primary-900"
            : "text-secondary-400 hover:text-secondary-900"
      } ${className}`}
      href={path}
    >
      {text}
    </Link>
  );
};

export default NavLink;

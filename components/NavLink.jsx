"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const NavLink = ({ path, text }) => {
  const pathName = usePathname();
  return (
    <Link
      className={`font-medium ${
        pathName === path ? "text-primary-900" : "text-secondary-400"
      }`}
      href={path}
    >
      {text}
    </Link>
  );
};

export default NavLink;

import NavLink from "@/components/NavLink";
import React from "react";

const Header = () => {
  const user = false;
  return (
    <header className="py-3 shadow-md border-b border-secondary-300">
      <nav className="mx-10 2xl:mx-auto flex xl:max-w-screen-xl justify-between">
        <ul className="flex gap-10">
          <li>
            <NavLink path="/" text="خانه" />
          </li>
          <li>
            <NavLink path="/blogs" text="بلاگ ها" />
          </li>
        </ul>
        {user ? (
          <NavLink path="/profile" text="پروفایل" />
        ) : (
          <NavLink path="/login" text="ورود" />
        )}
      </nav>
    </header>
  );
};

export default Header;

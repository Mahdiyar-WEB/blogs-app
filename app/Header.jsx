import NavLink from "components/NavLink";
import React from "react";

const Header = () => {
  const user = false;
  return (
    <header className="py-3 shadow-md border border-secondary-200 rounded-md w-11/12 mx-auto 2xl:max-w-screen-2xl sticky top-3 left-0 bg-inherit z-10 mb-10">
      <nav className="mx-3 lg:mx-10 flex justify-between">
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

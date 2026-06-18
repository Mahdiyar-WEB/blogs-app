"use client";
import NavLink from "components/NavLink";
import { useUser } from "context/UserContext";
import { useSyncExternalStore } from "react";

// Outside component — no re-creation on each render
const subscribe = () => () => {};

const Header = () => {
  const { user, loading } = useUser();
  
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,   // client snapshot
    () => false,  // server snapshot
  );

  return (
    <header className="py-3 shadow-md border border-secondary-200 rounded-md w-11/12 mx-auto 2xl:max-w-screen-2xl sticky top-3 left-0 bg-inherit z-10 mb-10">
      <nav className="mx-3 lg:mx-10 flex justify-between">
        <ul className="flex gap-10">
          <li><NavLink path="/" text="خانه" /></li>
          <li><NavLink path="/blogs" text="بلاگ ها" /></li>
        </ul>

        {!mounted ? (
          <div className="opacity-0">
            <NavLink path="/login" text="ورود" />
          </div>
        ) : (
          <div className={`${loading ? "opacity-70 blur-sm" : "blur-0 opacity-100"}`}>
            {user ? (
              <NavLink path="/profile" text="پروفایل" />
            ) : (
              <NavLink path="/login" text="ورود" />
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
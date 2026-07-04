"use client";
import NavLink from "components/NavLink";
import { useUser } from "context/UserContext";

const Header = () => {
  const { user, isLoading } = useUser();

  return (
    <header className="py-3 shadow-md border border-secondary-200 rounded-md w-11/12 mx-auto 2xl:max-w-screen-2xl sticky top-3 left-0 bg-secondary-50 z-10 mb-10">
      <nav className="mx-3 lg:mx-10 flex justify-between">
        <ul className="flex gap-4 md:gap-8">
          <li>
            <NavLink path="/" text="خانه" />
          </li>
          <li>
            <NavLink path="/blogs" text="بلاگ ها" />
          </li>
        </ul>

        {isLoading ? (
          <div className="animate-spin">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </div>
        ) : (
          <div>
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

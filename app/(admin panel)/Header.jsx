import { useUser } from "context/UserContext";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Header({ onMobileToggle }) {
  const { user, logout } = useUser();

  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onClickHandler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", onClickHandler);

    return () => {
      document.removeEventListener("click", onClickHandler);
    };
  }, []);

  return (
    <header className="ps-5 pe-10 lg:pe-16 py-5 flex justify-between items-center">
      <button onClick={onMobileToggle} className="lg:hidden p-1">
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
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <h2 className="hidden lg:flex gap-2 text-lg font-medium">
        <span>سلام؛</span>
        <span>{user?.name}</span>
      </h2>

      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="cursor-pointer"
        >
          <Image
            alt="profile"
            width={35}
            height={35}
            className={
              user?.avatarUrl
                ? "rounded-full ring-1 ring-secondary-300"
                : ""
            }
            src={user?.avatarUrl || "/avatar.svg"}
          />
        </button>

        {open && (
          <div className="absolute top-10 -left-8 lg:-left-12 w-36 rounded-md border bg-secondary-0 text-secondary-700 shadow-md space-y-3 text-sm font-medium py-3 z-50">
            <button
              onClick={logout}
              className="flex w-full items-center justify-between px-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              <span>خروج از حساب</span>
            </button>

            <hr />

            <Link
              href={`/profile/users/edit?${user?._id}`}
              className="flex w-full items-center justify-between px-2"
              onClick={() => setOpen(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>

              <span>ویرایش اطلاعات</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
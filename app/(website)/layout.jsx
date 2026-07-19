import Header from "./Header";
import { Suspense } from "react";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <div
      className={`font-sans min-h-screen relative isolate overflow-x-hidden bg-gradient-to-r from-primary-100/20 via-transparent to-primary-100/20`}
    >
      <Suspense fallback={<LoadingHeader />}>
        <Header />
      </Suspense>
      {children}
    </div>
  );
}

const LoadingHeader = () => {
  return (
    <header className="sticky top-4 z-50 w-[95%] 2xl:max-w-screen-2xl mx-auto mb-10">
      <div className="bg-white backdrop-blur-md border border-secondary-200/80 shadow-md shadow-secondary-200/50 rounded-2xl px-4 md:px-8 min-h-[68px]">
        <nav className="flex items-center justify-between min-h-[68px]">
          <div className="flex items-center gap-6 md:gap-8 min-w-0">
            <Link
              href="/"
              className="hidden md:flex items-center gap-2 shrink-0"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  className="w-10 h-10"
                >
                  <circle cx="24" cy="24" r="24" fill="#F0780C" />
                  <path
                    fill="#FFFFFF"
                    d="M17 12C13.7 12 11 14.7 11 18V30C11 33.3 13.7 36 17 36H31C34.3 36 37 33.3 37 30V24.5C37 23.4 36.1 22.5 35 22.5C33.9 22.5 33 21.6 33 20.5V18C33 14.7 30.3 12 27 12H17ZM18 18H26C27.7 18 29 19.3 29 21C29 22.7 27.7 24 26 24H18C16.3 24 15 22.7 15 21C15 19.3 16.3 18 18 18ZM18 26H27C28.7 26 30 27.3 30 29C30 30.7 28.7 32 27 32H18C16.3 32 15 30.7 15 29C15 27.3 16.3 26 18 26Z"
                  />
                </svg>
              </div>
              <span className="font-black text-xl text-secondary-900 whitespace-nowrap">
                بلاگیتو
              </span>
            </Link>

            <ul className="flex items-center gap-6 md:gap-8">
              <li>
                <Link href="/">خانه</Link>
              </li>
              <li>
                <Link href="/blogs">بلاگ‌ها</Link>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-end min-w-[132px] h-12 shrink-0">
            <div className="w-[104px] h-10 rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-600 rounded-full animate-spin" />
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

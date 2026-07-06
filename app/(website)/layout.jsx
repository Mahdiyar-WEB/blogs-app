import Header from "./Header";
import { Suspense } from "react";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <div className={`font-sans min-h-screen relative overflow-x-hidden`}>
      <Suspense fallback={<LoadingHeader />}>
        <Header />
      </Suspense>
      {children}
    </div>
  );
}

const LoadingHeader = () => {
  return (
    <header className="py-3 shadow-md border border-secondary-200 rounded-md w-11/12 mx-auto 2xl:max-w-screen-2xl sticky top-3 left-0 bg-secondary-50 z-10 mb-10">
      <nav className="mx-3 lg:mx-10 flex justify-between">
        <ul className="flex gap-10">
          <li>
            <Link href="/">خانه</Link>
          </li>
          <li>
            <Link href="/blogs">بلاگ ها</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

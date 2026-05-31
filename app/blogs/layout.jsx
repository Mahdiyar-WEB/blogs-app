import React from "react";
import CategoryList from "./_components/CategoryList";

const Layout = ({ children }) => {
  return (
    <main className="container">
      <h1 className="text-xl md:text-2xl font-semibold mb-10">لیست بلاگ ها</h1>
      <div className="grid grid-cols-12 gap-x-8">
        <aside className="col-span-12 md:col-span-4 xl:col-span-3 border p-5 rounded-xl shadow-md ">
          <h2 className="text-secondary-700 text-xl mb-5 font-semibold flex items-center gap-x-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <span>دسته بندی ها:</span>
          </h2>
          <CategoryList />
        </aside>
        <section className="col-span-12 border md:col-span-8 xl:col-span-9">
          <div>search bar</div>
          {children}
          <div>pagination</div>
        </section>
      </div>
    </main>
  );
};

export default Layout;

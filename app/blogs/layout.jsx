import React from "react";

const Layout = ({ children }) => {
  return (
    <main className="container">
      <h1 className="text-xl md:text-2xl font-semibold mb-10">لیست بلاگ ها</h1>
      <div className="grid grid-cols-12 gap-x-8">
        <aside className="col-span-12 border md:col-span-4 xl:col-span-3">
          categorie
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

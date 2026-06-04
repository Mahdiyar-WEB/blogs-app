import React, { Suspense } from "react";

const Layout = async ({ children }) => {
  return (
    <main className="w-11/12 mx-auto 2xl:max-w-screen-2xl border">
      <Suspense fallback={<div>loading ...</div>}>{children}</Suspense>
    </main>
  );
};

export default Layout;

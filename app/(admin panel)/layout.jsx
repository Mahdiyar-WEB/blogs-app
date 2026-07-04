"use client";
import Header from "./Header";
import Drawer from "./Drawer";
import { Suspense, useState } from "react";

export default function Layout({ children }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="hidden lg:block">
        <Drawer
          isOpen={desktopOpen}
          onToggle={() => setDesktopOpen((prev) => !prev)}
        />
      </div>

      <div
        className={`
          fixed top-0 right-0 h-full z-30 lg:hidden
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <Drawer isOpen={true} onToggle={() => setMobileOpen(false)} />
      </div>

      <div className="flex flex-col flex-1 bg-secondary-0 min-w-0">
        <Suspense>
          <Header onMobileToggle={() => setMobileOpen((prev) => !prev)} />
        </Suspense>
        <main className="lg:rounded-tr-3xl h-full bg-secondary-100">
          <Suspense>{children}</Suspense>
        </main>
      </div>
    </div>
  );
}

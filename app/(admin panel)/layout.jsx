"use client";
import Drawer from "./Drawer";
import Header from "./Header";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop drawer */}
      <div className="hidden lg:block">
        <Drawer
          isOpen={desktopOpen}
          onToggle={() => setDesktopOpen((prev) => !prev)}
        />
      </div>

      {/* Mobile drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full z-30 lg:hidden
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <Drawer isOpen={true} onToggle={() => setMobileOpen(false)} />
      </div>

      <div className="flex flex-col flex-1 bg-secondary-0">
        <Header onMobileToggle={() => setMobileOpen((prev) => !prev)} />
        <main className="lg:rounded-tr-3xl h-full p-5 bg-secondary-100">
          {children}
        </main>
      </div>
    </div>
  );
}

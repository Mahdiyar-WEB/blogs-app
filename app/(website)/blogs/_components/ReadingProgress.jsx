// _components/ReadingProgress.jsx  (client — new file)
"use client";
import { useEffect, useState } from "react";

export default function ReadingProgress({ targetId }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [targetId]);

  return (
    <div className="fixed top-0 inset-x-0 h-1 bg-secondary-100 z-50">
      <div
        className="h-full bg-gradient-to-l from-primary-400 via-primary-600 to-primary-800 transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

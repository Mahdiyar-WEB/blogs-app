"use client";
import { useState } from "react";

const ShareRail = ({ title }) => {
  const [copied, setCopied] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const shareTelegram = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}&text=${encodeURIComponent(title)}`, "_blank");
  };

  const shareX = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${encodeURIComponent(title)}`, "_blank");
  };

  return (
    <div className="flex items-center gap-1.5 shrink-0 bg-secondary-100/80 border border-secondary-200 rounded-full p-1.5">
      <button
        onClick={shareTelegram}
        aria-label="اشتراک در تلگرام"
        className="w-9 h-9 rounded-full border bg-white text-secondary-500 shadow-sm hover:bg-primary-700 hover:text-white flex items-center justify-center transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z" />
        </svg>
      </button>

      <button
        onClick={shareX}
        aria-label="اشتراک در ایکس"
        className="w-9 h-9 rounded-full border bg-white text-secondary-500 shadow-sm hover:bg-black hover:text-white flex items-center justify-center transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M18.9 1.53h3.68l-8.04 9.19L24 22.47h-7.4l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.53h7.59l5.24 6.93 6.07-6.93Zm-1.29 18.77h2.04L6.5 3.6H4.3l13.31 16.7Z" />
        </svg>
      </button>

      <button
        onClick={copyLink}
        aria-label="کپی لینک"
        className="relative w-9 h-9 border rounded-full bg-white text-secondary-500 shadow-sm hover:bg-secondary-600 hover:text-white flex items-center justify-center transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757M10.81 15.313a4.5 4.5 0 0 1-1.242-7.244l4.5-4.5a4.5 4.5 0 0 1 6.364 6.364l-1.757 1.757" />
        </svg>
        {copied && (
          <span className="absolute -top-8 right-1/2 translate-x-1/2 whitespace-nowrap text-[11px] bg-secondary-900 text-white px-2 py-1 rounded-md">
            کپی شد!
          </span>
        )}
      </button>
    </div>
  );
};

export default ShareRail;
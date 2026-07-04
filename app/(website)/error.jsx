"use client";
import Button from "components/Button";

// Error boundaries must be Client Components

export default function Error({ unstable_retry }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-5">
      <h2 className="text-xl font-semibold">
        متاسفانه خطایی در بارگذاری اطلاعات اتفاق افتاد!
      </h2>

      <Button onClick={() => unstable_retry()}>تلاش مجدد</Button>
    </div>
  );
}

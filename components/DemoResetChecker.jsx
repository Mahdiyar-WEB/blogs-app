"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";

const CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

export default function DemoResetChecker() {
  const queryClient = useQueryClient();
  const isCheckingRef = useRef(false);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_DEMO_MODE !== "true") return;

    const checkNow = async () => {
      if (isCheckingRef.current) return;

      isCheckingRef.current = true;
      try {
        const response = await fetch("/api/internal/ensure-reset", {
          method: "GET",
          cache: "no-store",
        });

        const data = await response.json();

        if (data.reset) {
          await queryClient.invalidateQueries();
          window.location.reload();
        }
      } catch (error) {
        console.error("Demo reset check failed:", error);
      } finally {
        isCheckingRef.current = false;
      }
    };

    checkNow();
    const intervalId = setInterval(checkNow, CHECK_INTERVAL);

    return () => clearInterval(intervalId);
  }, [queryClient]);

  return null;
}

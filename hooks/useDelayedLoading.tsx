"use client";

import { useEffect, useRef, useState } from "react";

type DelayOptions = {
  delay: number;
  minDuration: number;
};

function useDelayedLoading(
  isLoading: boolean,
  { delay = 250, minDuration = 300 }: DelayOptions,
) {
  const [showLoading, setShowLoading] = useState(false);
  const shownAtRef = useRef<number | null>(null);
  const delayTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    if (isLoading) {
      if (!showLoading) {
        delayTimerRef.current = setTimeout(() => {
          shownAtRef.current = Date.now();
          setShowLoading(true);
        }, delay);
      }
      return;
    }

    if (!showLoading) return;

    const elapsed = Date.now() - (shownAtRef.current || 0);
    const remaining = Math.max(minDuration - elapsed, 0);

    hideTimerRef.current = setTimeout(() => {
      shownAtRef.current = null;
      setShowLoading(false);
    }, remaining);

    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [isLoading, delay, minDuration, showLoading]);

  useEffect(() => {
    return () => {
      if (delayTimerRef.current) clearTimeout(delayTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  return showLoading;
}

export default useDelayedLoading;

"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

type DelayedFallbackProps = {
  children: ReactNode;
  delay?: number;
};

function DelayedFallback({ children, delay = 250 }: DelayedFallbackProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return children;
}

export default DelayedFallback;

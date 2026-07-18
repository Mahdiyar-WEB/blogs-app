"use client";

import { useEffect, useState } from "react";

function DelayedFallback({ children, delay = 250 }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;

  return children;
}

export default DelayedFallback;

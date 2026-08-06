"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function AnimatedTableRow({
  children,
  className = "",
  index = 0,
}) {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener("resize", updateIsMobile);

    return () => window.removeEventListener("resize", updateIsMobile);
  }, []);

  if (shouldReduceMotion) {
    return <tr className={className}>{children}</tr>;
  }

  const stepDelay = isMobile ? 0.025 : 0.04;
  const maxDelay = isMobile ? 0.12 : 0.2;

  return (
    <motion.tr
      className={className}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.28,
        ease: "easeOut",
        delay: Math.min(index * stepDelay, maxDelay),
      }}
    >
      {children}
    </motion.tr>
  );
}

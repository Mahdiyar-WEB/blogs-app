"use client";

import { motion } from "framer-motion";
import type { ReactNode, ComponentType } from "react";

type AnimatedFadeInProps = {
  children: ReactNode;
  index?: number;
  as?: string;
  className?: string;
};

const AnimatedFadeIn = ({
  children,
  index = 0,
  as = "div",
  className = "",
}: AnimatedFadeInProps) => {
  const MotionTag: ComponentType<any> =
    (motion as unknown as Record<string, ComponentType<any>>)[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
        delay: Math.min(index * 0.05, 0.2),
      }}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedFadeIn;

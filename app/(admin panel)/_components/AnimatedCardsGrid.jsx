"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "components/Card";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

const AnimatedCardsGrid = ({ cards }) => {
  return (
    <motion.section
      className="mb-8 grid grid-cols-12 gap-5 lg:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {cards.map((card) => (
        <motion.div
          key={card.title}
          variants={itemVariants}
          className="col-span-12 md:col-span-6 xl:col-span-4"
        >
          <Card {...card} />
        </motion.div>
      ))}
    </motion.section>
  );
};

export default AnimatedCardsGrid;

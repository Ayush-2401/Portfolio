"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionDividerProps {
  word1?: string;
  word2?: string;
}

export default function SectionDivider({ word1 = "BUILD", word2 = "SHIP" }: SectionDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const wordVariants = {
    hidden: { y: "100%" },
    visible: { 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <div ref={ref} className="w-full py-24 md:py-32 flex flex-col items-center justify-center overflow-hidden bg-bg-primary">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center font-display text-[80px] md:text-[140px] font-bold leading-[0.85] tracking-tighter text-text-primary uppercase"
      >
        <div className="overflow-hidden">
          <motion.div variants={wordVariants}>{word1}</motion.div>
        </div>
        <div className="overflow-hidden text-border-subtle/40 italic">
          <motion.div variants={wordVariants}>{word2}</motion.div>
        </div>
      </motion.div>
    </div>
  );
}

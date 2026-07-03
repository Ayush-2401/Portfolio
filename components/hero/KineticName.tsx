"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface KineticNameProps {
  text: string;
  className?: string;
}

export default function KineticName({ text, className }: KineticNameProps) {
  const shouldReduceMotion = useReducedMotion();
  
  // Split into words, then characters, preserving spaces
  const words = text.split(" ").map(word => word + "\u00A0");
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20,
      rotateX: shouldReduceMotion ? 0 : -90
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      }
    }
  };

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-flex overflow-hidden whitespace-pre">
          {word.split("").map((char, charIndex) => (
            <motion.span
              key={`${wordIndex}-${charIndex}`}
              variants={childVariants}
              className="inline-block origin-bottom"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

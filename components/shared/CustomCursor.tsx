"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useCursorStore } from "@/lib/store/cursorStore"; // We need to create this

export default function CustomCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to prevent flash on mobile
  const { cursorType, cursorText } = useCursorStore();

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Feature detect touch
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(hover: none)").matches
      );
    };
    
    checkTouch();
    
    if (isTouchDevice) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, [cursorX, cursorY, isTouchDevice]);

  if (isTouchDevice) return null;

  const dotVariant = {
    width: 12,
    height: 12,
    x: "-50%",
    y: "-50%",
    backgroundColor: "var(--color-accent)",
    border: "0px solid transparent",
    mixBlendMode: "difference" as const,
    opacity: 1,
    borderRadius: "9999px"
  };

  const variants = {
    default: dotVariant,
    hover: dotVariant,
    project: dotVariant,
    terminal: dotVariant
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full flex items-center justify-center"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
      }}
      variants={variants}
      animate={cursorType}
      initial="default"
      transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
    />
  );
}

"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useSpring } from "framer-motion";
import { useCursorStore } from "@/lib/store/cursorStore";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  cursorLabel?: string;
  cursorType?: "hover" | "project";
}

export default function MagneticButton({ 
  children, 
  className, 
  onClick, 
  cursorLabel = "", 
  cursorType = "hover" 
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const { setCursorType, setCursorText, resetCursor } = useCursorStore();

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(position.x, springConfig);
  const y = useSpring(position.y, springConfig);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Max displacement 12px
    const constrain = (val: number, max: number) => {
      if (val > max) return max;
      if (val < -max) return -max;
      return val;
    };

    setPosition({ x: constrain(middleX * 0.2, 12), y: constrain(middleY * 0.2, 12) });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorType(cursorType);
    if (cursorLabel) setCursorText(cursorLabel);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
    resetCursor();
  };

  // Only apply magnetic effect if hovered and pointer is fine (not touch)
  const isTouch = typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches;

  return (
    <motion.div
      ref={ref}
      onMouseMove={!isTouch ? handleMouse : undefined}
      onMouseEnter={!isTouch ? handleMouseEnter : undefined}
      onMouseLeave={!isTouch ? handleMouseLeave : undefined}
      onClick={onClick}
      animate={{ scale: isHovered ? 1.05 : 1 }}
      whileTap={{ scale: 0.96 }}
      style={!isTouch ? { x, y } : {}}
      className={`relative cursor-none flex items-center justify-center ${className}`}
    >
      {children}
    </motion.div>
  );
}

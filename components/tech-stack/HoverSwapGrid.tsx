"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HoverSwapGridProps {
  items: {
    icon: React.ReactNode;
    label: string;
    codeSnippet: string;
  }[];
}

export default function HoverSwapGrid({ items }: HoverSwapGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
      {items.map((item, idx) => (
        <HoverSwapTile key={idx} item={item} />
      ))}
    </div>
  );
}

function HoverSwapTile({ item }: { item: HoverSwapGridProps['items'][0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const isTouch = typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches;

  return (
    <div 
      className="relative h-32 w-full border border-border-subtle rounded-[16px] bg-bg-secondary overflow-hidden cursor-none"
      onMouseEnter={!isTouch ? () => setIsHovered(true) : undefined}
      onMouseLeave={!isTouch ? () => setIsHovered(false) : undefined}
      onClick={isTouch ? () => setIsHovered(!isHovered) : undefined}
    >
      <AnimatePresence mode="wait">
        {!isHovered ? (
          <motion.div
            key="resting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-text-secondary gap-3"
          >
            {item.icon}
            <span className="font-display font-medium text-[16px] text-text-primary tracking-wide">
              {item.label}
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="hover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 p-4 bg-bg-elevated flex items-center justify-center border border-accent/20"
          >
            <code className="font-mono text-accent text-[12px] md:text-[13px] text-center w-full whitespace-pre-wrap">
              {item.codeSnippet}
            </code>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

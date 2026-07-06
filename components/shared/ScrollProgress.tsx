"use client";

import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "framer-motion";
import { useState } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const numBlocks = 80; // More blocks for dense pixelated look

  return (
    <div className="fixed top-0 left-0 w-full z-[100] pointer-events-none px-4 py-2 flex flex-row items-center gap-4 bg-bg-primary/90 backdrop-blur-md border-b border-border-subtle shadow-sm">
      <div className="font-mono text-[10px] md:text-[11px] text-accent font-semibold tracking-widest shrink-0">
        <TerminalReadout progress={scrollYProgress} />
      </div>
      
      <div className="flex-1 flex h-[14px] bg-bg-secondary p-[2px] border border-border-subtle rounded-none">
        {Array.from({ length: numBlocks }).map((_, i) => {
          const threshold = i / numBlocks;
          // Each block lights up sequentially. Ensure offsets are strictly within [0, 1] for WAAPI.
          const start = Math.min(0.99, threshold);
          const end = Math.min(1, start + 0.02);
          const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
          const filter = useTransform(scrollYProgress, [start, end], ["blur(0px)", "drop-shadow(0 0 2px rgba(0, 255, 163, 0.8))"]);

          return (
            <div key={i} className="flex-1 h-full pr-[1px] md:pr-[2px] last:pr-0 flex">
              <motion.div 
                className="w-full h-full bg-accent rounded-none"
                style={{ opacity, filter }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

function TerminalReadout({ progress }: { progress: MotionValue<number> }) {
  const [percent, setPercent] = useState(0);

  useMotionValueEvent(progress, "change", (latest) => {
    setPercent(latest * 100);
  });

  const p = percent.toFixed(1);
  const totalBars = 10;
  const filled = Math.floor((percent / 100) * totalBars);
  const empty = totalBars - filled;
  const ascii = `[${"=".repeat(filled)}${filled < totalBars ? ">" : ""}${".".repeat(Math.max(0, empty - (filled < totalBars ? 1 : 0)))}]`;

  return (
    <span className="whitespace-nowrap">
      'BUFFERING MEMORY... {p.padStart(4, '0')}% COMPLETE <span className="hidden sm:inline">{ascii}</span>'
    </span>
  );
}

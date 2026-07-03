"use client";

import React, { useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useCursorStore } from "@/lib/store/cursorStore";

interface ProjectCardProps {
  id: string;
  name: string;
  pitch: string;
  techStack: string[];
}

export default function ProjectCard({ id, name, pitch, techStack }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setCursorType, resetCursor } = useCursorStore();
  const [isHovered, setIsHovered] = useState(false);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize to -1 to 1 for rotation
    const rotateXValue = ((y / rect.height) - 0.5) * -24; // Max 12deg tilt
    const rotateYValue = ((x / rect.width) - 0.5) * 24;

    rotateX.set(rotateXValue);
    rotateY.set(rotateYValue);
    
    // Glare position in percentages
    setGlarePosition({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setCursorType("project");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
    resetCursor();
  };

  // Feature detect touch to disable 3D tilt
  const isTouch = typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches;

  return (
    <motion.div
      ref={ref}
      onMouseMove={!isTouch ? handleMouseMove : undefined}
      onMouseEnter={!isTouch ? handleMouseEnter : undefined}
      onMouseLeave={!isTouch ? handleMouseLeave : undefined}
      whileTap={{ scale: isTouch ? 0.98 : 1 }}
      style={!isTouch ? {
        rotateX,
        rotateY,
        transformPerspective: 1000,
      } : {}}
      className="group relative border border-border-subtle rounded-[16px] bg-bg-elevated p-6 flex flex-col h-[400px] w-full md:w-[380px] flex-shrink-0 cursor-none transition-colors hover:border-text-muted/50"
    >
      {/* Glare Effect */}
      {!isTouch && isHovered && (
        <div 
          className="absolute inset-0 z-10 pointer-events-none rounded-[16px] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.05) 0%, transparent 50%)`
          }}
        />
      )}

      <h3 className="font-display text-[24px] font-semibold text-text-primary mb-2 relative z-20">{name}</h3>
      <p className="font-body text-text-secondary text-[15px] mb-6 flex-grow relative z-20">{pitch}</p>
      
      <div className="flex flex-wrap gap-2 mt-auto relative z-20">
        {techStack.map((tech) => (
          <span 
            key={tech} 
            className="px-2 py-1 border border-border-subtle rounded-full text-text-muted font-mono text-[12px] transition-colors duration-300 group-hover:border-accent group-hover:text-text-primary"
          >
            {tech}
          </span>
        ))}
      </div>
      
      {/* Footer Easter Egg */}
      <div className="mt-6 pt-4 border-t border-border-subtle/50 flex justify-between items-center relative z-20">
        <span className="font-mono text-[10px] text-text-muted">cat projects/{id}.md</span>
        <span className="font-mono text-[10px] text-accent opacity-0 group-hover:opacity-100 transition-opacity">RUN</span>
      </div>
    </motion.div>
  );
}

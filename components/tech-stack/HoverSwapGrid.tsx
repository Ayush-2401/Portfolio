"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimationFrame, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';

interface HoverSwapGridProps {
  items: {
    icon: React.ReactNode;
    label: string;
    codeSnippet: string;
  }[];
}

export default function HoverSwapGrid({ items }: HoverSwapGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isHovered = useRef(false);
  
  // Continuous rotation for the merry-go-round
  const baseRotation = useMotionValue(0);

  // Parallax tilt values (follows cursor)
  const parallaxRotateX = useSpring(0, { stiffness: 100, damping: 30, mass: 1 });
  const parallaxRotateY = useSpring(0, { stiffness: 100, damping: 30, mass: 1 });

  // Auto-rotate the carousel
  const targetVelocity = useRef(-15); // Target degrees per second
  const currentVelocity = useRef(-15); // Current interpolated velocity

  useAnimationFrame((time, delta) => {
    // Smoothly transition the current velocity towards the target velocity
    currentVelocity.current += (targetVelocity.current - currentVelocity.current) * 0.1;
    
    // Apply the rotation
    baseRotation.set(baseRotation.get() + (delta / 1000) * currentVelocity.current);
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Normalize to -1 to 1
    const normalizedX = x / (rect.width / 2);
    const normalizedY = y / (rect.height / 2);

    // Apply parallax tilt (up to 15 degrees)
    parallaxRotateX.set(normalizedY * -15);
    parallaxRotateY.set(normalizedX * 15);

    // If hovered, map the mouse X position to rotation velocity
    if (isHovered.current) {
      // Deadzone in the center (between -0.3 and 0.3) so user can comfortably hover and read the front card
      let scrubVelocity = 0;
      if (normalizedX > 0.3) {
        // Move right edge -> spin left
        scrubVelocity = -((normalizedX - 0.3) * 100); 
      } else if (normalizedX < -0.3) {
        // Move left edge -> spin right
        scrubVelocity = -((normalizedX + 0.3) * 100);
      }
      targetVelocity.current = scrubVelocity;
    }
  };

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
    targetVelocity.current = -15; // Resume default auto-rotation speed
    parallaxRotateX.set(0);
    parallaxRotateY.set(0);
  };

  const anglePerItem = 360 / items.length;

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center cursor-none group"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer container for parallax tilt (Cursor Follow) */}
      <motion.div
        className="w-full h-full absolute flex items-center justify-center"
        style={{
          rotateX: parallaxRotateX,
          rotateY: parallaxRotateY,
          transformStyle: "preserve-3d"
        }}
      >
        {/* Inner container for continuous carousel rotation */}
        <motion.div
          className="w-full h-full absolute flex items-center justify-center"
          style={{
            rotateY: baseRotation,
            transformStyle: "preserve-3d"
          }}
        >
          {items.map((item, idx) => {
            const angle = idx * anglePerItem;
            return (
              <HoverSwapTile 
                key={idx} 
                item={item} 
                angle={angle}
                baseRotation={baseRotation}
              />
            );
          })}
        </motion.div>
      </motion.div>
      
      <div className="absolute bottom-0 text-center font-mono text-[11px] text-text-muted opacity-50 group-hover:opacity-100 transition-opacity">
        Hover to pause and reveal code
      </div>
    </div>
  );
}

function HoverSwapTile({ 
  item, 
  angle, 
  baseRotation 
}: { 
  item: HoverSwapGridProps['items'][0];
  angle: number;
  baseRotation: MotionValue<number>;
}) {
  const [isTileHovered, setIsTileHovered] = useState(false);
  const isTouch = typeof window !== 'undefined' && window.matchMedia("(hover: none)").matches;

  // Calculate dynamic opacity so cards in the back become transparent
  const opacity = useTransform(baseRotation, (val) => {
    let worldAngle = (val + angle) % 360;
    if (worldAngle < 0) worldAngle += 360; // normalize 0 to 360
    
    // Distance from the front (0 degrees or 360 degrees)
    let dist = worldAngle;
    if (dist > 180) dist = 360 - dist;
    
    // Front is 1, Back (180 deg) fades down to 0.15
    return 1 - (dist / 180) * 0.85; 
  });

  // Calculate dynamic blur for depth of field
  const filter = useTransform(baseRotation, (val) => {
    let worldAngle = (val + angle) % 360;
    if (worldAngle < 0) worldAngle += 360;
    
    let dist = worldAngle;
    if (dist > 180) dist = 360 - dist;
    
    // Front is 0px blur, Back is 6px blur
    const blur = (dist / 180) * 6;
    return `blur(${blur}px)`;
  });

  return (
    <motion.div 
      className="absolute w-64 md:w-72 h-32 border border-border-subtle rounded-[16px] bg-bg-secondary/90 overflow-hidden shadow-2xl"
      style={{
        // Position on the 3D cylinder. 
        // We use clamp to give a huge radius (more space) on desktop, but keep it readable on mobile.
        transform: `rotateY(${angle}deg) translateZ(var(--carousel-radius, 450px))`,
        opacity,
        filter,
        "--carousel-radius": "clamp(280px, 40vw, 500px)"
      } as any}
      onMouseEnter={!isTouch ? () => setIsTileHovered(true) : undefined}
      onMouseLeave={!isTouch ? () => setIsTileHovered(false) : undefined}
      onClick={isTouch ? () => setIsTileHovered(!isTileHovered) : undefined}
    >
      <AnimatePresence mode="wait">
        {!isTileHovered ? (
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
    </motion.div>
  );
}

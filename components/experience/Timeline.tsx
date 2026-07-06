"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'framer-motion';
import { experience } from '@/lib/content/experience';

// Create a separate component for each drum item to cleanly use hooks
function DrumItem({ 
  item, 
  index, 
  total, 
  rotationSpring 
}: { 
  item: typeof experience[0]; 
  index: number; 
  total: number; 
  rotationSpring: MotionValue<number>;
}) {
  const anglePerItem = 360 / total;
  const baseAngle = index * anglePerItem;

  // Calculate the item's current angle in world space
  const itemRotateX = useTransform(rotationSpring, (val) => val + baseAngle);

  // Force the correct CSS transform order: orbit around center, then translate outward
  const transform = useTransform(itemRotateX, (r) => `rotateX(${r}deg) translateZ(280px)`);

  // Dynamically calculate opacity based on the item's absolute angle from the camera (0 degrees)
  const opacity = useTransform(rotationSpring, (val) => {
    let worldAngle = (val + baseAngle) % 360;
    if (worldAngle > 180) worldAngle -= 360;
    if (worldAngle < -180) worldAngle += 360;
    
    const absAngle = Math.abs(worldAngle);
    // Fade out completely before hitting 90 degrees to prevent flat graphical glitches
    if (absAngle < 65) {
      return 1 - (absAngle / 65);
    }
    return 0;
  });

  // Scale down items as they rotate away for deeper perspective
  const scale = useTransform(rotationSpring, (val) => {
    let worldAngle = (val + baseAngle) % 360;
    if (worldAngle > 180) worldAngle -= 360;
    if (worldAngle < -180) worldAngle += 360;
    
    const absAngle = Math.abs(worldAngle);
    if (absAngle < 90) {
      return 1 - (absAngle / 180); // scale from 1 down to 0.5
    }
    return 0.5;
  });

  // Turn off pointer events for items that are faded out so they don't block clicks
  const pointerEvents = useTransform(opacity, (val) => val > 0.5 ? "auto" : "none");

  return (
    <motion.div
      className="absolute w-full flex items-center justify-between px-4 md:px-12"
      style={{
        transform,
        opacity,
        scale,
        pointerEvents,
        backfaceVisibility: "hidden",
      }}
    >
      {/* Left Side: Content (appears larger due to container rotateY) */}
      <div className="w-[65%] md:w-[70%] border border-border-subtle bg-bg-elevated/80 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-2xl">
        <h3 className="font-display text-[22px] md:text-[28px] font-bold text-text-primary mb-2">
          {item.title}
        </h3>
        <h4 className="font-mono text-[13px] md:text-[14px] text-accent mb-4">
          {item.organization}
        </h4>
        <p className="font-body text-text-secondary text-[14px] md:text-[15px] leading-relaxed line-clamp-3">
          {item.description}
        </p>
      </div>

      {/* Right Side: Timeline Dot & Date (appears smaller/distant) */}
      <div className="w-[30%] flex items-center justify-end gap-2 md:gap-6">
        <div className="w-8 md:w-12 h-[2px] bg-border-subtle hidden md:block" />
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-4 h-4 md:w-6 md:h-6 rounded-full border-2 border-accent bg-bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(46,204,113,0.3)]">
            <div className="w-1 h-1 md:w-2 md:h-2 bg-accent rounded-full" />
          </div>
          <span className="font-mono text-[16px] md:text-[20px] text-text-primary font-bold">
            {item.date.split(' - ')[0]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Timeline() {
  const [targetIndex, setTargetIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = experience.length;
  const anglePerItem = 360 / total;

  const rotationSpring = useSpring(0, {
    stiffness: 80,
    damping: 20,
    mass: 1
  });

  // Spring for the dynamic 3D perspective Parallax
  const rotateYSpring = useSpring(-15, {
    stiffness: 100, 
    damping: 30,
    mass: 1
  });

  useEffect(() => {
    rotationSpring.set(targetIndex * -anglePerItem);
  }, [targetIndex, anglePerItem, rotationSpring]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastWheelTime = 0;

    const handleWheel = (e: WheelEvent) => {
      // Prevent page scrolling ONLY when mouse is actively over the timeline 3D drum container
      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelTime < 250) return; // 250ms cooldown for cleaner snapping

      if (Math.abs(e.deltaY) > 20) {
        if (e.deltaY > 0) {
          setTargetIndex((prev) => prev + 1);
        } else {
          setTargetIndex((prev) => prev - 1);
        }
        lastWheelTime = now;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse X relative to the container center (-1 to 1)
    const x = e.clientX - rect.left;
    const normalizedX = (x / rect.width) * 2 - 1; // -1 (left edge) to 1 (right edge)
    
    // If mouse is on left (-1), rotateY is negative -> left side comes forward
    // If mouse is on right (1), rotateY is positive -> right side comes forward
    const targetRotateY = normalizedX * 25; // max 25 degrees of rotation
    
    rotateYSpring.set(targetRotateY);
  };

  const handleMouseLeave = () => {
    // Smoothly return to the default sketch perspective when mouse leaves
    rotateYSpring.set(-15);
  };

  return (
    <section className="py-16 md:py-32 bg-bg-primary overflow-hidden">
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto w-full mb-12">
        <div className="font-mono text-[13px] text-text-muted mb-4">~/experience</div>
        <h2 className="font-display text-[32px] md:text-[56px] font-semibold text-text-primary">
          Experience
        </h2>
      </div>
      
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto w-full flex items-center justify-center">
        {/* We restrict max-width of the interactive area so users can easily move their mouse to the screen edges to scroll the page natively */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          data-lenis-prevent="true"
          className="relative h-[600px] w-full max-w-[1000px] flex items-center justify-center cursor-none group"
          style={{ perspective: "1500px" }}
        >
          <motion.div
            className="w-full h-full relative flex items-center justify-center"
            style={{
              rotateY: rotateYSpring, 
              transformStyle: "preserve-3d",
            }}
          >
            {experience.map((item, index) => (
              <DrumItem 
                key={item.id} 
                item={item} 
                index={index} 
                total={total} 
                rotationSpring={rotationSpring} 
              />
            ))}
          </motion.div>
        </div>
      </div>
      
      <div className="mt-8 text-center font-mono text-[11px] text-text-muted flex items-center justify-center gap-2">
        <span>Hover over the center and scroll to rotate history</span>
        <span className="text-accent animate-bounce">↓</span>
      </div>
    </section>
  );
}

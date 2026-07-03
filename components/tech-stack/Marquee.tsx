"use client";

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { skills } from '@/lib/content/skills';

export default function Marquee() {
  // Flatten skills for the marquee
  const allSkills = useMemo(() => {
    return skills.flatMap(cat => cat.skills);
  }, []);

  // Split into two rows
  const row1 = allSkills.slice(0, Math.ceil(allSkills.length / 2));
  const row2 = allSkills.slice(Math.ceil(allSkills.length / 2));

  // Duplicating arrays to create infinite loop effect
  const repeatedRow1 = [...row1, ...row1, ...row1];
  const repeatedRow2 = [...row2, ...row2, ...row2];

  const marqueeVariants: Variants = {
    animate1: {
      x: [0, -1000],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 30,
          ease: "linear",
        },
      },
    },
    animate2: {
      x: [-1000, 0],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 30,
          ease: "linear",
        },
      },
    }
  };

  return (
    <section className="py-16 overflow-hidden bg-bg-primary border-y border-border-subtle relative">
      <div className="font-mono text-[13px] text-text-muted mb-8 px-6 md:px-16 max-w-[1280px] mx-auto">
        ~/tech-stack
      </div>
      
      <div className="flex flex-col gap-6 relative group">
        {/* Row 1 */}
        <div className="flex w-fit overflow-hidden">
          <motion.div 
            className="flex gap-6 w-max items-center pr-6"
            variants={marqueeVariants}
            animate="animate1"
          >
            {repeatedRow1.map((skill, idx) => (
              <div 
                key={`${skill.name}-${idx}`} 
                className="px-6 py-3 border border-border-subtle rounded-full text-text-secondary font-mono text-[16px] bg-bg-elevated transition-colors duration-300 hover:text-accent hover:border-accent hover:bg-bg-secondary whitespace-nowrap cursor-none"
              >
                {skill.name}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 */}
        <div className="flex w-fit overflow-hidden">
          <motion.div 
            className="flex gap-6 w-max items-center pr-6"
            variants={marqueeVariants}
            animate="animate2"
          >
            {repeatedRow2.map((skill, idx) => (
              <div 
                key={`${skill.name}-${idx}`} 
                className="px-6 py-3 border border-border-subtle rounded-full text-text-secondary font-mono text-[16px] bg-bg-elevated transition-colors duration-300 hover:text-accent hover:border-accent hover:bg-bg-secondary whitespace-nowrap cursor-none"
              >
                {skill.name}
              </div>
            ))}
          </motion.div>
        </div>
        
        {/* Gradient overlays for smooth fading at edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-bg-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-bg-primary to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

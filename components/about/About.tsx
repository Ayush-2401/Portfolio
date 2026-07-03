'use client';
import React from 'react';
import { siteCopy } from '@/lib/content/site-copy';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
};

export default function About() {
  return (
    <section className="py-16 md:py-32 px-6 md:px-16 bg-bg-secondary overflow-hidden">
      <motion.div 
        className="max-w-[1280px] mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="font-mono text-[13px] text-text-muted mb-4">
          ~/about
        </motion.div>
        
        <motion.h2 variants={itemVariants} className="font-display text-[32px] md:text-[56px] font-semibold text-text-primary mb-8">
          About
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <motion.div variants={itemVariants} className="font-body text-text-secondary text-[15px] md:text-[16px] leading-relaxed max-w-2xl">
            <p className="mb-6">{siteCopy.about.bio}</p>
          </motion.div>
          
          <div className="flex flex-col gap-4 font-mono text-[14px]">
            {[
              { label: 'Education', value: siteCopy.about.university },
              { label: 'Academic', value: siteCopy.about.cgpa },
              { label: 'Status', value: siteCopy.about.currentFocus, highlight: true }
            ].map((item, index) => (
              <motion.div 
                key={item.label}
                variants={itemVariants}
                className="group relative p-4 border border-border-subtle rounded-xl bg-bg-elevated hover:-translate-y-1 hover:border-accent transition-all duration-300 overflow-hidden cursor-default hover:shadow-[0_0_15px_rgba(57,211,83,0.05)]"
              >
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="text-text-muted block mb-1 relative z-10">{item.label}</span>
                <span className={`relative z-10 ${item.highlight ? 'text-accent' : 'text-text-primary'}`}>
                  {item.value}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

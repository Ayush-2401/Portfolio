"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { siteCopy } from '@/lib/content/site-copy';
import KineticName from './KineticName';
import dynamic from 'next/dynamic';
import GithubStatsWidget from '@/components/shared/GithubStatsWidget';

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false });

export default function Hero() {
  const [typedRole, setTypedRole] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Typewriter effect for role
    let timeout: NodeJS.Timeout;
    let i = 0;
    
    // Wait for name animation to finish (~1s) before starting role typing
    const startTyping = setTimeout(() => {
      const type = () => {
        if (i < siteCopy.role.length) {
          setTypedRole(siteCopy.role.substring(0, i + 1));
          i++;
          timeout = setTimeout(type, 50); // 50ms per char
        }
      };
      type();
    }, 1000);

    // Blinking cursor
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearTimeout(startTyping);
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <section className="min-h-[100svh] flex flex-col justify-center px-6 md:px-16 pt-24 pb-12 relative overflow-hidden">
      <HeroCanvas />
      <div className="max-w-[1280px] mx-auto w-full flex flex-col gap-4 z-10">
        <h1 className="font-display text-[44px] md:text-[96px] leading-[1.1] tracking-[-0.02em] font-bold text-text-primary uppercase">
          <KineticName text={siteCopy.name} />
        </h1>
        
        <div className="font-mono text-text-secondary text-[14px] md:text-[15px] h-6 flex items-center">
          {typedRole}
          <span className={`inline-block w-2 h-4 ml-1 bg-accent ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
        </div>
        
        {/* Terminal decorative preview */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.5 }}
          className="mt-8 flex items-center font-mono text-[14px] md:text-[15px]"
        >
          <span className="text-accent mr-2">➜</span>
          <span className="text-[#D7FFEA]">~ $ whoami</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.5 }}
          className="mt-6"
        >
          <GithubStatsWidget />
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }} 
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-text-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}

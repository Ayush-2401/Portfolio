"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { projects } from '@/lib/content/projects';
import ProjectCard from './ProjectCard';

// Register ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectRail() {
  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Feature detect touch - don't scroll-jack on mobile
    const isTouch = window.matchMedia("(max-width: 640px)").matches;
    if (isTouch) return;

    const section = sectionRef.current;
    const rail = railRef.current;
    if (!section || !rail) return;

    // Calculate how far to scroll the rail horizontally
    const getScrollAmount = () => {
      const railWidth = rail.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(railWidth - viewportWidth + 64); // 64px for padding
    };

    const tween = gsap.to(rail, {
      x: getScrollAmount,
      ease: "none"
    });

    const scrollTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${getScrollAmount() * -1}`,
      pin: true,
      animation: tween,
      scrub: 1,
      invalidateOnRefresh: true,
    });

    return () => {
      scrollTrigger.kill();
      tween.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-32 bg-bg-secondary overflow-hidden">
      <div className="px-6 md:px-16 max-w-[1280px] mx-auto w-full mb-12">
        <div className="font-mono text-[13px] text-text-muted mb-4">~/projects</div>
        <h2 className="font-display text-[32px] md:text-[56px] font-semibold text-text-primary">
          Projects
        </h2>
      </div>
      
      {/* 
        Mobile: CSS snap scrolling (no GSAP)
        Desktop: GSAP ScrollTrigger horizontal translation
      */}
      <div className="pl-6 md:pl-16 w-full">
        <div 
          ref={railRef}
          className="flex gap-6 w-full max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory pb-8 pr-6 md:pr-16"
          style={{ width: 'max-content' }}
        >
          {projects.map((project) => (
            <div key={project.id} className="max-sm:snap-center">
              <ProjectCard 
                id={project.id}
                name={project.name}
                pitch={project.pitch}
                techStack={project.techStack}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

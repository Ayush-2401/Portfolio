import React from 'react';
import { siteCopy } from '@/lib/content/site-copy';

export default function About() {
  return (
    <section className="py-16 md:py-32 px-6 md:px-16 bg-bg-secondary">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="font-mono text-[13px] text-text-muted mb-4">~/about</div>
        <h2 className="font-display text-[32px] md:text-[56px] font-semibold text-text-primary mb-8">
          About
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="font-body text-text-secondary text-[15px] md:text-[16px] leading-relaxed max-w-2xl">
            <p className="mb-6">{siteCopy.about.bio}</p>
          </div>
          
          <div className="flex flex-col gap-4 font-mono text-[14px]">
            <div className="p-4 border border-border-subtle rounded-xl bg-bg-elevated">
              <span className="text-text-muted block mb-1">Education</span>
              <span className="text-text-primary">{siteCopy.about.university}</span>
            </div>
            <div className="p-4 border border-border-subtle rounded-xl bg-bg-elevated">
              <span className="text-text-muted block mb-1">Academic</span>
              <span className="text-text-primary">{siteCopy.about.cgpa}</span>
            </div>
            <div className="p-4 border border-border-subtle rounded-xl bg-bg-elevated">
              <span className="text-text-muted block mb-1">Status</span>
              <span className="text-accent">{siteCopy.about.currentFocus}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

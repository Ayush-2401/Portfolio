import React from 'react';
import { siteCopy } from '@/lib/content/site-copy';

export default function Contact() {
  return (
    <section className="py-16 md:py-32 px-6 md:px-16 bg-bg-primary border-t border-border-subtle">
      <div className="max-w-[1280px] mx-auto w-full text-center">
        <div className="font-mono text-[13px] text-text-muted mb-4">~/contact</div>
        <h2 className="font-display text-[44px] md:text-[72px] font-bold text-text-primary mb-8">
          Let's Build Together
        </h2>
        
        <div className="font-mono text-[16px] md:text-[20px] text-accent mb-12 cursor-pointer hover:opacity-80 transition-opacity">
          {siteCopy.contact.email}
        </div>
        
        <div className="flex justify-center gap-6 font-mono text-[14px]">
          <a href={siteCopy.contact.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
            GitHub
          </a>
          <a href={siteCopy.contact.linkedin} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-text-primary transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { siteCopy } from '@/lib/content/site-copy';

export default function Contact() {
  return (
    <section className="py-16 md:py-32 px-6 md:px-16 bg-bg-primary border-t border-border-subtle" id="contact">
      <div className="max-w-[800px] mx-auto w-full text-center">
        <div className="font-mono text-[13px] text-text-muted mb-4">~/contact</div>
        <h2 className="font-display text-[44px] md:text-[72px] font-bold text-text-primary mb-6">
          Let's Build Together
        </h2>
        
        <p className="font-body text-text-secondary text-[16px] md:text-[18px] mb-12 max-w-2xl mx-auto">
          Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'm actively seeking Software Engineering internship opportunities starting January 2026!
        </p>
        
        <a 
          href={`mailto:${siteCopy.contact.email}`}
          className="inline-block px-8 py-4 bg-transparent border border-accent text-accent font-mono text-[16px] rounded hover:bg-accent/10 transition-colors mb-16"
        >
          Say Hello
        </a>
        
        <div className="flex justify-center gap-8 font-mono text-[14px]">
          <a href={siteCopy.contact.github} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent transition-colors">
            GitHub
          </a>
          <a href={siteCopy.contact.linkedin} target="_blank" rel="noreferrer" className="text-text-secondary hover:text-accent transition-colors">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

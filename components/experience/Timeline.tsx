import React from 'react';
import { experience } from '@/lib/content/experience';

export default function Timeline() {
  return (
    <section className="py-16 md:py-32 px-6 md:px-16 bg-bg-primary">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="font-mono text-[13px] text-text-muted mb-4">~/experience</div>
        <h2 className="font-display text-[32px] md:text-[56px] font-semibold text-text-primary mb-12">
          Experience
        </h2>
        
        <div className="flex flex-col gap-8">
          {experience.map((item) => (
            <div key={item.id} className="flex flex-col md:flex-row gap-4 md:gap-12">
              <div className="md:w-1/4 font-mono text-[14px] text-text-muted">
                {item.date}
              </div>
              <div className="md:w-3/4">
                <h3 className="font-display text-[20px] font-semibold text-text-primary mb-1">{item.title}</h3>
                <h4 className="font-mono text-[14px] text-accent mb-4">{item.organization}</h4>
                <p className="font-body text-text-secondary text-[15px]">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

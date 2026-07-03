import React from 'react';
import { siteCopy } from '@/lib/content/site-copy';

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-16 bg-bg-secondary border-t border-border-subtle">
      <div className="max-w-[1280px] mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-mono text-[13px] text-text-muted">
          © {new Date().getFullYear()} {siteCopy.name}. All rights reserved.
        </div>
        <div className="font-mono text-[13px] text-text-muted">
          {siteCopy.tagline}
        </div>
      </div>
    </footer>
  );
}

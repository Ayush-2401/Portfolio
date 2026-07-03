'use client';
import React from 'react';

interface Props {
  onCommandTap: (cmd: string) => void;
}

export default function QuickCommandChips({ onCommandTap }: Props) {
  const chips = ['help', 'resume', 'projects', 'contact'];
  
  return (
    <div className="flex gap-2 mb-3 overflow-x-auto pb-2 scrollbar-hide md:hidden">
      <button 
        onClick={() => onCommandTap('ARROW_UP')}
        className="px-3 py-1 bg-bg-elevated border border-border-subtle rounded-md text-text-muted font-mono text-[12px] whitespace-nowrap active:bg-border-subtle"
      >
        ↑ prev
      </button>
      {chips.map(cmd => (
        <button
          key={cmd}
          onClick={() => onCommandTap(cmd)}
          className="px-3 py-1 bg-bg-elevated border border-border-subtle rounded-md text-text-muted font-mono text-[12px] whitespace-nowrap active:bg-border-subtle hover:border-accent hover:text-accent transition-colors"
        >
          {cmd}
        </button>
      ))}
    </div>
  );
}

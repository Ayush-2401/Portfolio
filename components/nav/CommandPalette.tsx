'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Search, Terminal, User, Briefcase, FileText, Mail, Code } from 'lucide-react';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setSearch('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const commands = [
    { id: 'hero', icon: User, label: 'Home', action: () => scrollTo('hero') },
    { id: 'about', icon: User, label: 'About', action: () => scrollTo('about') },
    { id: 'projects', icon: Code, label: 'Projects', action: () => scrollTo('projects') },
    { id: 'experience', icon: Briefcase, label: 'Experience', action: () => scrollTo('experience') },
    { id: 'terminal', icon: Terminal, label: 'Terminal', action: () => scrollTo('terminal-section') },
    { id: 'contact', icon: Mail, label: 'Contact', action: () => scrollTo('contact') },
    { id: 'resume', icon: FileText, label: 'Download Resume', action: () => downloadFile('resume.pdf') },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const downloadFile = (file: string) => {
    setIsOpen(false);
    const a = document.createElement('a');
    a.href = `/files/${file}`;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const filtered = commands.filter(c => c.label.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={() => setIsOpen(false)}
      />
      
      <div className="relative bg-bg-secondary w-full max-w-lg rounded-xl shadow-2xl border border-border-subtle overflow-hidden">
        <div className="flex items-center px-4 border-b border-border-subtle">
          <Search className="w-5 h-5 text-text-muted mr-3" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-none outline-none py-4 text-text-primary placeholder:text-text-muted font-body"
            placeholder="Search commands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="px-2 py-1 bg-bg-elevated rounded text-[10px] text-text-muted font-mono uppercase">
            Esc
          </div>
        </div>
        
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length > 0 ? (
            filtered.map((cmd) => (
              <button
                key={cmd.id}
                onClick={cmd.action}
                className="w-full flex items-center px-4 py-3 hover:bg-bg-elevated transition-colors text-left group"
              >
                <cmd.icon className="w-4 h-4 text-text-muted group-hover:text-accent mr-3" />
                <span className="text-text-primary text-[15px] font-body">{cmd.label}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-8 text-center text-text-muted text-[15px] font-body">
              No commands found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

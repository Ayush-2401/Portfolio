'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useTerminalStore } from './useTerminalStore';
import { commands } from './commandRegistry';
import QuickCommandChips from './QuickCommandChips';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollbackRef = useRef<HTMLDivElement>(null);
  
  const { cwd, setCwd, history, historyIndex, setHistoryIndex, scrollback, print, clear, addToHistory } = useTerminalStore();

  useEffect(() => {
    if (scrollbackRef.current) {
      scrollbackRef.current.scrollTop = scrollbackRef.current.scrollHeight;
    }
  }, [scrollback]);

  const handleCommand = async (cmdString: string) => {
    const trimmed = cmdString.trim();
    if (!trimmed) return;

    print({
      id: Math.random().toString(36).substr(2, 9),
      type: 'input',
      content: `➜  ${cwd.join('/')} ${trimmed}`
    });

    addToHistory(trimmed);
    setInput('');

    const [cmd, ...args] = trimmed.split(/\s+/);
    const command = commands[cmd.toLowerCase()];

    if (command) {
      const ctx = { cwd, setCwd, print, clear };
      await command.handler(args, ctx);
    } else {
      print({
        id: Math.random().toString(36).substr(2, 9),
        type: 'error',
        content: `command not found: ${cmd}. Type 'help' to see available commands.`
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const handleChipTap = (cmd: string) => {
    if (cmd === 'ARROW_UP') {
      if (history.length > 0) {
        const nextIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    } else {
      handleCommand(cmd);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className="py-16 md:py-32 px-6 md:px-16 bg-bg-secondary" id="terminal-section">
      <div className="max-w-[1000px] mx-auto w-full">
        <div className="font-mono text-[13px] text-text-muted mb-4 text-center">~/terminal</div>
        
        <QuickCommandChips onCommandTap={handleChipTap} />
        
        <div 
          className="rounded-xl overflow-hidden border border-border-subtle shadow-2xl bg-term-bg cursor-text"
          onClick={focusInput}
        >
          {/* Terminal Chrome */}
          <div className="h-10 bg-term-header flex items-center px-4 border-b border-border-subtle select-none">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-error opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-warning opacity-80"></div>
              <div className="w-3 h-3 rounded-full bg-success opacity-80"></div>
            </div>
            <div className="mx-auto font-mono text-[13px] text-text-muted">
              ayush@portfolio:~$
            </div>
            <div className="w-12"></div>
          </div>
          
          {/* Terminal Body */}
          <div 
            ref={scrollbackRef}
            className="p-4 md:p-6 h-[400px] overflow-y-auto font-mono text-[13px] md:text-[14px] scroll-smooth"
            aria-live="polite"
          >
            {/* Scrollback */}
            <div className="flex flex-col gap-1 mb-2">
              {scrollback.map(line => {
                let colorClass = 'text-term-text';
                if (line.type === 'error') colorClass = 'text-error';
                if (line.type === 'success') colorClass = 'text-success';
                if (line.type === 'system') colorClass = 'text-text-muted';
                if (line.type === 'input') colorClass = 'text-accent opacity-90';

                return (
                  <div key={line.id} className={`${colorClass} whitespace-pre-wrap break-words`} dangerouslySetInnerHTML={typeof line.content === 'string' ? { __html: line.content } : undefined}>
                    {typeof line.content !== 'string' ? line.content : null}
                  </div>
                );
              })}
            </div>

            {/* Active Input Line */}
            <div className="flex items-start text-term-text relative">
              <div className="flex-shrink-0 pt-0.5">
                <span className="text-term-prompt mr-2">➜</span>
                <span className="text-accent mr-2">{cwd.join('/')}</span>
              </div>
              <div className="relative flex-grow min-h-[1.5em]">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="absolute inset-0 opacity-0 w-full h-full cursor-text bg-transparent text-transparent"
                  aria-label="Portfolio terminal command input"
                  autoComplete="off"
                  spellCheck="false"
                />
                <div className="pointer-events-none break-all pt-0.5">
                  <span>{input}</span>
                  <span className={`inline-block w-2.5 h-[1.1em] align-middle ml-[1px] ${isFocused ? 'bg-term-prompt animate-pulse' : 'border border-term-prompt opacity-50'}`}></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

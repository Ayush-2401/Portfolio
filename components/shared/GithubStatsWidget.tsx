'use client';
import React, { useEffect, useState } from 'react';
import { Star, GitFork, BookMarked, Gamepad2 } from 'lucide-react';
import { GitHubCalendar } from 'react-github-calendar';
import SnakeGame from './SnakeGame';

export default function GithubStatsWidget() {
  const [stats, setStats] = useState({ stars: 0, repos: 0, forks: 0 });
  const [isGaming, setIsGaming] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/github').then(res => res.json()).then(data => setStats(data)).catch(() => {});
  }, []);

  if (!mounted) return <div className="h-[160px] w-full bg-bg-elevated border border-border-subtle rounded-lg p-4 animate-pulse"></div>;

  return (
    <div className="flex flex-col gap-3 bg-bg-elevated border border-border-subtle rounded-lg p-4 hover:border-accent transition-colors max-w-full overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-[13px] font-mono text-text-muted">
          <div className="flex items-center gap-1.5" title="Total Stars">
            <Star className="w-3.5 h-3.5" />
            <span>{stats.stars}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Public Repositories">
            <BookMarked className="w-3.5 h-3.5" />
            <span>{stats.repos}</span>
          </div>
          <div className="flex items-center gap-1.5" title="Total Forks">
            <GitFork className="w-3.5 h-3.5" />
            <span>{stats.forks}</span>
          </div>
        </div>
        <button 
          onClick={() => setIsGaming(true)}
          className={`flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider px-2 py-1 rounded transition-colors ${isGaming ? 'bg-accent/20 text-accent' : 'bg-bg-primary text-text-muted hover:text-accent hover:bg-bg-primary'}`}
          title="Play Snake"
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Play</span>
        </button>
      </div>
      
      <div className="w-full overflow-hidden flex justify-between items-center pt-3 border-t border-border-subtle/30 scale-95 origin-left min-h-[95px]">
        {isGaming ? (
          <SnakeGame onExit={() => setIsGaming(false)} />
        ) : (
          <>
            <div className="flex-none">
              <GitHubCalendar 
                username="Ayush-2401"
                colorScheme="dark"
                blockSize={11}
                blockMargin={4}
                fontSize={12}
              />
            </div>
            
            {/* Fill empty space on larger screens with a status indicator */}
            <div className="hidden lg:flex flex-1 ml-8 justify-end">
              <div className="flex flex-col items-end text-right font-mono text-[12px] text-text-muted border-r-2 border-accent/30 pr-4 py-1">
                <span className="text-accent font-semibold mb-1.5 flex items-center gap-2 tracking-wide">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                  </span>
                  AVAILABLE FOR INTERNSHIP
                </span>
                <span className="opacity-80">Software Engineering</span>
                <span className="opacity-80 text-[10px] mt-0.5">Starting Jan 2026</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

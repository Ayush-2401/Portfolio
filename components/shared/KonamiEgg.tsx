'use client';
import React, { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export default function KonamiEgg() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let inputSequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      inputSequence.push(e.key);
      inputSequence = inputSequence.slice(-10);

      if (inputSequence.join(',') === KONAMI_CODE.join(',')) {
        setActive(true);
        setTimeout(() => setActive(false), 5000); // Reset after 5 seconds
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none bg-black/90 flex flex-col items-center justify-center animate-in fade-in duration-500">
      <div className="font-mono text-accent text-xl md:text-4xl whitespace-pre text-center mb-8 drop-shadow-[0_0_15px_rgba(57,255,136,0.8)]">
        {`
    ___  _   _  ___  __  __   _    _  _ 
   / _ \\| | | |/ _ \\|  \\/  | / \\  | \\| |
  | (_) | |_| | (_) | |\\/| |/ _ \\ | .  |
   \\__\\_\\\\___/ \\___/|_|  |_/_/ \\_\\|_|\\_|
        `}
      </div>
      <p className="text-text-primary font-mono animate-pulse">
        God Mode Unlocked
      </p>
    </div>
  );
}

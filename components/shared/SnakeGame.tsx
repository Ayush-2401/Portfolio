'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';

const COLS = 53;
const ROWS = 7;
const SPEED = 100;

export default function SnakeGame({ onExit }: { onExit: () => void }) {
  const [snake, setSnake] = useState([[2, 3], [1, 3], [0, 3]]);
  const [food, setFood] = useState([20, 3]);
  const [dir, setDir] = useState([1, 0]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused) return;

    setSnake((prev) => {
      const head = prev[0];
      const newHead = [head[0] + dir[0], head[1] + dir[1]];

      if (
        newHead[0] < 0 ||
        newHead[0] >= COLS ||
        newHead[1] < 0 ||
        newHead[1] >= ROWS
      ) {
        setGameOver(true);
        return prev;
      }

      for (const segment of prev) {
        if (segment[0] === newHead[0] && segment[1] === newHead[1]) {
          setGameOver(true);
          return prev;
        }
      }

      const newSnake = [newHead, ...prev];

      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setScore(s => s + 1);
        setFood([
          Math.floor(Math.random() * COLS),
          Math.floor(Math.random() * ROWS),
        ]);
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [dir, food, gameOver, isPaused]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }

      const key = e.key.toLowerCase();

      switch (key) {
        case 'arrowup':
        case 'w':
          if (dir[1] !== 1) setDir([0, -1]);
          break;
        case 'arrowdown':
        case 's':
          if (dir[1] !== -1) setDir([0, 1]);
          break;
        case 'arrowleft':
        case 'a':
          if (dir[0] !== 1) setDir([-1, 0]);
          break;
        case 'arrowright':
        case 'd':
          if (dir[0] !== -1) setDir([1, 0]);
          break;
        case 'p':
        case ' ':
          setIsPaused(p => !p);
          break;
      }
    };
    
    containerRef.current?.focus();
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dir]);

  useEffect(() => {
    const interval = setInterval(moveSnake, SPEED);
    return () => clearInterval(interval);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake([[2, 3], [1, 3], [0, 3]]);
    setDir([1, 0]);
    setFood([20, 3]);
    setGameOver(false);
    setScore(0);
    setIsPaused(false);
    containerRef.current?.focus();
  };

  return (
    <div 
      ref={containerRef}
      tabIndex={0}
      className="relative outline-none flex justify-center items-center"
    >
      {/* Mobile D-Pad Controls */}
      <div className="md:hidden absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-50 bg-bg-primary/80 backdrop-blur p-2 rounded-lg border border-border-subtle">
        <button onTouchStart={() => dir[1] !== 1 && setDir([0, -1])} className="w-8 h-8 bg-bg-elevated rounded border border-border-subtle flex justify-center items-center">▲</button>
        <div className="flex gap-1">
          <button onTouchStart={() => dir[0] !== 1 && setDir([-1, 0])} className="w-8 h-8 bg-bg-elevated rounded border border-border-subtle flex justify-center items-center">◀</button>
          <button onTouchStart={() => dir[1] !== -1 && setDir([0, 1])} className="w-8 h-8 bg-bg-elevated rounded border border-border-subtle flex justify-center items-center">▼</button>
          <button onTouchStart={() => dir[0] !== -1 && setDir([1, 0])} className="w-8 h-8 bg-bg-elevated rounded border border-border-subtle flex justify-center items-center">▶</button>
        </div>
      </div>

      <div 
        className="grid gap-[4px]" 
        style={{ 
          gridTemplateColumns: `repeat(${COLS}, 11px)`,
          gridTemplateRows: `repeat(${ROWS}, 11px)`
        }}
      >
        {Array.from({ length: ROWS * COLS }).map((_, i) => {
          const x = i % COLS;
          const y = Math.floor(i / COLS);
          
          const isSnakeHead = snake[0][0] === x && snake[0][1] === y;
          const isSnake = snake.some(s => s[0] === x && s[1] === y);
          const isFood = food[0] === x && food[1] === y;

          let bgClass = "bg-[#161b22]"; 
          
          if (isSnakeHead) bgClass = "bg-[#39d353]"; 
          else if (isSnake) bgClass = "bg-[#26a641]"; 
          else if (isFood) bgClass = "bg-[#0e4429] animate-pulse"; 

          return (
            <div 
              key={i} 
              className={`w-[11px] h-[11px] rounded-sm ${bgClass}`}
            />
          );
        })}
      </div>

      {gameOver && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg z-10">
          <div className="text-center font-mono">
            <h3 className="text-accent text-xl font-bold mb-2">GAME OVER</h3>
            <p className="text-text-muted mb-4">Score: {score}</p>
            <div className="flex gap-2 justify-center">
              <button 
                onClick={resetGame}
                className="px-3 py-1 bg-bg-elevated hover:bg-bg-highlight border border-border-subtle rounded text-xs text-text-primary transition-colors cursor-pointer"
              >
                Restart
              </button>
              <button 
                onClick={onExit}
                className="px-3 py-1 bg-bg-elevated hover:bg-bg-highlight border border-border-subtle rounded text-xs text-text-muted transition-colors cursor-pointer"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

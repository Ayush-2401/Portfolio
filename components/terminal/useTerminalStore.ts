import { create } from 'zustand';

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
  content: string | React.ReactNode;
}

interface TerminalState {
  cwd: string[];
  history: string[];
  historyIndex: number;
  scrollback: TerminalLine[];
  setCwd: (path: string[]) => void;
  addToHistory: (command: string) => void;
  setHistoryIndex: (index: number) => void;
  print: (lines: TerminalLine | TerminalLine[]) => void;
  clear: () => void;
}

export const useTerminalStore = create<TerminalState>((set) => ({
  cwd: ['~'],
  history: [],
  historyIndex: -1,
  scrollback: [
    { id: 'init-1', type: 'system', content: 'Welcome to AyushOS v1.0.0' },
    { id: 'init-2', type: 'system', content: "Type 'help' to see available commands." }
  ],
  setCwd: (path) => set({ cwd: path }),
  addToHistory: (command) => set((state) => {
    // Only add if not identical to last command
    if (state.history[0] === command) return { historyIndex: -1 };
    const newHistory = [command, ...state.history].slice(0, 100);
    return { history: newHistory, historyIndex: -1 };
  }),
  setHistoryIndex: (index) => set({ historyIndex: index }),
  print: (lines) => set((state) => ({
    scrollback: [...state.scrollback, ...(Array.isArray(lines) ? lines : [lines])]
  })),
  clear: () => set({ scrollback: [] }),
}));

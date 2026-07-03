import { create } from "zustand";

type CursorType = "default" | "hover" | "project" | "terminal";

interface CursorState {
  cursorType: CursorType;
  cursorText: string;
  setCursorType: (type: CursorType) => void;
  setCursorText: (text: string) => void;
  resetCursor: () => void;
}

export const useCursorStore = create<CursorState>((set) => ({
  cursorType: "default",
  cursorText: "",
  setCursorType: (type) => set({ cursorType: type }),
  setCursorText: (text) => set({ cursorText: text }),
  resetCursor: () => set({ cursorType: "default", cursorText: "" }),
}));

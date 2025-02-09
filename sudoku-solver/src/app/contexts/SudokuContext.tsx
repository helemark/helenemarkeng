"use client";

import React, { createContext, useContext, useState } from "react";

const emptyBoard = Array(9).fill(null).map(() => Array(9).fill(""));

interface SudokuContextType {
  board: string[][];
  updateCell: (row: number, col: number, value: string) => void;
  setBoard: (newBoard: string[][]) => void;
}

const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

export const SudokuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [board, setBoardState] = useState<string[][]>(emptyBoard);

  const updateCell = (row: number, col: number, value: string) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      setBoardState((prevBoard) =>
        prevBoard.map((r, rIdx) =>
          r.map((c, cIdx) => (rIdx === row && cIdx === col ? value : c))
        )
      );
    };
  };

  const setBoard = (newBoard: string[][]) => {
    setBoardState(newBoard);
  };

  return (
    <SudokuContext.Provider value={{ board, updateCell, setBoard }}>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudoku = () => {
  const context = useContext(SudokuContext);
  if (!context) {
    throw new Error("useSudoku must be used within a SudokuProvider"); // ✅ Prevents undefined errors
  }
  return context;
};

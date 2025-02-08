"use client"; 

import React, { createContext, useContext, useState } from "react";

const emptyBoard = Array(9)
  .fill(null)
  .map(() => Array(9).fill(""));

interface SudokuContextType {
  board: string[][];
  updateCell: (row: number, col: number, value: string) => void;
}

const SudokuContext = createContext<SudokuContextType | undefined>(undefined);

export const SudokuProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<string[][]>(emptyBoard);

  const updateCell = (row: number, col: number, value: string) => {
    if (value === "" || /^[1-9]$/.test(value)) {
      const newBoard = board.map((r, rIdx) =>
        r.map((c, cIdx) => (rIdx === row && cIdx === col ? value : c))
      );
      setBoard(newBoard);
    }
  };

  return (
    <SudokuContext.Provider value={{ board, updateCell }}>
      {children}
    </SudokuContext.Provider>
  );
};

export const useSudoku = () => {
  const context = useContext(SudokuContext);
  if (!context) {
    throw new Error("useSudoku must be used within a SudokuProvider");
  }
  return context;
};

"use client"; // ✅ This ensures all children are client components

import { SudokuProvider } from "./contexts/SudokuContext";
import SudokuBoard from "./SudokuBoard";

export default function ClientWrapper() {
  return (
    <SudokuProvider>
      <div>
        <h1 className="text-2xl font-bold mb-4">Sudoku Solver</h1>
        <SudokuBoard />
      </div>
    </SudokuProvider>
  );
}

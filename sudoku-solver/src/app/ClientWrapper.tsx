"use client"; // ✅ This ensures all children are client components

import SudokuBoard from "./conponents/SudokuBoard";

export default function ClientWrapper() {
  return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Sudoku Solver</h1>
        <SudokuBoard />
      </div>
  );
}

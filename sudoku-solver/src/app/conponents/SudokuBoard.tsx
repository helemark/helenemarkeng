"use client";

import React from "react";
import { useSudoku } from "../contexts/SudokuContext";
import styles from "./SudokuBoard.module.css";
import SudokuButtons from "./SudokuButtons";

const SudokuBoard: React.FC = () => {
  const { board, updateCell } = useSudoku();

  if (!board) return <p className="text-red-500">Loading board...</p>; // ✅ Prevents crash on undefined board

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sudoku Solver</h1>

      <div className={styles.sudokuGrid}>
        {board.map((row, rowIdx) =>
          row.map((cell, colIdx) => (
            <input
              key={`${rowIdx}-${colIdx}`}
              type="text"
              value={cell}
              maxLength={1}
              onChange={(e) => updateCell(rowIdx, colIdx, e.target.value)}
              className={`${styles.cell} ${
                colIdx % 3 === 2 && colIdx !== 8 ? styles.borderRight : ""
              } ${rowIdx % 3 === 2 && rowIdx !== 8 ? styles.borderBottom : ""}`}
            />
          ))
        )}
      </div>
      <SudokuButtons />
    </div>
  );
};

export default SudokuBoard;

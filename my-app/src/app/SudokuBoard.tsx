"use client";

import React from "react";
import { useSudoku } from "./contexts/SudokuContext";
import styles from "./SudokuBoard.module.css"; // Import CSS module

const SudokuBoard: React.FC = () => {
  const { board, updateCell } = useSudoku();

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

      <div className={styles.buttonContainer}>
        <button className={styles.button}>Solve It!</button>
        <button className={styles.button}>Clear All</button>
      </div>
    </div>
  );
};

export default SudokuBoard;

import React from "react";

const isLegalRow = (row: string[]) => {
  const seen = new Set();
  for (let cell of row) {
    if (cell === "") continue;
    if (seen.has(cell)) return false;
    seen.add(cell);
  }
  return true;
};


const isLegalBoard = (board: string[][]) => {
  // Check rows
  for (let row of board) {
    if (!isLegalRow(row)) return false;
  }

  // Check columns
  for (let colIdx = 0; colIdx < 9; colIdx++) {
    const col = board.map((row) => row[colIdx]);
    if (!isLegalRow(col)) return false;
  }

  // Check 3x3 squares
  for (let rowIdx = 0; rowIdx < 9; rowIdx += 3) {
    for (let colIdx = 0; colIdx < 9; colIdx += 3) {
      const square = [
        board[rowIdx][colIdx],
        board[rowIdx][colIdx + 1],
        board[rowIdx][colIdx + 2],
        board[rowIdx + 1][colIdx],
        board[rowIdx + 1][colIdx + 1],
        board[rowIdx + 1][colIdx + 2],
        board[rowIdx + 2][colIdx],
        board[rowIdx + 2][colIdx + 1],
        board[rowIdx + 2][colIdx + 2],
      ];
      if (!isLegalRow(square)) return false;
    }
  }
  return true;
}

const findIllegalNumbers = (board: string[][]) => {
    const illegalNumbers: [number, number][] = [];
    
    // Check rows
    for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
        const row = board[rowIdx];
        const seen = new Set();
        for (let colIdx = 0; colIdx < 9; colIdx++) {
        const cell = row[colIdx];
        if (cell === "") continue;
        if (seen.has(cell)) illegalNumbers.push([rowIdx, colIdx]);
        seen.add(cell);
        }
    }
    
    // Check columns
    for (let colIdx = 0; colIdx < 9; colIdx++) {
        const seen = new Set();
        for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
        const cell = board[rowIdx][colIdx];
        if (cell === "") continue;
        if (seen.has(cell)) illegalNumbers.push([rowIdx, colIdx]);
        seen.add(cell);
        }
    }
    
    // Check 3x3 squares
    for (let rowIdx = 0; rowIdx < 9; rowIdx += 3) {
        for (let colIdx = 0; colIdx < 9; colIdx += 3) {
        const seen = new Set();
        for (let i = rowIdx; i < rowIdx + 3; i++) {
            for (let j = colIdx; j < colIdx + 3; j++) {
            const cell = board[i][j];
            if (cell === "") continue;
            if (seen.has(cell)) illegalNumbers.push([i, j]);
            seen.add(cell);
            }
        }
        }
    }
    
    return illegalNumbers;
    }

export { findIllegalNumbers, isLegalBoard };
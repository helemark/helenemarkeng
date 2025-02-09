"use client";

import React, { useState } from "react";
import { useSudoku } from "../contexts/SudokuContext";
import styles from "./SudokuButtons.module.css";
import { isLegalBoard } from "./IllegalMoves";

const SudokuButtons: React.FC = () => {
    const { board, setBoard } = useSudoku();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const solveSudoku = async () => {
        setLoading(true);
        setError("");

        if (!isLegalBoard(board)) {
            setError("Illegal board. Please correct it before solving.");
            setLoading(false);
            return;
        }
        try {
            const response = await fetch("http://127.0.0.1:8000/solve", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ board }),
            });

            const data = await response.json();
            if (response.ok) {
                setBoard(data.solved_board);
            } else {
                setError(data.error || "Failed to solve Sudoku.");
            }
        } catch (err) {
            setError("Server is not responding.");
        } finally {
            setLoading(false);
        }
    };

    const clearAll = () => {
        const newBoard = board.map((r) => r.map(() => ""));
        setBoard(newBoard);
    };

    return (
        <div className={styles.buttonContainer}>
            {error && <p className={styles.error}>{error}</p>}
            <button className={styles.button} onClick={solveSudoku} disabled={loading}>
                {loading ? "Solving..." : "Solve It!"}
            </button>
            <button className={styles.button} onClick={clearAll}>Clear All</button>
            <button className={styles.button}>Upload Photo</button>
        </div>
    );
};

export default SudokuButtons;

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

# ✅ Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to ["http://localhost:3000"] for better security
    allow_credentials=True,
    allow_methods=["*"],  # ✅ Allows OPTIONS requests
    allow_headers=["*"],
)

class SudokuBoard(BaseModel):
    board: List[List[str]]

@app.get("/")
def home():
    return {"message": "Sudoku Solver API is running!"}

@app.post("/solve")
def solve_sudoku(board_data: SudokuBoard):
    board = [[int(cell) if cell.isdigit() else 0 for cell in row] for row in board_data.board]

    if not is_valid_board(board):
        return {"error": "Invalid Sudoku board"}

    if solve(board):
        return {"solved_board": board}
    else:
        return {"error": "No solution found"}

def is_valid_board(board):
    return all(len(row) == 9 for row in board) and len(board) == 9 and \
        all(is_safe(board, r, c, board[r][c]) for r in range(9) for c in range(9) if board[r][c] != 0)

def solve(board):
    empty = find_empty_cell(board)
    if not empty:
        return True

    row, col = empty
    for num in range(1, 10):
        if is_safe(board, row, col, num):
            board[row][col] = num
            if solve(board):
                return True
            board[row][col] = 0  # Backtrack

    return False

def find_empty_cell(board):
    for r in range(9):
        for c in range(9):
            if board[r][c] == 0:
                return r, c
    return None

def is_safe(board, row, col, num):
    for i in range(9):
        if i != col and i != row and \
            board[row][i] == num or board[i][col] == num:
            return False

    start_row, start_col = row - row % 3, col - col % 3
    for i in range(3):
        for j in range(3):
            if board[i + start_row][j + start_col] == num:
                return False

    return True

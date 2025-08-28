import React, { useState } from "react";
import "./Chessboard.css";

function Chessboard() {
  const initialBoard = [
    ["r", "n", "b", "q", "k", "b", "n", "r"],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
  ];

  const unicodePieces = {
    r: "♜", n: "♞", b: "♝", q: "♛", k: "♚", p: "♟",
    R: "♖", N: "♘", B: "♗", Q: "♕", K: "♔", P: "♙",
  };

  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState("white"); // white moves first

  // Check valid moves
  const isValidMove = (piece, from, to) => {
    const [fromRow, fromCol] = [from.row, from.col];
    const [toRow, toCol] = [to.row, to.col];

    const targetPiece = board[toRow][toCol];

    // Cannot capture same color
    if (targetPiece && (piece === piece.toUpperCase()) === (targetPiece === targetPiece.toUpperCase())) {
      return false;
    }

    switch (piece.toLowerCase()) {
      case "p": {
        // White pawn (uppercase)
        if (piece === "P") {
          if (fromCol === toCol) {
            // Move forward 1
            if (toRow === fromRow - 1 && !targetPiece) return true;
            // Move forward 2 (from starting position)
            if (fromRow === 6 && toRow === 4 && !targetPiece && !board[5][fromCol]) return true;
          }
          // Capture
          if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow - 1 && targetPiece) return true;
        }
        // Black pawn (lowercase)
        if (piece === "p") {
          if (fromCol === toCol) {
            if (toRow === fromRow + 1 && !targetPiece) return true;
            if (fromRow === 1 && toRow === 3 && !targetPiece && !board[2][fromCol]) return true;
          }
          if (Math.abs(toCol - fromCol) === 1 && toRow === fromRow + 1 && targetPiece) return true;
        }
        return false;
      }

      case "r": {
        // Rook - move straight (no jumping)
        if (fromRow === toRow) {
          const step = fromCol < toCol ? 1 : -1;
          for (let c = fromCol + step; c !== toCol; c += step) {
            if (board[fromRow][c]) return false;
          }
          return true;
        }
        if (fromCol === toCol) {
          const step = fromRow < toRow ? 1 : -1;
          for (let r = fromRow + step; r !== toRow; r += step) {
            if (board[r][fromCol]) return false;
          }
          return true;
        }
        return false;
      }

      default:
        return true; // For now allow others (add later: knight, bishop, etc.)
    }
  };

  const handleClick = (row, col) => {
    if (selected) {
      const piece = board[selected.row][selected.col];

      // Turn check
      if ((turn === "white" && piece === piece.toLowerCase()) ||
          (turn === "black" && piece === piece.toUpperCase())) {
        setSelected(null);
        return;
      }

      if (isValidMove(piece, selected, { row, col })) {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = piece;
        newBoard[selected.row][selected.col] = "";
        setBoard(newBoard);
        setTurn(turn === "white" ? "black" : "white"); // switch turn
      }
      setSelected(null);
    } else if (board[row][col] !== "") {
      setSelected({ row, col });
    }
  };

  return (
    <div>
      <h3>Turn: {turn}</h3>
      <div className="chessboard">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isWhite = (rowIndex + colIndex) % 2 === 0;
            const isSelected = selected?.row === rowIndex && selected?.col === colIndex;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`square ${isWhite ? "white" : "black"} ${isSelected ? "selected" : ""}`}
                onClick={() => handleClick(rowIndex, colIndex)}
              >
                {cell && <span className="piece">{unicodePieces[cell]}</span>}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Chessboard;

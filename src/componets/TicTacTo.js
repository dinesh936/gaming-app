import React, { useState } from 'react';
import './tick.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));  // 3x3 board
  const [isXNext, setIsXNext] = useState(true);  // X starts first
  const [winner, setWinner] = useState(null);  // To track winner
  const [gameStarted, setGameStarted] = useState(false);  // Start game status

  // Determine the winner
  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
      [0, 4, 8], [2, 4, 6]               // Diagonals
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];  // Return the winner 'X' or 'O'
      }
    }
    return null;  // No winner
  };

  // Handle click on a square
  const handleClick = (index) => {
    if (board[index] || winner) return;  // Prevent click if square is already filled or game over

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);  // Toggle player turns

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);  // Set winner if there is one
    }
  };

  // Start the game
  const startGame = () => {
    setGameStarted(true);
    setBoard(Array(9).fill(null));  // Reset board
    setWinner(null);  // No winner at the start
    setIsXNext(true);  // X starts first
  };

  // Restart the game
  const restartGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsXNext(true);
  };

  // Render the game board
  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="game">
      <h1>Tic-Tac-Toe Game</h1>

      {/* Game start screen */}
      {!gameStarted ? (
        <div className="card">
          <h2>Welcome to Tic-Tac-Toe</h2>
          <button className="play-btn" onClick={startGame}>Play</button>
        </div>
      ) : (
        <>
          <div className="board">
            <div className="row">
              {renderSquare(0)}
              {renderSquare(1)}
              {renderSquare(2)}
            </div>
            <div className="row">
              {renderSquare(3)}
              {renderSquare(4)}
              {renderSquare(5)}
            </div>
            <div className="row">
              {renderSquare(6)}
              {renderSquare(7)}
              {renderSquare(8)}
            </div>
          </div>

          {/* Display winner or next turn */}
          {winner ? (
            <div className="info">
              <h2>Winner: {winner}</h2>
              <button className="restart-btn" onClick={restartGame}>Restart Game</button>
            </div>
          ) : (
            <div className="info">
              <h3>Next Player: {isXNext ? 'X' : 'O'}</h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;

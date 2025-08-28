import React, { useState, useEffect } from 'react';
import './snake.css';

const SnakeGame = ({ goBack }) => {
  const BOARD_SIZE = 10;
  const INITIAL_SNAKE = [[0, 0]];
  const INITIAL_DIRECTION = [0, 1];
  const INITIAL_LIVES = 3;

  const getRandomFood = (snake) => {
    let newFood;
    do {
      newFood = [
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE),
      ];
    } while (snake.some(([r, c]) => r === newFood[0] && c === newFood[1]));
    return newFood;
  };

  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);

  const moveSnake = () => {
    const newHead = [
      (snake[0][0] + direction[0] + BOARD_SIZE) % BOARD_SIZE,
      (snake[0][1] + direction[1] + BOARD_SIZE) % BOARD_SIZE,
    ];

    for (let cell of snake) {
      if (cell[0] === newHead[0] && cell[1] === newHead[1]) {
        // Reduce life on collision
        if (lives > 1) {
          setLives(prev => prev - 1);
          setSnake(INITIAL_SNAKE);
          setDirection(INITIAL_DIRECTION);
        } else {
          setLives(0);
          setGameOver(true);
        }
        return;
      }
    }

    let newSnake = [newHead, ...snake];

    if (newHead[0] === food[0] && newHead[1] === food[1]) {
      setFood(getRandomFood(newSnake));
      setScore(score + 1);
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setScore(0);
    setLives(INITIAL_LIVES);
    setGameOver(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) moveSnake();
    }, 200);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowUp': if (direction[0] !== 1) setDirection([-1, 0]); break;
        case 'ArrowDown': if (direction[0] !== -1) setDirection([1, 0]); break;
        case 'ArrowLeft': if (direction[1] !== 1) setDirection([0, -1]); break;
        case 'ArrowRight': if (direction[1] !== -1) setDirection([0, 1]); break;
        default: break;
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [direction]);

  const renderBoard = () => {
    let board = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      let rowCells = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        let isSnake = snake.some(([r, c]) => r === row && c === col);
        let isFood = food[0] === row && food[1] === col;
        rowCells.push(
          <div
            key={`${row}-${col}`}
            className={`cell ${isSnake ? 'snake' : ''} ${isFood ? 'food' : ''}`}
          ></div>
        );
      }
      board.push(<div key={row} className="row">{rowCells}</div>);
    }
    return board;
  };

  return (
    <div>
      <h1>🐍 Snake Game</h1>
      <h3>Score: {score}</h3>
      <h3>Lives: {lives} ❤️</h3>
      {gameOver && (
        <>
          <h2>Game Over 😵</h2>
          <button onClick={resetGame}>Restart Game 🔁</button>
        </>
      )}
      <div className="board">{renderBoard()}</div>
      
    </div>
  );
};

export default SnakeGame;

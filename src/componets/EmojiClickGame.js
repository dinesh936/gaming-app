// components/EmojiClickGame.js
import React, { useState, useEffect } from 'react';
import './EmojiClickGame.css';

const EmojiClickGame = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setGameStarted(false);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  const handleClick = () => {
    if (!gameStarted) return;
    setScore(prev => prev + 1);
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameStarted(true);
  };

  return (
    <div className="emoji-game">
      <h2>🎯 Click the Emoji!</h2>
      <p>Click as fast as you can in 10 seconds!</p>
      <div className="game-info">
        <div>⏱️ Time Left: {timeLeft}s</div>
        <div>🏆 Score: {score}</div>
      </div>

      {timeLeft > 0 ? (
        <button
          className="emoji-btn"
          onClick={handleClick}
          disabled={!gameStarted}
        >
          😺
        </button>
      ) : (
        <p className="result-text">Game Over! Final Score: {score}</p>
      )}

      {!gameStarted && (
        <button className="start-btn" onClick={startGame}>
          Start Game
        </button>
      )}
    </div>
  );
};

export default EmojiClickGame;

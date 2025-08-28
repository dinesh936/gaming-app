import React, { useState, useEffect } from 'react';
import './shooting.css';






const BirdShootingGame = ({ onBack }) => {
  const [gunX, setGunX] = useState(50);
  const [bullets, setBullets] = useState([]);
  const [birds, setBirds] = useState([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      if (e.key === 'ArrowLeft') setGunX((x) => Math.max(0, x - 5));
      else if (e.key === 'ArrowRight') setGunX((x) => Math.min(90, x + 5));
      else if (e.key === ' ') shoot();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver]);

  const shoot = () => {
    const newBullets = Array.from({ length: 3 }).map((_, i) => ({
      x: gunX + 2 + i,
      y: 10,
      id: Date.now() + i,
    }));
    setBullets((prev) => [...prev, ...newBullets]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prev) =>
        prev.map((b) => ({ ...b, y: b.y + 10 })).filter((b) => b.y < 100)
      );
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        const size = Math.random() * 10 + 20;
        setBirds((prev) => [
          ...prev,
          {
            id: Date.now(),
            x: 0,
            y: Math.random() * 50 + 30,
            speed: Math.random() * 0.7 + 0.3,
            size,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
          },
        ]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [gameOver]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBirds((prevBirds) =>
        prevBirds
          .map((bird, index) => ({
            ...bird,
            x: bird.x + bird.speed,
            y: bird.y + Math.sin((bird.x / 10) + index) * 0.5,
          }))
          .filter((bird) => bird.x < 100)
      );

      setBullets((prevBullets) => {
        const remainingBullets = [];
        const hitBirdIds = new Set();

        for (let bullet of prevBullets) {
          let hit = false;
          for (let bird of birds) {
            if (
              bullet.x >= bird.x &&
              bullet.x <= bird.x + 5 &&
              bullet.y >= bird.y &&
              bullet.y <= bird.y + 5
            ) {
              hitBirdIds.add(bird.id);
              setScore((s) => s + 10);
              hit = true;
              break;
            }
          }
          if (!hit) remainingBullets.push(bullet);
        }

        setBirds((b) => b.filter((bird) => !hitBirdIds.has(bird.id)));
        return remainingBullets;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [birds]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const restartGame = () => {
    setGunX(50);
    setBullets([]);
    setBirds([]);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
  };

  return (
    <div className="game-container">
      <h2>🕊️ Bird Shooting Game</h2>
      <p>Move ← / → & Shoot with SPACE</p>

      <div className="info-bar">
        <span>⏱ Time: {timeLeft}s</span>
        <span>🎯 Score: {score}</span>
        <button onClick={restartGame}>🔁 Restart</button>
   
      </div>

      <div className="game-area">
        <div className="gun" style={{ left: `${gunX}%` }} />

        {bullets.map((b) => (
          <div key={b.id} className="bullet" style={{ left: `${b.x}%`, bottom: `${b.y}%` }} />
        ))}

        {birds.map((bird) => (
          <div
            key={bird.id}
            className="bird"
            style={{
              left: `${bird.x}%`,
              top: `${bird.y}%`,
              width: `${bird.size}px`,
              height: `${bird.size}px`,
              backgroundColor: bird.color,
            }}
          />
        ))}
      </div>

      {gameOver && (
        <div className="game-over">
          <h3>🎮 Game Over</h3>
          <p>Your Score: {score}</p>
          <button onClick={restartGame}>🔁 Play Again</button>
        </div>
      )}
    </div>
  );
};

export default BirdShootingGame;

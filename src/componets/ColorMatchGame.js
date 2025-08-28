import React, { useState, useEffect } from 'react';
import './ColorMatchGame.css';

const colors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange'];

const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

const ColorMatchGame = () => {
  const [targetColorName, setTargetColorName] = useState(getRandomColor());
  const [displayColor, setDisplayColor] = useState(getRandomColor());
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const newColorName = getRandomColor();
    const newDisplayColor = getRandomColor();
    setTargetColorName(newColorName);
    setDisplayColor(newDisplayColor);
  }, [score]);

  const handleGuess = (color) => {
    if (color === targetColorName) {
      setScore(score + 1);
      setMessage('✅ Correct!');
    } else {
      setScore(0);
      setMessage('❌ Wrong! Try again.');
    }

    setTimeout(() => setMessage(''), 1000);
  };

  return (
    <div className="color-match-container">
      <h2>🎨 Color Match Challenge</h2>
      <p>Click the **name** of the color shown, not the text color!</p>
      <div className="color-display" style={{ color: displayColor.toLowerCase() }}>
        {targetColorName}
      </div>

      <div className="color-buttons">
        {colors.map((color, index) => (
          <button key={index} style={{ backgroundColor: color.toLowerCase() }} onClick={() => handleGuess(color)}>
            {color}
          </button>
        ))}
      </div>

      <p className="message">{message}</p>
      <p className="score">Score: {score}</p>
    </div>
  );
};

export default ColorMatchGame;

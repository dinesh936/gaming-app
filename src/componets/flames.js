// src/components/FlamesGame.jsx
import React, { useState } from 'react';
import './flames.css'

const FlamesGame = () => {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState('');

  const handleFlames = () => {
    let n1 = name1.toLowerCase().replace(/\s/g, '');
    let n2 = name2.toLowerCase().replace(/\s/g, '');
    let name1Arr = n1.split('');
    let name2Arr = n2.split('');

    for (let i = 0; i < name1Arr.length; i++) {
      let index = name2Arr.indexOf(name1Arr[i]);
      if (index !== -1) {
        name1Arr[i] = '';
        name2Arr[index] = '';
      }
    }

    let count = [...name1Arr, ...name2Arr].filter(Boolean).length;
    const flames = ['Friends', 'Love', 'Affection', 'Marriage', 'Enemies', 'Siblings'];

    let idx = 0;
    while (flames.length > 1) {
      idx = (idx + count - 1) % flames.length;
      flames.splice(idx, 1);
    }

    setResult(flames[0]);
  };

  return (
    <div className="flames-container">
      <h1>🔥 FLAMES Game 🔥</h1>
      <input
        type="text"
        placeholder="Enter First Name"
        value={name1}
        onChange={(e) => setName1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter Second Name"
        value={name2}
        onChange={(e) => setName2(e.target.value)}
      />
      <button onClick={handleFlames}>Calculate FLAMES</button>
      {result && (
        <div className="result">
          💖 Result: <strong>{result}</strong>
        </div>
      )}
    </div>
  );
};

export default FlamesGame;

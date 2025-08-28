import React, { useState } from 'react';
import './rsp.css';

const choices = ['rock', 'paper', 'scissors'];

const RockPaperScissors = () => {
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [result, setResult] = useState('');

  const play = (userPick) => {
    const compPick = choices[Math.floor(Math.random() * 3)];
    setUserChoice(userPick);
    setComputerChoice(compPick);
    determineWinner(userPick, compPick);
  };

  const determineWinner = (user, comp) => {
    if (user === comp) {
      setResult("It's a Draw!");
    } else if (
      (user === 'rock' && comp === 'scissors') ||
      (user === 'paper' && comp === 'rock') ||
      (user === 'scissors' && comp === 'paper')
    ) {
      setResult('You Win! 🎉');
    } else {
      setResult('You Lose! 😢');
    }
  };

  return (
    <div className="rps-container">
      <h1>✊ Rock ✋ Paper ✌️ Scissors</h1>
      <div className="choices">
        {choices.map((choice) => (
          <button key={choice} onClick={() => play(choice)} className="choice-btn">
            {choice}
          </button>
        ))}
      </div>
      {userChoice && (
        <div className="results">
          <p>You chose: <strong>{userChoice}</strong></p>
          <p>Computer chose: <strong>{computerChoice}</strong></p>
          <h2>{result}</h2>
        </div>
      )}
    </div>
  );
};

export default RockPaperScissors;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const GameHistory = ({ history }) => {
  const navigate = useNavigate();

  return (
    <div className="app">
      <header className="header">
        <h1>🕹️ Game Play History</h1>
      </header>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {history.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#fff' }}>No games played yet.</p>
        ) : (
          <ul className="history-box">
            {history.map((item, index) => (
              <li key={index} style={{ margin: '0.5rem 0' }}>
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <button className="back-btn" onClick={() => navigate('/')}>
          ⬅ Back to Home
        </button>
      </div>
    </div>
  );
};

export default GameHistory;

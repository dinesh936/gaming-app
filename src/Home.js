import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="overlay"></div>
      <div className="home-content">
        <h1 className="home-title">🎮 Welcome to Game Paradise</h1>
        <p className="home-subtitle">🎮 Play • ⚔️ Compete • 🎉 Celebrate</p>
        <button className="home-btn" onClick={() => navigate('/app')}>
          🚀 Sign In to Play
        </button>
      </div>
    </div>
  );
};

export default Home;

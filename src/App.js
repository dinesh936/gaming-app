import React, { useState } from 'react';
import './App.css';

import SnakeGame from './componets/SnakeGame';
import TicTacToe from './componets/TicTacTo';
import ShootingGame from './componets/ShootingGame';
import RPS from './componets/rps';
import FLAMES from './componets/flames';
import Chessboard from './componets/Chessboard';
import EmojiClickGame from './componets/EmojiClickGame';
import ColorMatchGame from './componets/ColorMatchGame';
import GameHistory from './componets/GameHistory';




const App = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', error: '' });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    if (!name || !email || !password) {
      return setForm({ ...form, error: 'All fields are required!' });
    }

    const alreadyExists = registeredUsers.find(user => user.email === email);
    if (alreadyExists) {
      return setForm({ ...form, error: 'This email is already registered.' });
    }

    const newUser = { name, email, password };
    setRegisteredUsers([...registeredUsers, newUser]);
    setCurrentUser(newUser);
    setForm({ name: '', email: '', password: '', error: '' });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (!email || !password) {
      return setForm({ ...form, error: 'Email and password are required!' });
    }

    const foundUser = registeredUsers.find(
      user => user.email === email && user.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      setForm({ name: '', email: '', password: '', error: '' });
    } else {
      setForm({ ...form, error: 'Invalid credentials or user not found.' });
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('home');
    setShowHistory(false);
  };

  const renderGamePage = () => {
    switch (currentPage) {
      case 'snake': return <SnakeGame />;
      case 'tictactoe': return <TicTacToe />;
      case 'shooting': return <ShootingGame />;
      case 'rps': return <RPS />;
      case 'flames': return <FLAMES />;
      case 'chess': return <Chessboard />;
      case 'emojiclickgame': return <EmojiClickGame />;
      case 'colormatch': return <ColorMatchGame />;
      default: return null;
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🎮 Game Paradise</h1>
      </header>

      {!currentUser ? (
        <div className="auth-box">
          <form onSubmit={isLogin ? handleLogin : handleSignup}>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>

            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleInput}
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInput}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleInput}
            />

            <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>

            <p
              onClick={() => {
                setIsLogin(!isLogin);
                setForm({ name: '', email: '', password: '', error: '' });
              }}
              className="toggle-link"
            >
              {isLogin ? "Don't have an account? Sign Up" : 'Already a member? Login'}
            </p>

            {form.error && <p className="error">{form.error}</p>}
          </form>
        </div>
      ) : showHistory ? (
        <>
          <div className="game-wrapper">
            <GameHistory history={history} />
            <button
              className="back-btn"
              onClick={() => {
                setShowHistory(false);
                setCurrentPage('home');
              }}
            >
              ⬅ Back to Game Menu
            </button>
          </div>
        </>
      ) : currentPage === 'home' ? (
        <>
          <div className="profile-options">
            <h3>👋 Welcome, {currentUser.name}</h3>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>

          <div className="game-menu">
            <h2>Select a Game:</h2>
            <div className="card-grid">
              {[
                { label: 'Snake', emoji: '🐍', page: 'snake' },
                { label: 'Tic Tac Toe', emoji: '⭕', page: 'tictactoe' },
                { label: 'Shooting', emoji: '🎯', page: 'shooting' },
                { label: 'Rock Paper Scissors', emoji: '✊✋✌️', page: 'rps' },
                { label: 'FLAMES', emoji: '💓', page: 'flames' },
                { label: 'Chess', emoji: '♟️', page: 'chess' },
                { label: 'Emoji Click', emoji: '😀', page: 'emojiclickgame' },
                { label: 'Color Match', emoji: '🎨', page: 'colormatch' },
              ].map(({ label, emoji, page }) => (
                <div
                  key={page}
                  className="card"
                  onClick={() => {
                    setCurrentPage(page);
                    setShowHistory(false);
                    setHistory([...history, `${label} - ${new Date().toLocaleString()}`]);
                  }}
                >
                  <div className="emoji">{emoji}</div>
                  <h3>{label}</h3>
                </div>
              ))}
            </div>

            <button className="back-btn" onClick={() => setShowHistory(true)}>
              🕹️ View Game History
            </button>
          </div>
        </>
      ) : (
        <div className="game-wrapper">
          {renderGamePage()}
          <button className="back-btn" onClick={() => {
            setCurrentPage('home');
            setShowHistory(false);
          }}>
            ⬅ Back to Game Menu
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
